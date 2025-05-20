import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../common/strorage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private storageService = inject(StorageService);
  private router = inject(Router);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const token = (await this.storageService.getToken())?.trim();
      const isAuthenticated = !!token; 
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false
      }

      return isAuthenticated;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
