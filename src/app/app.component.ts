import { Component } from "@angular/core"
import { HeaderComponent } from "./components/header.component"
import { UserComponent } from "./components/user.component"
import { TasksCompnent } from "./components/tasks.component"
import { DUMMY_USERS } from "./components/dummy-users"
import { DUMMY_TASKS } from "./components/dummy-tasks"
import { TUser, TTask } from "./components/types"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksCompnent],
  template: `
    <app-header />
    <main>
      <ul id="users">
        @for (user of users; track user.id) {
        <app-user
          [user]="user"
          [selected]="user.id === currentUser?.id"
          (select)="onSelectUser($event)"
        />
        }
      </ul>
      @if (currentUserTasks) {
      <app-tasks
        [tasks]="currentUserTasks"
        [user]="currentUser"
        (completeEventForwarded)="onCompleteTask($event)"
        (addForwarded)="onAddTask()"
        [isNewTaskVisible]="isNewTaskVisible"
        (cancelForwarded)="onCancel()"
      />

      } @else {
      <h1>Select a user to see their tasks!</h1>
      }
    </main>
  `,
  styles: [
    `
      main {
        width: 90%;
        max-width: 50rem;
        margin: 2.5rem auto;
        display: grid;
        grid-auto-flow: row;
        gap: 2rem;
      }

      #users {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 0.5rem;
        overflow: auto;
      }

      #fallback {
        font-weight: bold;
        font-size: 1.15rem;
        margin: 0;
        text-align: center;
      }

      @media (min-width: 768px) {
        main {
          margin: 4rem auto;
          grid-template-columns: 1fr 3fr;
        }

        #users {
          flex-direction: column;
        }

        #fallback {
          font-size: 1.5rem;
          text-align: left;
        }
      }
    `,
  ],
})
export class AppComponent {
  users!: TUser[]
  tasks!: TTask[]

  currentUser?: TUser
  currentUserTasks!: TTask[]
  selected = false
  isNewTaskVisible = false

  ngOnInit() {
    const modifiedUsers = DUMMY_USERS.map((user) => ({
      ...user,
      avatar: `assets/users/${user.avatar}`,
    }))

    this.users = modifiedUsers
    this.tasks = DUMMY_TASKS
  }

  onSelectUser(userId: string) {
    this.currentUser = this.users.find((user) => user.id === userId)!
    this.currentUserTasks = this.tasks.filter(
      (task) => task.userId === this.currentUser?.id
    )
  }

  onAddTask() {
    console.log("hello")
  }

  onCancel() {
    this.isNewTaskVisible = false
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)

    if (this.currentUser) {
      this.currentUserTasks = this.tasks.filter(
        (task) => task.userId === this.currentUser?.id
      )
    }
  }
}
