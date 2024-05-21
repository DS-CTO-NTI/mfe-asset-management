import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemAdapterService {

 // readonly pages: Routes = this.router.config;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }
 
  public getAsciiBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getAsciiBySystemInterfaceSeqUrl,req)
  }

  public getDatabseBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getDatabseBySystemInterfaceSeqUrl,req)
  }

  public getDnpBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getDnpBySystemInterfaceSeqUrl,req)
  }

  public getModbusBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getModbusBySystemInterfaceSeqUrl,req)
  }

  public getMqttBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getMqttBySystemInterfaceSeqUrl,req)
  }

  public getOpcuaBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getOpcuaBySystemInterfaceSeqUrl,req)
  }

  public getOcppBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getOcppBySystemInterfaceSeqUrl,req)
  }

  public getRteBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getRteBySystemInterfaceSeqUrl,req)
  }

  public getSnmpBySystemInterfaceSeq(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getSnmpBySystemInterfaceSeqUrl,req)
  }
}

