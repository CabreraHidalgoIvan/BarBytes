import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCamareroPedidosComponent } from './list-camarero-pedidos.component';

describe('ListCamareroPedidosComponent', () => {
  let component: ListCamareroPedidosComponent;
  let fixture: ComponentFixture<ListCamareroPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCamareroPedidosComponent]
    });
    fixture = TestBed.createComponent(ListCamareroPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
