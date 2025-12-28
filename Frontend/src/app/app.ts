import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div style="padding: 20px;">
      <h1>Lista de Tareas</h1>
      
      <input type="text" [(ngModel)]="nuevaTarea" placeholder="Nueva tarea" data-cy="input-tarea">
      <button (click)="agregar()" data-cy="btn-agregar">Agregar</button>

      <ul>
        <li *ngFor="let t of tareas" data-cy="item-tarea">
          {{ t.nombre }}
        </li>
      </ul>
    </div>
  `
})
export class AppComponent {
  http = inject(HttpClient);
  tareas: any[] = [];
  nuevaTarea = '';
  apiUrl = 'http://localhost:5000/tareas'; // OJO: Pon el puerto de tu Backend

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => this.tareas = data);
  }

  agregar() {
    this.http.post(this.apiUrl, { nombre: this.nuevaTarea }).subscribe(() => {
      this.nuevaTarea = '';
      this.cargar();
    });
  }
}