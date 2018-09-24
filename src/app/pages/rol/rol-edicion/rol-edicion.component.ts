import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RolService } from '../../../_service/rol.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-rol-edicion',
  templateUrl: './rol-edicion.component.html',
  styleUrls: ['./rol-edicion.component.css']
})
export class RolEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

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
      idRol: [null],
      nombre: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
      descripcion: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataForm() {
    if (this.edicion) {
      this.rolService.listarPorId(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.edicion) {
      //update
      this.rolService.modificar(this.form.value).subscribe(data => {
        this.rolService.listarPageable(0, 10).subscribe(r => {
          this.rolService.rolCambio.next(r);
          this.rolService.mensaje.next('Se modificó');
        });
      });
    } else {
      //insert
      this.rolService.registrar(this.form.value).subscribe(data => {
        this.rolService.listarPageable(0, 10).subscribe(r => {
          this.rolService.rolCambio.next(r);
          this.rolService.mensaje.next('Se registró');
        });
      });
    }
    this.router.navigate(['roles'])
  }
}
