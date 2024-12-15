import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private filesSubject = new BehaviorSubject<File[]>([]);
  files$ = this.filesSubject.asObservable();

  updateFiles(files: FileList | null) {
    if (files) {
      const fileArray = Array.from(files).sort((a, b) => 
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: 'base'
        })
      );
      this.filesSubject.next(fileArray);
    }
  }

  getFiles(): File[] {
    return this.filesSubject.value;
  }
}