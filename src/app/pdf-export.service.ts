import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Contact } from './contact/models/contact.model';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs 
@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor() { }
  export(contactList: Contact[]): void {
    var docDefinition = {
      content: [
        {
          text: 'Contact List',
          style: 'header',
        },
        {
          ul: contactList.map((contact) => contact.name),
        },
      ],
    
      defaultStyle: {
        fontSize: 15,
        bold: true
      }
    };
    pdfMake.createPdf(docDefinition).download();
  }
}
