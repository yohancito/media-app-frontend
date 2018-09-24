import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../_service/menu.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-menu-rol',
  templateUrl: './menu-rol.component.html',
  styleUrls: ['./menu-rol.component.css']
})
export class MenuRolComponent implements OnInit {

  lista: any[] = [];
  displayedColumns = ['icono', 'nombre', 'url', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private menuService: MenuService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.menuService.listarPageable(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.menuService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    });
  }
}