import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactEmail, ContactPhone, OfficeHour } from 'src/app/models/contact.model';
import { Service } from 'src/app/models/service.model';
import { BusinessService, ServicesTitle,  } from 'src/app/services/business.service';
import { ContactService,  } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 
  contactForm!: FormGroup;
  submitted = false;
  submittedSuccess = false;

  serviceTitles: ServicesTitle[] = [];

  // Loaded from the backend
  phones: ContactPhone[] = [];
  emails: ContactEmail[] = [];
  officeHours: OfficeHour[] = [];
  address = '';
  whatsappNumber = '';      


  /*
   * Services displayed in dropdown
   */
  // services = [
  //   'Business Registration',
  //   'GST & Tax Compliance',
  //   'Licenses & Registrations',
  //   'Digital Business Solutions',
  //   'Digital Marketing & Growth',
  //   'Other'
  // ];


   constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private businessService: BusinessService
    
  ) {}

ngOnInit(): void {
    this.buildForm();
    this.loadContact();
        this.loadServiceTitles();

  }



  private loadContact(): void {
    this.contactService.getContactPage().subscribe({
      next: (data) => {
        this.phones = data.phones;
        this.emails = data.emails;
        this.officeHours = data.officeHours;
        this.address = data.address;
        this.whatsappNumber = data.whatsappEnquiryNumber;
      },
      error: (err) => console.error('Failed to load contact data', err)
    });
  }

  toTel(phone: string): string {
    return phone.replace(/\s+/g, '');
  }

   private buildForm(): void {
    this.contactForm = this.fb.group({
      /*
       * REQUIRED
       */
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      /*
       * REQUIRED
       */
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      /*
       * OPTIONAL
       */
      phone: [''],

      /*
       * OPTIONAL
       */
      company: [''],

      /*
       * REQUIRED
       */
      service: [
        '',
        Validators.required
      ],

      /*
       * OPTIONAL
       */
      message: ['']
    });
  }


  /*
   * Easy access to form controls
   */
  get f() {
    return this.contactForm.controls;
  }


  /*
   * Submit enquiry
   */
 onSubmit(): void {

    this.submitted = true;


    /*
     * Check required fields
     */
    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();

      return;
    }


    /*
     * CHANGED: new check
     * Stop if the WhatsApp number has not loaded yet
     */
    if (!this.whatsappNumber) {

      return;
    }


    /*
     * Get form values
     */
    const formData = this.contactForm.value;


    /*
     * Create WhatsApp message
     */
    const message = `
Hello Sakhi Business Consulting,

I would like to enquire about your services.

━━━━━━━━━━━━━━━━━━━━

Name: ${formData.name}

Email: ${formData.email}

Phone: ${formData.phone || 'Not provided'}

Business Name: ${formData.company || 'Not provided'}

Service Required: ${formData.service}

Message:
${formData.message || 'No additional message provided.'}

━━━━━━━━━━━━━━━━━━━━

Sent through Sakhi Business Consulting website.
    `.trim();


    /*
     * Encode message
     */
    const encodedMessage =
      encodeURIComponent(message);


    /*
     * Create WhatsApp URL (uses the number from the backend)
     */
    const whatsappUrl =
      `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;


    /*
     * Open WhatsApp
     */
    window.open(
      whatsappUrl,
      '_blank'
    );


    /*
     * Show success message
     */
    this.submittedSuccess = true;


    /*
     * CHANGED: reset with service = ''
     * so "Select a service" shows again
     */
    this.contactForm.reset({ service: '' });

    this.submitted = false;


    /*
     * Hide success message after 5 seconds
     */
    setTimeout(() => {

      this.submittedSuccess = false;

    }, 5000);

  }


  loadServiceTitles(): void {

    this.businessService.getServiceTitles().subscribe({
      next: (data) => {
        this.serviceTitles = data;
      },

      error: (error) => {
        console.error('Error loading service titles:', error);
      }
    });

  }
}
