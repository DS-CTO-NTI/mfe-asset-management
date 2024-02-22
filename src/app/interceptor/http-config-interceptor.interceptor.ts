import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  public controllerName :string = 'na';
  constructor(private router: Router,private route: ActivatedRoute) {
    this.controllerName = (this.route.snapshot.data['controllerName']);
    console.log(this.controllerName);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
  let dbName = sessionStorage.getItem('dbName');
  let loclstrgitem = sessionStorage.getItem(this.controllerName+'-dbName');
  if ( !dbName && loclstrgitem != null) {
    dbName = loclstrgitem
  }

    let str = window.location.href;
    var array = str.split("#");
    let defDb=JSON.parse(sessionStorage.getItem(this.controllerName+'-databaseNames'));
  
    if(array[1] == '/user-management') {
      if(defDb!=null){
      dbName = sessionStorage.getItem('dbName') ? defDb[0]: defDb[0];
      }
    } 
   if(request.params.get('setpointsApi') ){
      request.params.delete('setpointsApi')
      dbName = sessionStorage.getItem(this.controllerName+'-poiSetpointDBSelected') ;
    }else if(request.params.get('getAllInverterAPI')){
      request.params.delete('getAllInverterAPI')
      dbName = sessionStorage.getItem('ppc-inverterDB') ;
    } 

    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer' + ' ' + sessionStorage.getItem(this.controllerName+'-authToken'),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Access-Control-Allow-Origin': '*',
        'defaultDb':this.controllerName,
        'database': dbName,
        'hostDB': this.controllerName,
        applicationId: '6',
      }
    });

    return next.handle(request).pipe(map(event => {
      return event;
    }), catchError(err => {
      if (err.status === 401) {  
        sessionStorage.clear();
        this.router.navigate(["/"]);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }),
      finalize(() => {
      })
    )
  }
}


