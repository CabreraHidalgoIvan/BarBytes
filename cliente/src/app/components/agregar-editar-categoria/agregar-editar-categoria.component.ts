import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-agregar-editar-categoria',
  templateUrl: './agregar-editar-categoria.component.html',
  styleUrls: ['./agregar-editar-categoria.component.scss']
})
export class AgregarEditarCategoriaComponent {

  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: string | undefined;
  estados: string[] = ['Activo', 'Desactivado'];

  constructor(public dialogRef: MatDialogRef<AgregarEditarCategoriaComponent>,
     private fb: FormBuilder, public dialog: MatDialog, private _categoriaService: CategoriaService,private _snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public data: any){
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        img: ['', Validators.required],
        estado: ['',Validators.required],

      });
      this.id = data.id;
  
  }

  selectedFile: any = null;

onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

}

  ngOnInit():void{
    this.esEditar(this.id);
  }

  esEditar(id: string | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.obtenerCategoria(id);
    }
  }

  obtenerCategoria(id:string){
    this._categoriaService.obtenerCategoria(id).subscribe(data => {
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        img: data.img,
        estado: data.estado,
        
      })
    })
  }

  cancelar(){
    this.dialogRef.close(false);
  }

  addEditPlato(){

    if (this.form.invalid) {
      return;
    }
    const partes = this.form.value.img.split('\\');
    const categoria: Categoria = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      img: partes[partes.length - 1],
      estado: this.form.value.estado,
    }

    this.loading = true;

    if (this.id == undefined) {

      // Es agregar
      this._categoriaService.guardarCategoria(categoria).subscribe(() => {
        this.mensajeExito('agregada');
      })

    } else {

      // Es editar
      this._categoriaService.editarCategoria(this.id, categoria).subscribe(data => {
        this.mensajeExito('actualizada');
      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La categoría fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }

}
