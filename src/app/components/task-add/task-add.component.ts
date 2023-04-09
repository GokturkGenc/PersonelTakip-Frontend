import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  
  taskAddForm: FormGroup
  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createTaskAddForm();
  }

  createTaskAddForm() {
    this.taskAddForm = this.formBuilder.group({
      taskName: ["", Validators.required],
    })
  }

  add() {
    if (this.taskAddForm.valid) {
      let taskModel = Object.assign({}, this.taskAddForm.value);
      let newName:string = taskModel.taskName
      newName = newName[0].toUpperCase() + newName.slice(1)
      taskModel.taskName = newName
      this.taskService.add(taskModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      }, (responseError) => {
            this.toastrService.error(responseError.error.Errors,'Task name already exist');
      }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

}
