import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCamareroPedidos4Component } from './list-camarero-pedidos4.component';

describe('ListCamareroPedidos4Component', () => {
  let component: ListCamareroPedidos4Component;
  let fixture: ComponentFixture<ListCamareroPedidos4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCamareroPedidos4Component]
    });
    fixture = TestBed.createComponent(ListCamareroPedidos4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
