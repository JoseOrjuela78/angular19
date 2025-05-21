// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastComponent?: ToastComponent;

  register(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  show(message: string, delay = 3000, type:any) {
    this.toastComponent?.show(message, delay, type );
  }
}
