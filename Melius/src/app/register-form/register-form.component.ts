import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  saveForm = new FormGroup( {
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    e_mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),]),
  })


  onSave() {
    if (this.saveForm.valid) {
      console.log(this.saveForm.value);
    }
  }
}
