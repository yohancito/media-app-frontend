import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paciente } from '../../../../_model/paciente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacienteService } from '../../../../_service/paciente.service';

@Component({
  selector: 'app-paciente-dialogo',
  templateUrl: './paciente-dialogo.component.html',
  styleUrls: ['./paciente-dialogo.component.css']
})
export class PacienteDialogoComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PacienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente,
    private pacienteService: PacienteService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null],
      nombres: [null, Validators.compose([Validators.required])],
      apellidos: [null, Validators.compose([Validators.required])],
      dni: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      telefono: [null, Validators.compose([Validators.required])]
    });
  }

  save(){
    this.pacienteService.registrarDialog(this.form.value).subscribe(data => {      
      this.pacienteService.pacienteDialogCambio.next(data);     
      this.dialogRef.close();
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
