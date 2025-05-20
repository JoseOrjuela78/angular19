import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '@app/components/common/strorage/storage.service';
//import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChangePassComponent } from './modals/change-pass/change-pass.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  implements OnInit{

  private statusLogin!: number;
  changePassForm!: FormGroup;
  private storeService = inject(StorageService);
  //private modalService = inject(NgbModal);
  

  ngOnInit(): void {
       
    this.storeService.getStatus().then((result:any)=>{
         this.statusLogin =  result;
          if (this.statusLogin === 203 || this.statusLogin === 200) {

            this.changePassForm = new FormGroup(
                  {
                  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                  confirmPass: new FormControl('', []),
                  },
                  { 
                    validators: this.checkPass 
                  }
              );

             // this.modalService.open(ChangePassComponent);

          }
    });
  
  }

checkPass(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPass')?.value;
  return pass === confirm ? null : { notMatching: true };
}


}
