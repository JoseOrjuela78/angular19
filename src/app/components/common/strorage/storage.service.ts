import { Injectable } from '@angular/core';
import { Isession } from '@app/components/auth/models/session.Model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private rol = 'rol';
  private nombreUsuario = 'nombreUsuario';
  private token = 'token';
  private menu = 'menu';
  private permisos = 'permissions';
  private status = 'status';
  private permisosUsuario = 'permissionsUser';

    /**
   * Metodo encargado de cargar en el sessionStorage los datos que llegan del servicio.
   *
   * @param {*} data response del servicio.
   * @memberof Storage
   */
  async cargarSesion(data:Isession):Promise<number> {
    try {
        sessionStorage.setItem(this.rol, String(data.rol));
        sessionStorage.setItem(this.nombreUsuario, data.nameUser);
        sessionStorage.setItem(this.token, data.token);
        sessionStorage.setItem(this.menu, JSON.stringify(data.menu));
        sessionStorage.setItem(this.status, JSON.stringify(data.status));
        return 200

    } catch (error) {

        return 500
    }

 };

  /**
   * Metodo encargado de cargar en el sessionStorage los permisos de usuario individuales.
   *
   * @param {*} data response del servicio.
   * @memberof Storage
   */
  async cargarPermisosUsuario(data:any[]):Promise<number> {
    try {
        sessionStorage.setItem(this.permisosUsuario, JSON.stringify(data));
        return 200
    } catch (error) {
        return 500
    }
    
  };

   /**
   * Metodo encargado de eliminar los datos del sessionStorage al cerral la sesion.
   *
   * @memberof Storage
   */
  async cerraSesion():Promise<number> {

    try {

        sessionStorage.removeItem(this.rol);
        sessionStorage.removeItem(this.nombreUsuario);
        sessionStorage.removeItem(this.token);
        sessionStorage.removeItem(this.menu);
        sessionStorage.removeItem(this.permisosUsuario);
        sessionStorage.removeItem(this.permisos);
        sessionStorage.removeItem(this.status);
        return 200
        
    } catch (error) {
        
        return 500
        
    }

  };

  /**
   * Metodo encargado de cargar en sessionStorage un arreglo con los permisos de las vistas.
   *
   * @memberof Storage
   */

 async cargarPermisos(): Promise<number> {
    try {
   
    const permisos = [];
    const menus = await this.getMenu();

    if (menus.length > 0){

      for (const menu of menus ) {
      const permiso = {
        parentId: 0,
        permissionsId: 0
      };
      permiso.parentId = menu.idParentMenu;
      permiso.permissionsId = menu.typeOfPermit;
      permisos.push(permiso);
    }
        
    sessionStorage.setItem(this.permisos, JSON.stringify(permisos));
    return 200

    };

    return 201

    } catch (error) {

    return 500
        
    }
  }

  /**
   * Metodo encargado de retornar el token del usuario actual
   *
   * @returns
   * @memberof Storage
   */
  async getToken():Promise<string> {

    try {
        return sessionStorage.getItem(this.token) ? String(sessionStorage.getItem(this.token)) : '';
    } catch (error) {
        return ''
    }
    
  };

  /**
   * Metodo encargado de retornar el rol del usuario actual
   *
   * @returns
   * @memberof Storage
   */
  async getRol(): Promise<number> {
    
    try {
        return sessionStorage.getItem(this.rol)? Number(sessionStorage.getItem(this.rol)):0;
    } catch (error) {
        return 0
    }
  };

  /**
   * Metodo encargado de retornar el nombre del usuario actual
   *
   * @returns
   * @memberof Storage
   */
 async getNombreUsuario():Promise<string> {
    
    try {
        return sessionStorage.getItem(this.nombreUsuario)? String(sessionStorage.getItem(this.nombreUsuario)):'';
    } catch (error) {
        return ''
    }
  };

  /**
   * Metodo encargado de retornar el menu como un objeto para ser
   * manejado en la vista correspondiente.
   *
   * @returns
   * @memberof Storage
   */
 async getMenu(): Promise<any[]> {
    try {
        return sessionStorage.getItem(this.menu)?JSON.parse(String(sessionStorage.getItem(this.menu))):[];
    } catch (error) {
    return []    
    }
    
  };

  /**
   * Metodo encargado de retornar los permisos de las vistas para el usuario actual.
   *
   * @returns
   * @memberof Storage
   */
  async getPermissions(): Promise<any[]> {

    try {
        return sessionStorage.getItem(this.permisos)? JSON.parse(String(sessionStorage.getItem(this.permisos))):[];
    } catch (error) {
        return []
    }
  }

  /**
   * Metodo encargado de retornar los permisos individuales del usuario.
   *
   * @returns
   * @memberof Storage
   */
  async getPermissionsUser(): Promise<any[]>{

    try {
        return sessionStorage.getItem(this.permisosUsuario)?JSON.parse(String(sessionStorage.getItem(this.permisosUsuario))):[];    
    } catch (error) {
        return [];
    }
  };

  /**
   * Metodo encargado de retornar el estado del inicio de sesión
   *
   * @returns
   * @memberof Storage
   */
 async getStatus(): Promise<number> {
    try {
        return sessionStorage.getItem(this.status)? Number(sessionStorage.getItem(this.status)):0;
    } catch (error) {
        return 0
    }
    
  };
}