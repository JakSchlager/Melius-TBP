import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  saveForm = new FormGroup( {
    e_mail: new FormControl('', [Validators.required, Validators.email]),
  })

  onLogin() {
    if (this.saveForm.valid) {
      console.log(this.saveForm.value);
    }
  }
}
