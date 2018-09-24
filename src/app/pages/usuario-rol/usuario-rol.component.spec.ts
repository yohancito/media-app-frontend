import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRolComponent } from './usuario-rol.component';

describe('UsuarioRolComponent', () => {
  let component: UsuarioRolComponent;
  let fixture: ComponentFixture<UsuarioRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
