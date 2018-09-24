import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from './../../_model/paciente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  lista: Paciente[] = [];
  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Paciente>;
  cantidad : number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pacienteService: PacienteService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.pacienteService.pacienteCambio.subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.pacienteService.mensaje.subscribe(data => {        
        this.snackBar.open(data, 'Aviso', { duration: 2000 });
      });      
    });

    /*this.pacienteService.listarPacientes().subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/
    this.pacienteService.listarPacientesPageable(0, 10).subscribe(data => {
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(pacientes);
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idPaciente: number) {
    this.pacienteService.eliminar(idPaciente).subscribe(data => {
      this.pacienteService.listarPacientes().subscribe(data => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    );
  }

  mostrarMas(e: any){
    console.log(e);
    this.pacienteService.listarPacientesPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource= new MatTableDataSource(pacientes);
      
      this.dataSource.sort = this.sort;
      
    });
  }
}
