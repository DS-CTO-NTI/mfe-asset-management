import { AssetNotes } from "./asset-notes";
import { AssetPicture } from "./asset-picture";
import { MemsDeviceVirtualCalcRules } from "./mems-device-virtual-calc-rules";

export class Device {
    id(id: any) {
        throw new Error("Method not implemented.");
      }
      assetId: string;
      assetIpaddr: string;
      assetUserid: string;
      assetPassword: string;
      assetName: string;
      assetAlias: string;
      description: string;
      location: string;
      parentAssetid: string=null;
      altParentAssetid: string;
      assetRecordVer: string;
      assetAccessType: string;
      assetAccessPort: number;
      installationDate: Date;
      registrationTs: Date;
      provisioningTs: Date;
      groupSeq: number=null;
      vendorSeq: number;
      assetTypeSeq: number;
      latitude: string;
      longitude: string;
      geoX: number;
      geoY: number;
      altitude: string;
      attribute01: string;
      attribute02: string;
      attribute03: string;
      attribute04: string;
      attribute05: string;
      attribute06: string;
      attribute07: string;
      attribute08: string;
      attribute09: string;
      attribute10: string;
      attribute11: string;
      attribute12: string;
      attribute13: string;
      attribute14: string;
      attribute15: string;
      attribute16: string;
      attribute17: string;
      attribute18: string;
      attribute19: string;
      attribute20: string;
      attribute21: string;
      attribute22: string;
      attribute23: string;
      attribute24: string;
      attribute25: string;
      attribute26: string;
      attribute27: string;
      attribute28: string;
      attribute29: string;
      attribute30: string;
      attribute31: string;
      attribute32: string;
      attribute33: string;
      attribute34: string;
      attribute35: string;
      attribute36: string;
      attribute37: string;
      attribute38: string;
      attribute39: string;
      attribute40: string;
      attribute41: string;
      attribute42: string;
      attribute43: string;
      attribute44: string;
      attribute45: string;
      attribute46: string;
      attribute47: string;
      attribute48: string;
      attribute49: string;
      attribute50: string;
      createUser: string;
      createDate: Date;
      updateUser: string;
      updateDate: Date;
      assetsVirtualCalcRules: MemsDeviceVirtualCalcRules[] = [];
      assetPicture: AssetPicture[] = [];
      assetNotes: AssetNotes[] = [];
      assetTz: string = null;
      isVirtual: string;
      adapterSeq: number = null;
      systemInterfaceSeq: number = null;
      siteId: number;
      assetClass: string=null;
      parentCommAssetId: string;
      parentElecAssetId: string;
      systemInterface:string;
      protocol:string;
      adapter:string;
    }
    
    