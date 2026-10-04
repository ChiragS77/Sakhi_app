import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service, ServiceCategory } from '../models/service.model';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
export interface ServicesTitle {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  
  private apiUrl = `${environment.apiUrl}/services`;
private adminUrl = `${environment.apiUrl}/admin/services`;

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
