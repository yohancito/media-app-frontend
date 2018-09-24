import { RolService } from './../../../_service/rol.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MenuRolService } from '../../../_service/menu-rol.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Rol } from '../../../_model/rol';
import { MatSnackBar } from '@angular/material';
import { MenuService } from '../../../_service/menu.service';

@Component({
  selector: 'app-menu-rol-asignar',
  templateUrl: './menu-rol-asignar.component.html',
  styleUrls: ['./menu-rol-asignar.component.css']
})
export class MenuRolAsignarComponent implements OnInit {
  id: number;
  form: FormGroup;
  rolesActuales: Rol[] = [];
  allRoles: Rol[] = [];
  rol: Rol;
  constructor(
    private menuRolService: MenuRolService,
    private menuService: MenuService,
    private rolService: RolService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.loadDataForm();
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      idMenu: [null],
      nombre: [null],
      rol: [null],
      roles: this.formBuilder.array([], Validators.compose([]))
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idRol: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.maxLength(20)])]
    });
    this.roles.push(formGroup);
    return formGroup;
  }

  removeDetalleFormControl(index) {
    this.roles.removeAt(index);
  }

  private loadDataForm() {
    this.menuService.listarPorId(this.id).subscribe(data => {
      this.form.patchValue({ idMenu: data.idMenu, nombre: data.nombre });
      this.rolesActuales = data.roles;
    });
    this.rolService.listar().subscribe(data => {
      this.allRoles = data;
    });
  }

  changeRol(data) {
    this.rol = data;
  }

  agregar() {
    if (this.rol) {
      const localRol = this.rolesActuales.find(r => r.idRol === this.rol.idRol);
      if (!localRol) {
        const addRol = this.roles.controls.find(r => r.value.idRol === this.rol.idRol);
        if (!addRol) {
          const formGroup = this.addDetalleFormControl();
          formGroup.patchValue(this.rol);
          this.rol = null;
          this.form.patchValue({ rol: null });
        } else {
          this.snackBar.open('El Rol seleccionado ya fue asignado', 'Aviso', { duration: 2000 });
        }
      } else {
        this.snackBar.open('El Rol seleccionado ya fue asignado', 'Aviso', { duration: 2000 });
      }
    } else {
      this.snackBar.open('Seleccione un rol para agregar', 'Aviso', { duration: 2000 });
    }
  }

  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  save() {
     this.menuRolService.registrar(this.form.value).subscribe(data => {
      this.snackBar.open('Se Registro correctamente', 'Aviso', { duration: 2000 });
    });
    this.router.navigate(['menu-rol']);
  }
}
