import { Device } from "./device";
import { ModbusAdapter } from "./modbus-adapter";

export class AnalogOutput {
    analogOutputId: number;
    memsDevice:Device;
    pointName:string;
    pointDescription:string;
    functionCode:string;
    address:number;
    startByte:number;
    dataLength:number;
    registerValue:string;
    writeFunctionCode:string;
    priority:string;
    scalingFactor:string;
    memsModbusAdapter:ModbusAdapter= new ModbusAdapter();
}
