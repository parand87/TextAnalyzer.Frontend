import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, POST, Body, GET, Path, Query, PUT, DELETE } from './core';

@Injectable({
  providedIn: 'root'
})
export class AnalyzeApiClientService extends HttpService {

  @POST('/analyzes')
  public analyzeText(@Body config: any): Observable<any> { return null; }
 
}
