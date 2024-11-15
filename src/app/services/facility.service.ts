import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Facility } from '../model/facility.model';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private jsonUrl = 'assets/dummy.json';
  private facilities: Facility[] = [];

  constructor(private http: HttpClient) { }

  getFacilities(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getFacilityData(): Observable<Facility> {
    return this.http.get<Facility>(this.jsonUrl);
  }

  getFacilityById(id: number): any {
    return this.facilities.find(facility => facility.id === id);
  }
  

  
  getImagesById(imgId: number): string[] {

    const imageFiles = [];
    let i = 1;
    const maxImages = 5;  

    while (i <= maxImages) {
      const imagePath = `assets/images/${imgId}_img${i}.jpg`;
      if (this.doesImageExist(imagePath)) {
        imageFiles.push(imagePath);
      } else {
        break; 
      }
      i++;
    }
    return imageFiles;
  }

  // Helper function to check if an image exists via HTTP
  private doesImageExist(imagePath: string): Observable<boolean> {
    return this.http.head(imagePath, { observe: 'response' }).pipe(
      map(response => response.status === 200),
      catchError(() => [false])
    );
  }
}
