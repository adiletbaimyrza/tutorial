import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [],
  template: `
    <header>
      <img
        src="assets/angular-logo.png"
        alt="The Angular logo: The letter 'A'"
      />
      <h1>Let's get started!</h1>
      <p>Time to learn all about Angular!</p>
    </header>
  `,
  styles: `
    header {
      margin: 3rem auto;
      text-align: center;
    }

    img {
      width: 8rem;
    }

    h1 {
      margin: 1rem auto;
      background: -webkit-linear-gradient(45deg, #f9096d, #b700ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 3rem;
    }
  `,
})
export class AppComponent {}
