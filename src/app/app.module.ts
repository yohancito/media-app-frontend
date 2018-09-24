import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { SignosComponent } from './pages/signos/signos.component';
import { SignosEdicionComponent } from './pages/signos/signos-edicion/signos-edicion.component';
import { PacienteDialogoComponent } from './pages/signos/signos-edicion/paciente-dialogo/paciente-dialogo.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RolComponent } from './pages/rol/rol.component';
import { MenuRolComponent } from './pages/menu-rol/menu-rol.component';
import { UsuarioRolComponent } from './pages/usuario-rol/usuario-rol.component';
import { MenuEdicionComponent } from './pages/menu/menu-edicion/menu-edicion.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { MenuRolAsignarComponent } from './pages/menu-rol/menu-rol-asignar/menu-rol-asignar.component';
import { UsuarioRolAsignarComponent } from './pages/usuario-rol/usuario-rol-asignar/usuario-rol-asignar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { Not403Component } from './pages/not403/not403.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { DialogoComponent } from './pages/medico/dialogo/dialogo.component';
import { LoginComponent } from './login/login.component';
import { BuscarComponent } from './pages/consulta/buscar/buscar.component';
import { DialogoDetalleComponent } from './pages/consulta/buscar/dialogo-detalle/dialogo-detalle.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    ConsultaComponent,
    EspecialidadComponent,
    ExamenComponent,
    MedicoComponent,
    Not403Component,
    EspecialidadEdicionComponent,
    ExamenEdicionComponent,
    DialogoComponent,
    LoginComponent,
    BuscarComponent,
    DialogoDetalleComponent,
    ReporteComponent,
    RecuperarComponent,
    TokenComponent,
    EspecialComponent,
    SignosComponent,
    SignosEdicionComponent,
    PacienteDialogoComponent,
    MenuComponent,
    RolComponent,
    MenuRolComponent,
    UsuarioRolComponent,
    MenuEdicionComponent,
    RolEdicionComponent,
    MenuRolAsignarComponent,
    UsuarioRolAsignarComponent,
    PerfilComponent,
  ],
  entryComponents: [DialogoComponent, DialogoDetalleComponent,PacienteDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorsInterceptor,
    multi: true,
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }