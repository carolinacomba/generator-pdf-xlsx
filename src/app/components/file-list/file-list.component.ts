import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-list" *ngIf="files.length > 0">
      <h3>Archivos encontrados:</h3>
      <ul>
        <li *ngFor="let file of files">{{ file.name }}</li>
      </ul>
    </div>
  `
})
export class FileListComponent {
  @Input() files: File[] = [];
}