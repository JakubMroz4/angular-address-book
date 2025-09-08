import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  contactForm: FormGroup;
  contactId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly contactService: ContactsService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    const contact = this.contactService.contacts.find(
      (c) => c.id === this.contactId
    );

    if (contact) {
      this.contactForm.patchValue({
        firstName: contact.firstName,
        lastName: contact.lastName,
        street: contact.street,
        city: contact.city,
      });
    }
  }

  updateContact(): void {
    const updatedContact: Contact = {
      id: this.contactId,
      ...this.contactForm.value,
    };

    this.contactService.UpdateContact(updatedContact);
    this.router.navigate(['/contacts']);
  }
}
