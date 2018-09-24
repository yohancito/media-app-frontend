
import { SignosEdicionComponent } from './pages/signos/signos-edicion/signos-edicion.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { TokenComponent } from './login/recuperar/token/token.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { BuscarComponent } from './pages/consulta/buscar/buscar.component';
import { GuardService } from './_service/guard.service';
import { LoginComponent } from './login/login.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { Not403Component } from './pages/not403/not403.component';
import { SignosComponent } from './pages/signos/signos.component';
import { MenuComponent } from './pages/menu/menu.component';
import { UsuarioRolComponent } from './pages/usuario-rol/usuario-rol.component';
import { MenuRolAsignarComponent } from './pages/menu-rol/menu-rol-asignar/menu-rol-asignar.component';
import { UsuarioRolAsignarComponent } from './pages/usuario-rol/usuario-rol-asignar/usuario-rol-asignar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { MenuEdicionComponent } from './pages/menu/menu-edicion/menu-edicion.component';
import { MenuRolComponent } from './pages/menu-rol/menu-rol.component';
import { RolComponent } from './pages/rol/rol.component';

const routes: Routes = [
  { path: 'not-403', component: Not403Component },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  { path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService] },
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent },
    ], canActivate: [GuardService]
  },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'signos', component: SignosComponent, children: [
      { path: 'nuevo', component: SignosEdicionComponent },
      { path: 'edicion/:id', component: SignosEdicionComponent },
    ], canActivate: [GuardService]
  },
  { path: 'perfil', component: PerfilComponent, canActivate: [GuardService] },
  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'nuevo', component: MenuEdicionComponent },
      { path: 'edicion/:id', component: MenuEdicionComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'roles', component: RolComponent, children: [
      { path: 'nuevo', component: RolEdicionComponent },
      { path: 'edicion/:id', component: RolEdicionComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'menu-rol', component: MenuRolComponent, children: [
      { path: 'nuevo', component: MenuRolAsignarComponent },
      { path: 'edicion/:id', component: MenuRolAsignarComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'usuario-rol', component: UsuarioRolComponent, children: [
      { path: 'nuevo', component: UsuarioRolAsignarComponent },
      { path: 'edicion/:id', component: UsuarioRolAsignarComponent },
    ], canActivate: [GuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }