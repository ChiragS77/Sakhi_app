import { Component } from '@angular/core';
import { ContactEmail, ContactPhone, OfficeHour } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent {


  phones: ContactPhone[] = [];
  emails: ContactEmail[] = [];
  officeHours: OfficeHour[] = [];

  address = '';
  whatsappEnquiryNumber = '';


  // ============================================================
  // UI STATE
  // ============================================================

  loading = false;
  saving = false;

  success = '';
  error = '';


  // ============================================================
  // MODAL
  // ============================================================

  modalType:
    | 'phone'
    | 'email'
    | 'office-hour'
    | null = null;

  editingId: number | null = null;


  // ============================================================
  // FORMS
  // ============================================================

  phoneForm = {
    phoneNumber: '',
    displayOrder: 1
  };

  emailForm = {
    email: '',
    displayOrder: 1
  };

  officeHourForm = {
    dayLabel: '',
    timings: '',
    closed: false,
    displayOrder: 1
  };


  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private contactService: ContactService
  ) {}


  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {
    this.loadContactData();
  }


  // ============================================================
  // LOAD ALL DATA
  // ============================================================

  loadContactData(): void {

    this.loading = true;
    this.clearMessages();

    this.contactService.getPhones().subscribe({
      next: data => {
        this.phones = data;
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to load phone numbers.';
      }
    });


    this.contactService.getEmails().subscribe({
      next: data => {
        this.emails = data;
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to load email addresses.';
      }
    });


    this.contactService.getOfficeHours().subscribe({
      next: data => {
        this.officeHours = data;
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to load office hours.';
      }
    });


    this.contactService.getContactInfo().subscribe({
      next: data => {
        this.address = data.address;
        this.whatsappEnquiryNumber =
          data.whatsappEnquiryNumber;

        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to load contact information.';
        this.loading = false;
      }
    });
  }


  // ============================================================
  // PHONE
  // ============================================================

  openAddPhone(): void {

    this.editingId = null;

    this.phoneForm = {
      phoneNumber: '',
      displayOrder: this.phones.length + 1
    };

    this.modalType = 'phone';
  }


  openEditPhone(phone: ContactPhone): void {

    this.editingId = phone.id;

    this.phoneForm = {
      phoneNumber: phone.phoneNumber,
      displayOrder: phone.displayOrder
    };

    this.modalType = 'phone';
  }


  savePhone(): void {

  if (!this.phoneForm.phoneNumber.trim()) {
    this.error = 'Please enter a phone number.';
    return;
  }

  this.saving = true;
  this.clearMessages();

  if (this.editingId === null) {

    this.contactService.addPhone({
      phoneNumber: this.phoneForm.phoneNumber,
      displayOrder: this.phoneForm.displayOrder
    }).subscribe({
      next: () => {
        this.success = 'Phone number added successfully.';
        this.closeModal();
        this.loadContactData();
        this.saving = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Unable to add phone number.';
        this.saving = false;
      }
    });

  } else {

    this.contactService.updatePhone(
      this.editingId,
      {
        phoneNumber: this.phoneForm.phoneNumber,
        displayOrder: this.phoneForm.displayOrder
      }
    ).subscribe({
      next: () => {
        this.success = 'Phone number updated successfully.';
        this.closeModal();
        this.loadContactData();
        this.saving = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Unable to update phone number.';
        this.saving = false;
      }
    });
  }
}


  deletePhone(phone: ContactPhone): void {

    if (!confirm(`Delete ${phone.phoneNumber}?`)) {
      return;
    }

    this.contactService.deletePhone(phone.id).subscribe({
      next: () => {
        this.success = 'Phone number deleted successfully.';
        this.loadContactData();
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to delete phone number.';
      }
    });
  }


  // ============================================================
  // EMAIL
  // ============================================================

  openAddEmail(): void {

    this.editingId = null;

    this.emailForm = {
      email: '',
      displayOrder: this.emails.length + 1
    };

    this.modalType = 'email';
  }


  openEditEmail(email: ContactEmail): void {

    this.editingId = email.id;

    this.emailForm = {
      email: email.email,
      displayOrder: email.displayOrder
    };

    this.modalType = 'email';
  }


  saveEmail(): void {

    if (!this.emailForm.email.trim()) {
      this.error = 'Please enter an email address.';
      return;
    }

    this.saving = true;
    this.clearMessages();

    const request: ContactEmail = {
      id: this.editingId || 0,
      email: this.emailForm.email,
      displayOrder: this.emailForm.displayOrder
    };

    const request$ = this.editingId === null
      ? this.contactService.addEmail(request)
      : this.contactService.updateEmail(
          this.editingId,
          request
        );

    request$.subscribe({
      next: () => {
        this.success =
          this.editingId === null
            ? 'Email added successfully.'
            : 'Email updated successfully.';

        this.closeModal();
        this.loadContactData();
        this.saving = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to save email address.';
        this.saving = false;
      }
    });
  }


  deleteEmail(email: ContactEmail): void {

    if (!confirm(`Delete ${email.email}?`)) {
      return;
    }

    this.contactService.deleteEmail(email.id).subscribe({
      next: () => {
        this.success = 'Email deleted successfully.';
        this.loadContactData();
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to delete email.';
      }
    });
  }


  // ============================================================
  // OFFICE HOURS
  // ============================================================

  openAddOfficeHour(): void {

    this.editingId = null;

    this.officeHourForm = {
      dayLabel: '',
      timings: '',
      closed: false,
      displayOrder: this.officeHours.length + 1
    };

    this.modalType = 'office-hour';
  }


  openEditOfficeHour(hour: OfficeHour): void {

    this.editingId = hour.id;

    this.officeHourForm = {
      dayLabel: hour.dayLabel,
      timings: hour.timings || '',
      closed: hour.closed,
      displayOrder: hour.displayOrder
    };

    this.modalType = 'office-hour';
  }


  saveOfficeHour(): void {

    if (!this.officeHourForm.dayLabel.trim()) {
      this.error = 'Please enter the day label.';
      return;
    }

    if (
      !this.officeHourForm.closed &&
      !this.officeHourForm.timings.trim()
    ) {
      this.error = 'Please enter office timings.';
      return;
    }

    this.saving = true;
    this.clearMessages();

    const request: OfficeHour = {
      id: this.editingId || 0,
      dayLabel: this.officeHourForm.dayLabel,
      timings: this.officeHourForm.closed
        ? null
        : this.officeHourForm.timings,
      closed: this.officeHourForm.closed,
      displayOrder: this.officeHourForm.displayOrder
    };

    const request$ = this.editingId === null
      ? this.contactService.addOfficeHour(request)
      : this.contactService.updateOfficeHour(
          this.editingId,
          request
        );

    request$.subscribe({
      next: () => {

        this.success =
          this.editingId === null
            ? 'Office hours added successfully.'
            : 'Office hours updated successfully.';

        this.closeModal();
        this.loadContactData();
        this.saving = false;
      },

      error: err => {
        console.error(err);
        this.error = 'Unable to save office hours.';
        this.saving = false;
      }
    });
  }


  deleteOfficeHour(hour: OfficeHour): void {

    if (!confirm(`Delete "${hour.dayLabel}"?`)) {
      return;
    }

    this.contactService.deleteOfficeHour(hour.id).subscribe({
      next: () => {
        this.success = 'Office hours deleted successfully.';
        this.loadContactData();
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to delete office hours.';
      }
    });
  }


  // ============================================================
  // ADDRESS + WHATSAPP
  // ============================================================

  saveContactInfo(): void {

    this.saving = true;
    this.clearMessages();

    this.contactService.updateContactInfo({
      address: this.address,
      whatsappEnquiryNumber:
        this.whatsappEnquiryNumber
    }).subscribe({
      next: () => {
        this.success =
          'Contact information updated successfully.';
        this.saving = false;
      },

      error: err => {
        console.error(err);
        this.error =
          'Unable to update contact information.';
        this.saving = false;
      }
    });
  }


  // ============================================================
  // MODAL
  // ============================================================

  closeModal(): void {
    this.modalType = null;
    this.editingId = null;
  }


  clearMessages(): void {
    this.success = '';
    this.error = '';
  }


  // ============================================================
  // NAVIGATION
  // ============================================================

  backToDashboard(): void {
    window.history.back();
  }

}
