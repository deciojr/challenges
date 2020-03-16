import { Routes } from '../shared/interface/routes.inteface';

export const authenticationRoutes: Routes = {
  prefix: 'auth',
  swaggerTag: 'Authentication',
  paths: {
    login: 'login',
  },
};
