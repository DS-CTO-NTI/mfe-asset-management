import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModbustcpService {

  constructor(private http: HttpClient) { }

  //Modbus Adapter
  public getAllModbusAdapter(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllModbusAdapterUrl);
  }

  public saveModbusAdapter(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.saveModbusAdapterUrl, req);
  }

  public updateModbusAdapter(req): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateModbusAdapterUrl, req);
  }

  //Analog Input
  public sendAnalogInputFile(importAnalogInputFile: File, modbusAdapterSeq): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("file", importAnalogInputFile);
    formData.append("id", modbusAdapterSeq);
    return this.http.post(environment.apiUrl + UrlMappings.analogInputfileUploadUrl, formData);
  }

  public updateModbusAnalogInput(req): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateModbusAnalogInputUrl, req);
  }

  public getAllModbusDigitalInput(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.getAllModbusDigitalInputUrl, req);
  }

  headerOptions

  public uploadReadAssetMap(modbusAdapterSeq, importDigitalInputFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("id", modbusAdapterSeq);
    formData.append("file", importDigitalInputFile);
    return this.http.post(environment.apiUrl + UrlMappings.uploadReadAssetMap, formData);
  }

  public uploadWriteAssetMap(modbusAdapterSeq, importDigitalInputFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("id", modbusAdapterSeq);
    formData.append("file", importDigitalInputFile);
    return this.http.post(environment.apiUrl + UrlMappings.uploadWriteAssetMap, formData);
  }

  public updateModbusAnalogOutput(req): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateModbusAnalogOutputUrl, req);
  }

  public getAllReadMapByModbusId(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllReadMapByModbusId(req));
  }

  public getAllWriteMapByModbusId(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllWriteMapByModbusId(req));
  }

  public getJsonFile(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.jsonFile);
  }

  public getAllMinMaxValuesUrl(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllMinMaxValuesUrl);
  }

  public getCodeType(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.getByCodeTypeUrl, req);
  }

  public deleteModbusSlave(req): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteModbusSlave(req));
  }

  public deleteReadRegister(req): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteReadRegister(req));
  }

  public deleteWriteRegister(req): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteWriteRegister(req));
  }

  public validateReadRegisterMapping(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.validateReadRegisterMapping(req));
  }

  public validateWriteRegisterMapping(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.validateWriteRegisterMapping(req));
  }

  public enableModbusAdapter(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.enableModbusAdapterUrl(req), req);
  }

  public getReadRegisterValueBySlaveID(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getReadRegisterValueBySlaveID(req));
  }

  public getWriteRegisterValueBySlaveID(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getWriteRegisterValueBySlaveID(req));
  }

  public SaveReadRegister(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.SaveReadRegisterUrl, req);
  }

  public SaveAllReadRegister(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.SaveAllReadRegisterUrl, req);
  }

  public SaveWriteRegister(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.SaveWriteRegisterUrl, req);
  }

  public SaveAllWriteRegister(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.SaveAllWriteRegisterUrl, req);
  }

  public getAllDevicesWithType(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllDeviceWithTypeUrl);
  }

  public SaveAllDevices(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.SaveAllDevicesUrl, req);
  }

  public deleteModbusSlaveAssetsIn(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.deleteModbusSlaveAssetsIn, req);
  }

  public deleteAllAssociatedAssetsByServer(req): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteAllAssociatedAssetsByServer(req));
  }

  public getDropDownData(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getHmiDropdownDataUrl);
  }

  public getAssetByAssetId(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAssetByAssetIdUrl(req));
  }

  public cloneModbusSlave(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.cloneModbusSlave, req);
  }

  public deleteUploadedDataForRead(req): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteUploadedDataForReadUrl(req));
  }

  public deleteUploadedDataForWrite(req): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteUploadedDataForWriteUrl(req));
  }

  public getAllInternalSlave(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllInternalSlaveUrl);
  }

  public updateInternalSlave(req,id): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateInternalSlavesData(id), req);
  }

  public getInputRegisterByInternalSlaveID(req): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getInputRegisterByInternalSlaveID(req));
  }

  public saveInternalSlavesData(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.saveInternalSlavesDataurl, req);
  }

  public saveInternalH2SlaveData(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.saveInternalH2SlaveDataUrl, req);
  }

  public getAllDevices(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllDevicesUrl);
  }

  public saveAlarmSlave(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.saveAlarmSlave, req);
  }

  public updateAlarmSlave(req, id): Observable<any> {
    return this.http.put(environment.apiUrl + UrlMappings.updateAlarmSlave(id), req);
  }

  public getMeasurementListByDevice(req): Observable<any> {
    return this.http.post(environment.apiUrl + UrlMappings.getMeasurementListByDeviceInMeasurementDataUrl(req), null);
  }

  public deleteOtherAlarmSlave(id): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteOtherAlarmSlave(id), id);
  }

  public deleteOtherSlave(id): Observable<any> {
    return this.http.delete(environment.apiUrl + UrlMappings.deleteOtherSlave(id), id);
  }

  public getAllAlarmSlave(): Observable<any> {
    return this.http.get(environment.apiUrl + UrlMappings.getAllAlarmSlave);
  }

}
