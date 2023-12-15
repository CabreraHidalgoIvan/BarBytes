import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['nombre', 'psw', 'email', 'rol', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;

  listUsuarios: Usuario[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private _usuarioService: UsuarioService,private _snackBar: MatSnackBar,) { 
    this.dataSource = new MatTableDataSource(this.listUsuarios);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
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

  addEditPersona(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '550px', 
      disableClose: true,
      data: { id: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.obtenerUsuarios();
      
    });
  }

  obtenerUsuarios(){

    this._usuarioService.getUsuarios().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarUsuario(id: any){
    this._usuarioService.eliminarUsuario(id).subscribe(data =>{
      this.obtenerUsuarios();
    }, error => {
      console.log(error);
    })


    setTimeout(() => {
      this._usuarioService.eliminarUsuario(id).subscribe(() => {
        this.obtenerUsuarios();
        this.mensajeExito();
      })
    }, 1000);

    
  }
  
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }



}