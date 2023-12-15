import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.scss']
})

export class AgregarEditarPersonaComponent {
  tipoRol: string[] = ['Admin', 'Camarero', 'Comensal'];
  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: string | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
     private fb: FormBuilder, public dialog: MatDialog, private _usuarioService: UsuarioService,private _snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public data: any){
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        psw: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        rol: [null, Validators.required],

      });
      this.id = data.id;
  
  }

  ngOnInit():void{
    this.esEditar(this.id);
  }

  esEditar(id: string | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.obtenerUsuario(id);
    }
  }

  obtenerUsuario(id:string){
    this._usuarioService.obtenerUsuario(id).subscribe(data => {
      this.form.setValue({
        nombre: data.nombre,
        psw: data.psw,
        email: data.email,
        rol: data.rol,
        
      })
    })
  }

  cancelar(){
    this.dialogRef.close(false);
  }

  addEditUsuario(){

    if (this.form.invalid) {
      return;
    }
    const usuario: Usuario = {
      nombre: this.form.value.nombre,
      psw: this.form.value.psw,
      email: this.form.value.email,
      rol: this.form.value.rol,
    }

    this.loading = true;

    if (this.id == undefined) {

      // Es agregar
      this._usuarioService.guardarUsuario(usuario).subscribe(() => {
        this.mensajeExito('agregada');
      })

    } else {

      // Es editar
      this._usuarioService.editarUsuario(this.id, usuario).subscribe(data => {
        this.mensajeExito('actualizada');
      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La persona fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }

}
