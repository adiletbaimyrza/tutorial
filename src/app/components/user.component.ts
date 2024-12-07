import { Component, Input, Output, EventEmitter } from "@angular/core"
import { TUser } from "./types"

@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  template: `
    <div>
      <button [class.active]="selected" (click)="onSelectUser()">
        <img [src]="user.avatar" [alt]="user.name" />
        <span>{{ user.name }}</span>
      </button>
    </div>
  `,
  styles: [
    `
      div {
        border-radius: 6px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.5rem;
        background-color: #433352;
        color: #c3b3d1;
        border: none;
        font: inherit;
        cursor: pointer;
        width: 100%;
        min-width: 10rem;
        text-align: left;
      }

      button:hover,
      button:active,
      .active {
        background-color: #9965dd;
        color: #150722;
      }

      img {
        width: 2rem;
        object-fit: contain;
        border-radius: 50%;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
      }

      span {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        font-weight: normal;
      }
    `,
  ],
})
export class UserComponent {
  @Input({ required: true }) user!: TUser
  @Input({ required: true }) selected!: boolean
  @Output() select = new EventEmitter<string>()

  onSelectUser() {
    this.select.emit(this.user.id)
  }
}
