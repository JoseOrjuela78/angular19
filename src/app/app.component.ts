import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule} from '@angular/router';
import { LoadingComponent } from './components/common/loading/loading.component';
import { ToastService } from './components/common/toast/toast.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/common/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LoadingComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
