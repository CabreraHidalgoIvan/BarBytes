import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarCategoriaComponent } from './agregar-editar-categoria.component';

describe('AgregarEditarCategoriaComponent', () => {
  let component: AgregarEditarCategoriaComponent;
  let fixture: ComponentFixture<AgregarEditarCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarCategoriaComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
