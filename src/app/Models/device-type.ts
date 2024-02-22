import { MemsVendors } from "./mems-vendors";

export class DeviceType {
    createTimestamp:Date;
    createUser:string;
    description:string;
    assetTypeName:string = null;
    assetTypeSeq:number = null;
    assetTypeVer:number;
    symbol: string;
    updateDate: Date;
    updateUser: string;
    vendors: MemsVendors= new MemsVendors();
    imageSymbol: string;
    isVirtual :string = 'N';
}
