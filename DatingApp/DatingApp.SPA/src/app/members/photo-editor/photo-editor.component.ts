import { Photo } from './../../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
