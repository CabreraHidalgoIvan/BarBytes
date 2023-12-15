import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-agregar-editar-pedido',
  templateUrl: './agregar-editar-pedido.component.html',
  styleUrls: ['./agregar-editar-pedido.component.scss']
})
export class AgregarEditarPedidoComponent {
  estadoPedido: string[] = ['Esperando pago', 'Pagado'];
  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: string | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarPedidoComponent>,
     private fb: FormBuilder, public dialog: MatDialog, private _pedidoService: PedidoService,private _snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public data: any){
      this.form = this.fb.group({
        estado_pedido: ['', Validators.required],
        lista_platos_ordenados: ['', Validators.required],
        mesa: ['', Validators.required,],
        precioTotal: ['', Validators.required],
        comentarios: ['', Validators.required],
        hora_pedido: ['', Validators.required],
        id_cliente: ['', Validators.required],
      });
      this.id = data.id;
  
  }

  ngOnInit():void{
    this.esEditar(this.id);
  }

  esEditar(id: string | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.obtenerPedido(id);
    }
  }

  obtenerPedido(id:string){
    this._pedidoService.obtenerPedido(id).subscribe(data => {
      this.form.setValue({
        estado_pedido: data.estado_pedido,
        lista_platos_ordenados: data.lista_platos_ordenados,
        mesa: data.mesa,
        precioTotal: data.precioTotal,
        comentarios: data.comentarios,
        hora_pedido: data.hora_pedido,
        id_cliente: data.id_cliente,
        
      })
    })
  }

  cancelar(){
    this.dialogRef.close(false);
  }

  addEditPedido(){

    if (this.form.invalid) {
      return;
    }
    const pedido: Pedido = {
      estado_pedido: this.form.value.estado_pedido,
      lista_platos_ordenados: this.form.value.lista_platos_ordenados,
      mesa: this.form.value.mesa,
      precioTotal: this.form.value.precioTotal,
      comentarios: this.form.value.comentarios,
      hora_pedido: this.form.value.hora_pedido,
      id_cliente: this.form.value.id_cliente,

    }

    this.loading = true;

    if (this.id == undefined) {

      // Es agregar
      this._pedidoService.guardarPedido(pedido).subscribe(() => {
        this.mensajeExito('agregada');
      })

    } else {

      // Es editar
      this._pedidoService.editarPedido(this.id, pedido).subscribe(data => {
        this.mensajeExito('actualizada');
      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El pedido fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }
}
