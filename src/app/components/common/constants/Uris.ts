import { environment } from "@app/environments/environment";

const BASE = {
  base: environment.base
};

export const URIS = {
    login: BASE.base + 'backoffice/authentication',
    parametrias: {
                  getPermissionsUser: BASE.base + 'resources/permissions/usuarios'
                 }
};