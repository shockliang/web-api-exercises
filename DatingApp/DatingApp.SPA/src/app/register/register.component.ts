import { AuthService } from './../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('Registration successful');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }

}
