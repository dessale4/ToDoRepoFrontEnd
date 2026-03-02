import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task, SubTask } from '../../_models/models';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  isAddingTask = false;
  isSavingTask = false;
  isAddingSubTask = false;
  isSavingSubTask = false;

  userTasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getTasks(0);
  }

  toggleTaskAddition() {
    this.isAddingTask = !this.isAddingTask;
    this.isAddingSubTask = false;
  }
  toggleSubTaskAddition() {
    this.isAddingSubTask = !this.isAddingSubTask;
    this.isAddingTask = false;
  }
  selectTask(task: Task) {
    this.selectedTask = task;
  }
  addNewTask(taskFormData: NgForm) {
    if (!taskFormData.valid || this.isSavingTask) return;

    this.isSavingTask = true;
    this.userTasks = [];
    this.userService.addNewTask(taskFormData.value).subscribe({
      next: (response: Task[]) => {
        this.userTasks = response;
        // keep selection stable: if you had a selected task, re-select it by id
        if (this.selectedTask) {
          const updated = this.userTasks.find(
            (t) => t.id === this.selectedTask!.id,
          );
          this.selectedTask = updated ?? null;
        } else if (this.userTasks.length > 0) {
          this.selectedTask = this.userTasks[0];
        } else {
          response[0];
        }

        taskFormData.resetForm();
        this.isAddingTask = false;
      },
      error: (error) => console.log(error),
      complete: () => (this.isSavingTask = false),
    });
  }
  getTasks(selectTaskId: number) {
    this.userService.getTasks().subscribe({
      next: (response: Task[]) => {
        this.userTasks = response;
        // auto-select first task for better UX
        if (!this.selectedTask && this.userTasks.length > 0) {
          this.selectedTask = this.userTasks[0];
        } else if (selectTaskId && this.userTasks.length > 0) {
          this.selectedTask = this.userTasks.filter(
            (t) => t.id == selectTaskId,
          )[0];
        } else {
          this.selectedTask = response[0];
        }
      },
      error: (err) => console.log('Api access failed ==> ', err),
    });
  }

  // placeholders for later
  startEditTask(task: Task) {}

  deleteTask(task: Task) {
    this.userService.deleteTask(task).subscribe(
      (response) => {
        this.getTasks(0);
      },
      (error) => {
        console.log('Task deletion failed ', error);
      },
    );
  }
  deleteSubTask(subTask: SubTask) {
    this.selectedTask = null;
    this.userTasks = [];
    this.userService.deleteSubTask(subTask).subscribe(
      (response) => {
        this.getTasks(0);
      },
      (error) => {
        console.log('Task deletion failed ', error);
      },
    );
  }

  trackTaskById = (_: number, t: Task) => t.id;
  trackSubTaskById = (_: number, st: SubTask) => st.id;

  addNewSubtask(subTaskForm: NgForm) {
    if (!subTaskForm.valid || !this.selectedTask) return;

    const payload = {
      ...subTaskForm.value,
      taskId: this.selectedTask.id,
    };
    this.toggleSubTaskAddition();
    this.userService.addNewSubtask(payload).subscribe(
      (response: Task) => {
        // this.selectedTask = response;
        this.getTasks(response.id);
        this.isAddingSubTask = false;
      },
      (error) => {
        console.log('Error', error);
      },
    );
  }
}
