import { Device } from "./device";
import { ModbusAdapter } from "./modbus-adapter";

export class DigitalInput {
    digitalInputId: number;
    memsDevice:Device;
    pointName:string;
    pointDescription:string;
    functionCode:string;
    address:number;
    bitPosition:number;
    priority:string;
    scalingFactor:string;
    memsModbusAdapter:ModbusAdapter= new ModbusAdapter();
}
