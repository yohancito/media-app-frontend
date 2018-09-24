import { ConsultaListaExamen } from './../../_model/consultaListaExamen';
import { ExamenService } from './../../_service/examen.service';
import { MatSnackBar } from '@angular/material';
import { DetalleConsulta } from './../../_model/detalleConsulta';
import { MedicoService } from './../../_service/medico.service';
import { EspecialidadService } from './../../_service/especialidad.service';
import { PacienteService } from './../../_service/paciente.service';
import { Consulta } from './../../_model/consulta';
import { Examen } from './../../_model/examen';
import { Medico } from './../../_model/medico';
import { Especialidad } from './../../_model/especialidad';
import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../_model/paciente';
import { ConsultaService } from '../../_service/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  consulta: Consulta;
  examenes: Examen[] = [];

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];

  diagnostico: string;
  tratamiento: string;
  idPacienteSeleccionado: number;
  idEspecialidadSeleccionado: number;
  idMedicoSeleccionado: number;
  idExamenSeleccionado: number;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  mensaje: string;

  constructor(private pacienteService: PacienteService, private medicoService: MedicoService, private examenService: ExamenService,
    private especialidadService: EspecialidadService, public snackBar: MatSnackBar, private consultaService: ConsultaService) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecilidad();
    this.listarMedicos();
    this.listarExamenes();
  }

  listarPacientes() {
    this.pacienteService.listarPacientes().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecilidad() {
    this.especialidadService.listarEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  listarMedicos() {
    this.medicoService.listarMedicos().subscribe(data => {
      this.medicos = data;
    });
  }

  listarExamenes() {
    this.examenService.listarExamenes().subscribe(data => {
      this.examenes = data;
    });
  }

  agregar() {    
    if (this.diagnostico != null && this.tratamiento != null) {      
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  agregarExamen() {
    if (this.idExamenSeleccionado > 0) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.idExamenSeleccionado) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        let examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;
        this.examenService.listarExamenPorId(this.idExamenSeleccionado).subscribe(data => {
          examen.nombre = data.nombre;
          this.examenesSeleccionados.push(examen);
        });
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  aceptar() {
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    this.consulta = new Consulta();
    this.consulta.especialidad = especialidad;
    this.consulta.paciente = paciente;
    this.consulta.medico = medico;
    this.consulta.detalleConsulta = this.detalleConsulta;
    //https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
    var tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.consulta.fecha = localISOTime;

    let consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = this.consulta;
    consultaListaExamen.lstExamen = this.examenesSeleccionados;

    console.log(consultaListaExamen);

    this.consultaService.registrar(consultaListaExamen).subscribe(data => {

      console.log(data);
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });
    });

    setTimeout(() => {
      this.limpiarControles();
    }, 2000);
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
    this.consulta = new Consulta();
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 || this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0);
  }
}
