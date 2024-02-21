import { MemsDeviceType, MemsSystemCategory, MemsSystemType, MemsVendors } from "./drop-down-models";


export class Interface {
    systemInterfaceSeq: number;
    interfaceName: string;
    memsDeviceType= new MemsDeviceType();
    memsVendors= new MemsVendors();
    memsSystemCategory= new MemsSystemCategory();
    memsSystemType= new MemsSystemType;
    protocol: string= null;
    description: string;
    createDate:Date;
    createUser:string;
    updateDate:Date;
    updateUser:string;
}
