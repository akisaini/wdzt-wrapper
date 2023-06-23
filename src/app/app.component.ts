import { Component } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Pyramid } from './pyramid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wrap-app';
  // manifest: any = null;         

}
