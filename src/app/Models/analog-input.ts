import { ModbusAdapter } from "./modbus-adapter";

export class AnalogInput {
    binaryRead:string;
   commFlag:string;
   commValue:number;
   description:string;
   functionCode:number;
   id:number;
   mask:number;
   modbusId:ModbusAdapter= new ModbusAdapter();
   register:number;
   scalingFactor:number;
   size:number;
}
