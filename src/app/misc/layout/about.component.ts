import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
  <h3>About</h3>
  <small>Collect, Maintain and Share Curated List of any Topic, Like: </small>
  
   <li>List of book/movie about a city;</li>
   <li>Roadmap to learn a specific topic;</li>
   <li>Reading experience in a week or month;</li>
   <li>Collection of Online Course to master new skill;</li>
   ...
  `,
})
export class AboutComponent {
  constructor() {}
}
