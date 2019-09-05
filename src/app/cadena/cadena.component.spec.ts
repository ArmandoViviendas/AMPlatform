import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadenaComponent } from './cadena.component';

describe('CadenaComponent', () => {
  let component: CadenaComponent;
  let fixture: ComponentFixture<CadenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
