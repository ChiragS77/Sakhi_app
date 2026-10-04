import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutData } from '../models/about.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
 private readonly dataUrl = 'assets/data/about.json';

  constructor(private http: HttpClient) {}

  getAboutData(): Observable<AboutData> {
    return this.http.get<AboutData>(this.dataUrl);
  }
}