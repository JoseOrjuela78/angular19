import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

protected toasts: { text: string, classname: string, delay: number }[] = [];

public getToasts() {
 return this.toasts;
}


show(text: string, options: { classname?: string, delay?: number } = {}) {
  this.toasts.push({
  text,
  classname: options.classname || 'bg-primary text-white',
  delay: options.delay || 5000
   });
  }

remove(toast: any) {
this.toasts = this.toasts.filter(t => t !== toast);
}

 showSuccess(message:string) {
 this.show(message, {
  classname: 'bg-success text-white',
  delay: 3000
});
}

showError(message:string) {
  this.show(message, {
  classname: 'bg-danger text-white',
  delay: 3000
 });
}

}
