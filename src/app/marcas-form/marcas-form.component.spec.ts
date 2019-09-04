import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcasFormComponent } from './marcas-form.component';


describe('MarcasFormComponent', () => {
  let component: MarcasFormComponent;
  let fixture: ComponentFixture<MarcasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
