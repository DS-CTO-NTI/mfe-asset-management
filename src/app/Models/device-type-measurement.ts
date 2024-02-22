import { DeviceType } from "./device-type";

export class DeviceTypeMeasurement {
    uom:string = null;
    assetTypes: DeviceType= new DeviceType();
    id: number;
    assetMeasurementName:string;
    displayMeasurementName:string;
    measurementType:string = null;
    assetTagName:string;
    updateDate:Date;
    updateUser:string;
    createUser:string;
    createDate:Date;
    generateConsumptionData: string = "N";
    consumptionMeasurementName: string= "";
    consumptionOffset: number;
    assetMeasurementExtended;
}
