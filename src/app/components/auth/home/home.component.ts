import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageService } from '@app/components/common/strorage/storage.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChangePassComponent } from './modals/change-pass/change-pass.component';
import { ToastService } from '@app/components/common/toast/toast.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  implements OnInit{

  private statusLogin!: number;
  private storeService = inject(StorageService);
  private modalService = inject(NgbModal);
   

  ngOnInit(): void {
     this.storeService.getStatus().then((result:any)=>{
         this.statusLogin =  result;
          if (this.statusLogin === 203) {
                  this.modalService.open(ChangePassComponent);
          }
    });
  
  }


}
