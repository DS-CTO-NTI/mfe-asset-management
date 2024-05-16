/**
* SRS is part of L&T SPARK Digital Energy Platform
* (c)2021-2024, L&T ECC (PT&D Digital Solutions, and its affiliates and assigns and licensors
* All rights reserved
* L&T Construction is a Parent Company of L&T PT&D Digital Solutions.
* No claim to copyright is made for original U.S. Government Works.
**/
export class ReportTemplate {
    templateId:number;
    templateName:string;
    templateDescription:string;
    isEnabled:string='N';
    statusDate:Date;
    dataInterval :string= null;
    aggregateMethod:string = "None";
    reportsHeader:string;
    //reportFor:string= "Device Measurements";
    groupByColumns: string = "";
    displayCoulmns: string = "";
    createdBy:string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    insertReportTemplate:string= 'Y';
    insertReportGenerationDatetime:string= 'Y';
    includeHeader:string= 'Y';
    outputTemplateFileLocation:string;
    firstRowIndex:number=5;
    dataProtocol: string;
    reportTemplateMeasurement:reportTemplateMeasurement[]=[];

}

 export class reportTemplateMeasurement{
    id:number;
    measField:string;
    measOrder:number;
   
}