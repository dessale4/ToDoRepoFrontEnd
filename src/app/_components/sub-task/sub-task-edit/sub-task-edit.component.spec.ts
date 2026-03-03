import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskEditComponent } from './sub-task-edit.component';

describe('SubTaskEditComponent', () => {
  let component: SubTaskEditComponent;
  let fixture: ComponentFixture<SubTaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubTaskEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
