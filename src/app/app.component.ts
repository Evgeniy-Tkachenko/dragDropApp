import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropDirective } from './directives/dragDrop.directive';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DragDropDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items: WritableSignal<Item[]> = signal([
    { id: 1, name: 'Элемент 1' },
    { id: 2, name: 'Элемент 2' },
    { id: 3, name: 'Элемент 3' },
    { id: 4, name: 'Элемент 4' },
    { id: 5, name: 'Элемент 5' },
  ]);

  droppedItems: WritableSignal<Item[]> = signal([]);

  onItemDropped(item: Item) {
    this.droppedItems.update((items) => [...items, item]);
  }
}
