import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sakhi_app2';

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.isActivated
      ? (outlet.activatedRoute.snapshot.routeConfig?.path ?? '')
      : '';
  }

  year = new Date().getFullYear();
}
