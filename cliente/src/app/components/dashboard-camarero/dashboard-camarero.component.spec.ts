import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCamareroComponent } from './dashboard-camarero.component';

describe('DashboardCamareroComponent', () => {
  let component: DashboardCamareroComponent;
  let fixture: ComponentFixture<DashboardCamareroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCamareroComponent]
    });
    fixture = TestBed.createComponent(DashboardCamareroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
