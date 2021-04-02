import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JobsService {

  constructor(private readonly _http: HttpClient) {
  }

  get(description: string, location?: string, fullTime?: string): Observable<any> {
    let filter = 'description=' + description;
    if (location) {
      filter += '&location=' + location;
    }
    if (fullTime) {
      filter += `&full_time=${ fullTime }`;
    }
    return this._http.get(`http://localhost:4200/api/positions.json?${ filter }`);
  }
}
