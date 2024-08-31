import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaGeneralComponent } from './vista-general/vista-general.component';
import { CrearActualizarComponent } from './crear-actualizar/crear-actualizar.component';
import { VistaComponent } from './vista/vista.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'vista-general', 
    component: VistaGeneralComponent, 
    canActivate: [authGuard]  // Protegido con authGuard
  },
  { 
    path: 'vista/:id', 
    component: VistaComponent, 
    canActivate: [authGuard]  
  },
  { 
    path: 'crear', 
    component: CrearActualizarComponent, 
    canActivate: [authGuard]  
  }, 
  {
    path: 'actualizar/:id', 
    component: CrearActualizarComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
