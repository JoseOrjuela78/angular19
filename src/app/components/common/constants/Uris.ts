import { environment } from "@app/environments/environment";

const BASE = {
  base: environment.base
};

export const URIS = {
    login: BASE.base + 'backoffice/authentication',
    logout: BASE.base + 'backoffice/logout',
    parametrias: {
                  getPermissionsUser: BASE.base + 'resources/permissions/usuarios'
                 },
    usuarios: {
              cambiarContrasena: BASE.base + 'backoffice/user/password/change'
              }
};