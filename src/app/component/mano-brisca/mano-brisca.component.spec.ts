import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoBriscaComponent } from './mano-brisca.component';

describe('ManoBriscaComponent', () => {
  let component: ManoBriscaComponent;
  let fixture: ComponentFixture<ManoBriscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManoBriscaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManoBriscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
