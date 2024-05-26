export interface Componente {
  type: string;
  id: string;
  capabilities: string;
  html: string;
}

export const COMPONENT_TYPES: Omit<Componente, 'id'>[] = [
  {
    type: 'Title',
    capabilities: 'Displays a title',
    html: ' <h2 class="text-2xl font-medium indent-2 py-36">Title</h2>',
  },
  {
    type: 'Text',
    capabilities: 'Texto básico',
    html: ' <p class="font-light indent-2 my-4">Text</p>',
  },
  {
    type: 'List',
    capabilities: 'Displays a list',
    html: '<ul class="list-disc list-inside my-4"><li>List item 1</li><li>List item 2</li></ul>'
  },
];
