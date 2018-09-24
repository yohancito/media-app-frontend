import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME, MICRO_CR } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Rol } from '../_model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = `${HOST}/roles`;
  //private url: string = `${HOST}/${MICRO_CR}`;
  rolCambio = new Subject<Rol[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Rol[]>(`${this.url}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPageable(p: number, s: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<any[]>(`${this.url}/pageable?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorId(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<any>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(data: any) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, data, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(data: any) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, data, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
