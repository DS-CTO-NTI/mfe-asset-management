export class SiteImportedEnergy {
    id:number;
    commodityType:string= null;
    capacity:number;
    assets=new assets();
    memsMeasurementName:string=null;
    pointOfInterconnection:string='N';
    uom:string=null;
    memsEeSiteConfiguration={
      siteId:null
    }
  }
  
  export class assets{
    assetId: number=null;
  }
  
