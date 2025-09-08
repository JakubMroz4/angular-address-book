import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { CONTACTS } from '../data/contacts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  public contacts: Contact[] = CONTACTS;

  public AddContact(contact: Contact): void {
    const maxId =
      this.contacts.length > 0
        ? Math.max(...this.contacts.map((c) => c.id))
        : 0;

    const newContact = { ...contact, id: maxId + 1 };
    this.contacts.push(newContact);
  }
  GetContactById(id: number): Observable<Contact | undefined> {
    const contact = this.contacts.find((b) => b.id === id);
    return of(contact);
  }
}
