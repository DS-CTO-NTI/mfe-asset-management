import { DeviceType } from "./device-type";

export class DeviceTypeAttributes {
    createDate:Date;
    createUser:string;
    dataType:string= null;
    timestampType:string= null;
    description:string;
    logicalAttrName: string= null;
    physicalAttrName: string;
    unitOfMeasurement:string=null;
    updateDate:string;
    updateUser:string
    usedInoptimization:string = 'N';
    assetTypes: DeviceType= new DeviceType();
    orderSeq:number;
    id: number;
    uom:string;
}
