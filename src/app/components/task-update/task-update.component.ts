import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  taskUpdateForm: FormGroup
  tasks:Task[] = [];
  task:Task
  constructor(private taskService:TaskService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getTasks()
    this.createTaskUpdateForm()
  }

  createTaskUpdateForm(){
    this.taskUpdateForm = this.formBuilder.group({
      taskId: ["",Validators.required],
      taskName: ["",Validators.required],
    })
  }
  
  update(){
    if(this.taskUpdateForm.valid){
      let taskModel:Task = Object.assign({},this.taskUpdateForm.getRawValue())
      let newName:string = taskModel.taskName
      newName = newName[0].toUpperCase() + newName.slice(1)
      taskModel.taskName = newName
      this.taskService.update(taskModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i = 0;i < responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
      
    }else{
      this.toastrService.error("Formu doldurmanız gerekli","Hata")
    }
  }

  getTasks() {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response.data
      this.tasks.sort((a,b)=>a.taskName<b.taskName? -1:a.taskName>b.taskName?1:0)
    })
  }

}