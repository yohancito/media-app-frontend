import { ConsultaResumen } from './../_model/consultaResumen';
import { FiltroConsulta } from './../_model/filtroConsulta';
import { ConsultaListaExamen } from './../_model/consultaListaExamen';
import { Consulta } from './../_model/consulta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME, MICRO_CR } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: string = `${HOST}/consultas`;
  //url: string = `${HOST}/${MICRO_CR}/consultas`;

  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamen) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, consultaDTO, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  buscar(filtroConsulta: FiltroConsulta) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarResumen() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<ConsultaResumen[]>(`${this.url}/listarResumen`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  generarReporte() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  guardarArchivo(data: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', data);

    let paciente = new Paciente();
    paciente.nombres = "Jaime";
    paciente.apellidos = 'MitoCode';
    paciente.dni = "72301258";

    //https://stackoverflow.com/questions/43064548/uploading-file-with-other-form-fields-in-angular-2-and-spring-mvc
    const userBlob = new Blob([JSON.stringify(paciente)], { type: "application/json" });
    formdata.append('paciente', userBlob);

    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.post(`${this.url}/guardarArchivo`, formdata, {
      responseType: 'text',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
    });
  }

  leerArchivo() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
