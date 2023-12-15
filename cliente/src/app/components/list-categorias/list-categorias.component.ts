import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/interfaces/categoria';
import { AgregarEditarCategoriaComponent } from '../agregar-editar-categoria/agregar-editar-categoria.component';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.scss']
})
export class ListCategoriasComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'img', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Categoria>;

  listPlatos: Categoria[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private categoriaService: CategoriaService,private _snackBar: MatSnackBar,) { 
    this.dataSource = new MatTableDataSource(this.listPlatos);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditCategoria(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarCategoriaComponent, {
      width: '550px', 
      disableClose: true,
      data: { id: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.obtenerCategorias();
      
    });
  }

  obtenerCategorias(){

    this.categoriaService.getCategorias().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarCategorias(id: any){
    this.categoriaService.eliminarCategoria(id).subscribe(data =>{
      this.obtenerCategorias();
    }, error => {
      console.log(error);
    })


    setTimeout(() => {
      this.categoriaService.eliminarCategoria(id).subscribe(() => {
        this.obtenerCategorias();
        this.mensajeExito();
      })
    }, 1000);

    
  }
  
  mensajeExito() {
    this._snackBar.open('La categoria fue eliminada con exito', '', {
      duration: 2000
    });
  }
}
