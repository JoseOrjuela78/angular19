import { Component, Input, OnInit, signal } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
 imports:[CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  @Input() message = '';
  @Input() delay = 3000;

  
visible = signal(false);
type = signal<'success' | 'error'>('success');

constructor(private toastService: ToastService) {}

ngOnInit(): void {
  this.toastService.register(this);
 }

show(message: string, delay = this.delay, type: 'success' | 'error' = 'success') {
  this.message = message;
  this.type.set(type);
  this.visible.set(true);
  setTimeout(() => this.visible.set(false), delay);
}

}
