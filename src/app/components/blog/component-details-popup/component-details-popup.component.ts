import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Componente } from '../../../services/blogs/componentes/componente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-details-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './component-details-popup.component.html',
  styleUrls: ['./component-details-popup.component.css']
})
export class ComponentDetailsPopupComponent {
  @Input() component: Componente | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Componente>();

  componentHtml: string | null = null;

  ngOnChanges() {
    if (this.component) {
      this.componentHtml = this.component.html;
    }
  }

  saveChanges() {
    if (this.component && this.componentHtml !== null) {
      const contentEditableElement = document.getElementById('contenteditable');

      if (contentEditableElement) {
        const innerHtml = contentEditableElement.innerHTML;
        this.component.html = innerHtml;
        this.save.emit(this.component);
      }
    }
  }
}
