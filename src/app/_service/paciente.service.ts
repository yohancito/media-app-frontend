import { Paciente } from './../_model/paciente';
import { HOST, TOKEN_NAME, MICRO_CRUD } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs'; //cambio!


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteDialogCambio= new Subject<any>();
  pacienteCambio = new Subject<Paciente[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/pacientes`
  //url: string = `${HOST}/${MICRO_CRUD}/pacientes`;

  constructor(private http: HttpClient) { }

  listarPacientes() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Paciente[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPacientesPageable(p: number, s: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Paciente[]>(`${this.url}/pageable?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPacientePorId(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Paciente>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarDialog(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/registrar-dialog`, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
