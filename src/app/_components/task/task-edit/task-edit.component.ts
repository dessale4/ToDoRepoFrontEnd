import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../../_models/models';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html',
})
export class TaskEditComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() task: Task | null = null;
  @Input() isSaving = false;

  @Output() submitForm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(f: NgForm) {
    if (!f.valid || this.isSaving) return;
    this.submitForm.emit(f.value);
    f.resetForm();
  }
}
