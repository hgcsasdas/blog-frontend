export interface Componente {
  tipo: string;
  id: string;
  capacidades: string;
  html: string;
}

export const COMPONENT_TYPES: Omit<Componente, 'id'>[] = [
  {
    tipo: 'Titulo',
    capacidades: 'Muestra un título',
    html: '<h2 class="text-2xl font-medium indent-2 py-36">Título</h2>',
  },
  {
    tipo: 'Texto',
    capacidades: 'Muestra texto básico',
    html: '<p class="font-light indent-2 my-4">Texto</p>',
  },
  {
    tipo: 'Lista',
    capacidades: 'Muestra una lista',
    html: '<ul class="list-disc list-inside my-4"><li>Elemento de lista 1</li><li>Elemento de lista 2</li></ul>',
  },
  {
    tipo: 'Cita',
    capacidades: 'Muestra una cita',
    html: '<blockquote class="border-l-4 border-gray-500 italic my-4 pl-4">Cita</blockquote>',
  },

  {
    tipo: 'Divisor',
    capacidades: 'Muestra un divisor horizontal',
    html: '<hr class="my-4" />',
  },
  {
    tipo: 'Enlace',
    capacidades: 'Muestra un hipervínculo',
    html: '<a href="url" class="text-blue-500 underline my-4">Texto del enlace</a>',
  },
  {
    tipo: 'Alerta',
    capacidades: 'Muestra un cuadro de alerta',
    html: '<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-4"><p class="font-bold">Alerta alerta</p><p>Escribe aquí sobre de qué quieres avisar.</p></div>',
  },
];
