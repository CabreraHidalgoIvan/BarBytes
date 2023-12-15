import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPlatoComponent } from './agregar-editar-plato.component';

describe('AgregarEditarPlatoComponent', () => {
  let component: AgregarEditarPlatoComponent;
  let fixture: ComponentFixture<AgregarEditarPlatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarPlatoComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
