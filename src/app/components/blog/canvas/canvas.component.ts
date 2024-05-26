import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Componente } from '../../../services/blogs/componentes/componente';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ComponentDetailsPopupComponent } from '../component-details-popup/component-details-popup.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, ComponentDetailsPopupComponent],
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  @Input() canvasComponents: Componente[] = [];

  selectedComponent: Componente | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  selectComponent(component: Componente) {
    this.selectedComponent = component;
  }

  closePopup() {
    this.selectedComponent = null;
  }

  saveComponent(updatedComponent: Componente) {

    const index = this.canvasComponents.findIndex(comp => comp.id === updatedComponent.id);
    if (index !== -1) {
      this.canvasComponents[index] = updatedComponent;
      this.closePopup();
    }
  }
}
