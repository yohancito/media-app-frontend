import { UsuarioService } from './../../_service/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.css']
})
export class UsuarioRolComponent implements OnInit {
  lista: any[] = [];
  displayedColumns = ['username','enabled', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.usuarioService.usuarioCambio.subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.usuarioService.mensaje.subscribe(data => {        
        this.snackBar.open(data, 'Aviso', { duration: 2000 });
      });      
    });

    this.usuarioService.listarPageable(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.usuarioService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    });
  }
}
