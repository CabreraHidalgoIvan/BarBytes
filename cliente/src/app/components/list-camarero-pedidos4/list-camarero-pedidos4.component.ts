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
import { UsuarioService } from 'src/app/services/usuario.service';
import { Pedido } from 'src/app/interfaces/pedido';

@Component({
  selector: 'app-list-camarero-pedidos4',
  templateUrl: './list-camarero-pedidos4.component.html',
  styleUrls: ['./list-camarero-pedidos4.component.scss']
})
export class ListCamareroPedidos4Component {

  displayedColumns: string[] = ['estado_pedido', 'lista_platos_ordenados', 'mesa', 'precioTotal','comentarios', 'hora_pedido', 'acciones'];
  dataSource: MatTableDataSource<Pedido>;

  listPedidos: Pedido[] = [];
  pedidosPendientes: any[] = [];
  pedidosPagados: any[] = [];
  precioTotal: number=0;
  pedidosFiltrados: any[] = [];
  mesaSeleccionada: number | null = null;
  // listaPlatosOrdenados: string[] =[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private pedidoService: PedidoService, private usuarioService: UsuarioService, private platoService: PlatoService,private _snackBar: MatSnackBar,) { 
    this.dataSource = new MatTableDataSource(this.listPedidos);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerPedidos();

  }

  obtenerPedidos(){
    this.pedidoService.getPedidos().subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      for(let i = 0; i < data.length; i++){
        if(data[i].mesa==4){
          this.listPedidos.push(data[i]);
          if(data[i].estado_pedido == 'Esperando pago'){
            this.pedidosPendientes.push(data[i]);
          }else{
            this.pedidosPagados.push(data[i]);
          }

        }
      }
      
       //bucle que coja las id de lista_platos_ordenados y los transforme en nombres
       for (let i = 0; i < this.listPedidos.length; i++) {
        

        for (let j = 0; j < this.listPedidos[i].lista_platos_ordenados.length;j++){
          this.usuarioService.obtenerUsuario(this.listPedidos[i].id_cliente).subscribe(data2 => {
            this.listPedidos[i].id_cliente = data2.nombre
          }) 
        }
        
      }
      for (let i = 0; i < data.length; i++) {
        let precioPlato: number = 0;
        for (let j = 0; j < data[i].lista_platos_ordenados.length;j++){
          // data[i].precioTotal = (data[i].precioTotal || 0) + data[i].lista_platos_ordenados[i].precio; 
          precioPlato = precioPlato + data[i].lista_platos_ordenados[j].precio;
        }  
        data[i].precioTotal = precioPlato;
      }
      
    })
  }

  filterOrdersByTable(listPedidos: Pedido[]): void {
    for(let i = 0; i < listPedidos.length; i++){
      if(listPedidos[i].mesa==1){
        this.pedidosFiltrados.push(listPedidos[i]);

      }
    }
  }

  

  eliminarPedido(id: any){
    this.pedidoService.eliminarPedido(id).subscribe(data =>{
      this.listPedidos  = []
      this.pedidosPagados = []
      this.pedidosPendientes = []
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

  obtenerPedido(id:string){
    this.pedidoService.obtenerPedido(id).subscribe(data => {
      const pedido: Pedido = {
        estado_pedido: data.estado_pedido,
        lista_platos_ordenados: data.lista_platos_ordenados,
        mesa: data.mesa,
        precioTotal: data.precioTotal.$numberDecimal,
        comentarios: data.comentarios,
        hora_pedido: data.hora_pedido,
        id_cliente: data.id_cliente,
        
      }
    })
  }

  marcarComoPagado(id:any){
    this.pedidoService.obtenerPedido(id).subscribe(data => {
    const pedido: Pedido = {
      estado_pedido: 'Pagado',
      lista_platos_ordenados: data.lista_platos_ordenados,
        mesa: data.mesa,
        precioTotal: data.precioTotal.$numberDecimal,
        comentarios: data.comentarios,
        hora_pedido: data.hora_pedido,
        id_cliente: data.id_cliente,

    }
  

    this.pedidoService.editarPedido(id, pedido).subscribe(data => {
      this.listPedidos  = []
      this.pedidosPagados = []
      this.pedidosPendientes = []
      this.obtenerPedidos();
    })
  })
  }
  
  mensajeExito() {
    this._snackBar.open('El pedido fue eliminado con exito', '', {
      duration: 2000
    });
  }

}
