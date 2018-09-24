import { SignosService } from './../../_service/signos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  lista: any[] = [];
  displayedColumns = ['paciente.dni','paciente.nombres','paciente.telefono', 'fecha', 'temperatura', 'pulso', 'ritmoCardiaco', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad : number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private signosService: SignosService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signosService.signosCambio.subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.signosService.mensaje.subscribe(data => {        
        this.snackBar.open(data, 'Aviso', { duration: 2000 });
      });      
    });
    
    this.signosService.listarSignosPageable(0, 10).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(id: number) {
    this.signosService.eliminar(id).subscribe(data => {
      this.signosService.listarSignos().subscribe(data => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    );
  }

  mostrarMas(e: any){
    this.signosService.listarSignosPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource= new MatTableDataSource(signos);      
      this.dataSource.sort = this.sort;      
    });
  }
}
