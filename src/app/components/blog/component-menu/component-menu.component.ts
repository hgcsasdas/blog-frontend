import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Componente, COMPONENT_TYPES } from '../../../services/blogs/componentes/componente';

@Component({
  selector: 'app-component-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-menu.component.html',
  styleUrls: ['./component-menu.component.css']
})
export class ComponentMenuComponent {
  @Output() addComponent = new EventEmitter<Componente>();

  components = COMPONENT_TYPES;

  add(componentType: string, capabilities: string, html: string) {
    const component: Componente = {
      type: componentType,
      id: uuidv4(),
      capabilities: capabilities,
      html: html
    };
    this.addComponent.emit(component);
  }
}
