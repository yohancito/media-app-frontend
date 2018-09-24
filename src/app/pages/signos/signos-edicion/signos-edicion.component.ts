import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignosService } from '../../../_service/signos.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Paciente } from '../../../_model/paciente';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PacienteService } from '../../../_service/paciente.service';
import { MatDialog } from '@angular/material';
import { PacienteDialogoComponent } from './paciente-dialogo/paciente-dialogo.component';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  id: number;
  pacientes: Paciente[] = [];
  form: FormGroup;
  edicion: boolean = false;
  maxFecha: Date = new Date();
  myControlPaciente: FormControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(
    private signosService: SignosService,
    private pacienteService: PacienteService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listarPacientes();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
    this.filteredOptions = this.myControlPaciente.valueChanges
      .pipe(
        startWith(null),
        map(val => this.filter(val))
      );

    this.pacienteService.pacienteDialogCambio.subscribe(data => {
      this.form.patchValue({ paciente: data });
      this.listarPacientes();
    });
  }

  initFormBuilder() {
    this.form = this.builder.group({
      idSignos: new FormControl(0),
      paciente: this.myControlPaciente,
      fecha: new FormControl(new Date(), [Validators.required]),
      temperatura: new FormControl('', [Validators.required]),
      pulso: new FormControl('', [Validators.required]),
      ritmoCardiaco: new FormControl('', [Validators.required])
    });
  }

  filter(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }

  seleccionarPaciente(e) {

  }

  displayFn(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }


  listarPacientes() {
    this.pacienteService.listarPacientes().subscribe(data => {
      this.pacientes = data;
    });
  }

  private initForm() {
    if (this.edicion) {
      this.signosService.listarSignosPorId(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  operar() {
    if (this.edicion) {
      //update
      this.signosService.modificar(this.form.value).subscribe(data => {
        this.signosService.listarSignos().subscribe(pacientes => {
          this.signosService.signosCambio.next(pacientes);
          this.signosService.mensaje.next('Signo correctamente modificado');
        });
      });
    } else {
      //insert
      this.signosService.registrar(this.form.value).subscribe(data => {
        this.signosService.listarSignos().subscribe(pacientes => {
          this.signosService.signosCambio.next(pacientes);
          this.signosService.mensaje.next('Signo correctamente insertado');
        });
      });
    }

    this.router.navigate(['signos'])
  }

  NuevoPaciente() {
    let paciente = new Paciente();
    let dialogRef = this.dialog.open(PacienteDialogoComponent, {
      width: '250px',
      disableClose: true,
      data: paciente
    });
  }
}
