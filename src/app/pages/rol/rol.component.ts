import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from '../../_service/rol.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  lista: any[] = [];
  displayedColumns = ['nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private rolService: RolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.rolService.rolCambio.subscribe(data => {
      this.lista = JSON.parse(JSON.stringify(data)).content;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.rolService.mensaje.subscribe(data => {        
        this.snackBar.open(data, 'Aviso', { duration: 2000 });
      });      
    });

    this.rolService.listarPageable(this.pageIndex, this.pageSize).subscribe(data => {
      let r = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    })
  }

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  mostrarMas(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.rolService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    });
  }
}
