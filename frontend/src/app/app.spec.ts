import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('crea el componente raiz', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el titulo del sistema en el encabezado', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain('Sistema de Administracion de Viveros');
  });

  it('no muestra el boton de cerrar sesion cuando no hay usuario', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const boton = (fixture.nativeElement as HTMLElement).querySelector('button');
    expect(boton).toBeNull();
  });
});
