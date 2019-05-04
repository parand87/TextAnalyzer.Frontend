import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpRequest
} from '@angular/common/http';
// import { Observable }           from 'rxjs/Observable';
import { HttpResponseHandler } from './http-response-handler.service';
import { HttpAdapter } from './http.adapter';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA
}

@Injectable()
export class HttpService {
  public constructor(
    protected http: HttpClient,
    protected responseHandler: HttpResponseHandler,
    @Inject(PLATFORM_ID) private platformId: string) {
  }

  public getBaseUrl(): string {
    return "http://localhost:8863/api";
  }

  protected getDefaultHeaders(): Object {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  /**
  * Request Interceptor
  *
  * @method requestInterceptor
  * @param {any} req - request object
  */
  protected requestInterceptor(req: any) {
  }

  /**
  * Response Interceptor
  *
  * @method responseInterceptor
  * @param {Response} observableRes - response object
  * @returns {Response} res - transformed response object
  */
  protected responseInterceptor(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
    return observableRes
      .pipe(
        map(res => HttpAdapter.baseAdapter(res, adapterFn))
        ,
        catchError((err, source) => this.responseHandler.onCatch(err, source))
      )
  }
}
