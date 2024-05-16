import { Device } from "./device";
import { ModbusAdapter } from "./modbus-adapter";

export class Counters {
    counterId: number;
    memsDevice:Device;
    pointName:string;
    pointDescription:string;
    functionCode:string;
    address:number;
    startByte:number;
    dataLength:number;
    registerValue:string;
    priority:string;
    memsModbusAdapter:ModbusAdapter= new ModbusAdapter();
}
