import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact/models/contact.model';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(contacts: Contact[], searchText: string): Contact[] {
    if (!searchText) {
      return contacts || []; // If no search text provided, return all contacts
    }
    if(!contacts){
      return []
    }
    searchText = searchText.toLowerCase(); // Convert search text to lowercase for case-insensitive search
    return contacts?.filter(contact => {
      return contact?.name?.toLowerCase().includes(searchText) || contact?.email?.toLowerCase().includes(searchText) || contact?.phone?.toLowerCase().includes(searchText) ; 
    });
  }

}
