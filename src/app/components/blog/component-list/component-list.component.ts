// component-list.component.ts
import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Componente } from '../../../services/blogs/componentes/componente';

@Component({
  selector: 'app-component-list',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CommonModule, CdkDragHandle],
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent {
  @Input() canvasComponents: Componente[] = [];

  drop(event: CdkDragDrop<Componente[]>) {
    moveItemInArray(this.canvasComponents, event.previousIndex, event.currentIndex);
  }
}

