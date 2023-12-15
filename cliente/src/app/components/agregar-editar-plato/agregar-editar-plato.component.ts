import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatoService } from 'src/app/services/platos.service';
import { CategoriaService } from 'src/app/services/categorias.service';
import { Categoria } from '../../models/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plato } from '../../models/plato';

@Component({
  selector: 'app-agregar-editar-plato',
  templateUrl: './agregar-editar-plato.component.html',
  styleUrls: ['./agregar-editar-plato.component.scss']
})
export class AgregarEditarPlatoComponent {
  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: string | undefined;
  categorias: Categoria[] = [];
  estados: string[] = ['Activo', 'Desactivado'];

  constructor(public dialogRef: MatDialogRef<AgregarEditarPlatoComponent>,
     private fb: FormBuilder, public dialog: MatDialog, private _platoService: PlatoService, private _categoriaService: CategoriaService,private _snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public data: any){
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required,],
        categoriaId: [null, Validators.required],
        categoriaId2: [null],
        categoriaId3: [null],
        estado: ['', Validators.required],
        img: [null, Validators.required],

      });
      this.id = data.id;
  
  }

  selectedFile: any = null;

onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

}

  ngOnInit():void{
    this._categoriaService.getCategorias().subscribe(data2 => {
      this.categorias = data2;
      console.log(this.categorias)
      
    })
    this.esEditar(this.id);
    
  }

  esEditar(id: string | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.obtenerPlato(id);
    }
  }

  obtenerPlato(id:string){
    this._platoService.obtenerPlato(id).subscribe(data => {
      console.log(data)
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        categoriaId: data.categoriaId,
        categoriaId2: data.categoriaId2,
        categoriaId3: data.categoriaId3,
        estado: data.estado,
        img: data.img,
        
      })
    })
  }

  obtenerCategorias(){

    this._categoriaService.getCategorias().subscribe(data2 => {
      this.categorias = data2;
      console.log(this.categorias)
      
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
    const plato: Plato = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      categoriaId: this.form.value.categoriaId,
      categoriaId2: this.form.value.categoriaId2,
      categoriaId3: this.form.value.categoriaId3,
      estado: this.form.value.estado,
      img: partes[partes.length - 1],
    }

    console.log(plato.categoriaId)
    plato.categoriaId

    this.loading = true;

    if (this.id == undefined) {

      // Es agregar
      this._platoService.guardarPlato(plato).subscribe(() => {
        this.mensajeExito('agregada');
      })

    } else {

      // Es editar
      this._platoService.editarPlato(this.id, plato).subscribe(data => {
        this.mensajeExito('actualizada');
      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El plato fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }
}
