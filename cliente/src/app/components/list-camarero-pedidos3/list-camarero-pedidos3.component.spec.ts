import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCamareroPedidos3Component } from './list-camarero-pedidos3.component';

describe('ListCamareroPedidos3Component', () => {
  let component: ListCamareroPedidos3Component;
  let fixture: ComponentFixture<ListCamareroPedidos3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCamareroPedidos3Component]
    });
    fixture = TestBed.createComponent(ListCamareroPedidos3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
