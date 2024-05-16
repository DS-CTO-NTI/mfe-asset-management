import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeManagementService {
  headers: HttpHeaders= new HttpHeaders();

  constructor(private http: HttpClient) { }

  public getAllDeviceTypes(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllDeviceTypesDescUrl);
  }

  public saveDeviceType(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.saveDeviceTypesUrl, req);
  }

  public updateDeviceType(req): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateDeviceTypesUrl, req);
  }

  public getByDeviceTypes(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getByDeviceTypesUrl(req));
  }

  public saveDeviceTypeAttributes(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.saveDeviceAttributesUrl, req);
  }

  public updateDeviceTypeAttributes(req): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateDeviceAttributesUrl, req);
  }

 public deleteDeviceTypeAttributes(req): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteDeviceAttributesUrl,req);
  }

  public getAllDeviceGroup(): Observable<any> {
    return this.http.get(environment.baseUrl + UrlMappings.getAllDeviceGroup);
  }

  public saveDeviceGroup(req): Observable<any> {
    return this.http.post(environment.baseUrl + UrlMappings.saveDeviceGroup , req);
  }

  public updateDeviceGroup(req): Observable<any> {
    return this.http.put(environment.baseUrl + UrlMappings.updateDeviceGroup,req);
  }

  public deleteDeviceGroupType(req): Observable<any> {
    return this.http.delete(environment.baseUrl + UrlMappings.deleteDeviceGroupType(req));
  }

  public getAllDeviceTypeGroup(): Observable<any> {
    return this.http.get(environment.baseUrl + UrlMappings.getAllDeviceTypeGroup);
  }

  public saveGroupType(req): Observable<any> {
    return this.http.post(environment.baseUrl + UrlMappings.saveGroupType , req);
  }

  public deleteDeviceGroup(req): Observable<any> {
    return this.http.delete(environment.baseUrl + UrlMappings.deleteDeviceGroup(req));
  }

  public importDeviceTypeCSV(file, user): Observable<any> {
    let formData= new FormData();
    formData.append("file", file);
    formData.append("userName", user);
    return this.http.post(environment.apiUrl + UrlMappings.importDeviceTypeCSVUrl, formData);
  }

  public importDeviceTypeAttrCSV(file, assetTypeSeq): Observable<any> {
    let formData= new FormData();
    formData.append("file", file);
    formData.append("deviceTypeSeq", assetTypeSeq);
    return this.http.post(environment.apiUrl + UrlMappings.importDeviceTypeAttrCSVUrl, formData);
  }
  public importDeviceTypeMeasurementCSV(file,deviceTypeSeq): Observable<any>{
    let formData= new FormData();
    formData.append("file",file);
    formData.append("deviceTypeSeq", deviceTypeSeq);
    return this.http.post(environment.apiUrl+UrlMappings.importDeviceTypeMeasurementCSVUrl,formData)
  }

  public getAllMeasurementByDeviceType(req):Observable<any>{
    return this.http.get(environment.apiUrl+UrlMappings.getAllMeasurementsByDeviceTypeUrl(req));
  }

  public saveDeviceMeasurement(req) :Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.saveDeviceMeasurmentsUrl,req);
  }

  public updateDeviceMeasurement(req): Observable<any>{
    return this.http.put(environment.apiUrl+UrlMappings.updateDeviceMeasurementUrl,req);
  }

  public deleteDeviceMeasurement(req):Observable<any>{
    return this.http.delete(environment.apiUrl+UrlMappings.deleteDeviceMeasurementUrl(req));
  }

  public deleteMeasurement(req):Observable<any>{
    return this.http.delete(environment.apiUrl+UrlMappings.deleteMeasurementByIdUrl,req)
  }

public getAlldeviceVendors(siteId): Observable<any>{
    return this.http.get(environment.apiUrl+UrlMappings.getAlldeviceVendorsUrl(siteId));
  }

  public getAlldevicevendorsById(req):Observable<any>{
    return this.http.get(environment.apiUrl+UrlMappings.getAlldevicevendorsByIdUrl(req));
  }

  public saveDeviceVendors(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.saveDeviceVendorsUrl,req);
  }
   
  public deleteDeviceVendor(req):Observable<any>{
    return this.http.delete(environment.apiUrl+UrlMappings.deleteDeviceVendorUrl(req));
  }

 public deleteDeviceType(req):Observable<any>{
    return this.http.delete(environment.baseUrl+UrlMappings.deleteDeviceTypeUrl(req));
  }

}
