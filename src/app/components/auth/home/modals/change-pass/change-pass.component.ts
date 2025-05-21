import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/components/auth/auth.service.service';
import { LoadingService } from '@app/components/common/loading/loading.service';
import { StorageService } from '@app/components/common/strorage/storage.service';
import { ToastService } from '@app/components/common/toast/toast.service';
import { SharedService } from '@app/components/shared/shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-pass',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePassComponent {
    
    changePassForm!: FormGroup;
    btnDisabled!: boolean;
    
    private louding = inject(LoadingService);
    private toastService = inject(ToastService);
    private authService = inject(AuthService);
    private sharedService = inject(SharedService);
    private storgeService = inject(StorageService);
    private router = inject(Router);
    private activeModal = inject(NgbActiveModal);

    constructor(){

    this.changePassForm = new FormGroup(
                  {
                    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                    confirmPass: new FormControl('', []),
                  },
                  { 
                    validators: this.checkPass 
                  }
              );

    }


  checkPass(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPass')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

   changePass() {
    
    if(!this.changePassForm.valid){
      this.toastService.show('Diligencie el formulario',5000,'error');
      return
    }

    this.louding.show();
    this.btnDisabled = true;

    this.authService.changePasswordUserBO(this.changePassForm.value).subscribe({
      next: (changeResult:any)=>{
                                const timeZone = new Date().toString();
                                this.sharedService.postCerrarSesion(timeZone).subscribe({
                                    next: (closeSession:any) =>{
                                                                this.storgeService.cerraSesion().then((result:any)=>{
                                                                this.activeModal.close();
                                                                this.router.navigate(['/login']);
                                                                this.louding.hide();
                                                                });
                                                                },
                                    error: (error:any)=>{
                                                          this.btnDisabled = false;                    
                                                          this.toastService.show(error.error.message,5000,'error');
                                                          this.louding.hide()
                                                        },
                                    complete: () => console.log('proceso closeSession completado')
                                  })
                               },
      error: (error:any)=>{
                            this.btnDisabled = false;                    
                            this.toastService.show(error.error.message,5000,'error');
                            this.louding.hide()
                          },
      complete: () => console.log('proceso changePass completado')
    });
      
  }

}
