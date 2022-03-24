import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public apiUrl = environment.apiURL;

  constructor(
    public router: Router,
    public http: HttpClient,
    public _ls:LocalstorageService
    ) { }


  getNews(language:string, page:number=0): Observable<any> {

    return this.http.get(`${this.apiUrl}?query=${language}&page=${page}`)
      .pipe(
        catchError(err => {
          throw throwError(err);
        }),
      )
  }
  


}
