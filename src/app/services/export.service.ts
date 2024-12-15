import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  generatePDF(files: File[]) {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    let y = margin;

    const colWidth1 = 60;
    const colWidth2 = 120;
    const rowHeight = 10;

    // Título
    pdf.setFontSize(16);
    pdf.text('Lista de Archivos', margin, y);
    y += 15;

    // Encabezados
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Nombre del Archivo', margin, y);
    pdf.text('Notas', margin + colWidth1, y);
    y += 10;

    pdf.line(margin, y - 5, margin + colWidth1 + colWidth2, y - 5);
    pdf.setFont('helvetica', 'normal');

    files.forEach((file) => {
      if (y > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      pdf.text(file.name, margin, y);
      pdf.line(margin + colWidth1, y, margin + colWidth1 + colWidth2, y);
      y += rowHeight;
    });

    pdf.save('lista-archivos.pdf');
  }

  generateExcel(files: File[]) {
    const workbook = XLSX.utils.book_new();
    const data = files.map(file => ({
      'Nombre del Archivo': file.name,
      'Notas': ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const wscols = [
      { wch: 30 },
      { wch: 50 }
    ];
    worksheet['!cols'] = wscols;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Archivos');
    XLSX.writeFile(workbook, 'lista-archivos.xlsx');
  }
}