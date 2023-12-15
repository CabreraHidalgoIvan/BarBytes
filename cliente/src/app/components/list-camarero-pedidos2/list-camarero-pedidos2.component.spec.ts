import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCamareroPedidos2Component } from './list-camarero-pedidos2.component';

describe('ListCamareroPedidos2Component', () => {
  let component: ListCamareroPedidos2Component;
  let fixture: ComponentFixture<ListCamareroPedidos2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCamareroPedidos2Component]
    });
    fixture = TestBed.createComponent(ListCamareroPedidos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
