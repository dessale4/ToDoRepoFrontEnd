import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../_services/user.service';
import { Task, SubTask } from '../../_models/models';

import { TaskComponent } from '../task/task.component';
import { SubTaskComponent } from '../sub-task/sub-task.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, TaskComponent, SubTaskComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  isSavingTask = false;
  isSavingSubTask = false;

  userTasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getTasks(0);
  }

  // ===== Data loading =====
  private getTasks(selectTaskId: number) {
    this.userService.getTasks().subscribe({
      next: (response: Task[]) => {
        this.userTasks = response ?? [];

        if (!this.userTasks.length) {
          this.selectedTask = null;
          return;
        }

        if (selectTaskId) {
          this.selectedTask =
            this.userTasks.find((t) => t.id === selectTaskId) ?? this.userTasks[0];
          return;
        }

        // keep selection stable
        if (this.selectedTask) {
          this.selectedTask =
            this.userTasks.find((t) => t.id === this.selectedTask!.id) ?? this.userTasks[0];
        } else {
          this.selectedTask = this.userTasks[0];
        }
      },
      error: (err) => console.log('Api access failed ==> ', err),
    });
  }

  // ===== Events from TaskComponent =====
  onSelectTask(task: Task) {
    this.selectedTask = task;
  }

  onAddTask(payload: any) {
    if (this.isSavingTask) return;

    this.isSavingTask = true;
    this.userService.addNewTask(payload).subscribe({
      next: (response: Task[]) => {
        this.userTasks = response ?? [];
        if (this.userTasks.length) {
          // reselect
          if (this.selectedTask) {
            this.selectedTask =
              this.userTasks.find((t) => t.id === this.selectedTask!.id) ?? this.userTasks[0];
          } else {
            this.selectedTask = this.userTasks[0];
          }
        } else {
          this.selectedTask = null;
        }
      },
      error: (error) => console.log(error),
      complete: () => (this.isSavingTask = false),
    });
  }

  onDeleteTask(task: Task) {
    this.userService.deleteTask(task).subscribe({
      next: () => this.getTasks(0),
      error: (error) => console.log('Task deletion failed ', error),
    });
  }

  // Placeholder: wire to your API when ready
  onSaveTaskEdit(_update: { taskId: number; changes: any }) {
    // this.userService.updateTask(update.taskId, update.changes)...
    console.log('Task edit payload:', _update);
  }

  // ===== Events from SubTaskComponent =====
  onAddSubTask(payload: { taskId: number; data: any }) {
    if (this.isSavingSubTask) return;

    this.isSavingSubTask = true;
    this.userService.addNewSubtask({ ...payload.data, taskId: payload.taskId }).subscribe({
      next: (updatedTask: Task) => this.getTasks(updatedTask.id),
      error: (error) => console.log('Error', error),
      complete: () => (this.isSavingSubTask = false),
    });
  }

  onDeleteSubTask(subTask: SubTask) {
    this.userService.deleteSubTask(subTask).subscribe({
      next: () => this.getTasks(this.selectedTask?.id ?? 0),
      error: (error) => console.log('Subtask deletion failed ', error),
    });
  }

  // Placeholder: wire to your API when ready
  onSaveSubTaskEdit(_update: { subTaskId: number; changes: any }) {
    // this.userService.updateSubTask(update.subTaskId, update.changes)...
    console.log('Subtask edit payload:', _update);
  }

  // Placeholder: wire to your API when ready
  onToggleSubTaskDone(_payload: { subTask: SubTask; done: boolean }) {
    // this.userService.markSubTaskDone(payload.subTask.id, payload.done)...
    console.log('Toggle done:', _payload);
  }
}
