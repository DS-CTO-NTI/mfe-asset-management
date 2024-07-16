import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InverterService {

  constructor(private http: HttpClient) { }

  public getAllInverters(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllInverters);
  }

  public saveInverterSettings(inverterSetting): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.saveInverterSetting, inverterSetting);
  }

  public getAllInvertersSettings(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllInverterSettings);
  }

  public getInverterSettingById(id): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllInverterSettingsByInverterId + id);
  }

  getPlantSettings(id): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllPlantSettings +"/"+ id);
  }

  public savePlantSetting(plantSetting): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.savePlantSettings, plantSetting);
  }

  changeInverterStatus(status,id):  Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateStatusById+'?status='+status+'&id='+id, null);
  }

  changeInvertersStatusById(status,id):  Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateInvertersById+status, id);
  }

  addInverters(body): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.createInverters, body);
  }

  saveDraftSettings(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.saveDraftConfigFile);
  }

  saveSettings(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.saveConfigFile);
  }

  resetSettings(type): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.resetSettings + type);
  }

}
