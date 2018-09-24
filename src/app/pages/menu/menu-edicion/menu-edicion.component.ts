import { MenuService } from './../../../_service/menu.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-menu-edicion',
  templateUrl: './menu-edicion.component.html',
  styleUrls: ['./menu-edicion.component.css']
})
export class MenuEdicionComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataForm();
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      idMenu: [null],
      nombre: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
      icono: [null, Validators.compose([Validators.required])],
      url: [null, Validators.compose([Validators.required, Validators.maxLength(20)])]
    });
  }

  private loadDataForm() {
    if (this.edicion) {
      this.menuService.listarPorId(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.edicion) {
      //update
      this.menuService.modificar(this.form.value).subscribe(data => {
        this.menuService.listarPageable(0, 10).subscribe(r => {
          this.menuService.menuEdicionCambio.next(r);
          this.menuService.mensaje.next('Se modificó');
        });
      });
    } else {
      //insert
      this.menuService.registrar(this.form.value).subscribe(data => {
        this.menuService.listarPageable(0, 10).subscribe(r => {
          this.menuService.menuEdicionCambio.next(r);
          this.menuService.mensaje.next('Se registró');
        });
      });
    }

    this.router.navigate(['menu']);
  }
}
