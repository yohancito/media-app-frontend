import { UsuarioRolService } from './../../../_service/usuario-rol.service';
import { RolService } from './../../../_service/rol.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Rol } from '../../../_model/rol';
import { MatSnackBar } from '@angular/material';
import { UsuarioService } from '../../../_service/usuario.service';
@Component({
  selector: 'app-usuario-rol-asignar',
  templateUrl: './usuario-rol-asignar.component.html',
  styleUrls: ['./usuario-rol-asignar.component.css']
})
export class UsuarioRolAsignarComponent implements OnInit {

   id: number;
  form: FormGroup;
  rolesActuales: Rol[] = [];
  allRoles: Rol[] = [];
  rol: Rol;
  constructor(
    private usuarioRolService: UsuarioRolService,
    private usuarioService: UsuarioService,
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
      idUsuario: [null],
      username: [null],
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
    this.usuarioService.listarPorId(this.id).subscribe(data => {
      this.form.patchValue({ idUsuario: data.idUsuario, username: data.username });
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
     this.usuarioRolService.registrar(this.form.value).subscribe(data => {
      this.snackBar.open('Se Registro correctamente', 'Aviso', { duration: 2000 });
    });
    this.router.navigate(['usuario-rol']);
  }
}