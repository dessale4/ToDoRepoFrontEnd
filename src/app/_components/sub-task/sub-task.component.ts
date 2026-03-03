import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task, SubTask } from '../../_models/models';
import { SubTaskEditComponent } from './sub-task-edit/sub-task-edit.component';

@Component({
  selector: 'app-sub-task',
  standalone: true,
  imports: [CommonModule, SubTaskEditComponent],
  templateUrl: './sub-task.component.html',
})
export class SubTaskComponent {
  @Input() selectedTask: Task | null = null;
  @Input() isSaving = false;

  @Output() addSubTask = new EventEmitter<{ taskId: number; data: any }>();
  @Output() deleteSubTask = new EventEmitter<SubTask>();
  @Output() saveSubTaskEdit = new EventEmitter<{ subTaskId: number; changes: any }>();
  @Output() toggleDone = new EventEmitter<{ subTask: SubTask; done: boolean }>();

  isAdding = false;
  editing: SubTask | null = null;

  toggleAdd() {
    this.isAdding = !this.isAdding;
    this.editing = null;
  }

  startEdit(st: SubTask) {
    this.editing = st;
    this.isAdding = false;
  }

  cancelEdit() {
    this.editing = null;
  }

  onSubmitNewSubTask(data: any) {
    if (!this.selectedTask) return;
    this.addSubTask.emit({ taskId: this.selectedTask.id, data });
    this.isAdding = false;
  }

  onSubmitEdit(changes: any) {
    if (!this.editing) return;
    this.saveSubTaskEdit.emit({ subTaskId: this.editing.id, changes });
    this.editing = null;
  }

  onToggleDone(st: SubTask, done: boolean) {
    this.toggleDone.emit({ subTask: st, done });
  }

  trackSubTaskById = (_: number, st: SubTask) => st.id;
}
