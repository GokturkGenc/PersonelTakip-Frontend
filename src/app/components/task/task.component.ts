import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  currentTask:Task;
  taskAddForm: FormGroup

  constructor(private taskService: TaskService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getTasks();
    this.createTaskAddForm();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response.data
      this.tasks.sort((a,b)=>a.taskName<b.taskName? -1:a.taskName>b.taskName?1:0)
    })
  }

  createTaskAddForm() {
    this.taskAddForm = this.formBuilder.group({
      taskName: ["", Validators.required],
    })
  }

  addTask() {
    if (this.taskAddForm.valid) {
      let taskModel = Object.assign({}, this.taskAddForm.value)
      this.taskService.add(taskModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i > responseError.error.Errors; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    } else {
      this.toastrService.error("Form hatalı", "Dikkat")
    }
  }
  

  setCurrentTask(task:Task){
    this.currentTask = task;
  }

  getCurrentTaskClass(task:Task){
    if(task ==this.currentTask){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
