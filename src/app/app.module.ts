import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { errorInterceptor } from './error.interceptor';
import { VistaGeneralComponent } from './vista-general/vista-general.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrearActualizarComponent } from './crear-actualizar/crear-actualizar.component';
import { InputTextModule } from 'primeng/inputtext'; 
import { DropdownModule } from 'primeng/dropdown'; 
import { ButtonModule } from 'primeng/button';  
import { ReactiveFormsModule } from '@angular/forms';
import { VistaComponent } from './vista/vista.component';
import { CreadoPorPipe } from './pipes/creado-por.pipe';
import { TiempoDesdeActualizacionPipe } from './pipes/tiempo-desde-actualizacion.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { TipoPokemonPipe } from './pipes/TipoPokemonPipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    VistaGeneralComponent,
    NavbarComponent,
    CrearActualizarComponent,
    VistaComponent,
    TiempoDesdeActualizacionPipe,
    CreadoPorPipe,
    TipoPokemonPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([errorInterceptor])), 
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }