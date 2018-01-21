import { Router } from '@angular/router';
import { User } from './../models/User';
import { AuthService } from './../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };

    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knowAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwrodMatchValidator });
  }

  passwrodMatchValidator(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  hasAnyError(formControl: string): boolean {
    return this.registerForm.get(formControl).errors && this.registerForm.get(formControl).touched;
  }

  hasRequiredError(formControl: string): boolean {
    return this.hasSpecifyError(formControl, 'required');
  }

  hasMinLengthError(formControl: string): boolean {
    return this.hasSpecifyError(formControl, 'minlength');
  }

  hasMaxLengthError(formControl: string): boolean {
    return this.hasSpecifyError(formControl, 'maxlength');
  }

  hasMismatchError(): boolean {
    return this.registerForm.get('confirmPassword').touched && this.registerForm.hasError('mismatch');
  }

  hasSpecifyError(formControl: string, specifyErrorType: string) {
    return this.registerForm.get(formControl).hasError(specifyErrorType) && this.registerForm.get(formControl).touched;
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
