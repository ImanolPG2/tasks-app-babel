import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ToastController } from '@ionic/angular';
import { Task } from '../interface/task.interface';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.css'],
  standalone: false,
})
export class EditTaskPage implements OnInit {

  task: Task = {
    id: 0,
    title: '',
    descripcion: '',
    expirationDate: new Date().toISOString(),
    state: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const taskFound = this.taskService.getTaskById(id);

    if (taskFound) {
      this.task = { ...taskFound };
    } else {
      this.router.navigate(['/app/home']);
    }
  }

  async saveTask() {
    if (this.task.title.trim() && this.task.descripcion.trim() && this.task.expirationDate) {
      this.taskService.updateTask(this.task);

      const toast = await this.toastController.create({
        message: 'Tarea actualizada correctamente',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.router.navigate(['/app/home']);
    }
  }
}
