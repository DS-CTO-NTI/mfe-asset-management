export class ModbusAdapter{
    modbusSlaveId:number;
    modbusAdapterSeq:number;
    port:number;
    isEnabled:string='N';
    isInternalSlave:boolean=false;
    status:string = 'Stopped';
    statusTime: Date;
    createdDate: Date;
    createUser: string;
    updatedDate: Date;
    updateUser: string;
    description: string;
    ip:string;
    name:string;
    slaveId:number;
    statusDateTime:Date;
    pollingSlaveFrequency:number;
    slave:string;
}


export class AlarmSlave{
    id:number;
    name:string;
    startAddress:string;
    endAddress:string;
}