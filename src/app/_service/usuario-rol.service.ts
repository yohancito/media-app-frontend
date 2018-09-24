import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME, MICRO_CR } from './../_shared/var.constant';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  private url: string = `${HOST}/usuarios`;
  //private url: string = `${HOST}/${MICRO_CR}`;
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  registrar(data: any) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/rol`, data, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
