import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ToastController } from '@ionic/angular';
import { Task } from '../interface/task.interface';

@Component({
  selector: 'app-detail-tack',
  templateUrl: './detail-tack.page.html',
  styleUrls: ['./detail-tack.page.css'],
  standalone: false,
})
export class DetailTackPage implements OnInit {

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

}
