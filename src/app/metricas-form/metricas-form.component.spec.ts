import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricasFormComponent } from './metricas-form.component';

describe('MetricasFormComponent', () => {
  let component: MetricasFormComponent;
  let fixture: ComponentFixture<MetricasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
