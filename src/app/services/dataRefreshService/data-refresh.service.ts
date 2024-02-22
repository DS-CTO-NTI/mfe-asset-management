import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRefreshService {

  private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  public isDBChanged: BehaviorSubject<string> = new BehaviorSubject<string>("hems");

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendControllerDetails(data: any) {
    this.subject.next({ data: data });
  }

  getControllerDetails(): Observable<any> {
    return this.subject.asObservable();
  }

  sendControllerSetting(data: any) {
    this.subject1.next({ data: data });
  }

  getControllerSetting(): Observable<any> {
    return this.subject1.asObservable();
  }
}
