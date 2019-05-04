import { Injectable } from '@angular/core';

import { Router, RouterStateSnapshot } from '@angular/router';
import { throwError, Observable } from 'rxjs';


@Injectable()
export class HttpResponseHandler {
  constructor(private router: Router
  ) { }

  /**
   * Global http error handler.
   *
   * @param error
   * @param source
   * @returns {ErrorObservable}
   */
  public onCatch(response: any, source: Observable<any>): Observable<any> {
    switch (response.status) {
      case 400:
        return this.handleBadRequest(response);

      case 401:
        return this.handleUnauthorized(response);

      case 403:
        return this.handleForbidden();

      case 404:
        return this.handleNotFound(response);

      case 0:
      case 500:
        return this.handleServerError();

      default:
        break;
    }
  }

  /**
   * Shows notification errors when server response status is 401
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): Observable<any> {
    if (responseBody._body) {
      try {
        var bodyParsed = responseBody.json();
        this.showNotificationError('خطا', bodyParsed.message);
        return throwError(bodyParsed.message);
      } catch (error) {
        this.handleServerError();
      }
    }
    else if (responseBody.error){
      try {
        this.showNotificationError('خطا', responseBody.error.message);
        return throwError(responseBody.error.message);
      } catch (error) {
        this.handleServerError();
      }
    }
    else this.handleServerError();
    return throwError(responseBody);
  }

  /**
   * Shows notification errors when server response status is 401 and redirects user to login page
   *
   * @param responseBody
   */
  private handleUnauthorized(responseBody: any): Observable<any> {
    let message = "به این بخش دسترسی ندارید.";
    if (responseBody.error) {
      try {
        // var bodyParsed = responseBody.error.json();
        if (responseBody.error.message) {
          message = responseBody.error.message;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        }
        this.showNotificationError('خطا', message);
        return throwError(message);
      } catch (error) {
        this.handleServerError();
      }
    }
    return throwError("به این بخش دسترسی ندارید.");
  }

  /**
   * Shows notification errors when server response status is 403
   */
  private handleForbidden(): Observable<any> {
    let message = "به این بخش دسترسی ندارید.";
    this.showNotificationError('خطا', "به این بخش دسترسی ندارید.");
    return throwError(message);
  }

  /**
   * Shows notification errors when server response status is 404
   *
   * @param responseBody
   */
  private handleNotFound(responseBody: any): Observable<any> {
    let message = "صفحه مورد نظر یافت نشد.";
    this.showNotificationError('خطا', message)
    // this.router.navigate(['/not-found']);
    return throwError(message);
  }

  /**
   * Shows notification errors when server response status is 500
   */
  private handleServerError(): Observable<any> {
    let message = "خطایی در سیستم رخ داده است";

    this.showNotificationError('خطا', message);
    return throwError(message);
  }

  /**
   * Shows error notification with given title and message
   *
   * @param title
   * @param message
   */
  private showNotificationError(title: string, message: string): void {
    console.log(title, message)
  }
}
