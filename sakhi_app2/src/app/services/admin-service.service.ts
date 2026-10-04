import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, ServiceCategory, ServiceItem } from '../models/service.model';
import { DashboardStats } from '../models/contact.model';

export interface CreateCategoryRequest {
  title: string;
  description: string;
  displayOrder: number;
  active: boolean;
}



/* =====================================================
   BUSINESS SERVICE
===================================================== */

export interface CreateServiceRequest {
  title: string;
  description: string;
  displayOrder: number;
  active: boolean;
}




/* =====================================================
   SERVICE ITEM
===================================================== */

export interface CreateServiceItemRequest {
  title: string;
  displayOrder: number;
  active: boolean;
}




/* =====================================================
   ADMIN SERVICE
===================================================== */

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private apiUrl = 'http://localhost:8080/admin/services';

  constructor(
    private http: HttpClient
  ) {}


  /* =====================================================
     CATEGORIES
  ===================================================== */

  getCategories(): Observable<ServiceCategory[]> {

    return this.http.get<ServiceCategory[]>(
      `${this.apiUrl}/categories`,
      {
        withCredentials: true
      }
    );
  }


  addCategory(
    data: CreateCategoryRequest
  ): Observable<ServiceCategory> {

    return this.http.post<ServiceCategory>(
      `${this.apiUrl}/categories`,
      data,
      {
        withCredentials: true
      }
    );
  }


  updateCategory(
    id: number,
    data: CreateCategoryRequest
  ): Observable<ServiceCategory> {

    return this.http.put<ServiceCategory>(
      `${this.apiUrl}/categories/${id}`,
      data,
      {
        withCredentials: true
      }
    );
  }


  deleteCategory(
    id: number
  ): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/categories/${id}`,
      {
        withCredentials: true,
        responseType: 'text'
      }
    );
  }


  /* =====================================================
     BUSINESS SERVICES
  ===================================================== */

  addService(
    categoryId: number,
    data: CreateServiceRequest
  ): Observable<Service> {

    return this.http.post<Service>(
      `${this.apiUrl}/categories/${categoryId}/services`,
      data,
      {
        withCredentials: true
      }
    );
  }


  updateService(
    id: number,
    data: CreateServiceRequest
  ): Observable<Service> {

    return this.http.put<Service>(
      `${this.apiUrl}/${id}`,
      data,
      {
        withCredentials: true
      }
    );
  }


  deleteService(
    id: number
  ): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        withCredentials: true,
        responseType: 'text'
      }
    );
  }


  /* =====================================================
     SERVICE ITEMS
  ===================================================== */

  addServiceItem(
    serviceId: number,
    data: CreateServiceItemRequest
  ): Observable<ServiceItem> {

    return this.http.post<ServiceItem>(
      `${this.apiUrl}/${serviceId}/items`,
      data,
      {
        withCredentials: true
      }
    );
  }

  


  getServiceItems(
    serviceId: number
  ): Observable<ServiceItem[]> {

    return this.http.get<ServiceItem[]>(
      `${this.apiUrl}/${serviceId}/items`,
      {
        withCredentials: true
      }
    );
  }


  updateServiceItem(
    id: number,
    data: CreateServiceItemRequest
  ): Observable<ServiceItem> {

    return this.http.put<ServiceItem>(
      `${this.apiUrl}/items/${id}`,
      data,
      {
        withCredentials: true
      }
    );
  }


  deleteServiceItem(
    id: number
  ): Observable<string> {

    return this.http.delete(
      `${this.apiUrl}/items/${id}`,
      {
        withCredentials: true,
        responseType: 'text'
      }
    );
  }

  getDashboardStats(): Observable<DashboardStats> {
  return this.http.get<any>(
  'http://localhost:8080/admin/services/stats',
  { withCredentials: true }
)
}

}
