import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Plato } from 'src/app/interfaces/plato';
import { AgregarEditarPlatoComponent } from '../agregar-editar-plato/agregar-editar-plato.component';
import { PlatoService } from 'src/app/services/platos.service';

@Component({
  selector: 'app-list-platos',
  templateUrl: './list-platos.component.html',
  styleUrls: ['./list-platos.component.scss']
})
export class ListPlatosComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['nombre', 'descripcion', 'categoriaId',  'img', 'estado',  'precio', 'acciones'];
  dataSource: MatTableDataSource<Plato>;

  listPlatos: Plato[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private platoService: PlatoService,private _snackBar: MatSnackBar,) { 
    this.dataSource = new MatTableDataSource(this.listPlatos);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerPlatos();
    
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

  obtenerNombrePlatoById(id:any){
    let nombre:string = '';
    this.platoService.obtenerPlato(id).subscribe(
      (res:any) => {
        nombre = res.nombre;
        }
        );
        return nombre;
  }

  addEditPlato(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarPlatoComponent, {
      width: '550px', 
      disableClose: true,
      data: { id: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.obtenerPlatos();
      
    });
  }

  obtenerPlatos(){

    this.platoService.getPlatos().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }

  eliminarPlato(id: any){
    this.platoService.eliminarPlato(id).subscribe(data =>{
      this.obtenerPlatos();
    }, error => {
      console.log(error);
    })

   


    setTimeout(() => {
      this.platoService.eliminarPlato(id).subscribe(() => {
        this.obtenerPlatos();
        this.mensajeExito();
      })
    }, 1000);

    
  }
  
  mensajeExito() {
    this._snackBar.open('El plato fue eliminad con exito', '', {
      duration: 2000
    });
  }



}