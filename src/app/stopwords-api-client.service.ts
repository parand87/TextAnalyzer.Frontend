import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, POST, Body, GET, Path, Query, PUT, DELETE } from './core';

@Injectable({
  providedIn: 'root'
})
export class StopwordsApiClientService extends HttpService {

  @GET('/stopwords')
  public getStopwordsList(): Observable<any> { return null; }
  
  @POST('/stopwords')
  public createStopword(@Body item: any): Observable<any> { return null; }
  
  @PUT('/stopwords/{stopwordId}')
  public updateStopword(@Path("stopwordId") id: string, @Body item: any): Observable<any> { return null; }

  @DELETE('/stopwords/{stopwordId}')
  public deleteStopword(@Path("stopwordId") id: string): Observable<any> { return null; }
}
