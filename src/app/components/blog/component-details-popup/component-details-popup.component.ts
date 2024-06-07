import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Componente } from '../../../services/blogs/componentes/componente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-details-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './component-details-popup.component.html',
  styleUrls: ['./component-details-popup.component.css'],
})
export class ComponentDetailsPopupComponent {
  @Input() component: Componente | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Componente>();

  componentHtml: string | null = null;
  linkText: string | null = null;
  linkHref: string | null = null;

  ngOnChanges() {
    if (this.component) {
      this.componentHtml = this.component.html;

      if (this.component.tipo === 'Enlace') {
        const linkElement = document.createElement('div');
        linkElement.innerHTML = this.component.html;
        const anchorElement = linkElement.querySelector('a');
        if (anchorElement) {
          this.linkText = anchorElement.innerHTML;
          this.linkHref = anchorElement.getAttribute('href');
        }
      }
    }
  }

  saveChanges() {
    if (this.component && this.componentHtml !== null) {
      const contentEditableElement = document.getElementById('contenteditable');
      if (this.component.tipo === 'Enlace' && this.linkText !== null && this.linkHref !== null) {
        this.component.html = `<a href="${this.linkHref}" class="text-blue-500 underline my-4">${this.linkText}</a>`;
        this.save.emit(this.component);

      }

      if (contentEditableElement) {
        const innerHtml = contentEditableElement.innerHTML;

        this.component.html = innerHtml;

        this.save.emit(this.component);
      }
    }
  }
}
