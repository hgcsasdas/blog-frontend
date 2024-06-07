import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
 @Input() msg: any = '';


}
