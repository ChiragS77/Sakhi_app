import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactEmail, ContactEmailRequest, ContactInfoRequest, ContactPage, ContactPhone, ContactPhoneRequest, OfficeHour, OfficeHourRequest } from '../models/contact.model';




@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly baseUrl = 'http://localhost:8080';
  private readonly adminUrl = `${this.baseUrl}/admin/contact`;

  constructor(private http: HttpClient) {}

  // =========================================================
  // PUBLIC CONTACT PAGE
  // =========================================================

  getContactPage(): Observable<ContactPage> {
    return this.http.get<ContactPage>(
      `${this.baseUrl}/contact`
    );
  }

  // =========================================================
  // PHONE NUMBERS
  // =========================================================

  getPhones(): Observable<ContactPhone[]> {
    return this.http.get<ContactPhone[]>(
      `${this.adminUrl}/phones`,
      { withCredentials: true }
    );
  }

  addPhone(phone: ContactPhoneRequest): Observable<ContactPhone> {
    return this.http.post<ContactPhone>(
      `${this.adminUrl}/phones`,
      phone,
      { withCredentials: true }
    );
  }

  updatePhone(
    id: number,
    phone: ContactPhoneRequest
  ): Observable<ContactPhone> {
    return this.http.put<ContactPhone>(
      `${this.adminUrl}/phones/${id}`,
      phone,
      { withCredentials: true }
    );
  }

  deletePhone(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.adminUrl}/phones/${id}`,
      { withCredentials: true }
    );
  }

  // =========================================================
  // EMAIL ADDRESSES
  // =========================================================

  getEmails(): Observable<ContactEmail[]> {
    return this.http.get<ContactEmail[]>(
      `${this.adminUrl}/emails`,
      { withCredentials: true }
    );
  }

  addEmail(email: ContactEmailRequest): Observable<ContactEmail> {
    return this.http.post<ContactEmail>(
      `${this.adminUrl}/emails`,
      email,
      { withCredentials: true }
    );
  }

  updateEmail(
    id: number,
    email: ContactEmailRequest
  ): Observable<ContactEmail> {
    return this.http.put<ContactEmail>(
      `${this.adminUrl}/emails/${id}`,
      email,
      { withCredentials: true }
    );
  }

  deleteEmail(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.adminUrl}/emails/${id}`,
      { withCredentials: true }
    );
  }

  // =========================================================
  // OFFICE HOURS
  // =========================================================

  getOfficeHours(): Observable<OfficeHour[]> {
    return this.http.get<OfficeHour[]>(
      `${this.adminUrl}/office-hours`,
      { withCredentials: true }
    );
  }

  addOfficeHour(hour: OfficeHourRequest): Observable<OfficeHour> {
    return this.http.post<OfficeHour>(
      `${this.adminUrl}/office-hours`,
      hour,
      { withCredentials: true }
    );
  }

  updateOfficeHour(
    id: number,
    hour: OfficeHourRequest
  ): Observable<OfficeHour> {
    return this.http.put<OfficeHour>(
      `${this.adminUrl}/office-hours/${id}`,
      hour,
      { withCredentials: true }
    );
  }

  deleteOfficeHour(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.adminUrl}/office-hours/${id}`,
      { withCredentials: true }
    );
  }

  // =========================================================
  // CONTACT INFORMATION
  // =========================================================

  getContactInfo(): Observable<{
    address: string;
    whatsappEnquiryNumber: string;
  }> {
    return this.http.get<{
      address: string;
      whatsappEnquiryNumber: string;
    }>(
      `${this.adminUrl}/info`,
      { withCredentials: true }
    );
  }

  updateContactInfo(
    data: ContactInfoRequest
  ): Observable<{
    address: string;
    whatsappEnquiryNumber: string;
  }> {
    return this.http.put<{
      address: string;
      whatsappEnquiryNumber: string;
    }>(
      `${this.adminUrl}/info`,
      data,
      { withCredentials: true }
    );
  }
}
