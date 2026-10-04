import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service, ServiceCategory } from '../models/service.model';
import { Observable } from 'rxjs';

export interface ServicesTitle {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = 'http://localhost:8080/services';
  private adminUrl = 'http://localhost:8080/admin/services';

  constructor(private http: HttpClient) {}

  // Get all active service categories
  getServices(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(this.apiUrl);
  }

  getServiceTitles(): Observable<ServicesTitle[]> {
  return this.http.get<ServicesTitle[]>(
    `${this.apiUrl}/titles`,
  );
}
}
