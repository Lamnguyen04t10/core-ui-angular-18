import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToastService } from '../../../ui-components/toast/toast.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../ui-components/modal/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  isSubmmit = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private modalService: ModalService,
    private router: Router) {

    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      isShowPassword: ['']
    })
  }

  handleTestModal() {
    this.modalService.confirmation('<p> Are you sure you want to delete <strong> NGUYEN VIET LAM </strong> </p>', { header: 'Confirmation' }).then(res => {
      console.log(res);
    })
  }

  handelLogin() {
    this.isSubmmit = true;
    this.form.markAsTouched();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.logIn(this.form.value.userName, this.form.value.password)
        .subscribe(res => {
          this.toastService.show({ type: 'success', message: "Login is successfully!" });
          this.authService.setSession(res);
          this.router.navigateByUrl('');
        }, err => {
          this.toastService.show({ type: 'error', message: "Login failed!" });

        })
    }
  }
}
