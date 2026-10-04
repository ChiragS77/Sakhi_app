import { Component, OnInit } from '@angular/core';
import { ContactInfo } from 'src/app/models/contact-info.model';
import { ContactPage } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

interface PreviewLine {
  text: string;
  href?: string;
}

interface PreviewCard {
  icon: 'phone' | 'mail' | 'pin';
  title: string;
  subtitle?: string;
  lines: PreviewLine[];
}

interface PreviewInfo {
  cards: PreviewCard[];
  ctaLink: string;
  ctaLabel: string;
}

@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.css']
})
export class ContactPreviewComponent implements OnInit {
 
   info?: PreviewInfo;

  loading = true;
  error = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContactPage().subscribe({
      next: (data) => {
        this.info = this.toPreview(data);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  /*
   * Convert backend data into the cards the template shows
   */
  private toPreview(data: ContactPage): PreviewInfo {

    const cards: PreviewCard[] = [
      {
        icon: 'phone',
        title: 'Call Us',
        lines: data.phones.map(p => ({
          text: p.phoneNumber,
          href: 'tel:' + p.phoneNumber.replace(/\s+/g, '')
        }))
      },
      {
        icon: 'mail',
        title: 'Email Us',
        lines: data.emails.map(e => ({
          text: e.email,
          href: 'mailto:' + e.email
        }))
      },
      {
        icon: 'pin',
        title: 'Visit Us',
        lines: data.address ? [{ text: data.address }] : []
      }
    ];

    return {
      // hide a card if the admin removed all of its items
      cards: cards.filter(c => c.lines.length > 0),
      ctaLink: '/contact',
      ctaLabel: 'Contact Us'
    };
  }
}