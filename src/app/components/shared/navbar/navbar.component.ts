import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule} from '@angular/router';
import { StorageService } from '@app/components/common/strorage/storage.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements AfterContentInit {

  menuSideBar:any;
  private storgeService = inject(StorageService);

  ngAfterContentInit(): void {
     const menuSideBar:any  = this.storgeService.getMenu();
     this.menuSideBar = menuSideBar.__zone_symbol__value;
     console.log(this.menuSideBar);
 
  }

  Submenus(){
    console.log('Submenus');
  }
  

}
