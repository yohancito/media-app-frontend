import { MenuService } from './../_service/menu.service';
import { TOKEN_NAME } from './../_shared/var.constant';
import { Router } from '@angular/router';
import { LoginService } from './../_service/login.service';
import { Component, OnInit } from '@angular/core';
import * as decode from 'jwt-decode';
import '../login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string = "";
  error: string = "";
  
  constructor(private loginService: LoginService, private menuService: MenuService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      //console.log(data);
      if (data) {
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);

        let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        const decodedToken = decode(tk.access_token);
        //console.log(decodedToken);

        this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
          this.menuService.menuCambio.next(data);
        });

        //console.log(decodedToken.authorities);
        let roles = decodedToken.authorities;
        for (let i = 0; roles.length; i++) {
          let rol = roles[i];
          if (rol === 'ADMIN') {
            this.router.navigate(['consulta']);
            break;
          } else {
            this.router.navigate(['paciente']);
            break;
          }
        }

      }
    });
  }

}
