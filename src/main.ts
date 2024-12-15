import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FileService } from './app/services/file.service';
import { ExportService } from './app/services/export.service';
import { FileListComponent } from './app/components/file-list/file-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileListComponent],
  template: `
    <div class="container">
      <h1>Generador de Lista de Archivos</h1>
      
      <div>
        <input
          type="file"
          (change)="handleFolderSelect($event)"
          webkitdirectory
          directory
          multiple
          style="display: none"
          #folderInput
        >
        <button (click)="folderInput.click()">Seleccionar Carpeta</button>
        
        <div class="file-count" *ngIf="files.length > 0">
          {{ files.length }} archivos encontrados
        </div>
        
        <div class="button-group" *ngIf="files.length > 0">
          <button (click)="generatePDF()">
            Generar PDF
          </button>
          <button (click)="generateExcel()" style="margin-left: 10px;">
            Generar Excel
          </button>
        </div>
      </div>

      <app-file-list [files]="files"></app-file-list>
    </div>
  `
})
export class App {
  files: File[] = [];

  constructor(
    private fileService: FileService,
    private exportService: ExportService
  ) {
    this.fileService.files$.subscribe(files => {
      this.files = files;
    });
  }

  handleFolderSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileService.updateFiles(input.files);
  }

  generatePDF() {
    this.exportService.generatePDF(this.files);
  }

  generateExcel() {
    this.exportService.generateExcel(this.files);
  }
}

bootstrapApplication(App, {
  providers: [FileService, ExportService]
});