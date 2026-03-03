import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../_models/models';
import { TaskEditComponent } from './task-edit/task-edit.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, TaskEditComponent],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() tasks: Task[] = [];
  @Input() selectedTask: Task | null = null;
  @Input() isSaving = false;

  @Output() selectTask = new EventEmitter<Task>();
  @Output() addTask = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() saveTaskEdit = new EventEmitter<{ taskId: number; changes: any }>();

  isAdding = false;
  editingTask: Task | null = null;

  toggleAdd() {
    this.isAdding = !this.isAdding;
    this.editingTask = null;
  }

  startEdit(task: Task) {
    this.editingTask = task;
    this.isAdding = false;
  }

  cancelEdit() {
    this.editingTask = null;
  }

  onSubmitNewTask(formValue: any) {
    this.addTask.emit(formValue);
    this.isAdding = false;
  }

  onSubmitEdit(changes: any) {
    if (!this.editingTask) return;
    this.saveTaskEdit.emit({ taskId: this.editingTask.id, changes });
    this.editingTask = null;
  }

  trackTaskById = (_: number, t: Task) => t.id;
}
