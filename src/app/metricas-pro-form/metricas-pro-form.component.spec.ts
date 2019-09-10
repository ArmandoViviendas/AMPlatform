import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricasProFormComponent } from './metricas-pro-form.component';

describe('MetricasProFormComponent', () => {
  let component: MetricasProFormComponent;
  let fixture: ComponentFixture<MetricasProFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricasProFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricasProFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
