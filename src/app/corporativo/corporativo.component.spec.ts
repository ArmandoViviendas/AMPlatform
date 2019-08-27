import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporativoComponent } from './corporativo.component';

describe('CorporativoComponent', () => {
  let component: CorporativoComponent;
  let fixture: ComponentFixture<CorporativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
