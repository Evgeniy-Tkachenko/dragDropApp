import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
  standalone: true,
})
export class DragDropDirective {
  @Input() dragData: any;
  @Input() isDropZone = false;
  @Output() itemDropped = new EventEmitter<any>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    if (!this.isDropZone) {
      this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
    }
  }
  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    if (!this.isDropZone && this.dragData) {
      event.dataTransfer?.setData('text/plain', JSON.stringify(this.dragData));
      this.renderer.addClass(this.el.nativeElement, 'dragging');
    }
  }

  @HostListener('dragend')
  onDragEnd() {
    if (!this.isDropZone) {
      this.renderer.removeClass(this.el.nativeElement, 'dragging');
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    if (this.isDropZone) {
      event.preventDefault();
      const data = event.dataTransfer?.getData('text/plain');
      if (data) {
        this.itemDropped.emit(JSON.parse(data));
      }
    }
  }
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    if (this.isDropZone) {
      event.preventDefault();
      const data = event.dataTransfer?.getData('text/plain');
      if (data) {
        this.itemDropped.emit(JSON.parse(data));
      }
    }
  }
}
