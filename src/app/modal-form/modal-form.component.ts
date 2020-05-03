import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Output() close = new EventEmitter();

  form:FormGroup;
  validated = false;
  closing = false;

  constructor(fb:FormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.validated = true;
    if(this.form.invalid){
      return;
    }
    this.onClose();
  }

  onClose(){
    this.closing = true;
    setTimeout(() => {
      this.close.emit();
    }, 1000);
  }
}
