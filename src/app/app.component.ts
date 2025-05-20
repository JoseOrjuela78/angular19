import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule} from '@angular/router';
import { LoadingComponent } from './components/common/loading/loading.component';
import { ToastService } from './components/common/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterModule, LoadingComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Natalia O';
    public toastService = inject(ToastService);
}
