import { HOST, TOKEN_NAME, MICRO_CRUD } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs'; //cambio!

@Injectable({
  providedIn: 'root'
})
export class SignosService {

  signosCambio = new Subject<any[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/signos`
  //url: string = `${HOST}/${MICRO_CRUD}/signos`;

  constructor(private http: HttpClient) { }

  listarSignos() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<any[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarSignosPageable(p: number, s: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<any[]>(`${this.url}/pageable?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarSignosPorId(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<any>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(signo: any) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, signo, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(signo: any) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, signo, {
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
