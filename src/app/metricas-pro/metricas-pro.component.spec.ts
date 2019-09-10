import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricasProComponent } from './metricas-pro.component';

describe('MetricasProComponent', () => {
  let component: MetricasProComponent;
  let fixture: ComponentFixture<MetricasProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricasProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricasProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
