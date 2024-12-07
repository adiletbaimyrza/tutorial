import { Component, EventEmitter, Input, Output } from "@angular/core"
import { TTask } from "./types"

@Component({
  selector: "app-task",
  standalone: true,
  imports: [],
  template: `
    <article>
      <h2>{{ task.title }}</h2>
      <time>{{ task.dueDate }}</time>
      <p>{{ task.summary }}</p>
      <p class="actions">
        <button type="button" (click)="onCompleteTask()">Complete</button>
      </p>
    </article>
  `,
  styles: [
    `
      article {
        padding: 1rem;
        color: #25113d;
        background-color: #bf9ee5;
      }

      h2 {
        margin: 0;
      }

      time {
        color: #3c2c50;
      }

      .actions {
        text-align: right;
        margin: 0;
      }

      .actions button {
        font: inherit;
        font-size: 0.9rem;
        cursor: pointer;
        background-color: #380774;
        color: #decdf2;
        border-radius: 4px;
        padding: 0.5rem 1.5rem;
        border: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      }

      .actions button:hover,
      .actions button:active {
        background-color: #4a0774;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class TaskComponent {
  @Input({ required: true }) task!: TTask
  @Output() complete = new EventEmitter<string>()

  onCompleteTask() {
    this.complete.emit(this.task.id)
  }
}
