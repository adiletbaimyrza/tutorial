import { Component } from "@angular/core"
import { HeaderComponent } from "./components/header.component"
import { UserComponent } from "./components/user.component"
import { TUser } from "./components/types"
import { DUMMY_USERS } from "./components/dummy-users"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, UserComponent],
  template: `
    <app-header />
    <main>
      <ul id="users">
        @for (user of users; track user.id) {
        <app-user [user]="user" (select)="onSelectUser($event)" />
        }
      </ul>
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
  users!: Array<TUser>

  ngOnInit() {
    const modifiedUsers = DUMMY_USERS.map((user) => ({
      ...user,
      avatar: `assets/users/${user.avatar}`,
    }))
    this.users = modifiedUsers
  }

  onSelectUser(id: string) {
    console.log(`User with ${id} was clicked!`)
  }
}
