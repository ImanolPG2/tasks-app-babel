// task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(
  ) {
    this.tasks = [
      {
        id: 1,
        title: 'Ejemplo Tarea',
        descripcion: 'Descripción ejemplo',
        expirationDate: new Date().toISOString(),
        state: false
      },
      {
        id: 2,
        title: 'Hacer ejercicio',
        descripcion: 'Pierna, Brazo y hombro',
        expirationDate: new Date().toISOString(),
        state: true
      },
      {
        id: 3,
        title: 'Estudiar ingles',
        descripcion: 'Verbo to be',
        expirationDate: new Date().toISOString(),
        state: false
      },
    ];
    this.tasksSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  postTacks(data: Task) {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title: data.title.trim(),
      descripcion: data.descripcion.trim(),
      expirationDate:  new Date(data.expirationDate).toISOString(),
      state: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
    return { mensaje: 'Tarea agregada correctamente', state: 200 };
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
    this.tasksSubject.next(this.tasks);
    return { mensaje: 'Se elimino la tarea correctamente', state: 200 };
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.tasksSubject.next(this.tasks);
    return { mensaje: 'Se elimino la tarea correctamente', state: 200 };
  }
}
