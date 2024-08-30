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
  { path: 'vista-general', component: VistaGeneralComponent },
  { path: 'vista/:id', component: VistaComponent},
  { path: 'crear', component: CrearActualizarComponent }, 
  {path: 'actualizar/:id', component: CrearActualizarComponent},
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
