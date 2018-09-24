import { HOST, TOKEN_NAME } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Perfil } from '../_model/perfil';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url: string = `${HOST}/usuarios`;
  //url: string = `${HOST}/${MICRO_CR}/consultas`;
  perfilCambio = new Subject<Perfil>();

  constructor(private http: HttpClient) { }

  buscar() {    
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Perfil>(`${this.url}/user`, {}, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  } 

}
