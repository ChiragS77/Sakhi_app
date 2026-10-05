import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutData } from '../models/about.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
 private readonly dataUrl = 'assets/data/about.json';

  constructor(private http: HttpClient) {}

getAboutData(): Observable<AboutData> {
  return this.http.get<AboutData>(this.dataUrl).pipe(
    map(d => ({
      ...d,
      team: (d.team ?? []).map(m => {
        const photo = m.photo ?? '';
        return {
          ...m,
          photo: photo.startsWith('http')
            ? photo
            : `${environment.imageBaseUrl}/${photo}`
        };
      })
    }))
  );
}

}