import { PacienteService } from './../../../_service/paciente.service';
import { Paciente } from './../../../_model/paciente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  id: number;
  paciente: Paciente;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private pacienteService: PacienteService, private route: ActivatedRoute, private router: Router) {
    this.paciente = new Paciente();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      'apellidos': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      'dni': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'direccion': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      'telefono': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.edicion) {
      this.pacienteService.listarPacientePorId(this.id).subscribe(data => {
        let id = data.idPaciente;
        let nombres = data.nombres;
        let apellidos = data.apellidos;
        let dni = data.dni;
        let direccion = data.direccion;
        let telefono = data.telefono;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombres': new FormControl(nombres),
          'apellidos': new FormControl(apellidos),
          'dni': new FormControl(dni),
          'direccion': new FormControl(direccion),
          'telefono': new FormControl(telefono)
        });
      });
    }
  }

  operar() {
    this.paciente.idPaciente = this.form.value['id'];
    this.paciente.nombres = this.form.value['nombres'];
    this.paciente.apellidos = this.form.value['apellidos'];
    this.paciente.dni = this.form.value['dni'];
    this.paciente.direccion = this.form.value['direccion'];
    this.paciente.telefono = this.form.value['telefono'];

    if (this.edicion) {
      //update
      this.pacienteService.modificar(this.paciente).subscribe(data => {
        this.pacienteService.listarPacientes().subscribe(pacientes => {
          this.pacienteService.pacienteCambio.next(pacientes);
          this.pacienteService.mensaje.next('Se modificó');
        });
      });
    } else {
      //insert
      this.pacienteService.registrar(this.paciente).subscribe(data => {
        this.pacienteService.listarPacientes().subscribe(pacientes => {
          this.pacienteService.pacienteCambio.next(pacientes);
          this.pacienteService.mensaje.next('Se registró');
        });
      });
    }

    this.router.navigate(['paciente'])
  }

}
