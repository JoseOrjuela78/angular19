import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service.service';
import { StorageService } from '@app/components/common/strorage/storage.service';
import { Isession } from '../models/session.Model';
import { Router} from '@angular/router';
import { LoadingService } from '@app/components/common/loading/loading.service';
import { ToastService } from '@app/components/common/toast/toast.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private authService = inject(AuthService);
  private storgeService = inject(StorageService);
  private router = inject(Router);
  private louding = inject(LoadingService);
  private toastService = inject(ToastService);
  
  buttonDisable: boolean = true;
    loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  checkInput(){
    return this.buttonDisable = !this.loginForm.valid;
  }

  onSubmit() {

  if (!this.loginForm.valid) return;
  this.louding.show();
  const { username, password } = this.loginForm.value;

  this.authService.login(username, password).subscribe(
    {
    next: async (login) => {
                            if (![200, 203].includes(login.status)) return;

                            const session: Isession = { ...login.body, status: login.status };
                            const resultSession = await this.storgeService.cargarSesion(session);
          
                            if (resultSession !== 200) {
                            return this.showError('Error cargue Session');
                            };

                            this.authService.loadPermissionsUser().subscribe(
                              {
                              next: async (permissionsUser) => {
                                                                if (permissionsUser.status !== 200) {
                                                                    return this.showError('Error cargando los permisos de usuario individuales');
                                                                }

                                                                const resultPermissions = await this.storgeService.cargarPermisosUsuario(permissionsUser.body.permissions);

                                                                if (resultPermissions === 200) {
                                                                    this.louding.hide();
                                                                    return this.router.navigate(['/home']);
                                                                } else {
                                                                this.showError('Error cargando los permisos de usuario individuales');
          }                                                     },
                             error: async (err) => {
                                                    await this.storgeService.cerraSesion();
                                                    this.showError(err.error.message);
                                                   },
                             complete: () => console.log('proceso loadPermissionsUser completado')
                              });
                            },
    error: async (err) => {
                          await this.storgeService.cerraSesion();
                          this.showError(err.error.message);
                          },
    complete: () => console.log('proceso Login completado')
  });
}

private showError(message: string) {
  this.toastService.show(message, 5000, 'error')
  this.louding.hide();
}

}
