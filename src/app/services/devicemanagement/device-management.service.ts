import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteData } from 'src/app/Models/site-data';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeviceManagementService {

  private siteData: SiteData = new SiteData();

  public setSiteData(siteData: SiteData) {
    this.siteData = siteData;
  }
  public getSiteData() {
    return this.siteData;
  }

  headers: HttpHeaders= new HttpHeaders();

  constructor(private http: HttpClient) { }

  public getAllDeviceTypes(): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getAllDeviceTypesUrl);
  }

  public getAllDeviceGroups(): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getAllDeviceGroupsUrl);
  }

  public getAllVendors(): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getAllVendorsUrl);
  }

  public getAllDevice(): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getAllDevicesUrl);
  }

   public getAllDeviceForGISMap(): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getAllDevicesUrl);
  }

   public getAllDeviceTreeForGIS(): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getAllDeviceTreeForGISUrl);
  }
 

  public getAllDevicesTree(req): Observable<any> {
    return this.http.get(environment.apiUrl+ UrlMappings.getAllDevicesTreeUrl,req);
  }

  public getAllDevicesType():Observable<any>{
    return this.http.get(environment.apiUrl+UrlMappings.getAllDeviceTypesDescUrl);
  }

  public getAllInputMeasurements(req): Observable<any> {
    return this.http.post(environment.apiUrl+UrlMappings.getAllSelectInputMeasurementUrl,req);
  }

  public getAllMeasurementsByDeviceTypeUrl(req): Observable<any>{
    return this.http.get(environment.apiUrl+UrlMappings.getAllMeasurementsByDeviceTypeUrl(req));
  }

  public getMemsDeviceStatusCode(status): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getMemsDeviceStatusCodeUrl(status));
  }

  public getDeviceTypesByVendor(vendorSeq): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getDeviceTypeByVendorUrl(vendorSeq));
  }

  public getAttributesByDeviceSeq(seq): Observable<any> {
    return this.http.get(environment.apiUrl+ UrlMappings.getAttributesByDeviceSeqUrl(seq));
  }

  public createUpdateDevice(device): Observable<any> {
    return this.http.post(environment.apiUrl+UrlMappings.createUpdateDeviceUrl, device, {headers: this.headers});
  }

  public deleteDevice(id): Observable<any> {
    return this.http.delete(environment.apiUrl+UrlMappings.deleteDeviceUrl(id));
  }

  public getMemsDeviceStatus(): Observable<any> {
    return this.http.get(environment.apiUrl+UrlMappings.getMemsDeviceStatusUrl);
  }

  public getPictureByDeviceId(req): Observable <any>{
    return this.http.post(environment.apiUrl+UrlMappings.getPictureByDeviceIDUrl,req)
  }

  public getNoteByDeviceId(req):Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getNoteByDeviceIdUrl,req)
  }

  public getCalRulesByDeviceId(req): Observable<any>{
    return this.http.post(environment.apiUrl+UrlMappings.getCalRulesByDeviceIdurl,req)
    }

    public getMemsDeviceStatusGroup(): Observable<any> {
      return this.http.get(environment.apiUrl+UrlMappings.getMemsDeviceStatusGroupUrl);
    }

  public importDeviceConfigurationCSV(file, username): Observable<any> {
    let formData= new FormData();
    formData.append("file", file);
    formData.append("userName", username);
    return this.http.post(environment.apiUrl+UrlMappings.importDeviceConfigurationCSVUrl, formData);
  }

  public getDeviceAnalogDataLatest(deviceId): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getDeviceAnalogDataLatestUrl(deviceId));
  }

  public getGraphData(deviceId): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getGraphDataUrl(deviceId));
  }

  public getDevicesByHierarchyAssetClass(req): Observable<any> {    
    return this.http.get(environment.apiUrl + UrlMappings.getAllDevicesTreeUrl +req);
  }

 public getAllInterfaces(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllInterfacesUrl);
  }

 public getParentIdByAssetClass(req): Observable<any> {    
    return this.http.get(environment.apiUrl + UrlMappings.getByAssetClass + req);
  }

   public createAsset(device): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.createAssetUrl, device, { headers: this.headers });
  }

  public updateAsset(device): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateAssetUrl, device, { headers: this.headers });
  }

  public getDevicesAndMeasurementsByHierarchy(req): Observable<any> {
    return this.http.get(environment.apiUrl+ UrlMappings.getDevicesAndMeasurementsByHierarchy +req);
  }
}
