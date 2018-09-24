import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME, MICRO_CRUD } from './../_shared/var.constant';
import { Medico } from './../_model/medico';
import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicosCambio = new Subject<Medico[]>();
  mensaje = new Subject<string>();  
  url: string = `${HOST}/medicos`;
  //url: string = `${HOST}/${MICRO_CRUD}/medicos`;

  constructor(private http: HttpClient) { }

  listarMedicos(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Medico[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarMedicoPorId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Medico>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(medico: Medico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, medico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(medico: Medico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, medico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
