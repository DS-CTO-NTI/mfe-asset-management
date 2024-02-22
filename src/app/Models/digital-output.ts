import { Device } from "./device";
import { DigitalInput } from "./digital-input";
import { ModbusAdapter } from "./modbus-adapter";

export class DigitalOutput {
    digitalOutputId: number;
    memsDevice:Device;
    pointName:string;
    pointDescription:string;
    functionCode:string;
    address:number;
    bitPosition:number;
    controlMethod:string;
    count:number;
    onTime:number;
    offTime:number;
    memsModbusDigitalInput= new DigitalInput() ;
    scalingFactor:string;
    memsModbusAdapter:ModbusAdapter= new ModbusAdapter();
}
