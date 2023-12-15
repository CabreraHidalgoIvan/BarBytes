import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarEditarPedidoComponent } from '../agregar-editar-pedido/agregar-editar-pedido.component';
import { ListPlatosComponent } from '../list-platos/list-platos.component';
import { PedidoService } from 'src/app/services/pedido.service';
import { PlatoService } from 'src/app/services/platos.service';
import { Pedido } from 'src/app/interfaces/pedido';


@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.scss']
})
export class ListPedidosComponent {
  displayedColumns: string[] = ['estado_pedido', 'lista_platos_ordenados', 'comentarios', 'precioTotal', 'mesa', 'hora_pedido', 'fecha_pedido', 'acciones'];
  dataSource: MatTableDataSource<Pedido>;

  listPlatos: Pedido[] = [];
  precioTotal: number=0;
  precio:number=0;
  // listaPlatosOrdenados: string[] =[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private pedidoService: PedidoService, private platoService: PlatoService,private _snackBar: MatSnackBar,) { 
    this.dataSource = new MatTableDataSource(this.listPlatos);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerPedidos();
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

  addEditPedido(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarPedidoComponent, {
      width: '550px', 
      disableClose: true,
      data: { id: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.obtenerPedidos();
      
    });
  }

  

  obtenerPedidos(){
    this.pedidoService.getPedidos().subscribe(data => {
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      //bucle que coja las id de lista_platos_ordenados y los transforme en nombres
      for (let i = 0; i < data.length; i++) {
        let precioPlato: number = 0;
        for (let j = 0; j < data[i].lista_platos_ordenados.length;j++){
          // data[i].precioTotal = (data[i].precioTotal || 0) + data[i].lista_platos_ordenados[i].precio; 
          precioPlato = precioPlato + data[i].lista_platos_ordenados[j].precio;
        }  
        data[i].precioTotal = precioPlato;
      }

      
      
      this.dataSource.data = data;
      
    })
  }

  eliminarPedido(id: any){
    this.pedidoService.eliminarPedido(id).subscribe(data =>{
      this.obtenerPedidos();
    }, error => {
      console.log(error);
    })


    setTimeout(() => {
      this.pedidoService.eliminarPedido(id).subscribe(() => {
        this.obtenerPedidos();
        this.mensajeExito();
      })
    }, 1000);

    
  }
  
  mensajeExito() {
    this._snackBar.open('El pedido fue eliminado con exito', '', {
      duration: 2000
    });
  }
}
