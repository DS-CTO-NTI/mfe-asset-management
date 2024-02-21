/**
* SRS is part of L&T SPARK Digital Energy Platform
* (c)2021-2024, L&T ECC (PT&D Digital Solutions, and its affiliates and assigns and licensors
* All rights reserved
* L&T Construction is a Parent Company of L&T PT&D Digital Solutions.
* No claim to copyright is made for original U.S. Government Works.
**/
import { ReportRunResult } from "./ReportRunResult";

export class ReportMessageLogs {

    id: number;
    logTimestamp: Date;
    logMessageType: string;
    logMessageText: string;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    memsReportsRunControl: ReportRunResult= new ReportRunResult();
}