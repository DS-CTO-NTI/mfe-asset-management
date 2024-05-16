/**
* SRS is part of L&T SPARK Digital Energy Platform
* (c)2021-2024, L&T ECC (PT&D Digital Solutions, and its affiliates and assigns and licensors
* All rights reserved
* L&T Construction is a Parent Company of L&T PT&D Digital Solutions.
* No claim to copyright is made for original U.S. Government Works.
**/
export class reportmanagement {
    reportId:number;
    reportName:string;
    periodRunFrequency:string='Daily';
    isScheduled:string;
    reportStatus:string;
    nextRun:Date;
    lastRun:Date;
    outputFileFormat:string=null;
    runDay:number=null;
    runTime:string;
    reportPeriod:string;
    deviceIds:string;
    //measurements:string;
    createdBy:string;
    createdDate:Date;
    updatedBy:string;
    updatedDate:Date;
    reportTemplates=new reportTemplates();
    cronSchedule:string;
    deviceTypeName:string;
    outputLocation:string;
}

export class reportTemplates{
  templateId:number=null;
  templateName:string=null
}

