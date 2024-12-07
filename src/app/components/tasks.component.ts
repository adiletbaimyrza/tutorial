import { Component, EventEmitter, Input, Output } from "@angular/core"
import { TaskComponent } from "./task.component"
import { TTask, TUser } from "./types"
import { NewtaskComponent } from "./new-task.component"

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [TaskComponent, NewtaskComponent],
  template: `
    <section id="tasks">
      <header>
        <h1>{{ user?.name }}'s Tasks</h1>
        <menu>
          <button type="button" (click)="onStartAddTask()">Add Task</button>
        </menu>
      </header>

      @if (isNewTaskVisible) {
      <app-new-task (add)="onAddTask()" (cancel)="onCancel()" />
      } @else if (tasks.length) {
      <ul>
        @for (task of tasks; track task.id) {
        <li><app-task [task]="task" (complete)="onCompleteTask($event)" /></li>
        }
      </ul>
      } @else {
      <p>No tasks for {{ user?.name }}</p>
      }
    </section>
  `,
  styles: [
    `
      #tasks {
        padding: 1rem;
        border-radius: 8px;
        max-height: 60vh;
        overflow: auto;
        background-color: #3a2c54;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        gap: 1rem;
      }

      h2 {
        margin: 0;
        font-size: 0.9rem;
        width: 60%;
        text-wrap: balance;
      }

      menu {
        margin: 0;
        padding: 0;
      }

      menu button {
        font: inherit;
        cursor: pointer;
        background-color: #9965dd;
        border-radius: 4px;
        border: none;
        padding: 0.35rem 0.8rem;
        font-size: 0.9rem;
      }

      menu button:hover,
      menu button:active {
        background-color: #a565dd;
      }

      ul {
        list-style: none;
        margin: 1rem 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 50vh;
        overflow: auto;
      }

      @media (min-width: 768px) {
        h2 {
          font-size: 1.25rem;
        }

        menu {
          width: auto;
        }
      }
    `,
  ],
})
export class TasksCompnent {
  @Input({ required: true }) tasks!: TTask[]
  @Input({ required: false }) user?: TUser
  @Input({ required: true }) isNewTaskVisible!: boolean
  @Output() completeEventForwarded = new EventEmitter<string>()
  @Output() addForwarded = new EventEmitter()
  @Output() cancelForwarded = new EventEmitter<void>()

  onCompleteTask(taskId: string) {
    this.completeEventForwarded.emit(taskId)
  }

  onStartAddTask() {
    this.isNewTaskVisible = true
  }

  onAddTask() {
    this.addForwarded.emit()
    this.isNewTaskVisible = false
  }

  onCancel() {
    this.cancelForwarded.emit()
  }
}
