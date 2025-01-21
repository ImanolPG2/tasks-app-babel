// home.page.ts
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task.interface';
import { state } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
  standalone: false,
})
export class HomePage {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterState: string = 'all';
  sortOrder: string = 'asc';
  currentDate: string = '';
  isAddTaskModalOpen: boolean = false;
  addTaskForm!: FormGroup;
  newTask = {
    id: 0,
    title: '',
    descripcion: '',
    expirationDate: new Date().toISOString(),
    state: false
  };
  minDate: string;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.addTaskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', Validators.required],
      expirationDate: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getTask();
    this.updateDate();
  }

  openAddTaskModal() {
    this.isAddTaskModalOpen = true; // Abre el modal
  }

  closeAddTaskModal() {
    this.isAddTaskModalOpen = false; // Cierra el modal
  }

  resetNewTask() {
    this.newTask = {
      id: 0,
      title: '',
      descripcion: '',
      expirationDate: new Date().toISOString(),
      state: false
    };
  }

  getTask() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      if (tasks.length > 0) {
        this.applyFilters();
      }
    });
  }

  applyFilters() {
    let tasks = [...this.tasks];

    // Filtrar por estado
    if (this.filterState === 'completed') {
      tasks = tasks.filter((task) => task.state);
    } else if (this.filterState === 'pending') {
      tasks = tasks.filter((task) => !task.state);
    }

    // Ordenar por fecha
    tasks.sort((a, b) => {
      const dateA = new Date(a.expirationDate).getTime();
      const dateB = new Date(b.expirationDate).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    this.filteredTasks = tasks;
  }


  updateDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    this.currentDate = date.toLocaleDateString('es-ES', options);
  }

  async addTask() {
    if (this.newTask.title.trim() && this.newTask.descripcion.trim() && this.newTask.expirationDate) {
      const response = this.taskService.postTacks(this.newTask)
      if (response.state === 200) {
        this.getTask();
        this.closeAddTaskModal();
        const toast = await this.toastController.create({
          message: 'Tarea creada correctamente',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      }
      this.resetNewTask();
    } else {
      console.log('Faltan datos');
    }
  }

  async confirmDelete(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            const response = this.taskService.deleteTask(task);
            if (response.state === 200) {
              console.log('Tarea eliminada correctamente');
              this.getTask();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  navigateToEdit(taskId: number) {
    this.router.navigate(['/app/edit-task', taskId]);
  }

  navigateToDetails(taskId: number) {
    this.router.navigate(['/app/detail-tack/', taskId]);
  }

  toggleComplete(task: Task) {
    task.state = !task.state;
  }
}
