import { Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid-community';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ToastrService } from 'ngx-toastr';
import { DeviceType } from 'src/app/Models/device-type';
import { DeviceTypeAttributes } from 'src/app/Models/device-type-attributes';
import { DeviceTypeMeasurement } from 'src/app/Models/device-type-measurement';
import { MemsVendors } from 'src/app/Models/mems-vendors';
import { DeviceManagementService } from 'src/app/services/devicemanagement/device-management.service';
import { DeviceTypeManagementService } from 'src/app/services/devicetypemanagement/device-type-management.service';
import { ModbustcpService } from 'src/app/services/modbustcp/modbustcp.service';
import { TablefilterserviceService } from 'src/app/services/tableFilterService/tablefilterservice.service';
import { TranslateService } from '@ngx-translate/core';
import { AgGridFileuploadButtonComponent } from 'src/app/components/ag-grid-fileupload-button/ag-grid-fileupload-button.component';
import { AgGridThumbnailComponent } from 'src/app/components/ag-grid-thumbnail/ag-grid-thumbnail.component';
import { DeviceTypeMeasurementValidationError } from 'src/app/Models/device-type-measurement-validation-error';
import { DeviceTypeAttrValidationErrors } from 'src/app/Models/device-type-attr-validation-errors';
import { DeviceTypeValidationErrors } from 'src/app/Models/device-type-validation-errors';
import { DataRefreshService } from 'src/app/services/dataRefreshService/data-refresh.service';
import { Subscription } from 'rxjs';
//import { ContextMenuFixService } from 'src/app/services/context-menu-fix.service';
import { ContextMenuService } from 'ngx-contextmenu';

@Component({
  selector: 'app-asset-vendors',
  templateUrl: './layout/asset-vendors.component.html',
  styleUrls: ['./layout/asset-vendors.component.scss']
})
export class AssetVendorsComponent implements OnInit, OnDestroy {

  selectedLangVariable = { noRowsToShow: "" };
  language;
  name;
  name1;
  loading = false;
  loading1 = false;
  isCollapsed = false;
  isCollapsed1 = false;
  isCollapsed5 = false;
  public selectedFileName;
  public nodatatable;
  public deviceTypeTableFilter;
  public deviceVendorsTableFilter;
  public deviceTypeAttributesTableFilter;
  public measurementsTableFilter;
  public rowClassRuleDeviceTypeTable;
  public rowClassRuleDeviceVendorsTable;
  public rowClassRuleDeviceGroupTypeTable;
  public rowClassDeviceTypeAttributesTable;
  public rowClassRuleMeasurementsAttributesTable;
  public rowClassRuleDeviceGroupTable;
  public contextRow;
  public contextRowAttributes;
  public contextRowMeasurement;
  public deviceTyperowData = [];
  public deviceVendorsrowData = [];
  public deviceTypeList: DeviceType[] = [];
  public deviceTypeAttributesrowData = [];
  public vendorList: MemsVendors[] = [];
  public dataTypeList = [];
  public timeStampList = [];
  public logicalAttrNameList = [];
  public deviceTypeAttributesList = [];
  public validationErrors = [];
  public measurementsAttributesrowData = [];
  public measurementDataList = [];
  public filteredMeasurementDataList = [];
  public deviceMeasurementList = [];
  public newDeviceTypeSymbolFileName = null;
  public editDeviceTypeTable = false;
  public newDeviceFlexAttribute = new DeviceTypeAttributes();
  public selectedDevice = new DeviceType();
  public selectedDeviceAttributes = new DeviceTypeAttributes();
  public newDeviceMeasurement = new DeviceTypeMeasurement();
  public selectedDeviceMeasurement = new DeviceTypeMeasurement();
  public newDeviceType = new DeviceType();
  public componentsDeviceTypeTable = { numericCellEditor: this.getNumericCellEditor() };
  public newDeviceTypeSymbolFile: File;
  public patternA = "^[a-zA-Z0-9_]*$";
  public pattern = "^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$";
  public gridFilterData: any;
  public gridStateData: any;
  public gridSortData: any;
  public assetrTypeTab: number = 0;
  public mainTabIndex = 0;
  public subTabIndex = 0;
  form: FormGroup;
  public isEnumeration = false;

  public editGroupTypeTable = false;
  public selectedDeviceGroupType = new DeviceGroupType();
  public newDeviceGroupType = new DeviceGroupType();
  public contexrowDeviceGroupType = new DeviceGroupType();
  public enumerationForm;

  private dbSubscription: Subscription;

  @HostListener("window:resize")

  @ViewChild("DeviceTypeGrid") DeviceTypeGrid: AgGridAngular;
  @ViewChild("DeviceVendorsGrid") DeviceVendorsGrid: AgGridAngular;
  @ViewChild("measurementsAttributesGrid") measurementsAttributesGrid: AgGridAngular;
  @ViewChild("DeviceTypeAttributesGrid") DeviceTypeAttributesGrid: AgGridAngular;
  @ViewChild("DeviceTypeGrid", { read: ElementRef }) DeviceTypeGridEl: ElementRef;
  @ViewChild("DeviceVendorsGrid", { read: ElementRef }) DeviceVendorsGridEl: ElementRef;
  @ViewChild("DeviceGroupGrid") DeviceGroupGrid: AgGridAngular;
  @ViewChild("DeviceGroupGrid", { read: ElementRef }) DeviceGroupGridEl: ElementRef;
  @ViewChild("measurementsAttributesGrid", { read: ElementRef }) measurementsAttributesGridEl: ElementRef;
  @ViewChild("DeviceTypeAttributesGrid", { read: ElementRef }) DeviceTypeAttributesGridEl: ElementRef;
  @ViewChild("deviceTypeAttributesContextMenu") deviceTypeAttributesContextMenu: ContextMenuComponent;
  @ViewChild("measurementsAttributesContextMenu") measurementsAttributesContextMenu: ContextMenuComponent;
 @ViewChild('deviceTypeContextMenu') deviceTypeContextMenu: ContextMenuComponent;
 // @ViewChild(ContextMenuComponent) public deviceTypeContextMenu1: ContextMenuComponent;
  @ViewChild("deviceVendorsContextMenu") deviceVendorsContextMenu: ContextMenuComponent;
  @ViewChild("adddeviceTypeModal") adddeviceTypeModal: ModalDirective;
  @ViewChild("addDeviceTypeAttributesModal") addDeviceTypeAttributesModal: ModalDirective;
  @ViewChild("updateDeviceTypeAttributesModal") updateDeviceTypeAttributesModal: ModalDirective;
  @ViewChild("deleteDeviceTypeAttributesModal") deleteDeviceTypeAttributesModal: ModalDirective;
  @ViewChild("editMeasurementsModal") editMeasurementsModal: ModalDirective;
  @ViewChild("deleteMeasurementModal") deleteMeasurementModal: ModalDirective;
  @ViewChild("importErrorModal") importErrorModal: ModalDirective;
  @ViewChild("showAddMeasurementsAttributesModal") showAddMeasurementsAttributesModal: ModalDirective;
  @ViewChild("importDeviceTypeCSV") importDeviceTypeCSV: ElementRef;
  @ViewChild("importDeviceTypeAttrCSV") importDeviceTypeAttrCSV: ElementRef;
  @ViewChild("importMeasurementsAttrCSV") importMeasurementsAttrCSV: ElementRef;
  @ViewChild("importSymbolData") importSymbolData: ElementRef;
  @ViewChild("deleteDeviceVendorModal") deleteDeviceVendorModal: ModalDirective;
  @ViewChild("deleteDeviceVendorErrorModal") deleteDeviceVendorErrorModal: ModalDirective;
  @ViewChild("MeasurementMappedValidation") MeasurementMappedValidation: ModalDirective;
  @ViewChild("deleteDeviceTypeModal") deleteDeviceTypeModal: ModalDirective;
  @ViewChild("deleteDeviceTypeErrorModal") deleteDeviceTypeErrorModal: ModalDirective;

  @ViewChild("editDeviceTypeModal") editDeviceTypeModal: ModalDirective;
  @ViewChild("deleteDeviceGroupModal") deleteDeviceGroupModal: ModalDirective;
  @ViewChild("deleteDeviceGroupTypeModal") deleteDeviceGroupTypeModal: ModalDirective;
  @ViewChild("deleteDeviceGroupErrorModal") deleteDeviceGroupErrorModal: ModalDirective;
  @ViewChild("deviceGroupTypeContextMenu") deviceGroupTypeContextMenu: ContextMenuComponent;
  @ViewChild("deleteDeviceGroupTypeErrorModal") deleteDeviceGroupTypeErrorModal: ModalDirective;
  @ViewChild("DeviceGroupTypeGrid") DeviceGroupTypeGrid: AgGridAngular;

  deviceGroupTypecolumnDefs = [
    {
      headerName: "Group Type",
      headerTooltip: "Group Type",
      field: "typeName",
      tooltipField: "typeName",
      editable: (node) => {
        return this.editGroupTypeTable;
      },
      width: 750
    }
  ];

  deviceTypecolumnDefs = [
    {
      headerName: "Asset Type ID",
      headerTooltip: "Asset Type ID",
      field: "assetTypeSeq",
      tooltipField: "assetTypeSeq"
    },
    {
      headerName: "Asset Type Name",
      headerTooltip: " Asset Type Name",
      field: "assetTypeName",
      tooltipField: "assetTypeName",
      editable: (node) => {
        return this.editDeviceTypeTable;
      }
    },
    {
      headerName: " Asset Type Version",
      headerTooltip: " Asset Type Version",
      field: "assetTypeVer",
      tooltipField: "assetTypeVer"
    },
    {
      headerName: "Vendor Name",
      headerTooltip: "Vendor Name",
      field: "vendors.vendorName",
      tooltipField: "vendors.vendorName"
    },
    {
      headerName: " Description",
      headerTooltip: " Description",
      field: "description",
      tooltipField: "description",
      editable: (node) => {
        return this.editDeviceTypeTable;
      }
    },
    {
      headerName: "Symbol",
      headerTooltip: "Symbol",
      field: "imageSymbol",
      tooltipField: "",
      cellRendererSelector: (params) => {
        if (this.editDeviceTypeTable) {
          console.log('if')
          return { component: 'agGridFileUploadButton' };
        } else {
          console.log('else')
          return { component: 'agGridThumbnail' };
        }
      },
      cellRendererParams: {
        domSanitizer: this.domSanitizer,
       
        
      },
    },
    {
      headerName: "Is Virtual",
      headerTooltip: "Is Virtual",
      field: "isVirtual",
      tooltipField: "isVirtual"
    },
    {
      headerName: "Created By",
      headerTooltip: "Created By",
      field: "createUser",
      tooltipField: "createUser"
    },
    {
      headerName: "Created Datetime",
      headerTooltip: "Created Datetime",
      field: "createDate",
      valueGetter: (node) => {
        if (node.data.createTimestamp) {
          return moment(node.data.createTimestamp).format('DD/MM/yyyy hh:mm:ss A')
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.createTimestamp) {
          return moment(node.data.createTimestamp).format('DD/MM/yyyy hh:mm:ss A')
        } else return null;
      }
    },
    {
      headerName: "Updated By",
      headerTooltip: "Updated By",
      field: "updateUser",
      tooltipField: "updateUser"
    },
    {
      headerName: "Updated Datetime",
      headerTooltip: "Updated Datetime",
      field: "updateTimestamp",
      valueGetter: (node) => {
        if (node.data.updateTimestamp) {
          return moment(node.data.updateTimestamp).format('DD/MM/yyyy hh:mm:ss A')
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.updateTimestamp) {
          return moment(node.data.updateTimestamp).format('DD/MM/yyyy hh:mm:ss A')
        } else return null;
      }
    }
  ];

  deviceVendorscolumnDefs = [
    {
      headerName: "ID",
      headerTooltip: "ID",
      field: "vendorSeq",
      tooltipField: "vendorSeq"
    },
    {
      headerName: "Vendor Name",
      headerTooltip: "Vendor Name",
      field: "vendorName",
      tooltipField: "vendorName"
    },
    {
      headerName: "Description",
      headerTooltip: "Description",
      field: "description",
      tooltipField: "description"
    },
    {
      headerName: "Address",
      headerTooltip: "Address",
      field: "vendorAddress",
      tooltipField: "vendorAddress"
    },
    {
      headerName: "Created By",
      headerTooltip: "Created By",
      field: "createUser",
      tooltipField: "createUser"
    },
    {
      headerName: "Created Datetime",
      headerTooltip: "Datetime",
      field: "createTimestamp",
      valueGetter: (node) => {
        if (node.data.createTimestamp) {
          return moment(node.data.createTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.createTimestamp) {
          return moment(node.data.createTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    },
    {
      headerName: "Updated By",
      headerTooltip: "Updated By",
      field: "updateUser",
      tooltipField: "updateUser"
    },
    {
      headerName: "Updated Datetime",
      headerTooltip: "Updated Datetime",
      field: "updateTimestamp",
      valueGetter: (node) => {
        if (node.data.updateTimestamp) {
          return moment(node.data.updateTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.updateTimestamp) {
          return moment(node.data.updateTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    }
  ];

  deviceTypeAttributescolumnDefs = [
    {
      headerName: "Logical Attribute Name",
      headerTooltip: "Logical Attribute Name",
      field: "logicalAttrName",
      tooltipField: "logicalAttrName",
      width: "350"
    },
    {
      headerName: "Physical Attribute Name",
      headerTooltip: "Physical Attribute Name",
      field: "physicalAttrName",
      tooltipField: "physicalAttrName",
      width: "370"
    },
    {
      headerName: "Order",
      headerTooltip: "Order",
      field: "orderSeq",
      tooltipField: "orderSeq",
      width: "300"
    },
    {
      headerName: "Data Type",
      headerTooltip: "Data Type",
      field: "dataType",
      tooltipField: "dataType",
      width: "320"
    },
    {
      headerName: " Timestamp Type",
      headerTooltip: " Timestamp Type",
      field: "timestampType",
      tooltipField: "timestampType",
      width: "320"

    }
  ];

  measurementsAttributescolumnDefs = [
    {
      headerName: "Measurement Name",
      headerTooltip: "Measurement Name",
      field: "assetMeasurementName",
      tooltipField: "assetMeasurementName",
      width: "260"
    },
    {
      headerName: "Display Measurement Name",
      headerTooltip: "Display Measurement Name",
      field: "displayMeasurementName",
      tooltipField: "displayMeasurementName",
    },
    {
      headerName: "Asset Tag Name",
      headerTooltip: "Asset Tag Name",
      field: "assetTagName",
      tooltipField: "assetTagName",
      width: "300"
    },
    {
      headerName: "UOM",
      headerTooltip: "UOM",
      field: "uom",
      tooltipField: "uom",
      width: "200"
    },
    {
      headerName: "Measurement Type",
      headerTooltip: "Measurement Type",
      field: "measurementType",
      tooltipField: "measurementType",
      width: "200"
    },
    {
      headerName: "Generate Consumption Data",
      headerTooltip: "Generate Consumption Data",
      field: "generateConsumptionData",
      tooltipField: "generateConsumptionData",
      width: "200"
    },
    {
      headerName: "Enumeration",
      headerTooltip: "Enumeration",
      valueGetter: (params) => {
        return this.generateInterpreteMap(params.data.assetMeasurementExtended)
      },
      tooltipValueGetter: (params) => {
        return this.generateInterpreteMap(params.data.assetMeasurementExtended)
      }
    },
    {
      headerName: "Consumption Measurement Name",
      headerTooltip: "Consumption Measurement Name",
      field: "consumptionMeasurementName",
      tooltipField: "consumptionMeasurementName",
      width: "250"
    },
    {
      headerName: "Consumption Offset",
      headerTooltip: "Consumption Offset",
      field: "consumptionOffset",
      tooltipField: "consumptionOffset",
      width: "250"
    }
  ];

  deviceGroupcolumnDefs = [
    {
      headerName: "ID",
      headerTooltip: "ID",
      field: "groupSeq",
      tooltipField: "groupSeq",
    },
    {
      headerName: "Group Name",
      headerTooltip: "Group Name",
      field: "groupName",
      tooltipField: "groupName",
    },
    {
      headerName: "Parent Group Name",
      headerTooltip: "Parent Group Name",
      field: "parentGroupSeqName",
      tooltipField: "parentGroupSeqName",
    },
    {
      headerName: "Type",
      headerTooltip: "Type",
      field: "groupType.typeName",
      tooltipField: "groupType.typeName",
    },
    {
      headerName: "Latitude",
      headerTooltip: "Latitude",
      field: "latitude",
      tooltipField: "latitude",
    },
    {
      headerName: "Longitude",
      headerTooltip: "Longitude",
      field: "longitude",
      tooltipField: "longitude",
    },
    {
      headerName: "Description",
      headerTooltip: "Description",
      field: "description",
      tooltipField: "description",
    },
    {
      headerName: "Created By",
      headerTooltip: "Created By",
      field: "createUser",
      tooltipField: "createUser",
    },
    {
      headerName: "Created Datetime",
      headerTooltip: "Datetime",
      field: "createTimestamp",
      valueGetter: (node) => {
        if (node.data.createTimestamp) {
          return moment(node.data.createTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.createTimestamp) {
          return moment(node.data.createTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    },
    {
      headerName: "Updated By",
      headerTooltip: "Updated By",
      field: "updateUser",
      tooltipField: "updateUser"
    },
    {
      headerName: "Updated Datetime",
      headerTooltip: "Updated Datetime",
      field: "updateTimestamp",
      valueGetter: (node) => {
        if (node.data.updateTimestamp) {
          return moment(node.data.updateTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.updateTimestamp) {
          return moment(node.data.updateTimestamp).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    }
  ];

  onResize() {
    setTimeout(() => {
      if (this.DeviceTypeGridEl.nativeElement.offsetWidth) {
        this.DeviceTypeGrid.api.sizeColumnsToFit();
      }

      if (this.DeviceTypeAttributesGridEl.nativeElement.offsetWidth) {
        this.DeviceTypeAttributesGrid.api.sizeColumnsToFit();
      }

      if (this.measurementsAttributesGridEl.nativeElement.offsetWidth) {
        this.measurementsAttributesGrid.api.sizeColumnsToFit();
      }

      if (this.DeviceVendorsGridEl.nativeElement.offsetWidth) {
        this.DeviceVendorsGrid.api.sizeColumnsToFit();
      }
    });
  }

  sizeColumsToFitDeviceGroup() {
    if (this.DeviceGroupGridEl.nativeElement.offsetWidth) {
      this.DeviceGroupGrid.api.sizeColumnsToFit();
    }
  }

  constructor(
    private contextMenuService: ContextMenuService,
    private tableFilterService: TablefilterserviceService,
    private deviceManagementService: DeviceManagementService,
    private toastrService: ToastrService,
    private devicetypemanagementService: DeviceTypeManagementService,
    private router: Router,
    public dialog: MatDialog,
    private modbustcpservice: ModbustcpService,
    private translate: TranslateService, private domSanitizer: DomSanitizer,
    private fb: FormBuilder, public dataRefreshService: DataRefreshService
  ) {
    this.form = fb.group({
      schedulePeriod: fb.array([])
    });

    // this.dbSubscription = this.dataRefreshService.isDBChanged.subscribe(value => {
    //   if (value) {
    //     this.onConstCall();
    //   }
    // });
    
    window.addEventListener('DbChange', (value => {
      console.log(value);
      if (value) {
        this.ngOnInit();
      }
    }));
  }

  agInit(params: ICellRendererParams): void {
    throw new Error("Method not implemented.");
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }

  deviceGroupTypegridOptions: GridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  devicegridOptions: GridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    frameworkComponents: {
      "agGridFileUploadButton": AgGridFileuploadButtonComponent,
      "agGridThumbnail": AgGridThumbnailComponent
    },
    context: {
      componentParent: this
    },
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  frameworkComponents: {
    agGridFileUploadButton: AgGridFileuploadButtonComponent,
    agGridThumbnail: AgGridThumbnailComponent
  }

  deviceVendorsgridOptions: GridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true
  }

  deviceTypeAttributesgridOptions: GridOptions = {
    rowSelection: 'multiple',
    rowDeselection: true,
    pagination: true,
    paginationAutoPageSize: true,
    animateRows: true,
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  measurementsAttributesgridOptions: GridOptions = {
    rowSelection: 'multiple',
    rowDeselection: true,
    pagination: true,
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    animateRows: true,
    paginationAutoPageSize: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  refresh(): boolean {
    return false;
  }


  ngOnInit() {
    this.language = localStorage.getItem("hems-language");
    window.scrollTo(0, 0);
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    this.getAllVendorsTypes();
    this.getAllDeviceTypes();
    this.getAllDataType();
    this.getAllTimeStampFormats();
    this.getAllLogicalAttributeNames();
    this.measurementUomList();
    this.MeasurementTypeCodeType();
    this.getAllAssetGroup();
    this.getAllAssetGroupType();
    this.getAggridSortState('DeviceVendorsTable');
    this.setStateTableState('DeviceVendorsTable');
    this.getAggridSortState('DeviceTypeTable');
    this.setStateTableState('DeviceTypeTable');
    this.getAggridSortState('DeviceTypeAttributesTable');
    this.setStateTableState('DeviceTypeAttributesTable');
    this.getAggridSortState('measurementsAttributesTable');
    this.setStateTableState('measurementsAttributesTable');
    this.getAggridSortState('DeviceGroupTable');
    this.setStateTableState('DeviceGroupTable');
    this.getAggridSortState('DeviceGroupTypeTable');
    this.setStateTableState('DeviceGroupTypeTable');

    setTimeout(() => {
      if (this.DeviceTypeGridEl.nativeElement.offsetWidth) {
        this.DeviceTypeGrid.api.sizeColumnsToFit();
      }
    }, 300);

    let e1 = document.getElementById("DeviceTypeGrid");
    if (e1) {
      e1.addEventListener("contextmenu", function (e) {
        e.cancelBubble = true;
        e.stopPropagation();
        e.preventDefault();
      });
    }

    setTimeout(() => {
      if (this.DeviceTypeAttributesGridEl != undefined) {
        this.DeviceTypeAttributesGrid.api.sizeColumnsToFit();
      }
    });

    let el = document.getElementById("DeviceTypeAttributesGrid");
    if (el) {
      el.addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
    }

    setTimeout(() => {
      if (this.DeviceVendorsGridEl != undefined) {
        this.DeviceVendorsGrid.api.sizeColumnsToFit();
      }
    }, 300);

    let e2 = document.getElementById("DeviceVendorsGrid");
    if (e2) {
      e2.addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
    }

    this.rowClassRuleDeviceTypeTable = {
      "table-selected": (param) => {
        if (this.editDeviceTypeTable) {
          return false;
        } else return param.data.assetTypeSeq == this.selectedDevice.assetTypeSeq;
      }
    };

    this.rowClassRuleDeviceVendorsTable = {
      "table-selected": (param) => {
        return param.data.vendorSeq == this.newDeviceVendor.vendorSeq;
      }
    };

    this.rowClassRuleMeasurementsAttributesTable = {
      "table-selected": (param) => {
        return param.data.id == this.selectedDeviceMeasurement.id;
      }
    };

    this.rowClassRuleDeviceGroupTable = {
      "table-selected": (param) => {
        return param.data.groupSeq == this.newDeviceGroup.groupSeq;
      }
    };

    let ell = document.getElementById("measurementsAttributesGrid");
    if (ell) {
      document.getElementById("measurementsAttributesGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });

    }

    this.rowClassDeviceTypeAttributesTable = {
      "table-selected": (param) => {
        return param.data.id == this.selectedDeviceAttributes.id;
      }
    };

    this.rowClassRuleDeviceGroupTypeTable = {
      "table-selected": (param) => {
        if (this.editGroupTypeTable) {
          return false;
        } else return param.data.id == this.selectedDeviceGroupType.id;
      }
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.DeviceTypeAttributesGridEl != undefined) {
        this.DeviceTypeAttributesGrid.api.sizeColumnsToFit();
      }
    });
    setTimeout(() => {
      if (this.measurementsAttributesGridEl != undefined) {
        this.measurementsAttributesGrid.api.sizeColumnsToFit();
      }
    });
  }

  onConstCall() {
    this.getAllVendorsTypes();
    this.getAllDeviceTypes();
    this.getAllDataType();
    this.getAllTimeStampFormats();
    this.getAllLogicalAttributeNames();
    this.measurementUomList();
    this.MeasurementTypeCodeType();
    this.getAllAssetGroup();
    this.getAllAssetGroupType();
    this.getAggridSortState('DeviceVendorsTable');
    this.setStateTableState('DeviceVendorsTable');
    this.getAggridSortState('DeviceTypeTable');
    this.setStateTableState('DeviceTypeTable');
    this.getAggridSortState('DeviceTypeAttributesTable');
    this.setStateTableState('DeviceTypeAttributesTable');
    this.getAggridSortState('measurementsAttributesTable');
    this.setStateTableState('measurementsAttributesTable');
    this.getAggridSortState('DeviceGroupTable');
    this.setStateTableState('DeviceGroupTable');
    this.getAggridSortState('DeviceGroupTypeTable');
    this.setStateTableState('DeviceGroupTypeTable');

  }

  measPattern = "";

  measurementValueSelected(event) {
    if (event.value == 'Analog') {
      this.measPattern = '^-?[0-9]*[.0-9]*$';
    } else {
      this.measPattern = '^[01]$';
    }
  }

  updateEnumerationCheckbox(event) {
    this.isEnumeration = event.checked;
    if (this.isEnumeration) {
      for (let i = 0; i < this.enumerationForm['value'].length; i++) {
        if (this.enumerationForm['value'][0].value == null) {
          this.deleteAddressGroup(this.enumerationForm['value'][0]);

        }
      }
    } else {
      let data = [];
      data = this.form.get('schedulePeriod').value;
      for (let i = 0; i < data.length; i++) {
        this.deleteAddressGroup(null);
      }
    }
  }

  addNewAddressGroup() {
    this.enumerationForm = this.form.get('schedulePeriod') as FormArray;
    this.enumerationForm.push(this.fb.group({
      value: ["", Validators.required],
      interpreteMap: ["", Validators.required]
    }))
  }

  deleteAddressGroup(index: number) {
    const add = this.form.get('schedulePeriod') as FormArray;
    add.removeAt(index)
  }

  generateInterpreteMap(param) {
    let interpreteData = [];
    let value;
    for (let i = 0; i < param.length; i++) {
      interpreteData.push(param[i].value + ': ' + param[i].interpreteMap);
    }

    if (interpreteData.length != 0) {
      value = '{' + interpreteData + '}';
    }

    return value;
  }

  onMainTabChanged(event) {
    if (event.tab.textLabel == 'Asset Types') {
      this.subTabIndex = 0;
      this.sizeColumsToFitDeviceType();
      let heading = 'Flexible Attributes';
      let data = { tab: { textLabel: heading } };
      this.onSubTabChanged(data);
      document.getElementById("DeviceTypeGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
    }
    if (event.tab.textLabel == 'Asset Groups') {
      this.deviceGroupGridReady()
    }
  }

  onSubTabChanged(event) {
    this.subTabIndex = event.index;
    if (event.tab.textLabel == 'Flexible Attributes') {
      this.sizeColumsToFit();
      this.setFilterSetting('DeviceTypeAttributesTable');
      this.getAggridSortState('DeviceTypeAttributesTable');
      this.setStateTableState('DeviceTypeAttributesTable')
    } else if (event.tab.textLabel == 'Measurements') {
      this.sizeColumsToFitMeasurement();
      this.setFilterSetting('measurementsAttributesTable');
      this.getAggridSortState('measurementsAttributesTable');
      this.setStateTableState('measurementsAttributesTable');
    }
  }

  deviceVendorsGridReady() {
    setTimeout(() => {
      this.DeviceVendorsGrid.api.sizeColumnsToFit();
    }, 500)
    document.getElementById("DeviceVendorsGrid").addEventListener('contextmenu', function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
  }

  deviceGroupGridReady() {
    setTimeout(() => {
      this.DeviceGroupGrid.api.sizeColumnsToFit();
    }, 500)

    let e3 = document.getElementById("DeviceGroupGrid");
    if (e3) {
      e3.addEventListener('contextmenu', function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
    }
  }
  setContextMenu() {
    let e4 = document.getElementById("DeviceTypeGrid");
    if (e4) {
      e4.addEventListener("contextmenu", function (e) {
        e.cancelBubble = true;
        e.stopPropagation();
        e.preventDefault();
      });
    }
  }
  sizeColumsToFitDeviceType() {
    this.setContextMenu();
    this.DeviceTypeGrid.api.sizeColumnsToFit();
    this.measurementsAttributesGrid.api.sizeColumnsToFit();
    this.DeviceTypeAttributesGrid.api.sizeColumnsToFit();
  }

  sizeColumsToFitDeviceVendor() {
    if (this.DeviceVendorsGridEl.nativeElement.offsetWidth) {
      this.DeviceVendorsGrid.api.sizeColumnsToFit();
    }
  }

  getNumericCellEditor() {
    function isCharNumeric(charStr) {
      return !!/\d/.test(charStr) || !!/\./.test(charStr);
    }
    function isKeyPressedNumeric(event) {
      let charCode = getCharCodeFromEvent(event);
      let charStr = String.fromCharCode(charCode);
      return isCharNumeric(charStr);
    }
    function getCharCodeFromEvent(event) {
      event = event || window.event;
      return typeof event.which === "undefined" ? event.keyCode : event.which;
    }
    function NumericCellEditor() { }
    NumericCellEditor.prototype.init = function (params) {
      this.focusAfterAttached = params.cellStartedEdit;
      this.eInput = document.createElement("input");
      this.eInput.style.width = "100%";
      this.eInput.style.height = "100%";
      this.eInput.value = isCharNumeric(params.charPress) ? params.charPress : params.value;
      let that = this;
      this.eInput.addEventListener("keypress", function (event) {
        if (!isKeyPressedNumeric(event)) {
          that.eInput.focus();
          if (event.preventDefault) event.preventDefault();
        }
      });
    };
    NumericCellEditor.prototype.getGui = function () {
      return this.eInput;
    };
    NumericCellEditor.prototype.afterGuiAttached = function () {
      if (this.focusAfterAttached) {
        this.eInput.focus();
        this.eInput.select();
      }
    };
    NumericCellEditor.prototype.isCancelBeforeStart = function () {
      return this.cancelBeforeStart;
    };
    NumericCellEditor.prototype.isCancelAfterEnd = function () { };
    NumericCellEditor.prototype.getValue = function () {
      return this.eInput.value;
    };
    NumericCellEditor.prototype.focusIn = function () {
      let eInput = this.getGui();
      eInput.focus();
      eInput.select();
    };
    NumericCellEditor.prototype.focusOut = function () { };
    return NumericCellEditor;
  }


  exportTOExcelAssetType() {
    let currentDate = new Date();
    let currentTime = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    let newDate = currentTime.replace(' ', '_');
    let filename = 'Asset Type' + newDate;
    this.DeviceTypeGrid.api.exportDataAsCsv({ fileName: filename + '.csv', });
  }

  exportTOExcelFlexAttribute() {
    let currentDate = new Date();
    let currentTime = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    let newDate = currentTime.replace(' ', '_');
    let filename = 'Asset Flex Attribute' + newDate;
    this.DeviceTypeAttributesGrid.api.exportDataAsCsv({ fileName: filename + '.csv', });
  }

  exportTOExcelMeasurement() {
    let currentDate = new Date();
    let currentTime = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    let newDate = currentTime.replace(' ', '_');
    let filename = 'Asset Measurement' + newDate;
    this.measurementsAttributesGrid.api.exportDataAsCsv({ fileName: filename + '.csv', });
  }

  goToDeviceManagement() {
    this.router.navigate(["administration/asset-configuration"]);
  }

  showAddDeviceTypeModal(form: NgForm) {
    form.resetForm();
    this.newDeviceType = new DeviceType();
    this.newDeviceTypeSymbolFile = null;
    this.newDeviceTypeSymbolFileName = null;
    this.adddeviceTypeModal.show();
  }

  selectFile(event) {
    this.newDeviceTypeSymbolFile = event.target.files[0];
    this.newDeviceTypeSymbolFileName = this.newDeviceTypeSymbolFile.name;
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.newDeviceType.imageSymbol = btoa(fileReader.result.toString());
      this.newDeviceTypeSymbolFile = null;
      this.importSymbolData.nativeElement.value = null;
    };
    fileReader.readAsBinaryString(this.newDeviceTypeSymbolFile);
  }

  updateSymbolFile(params, event) {
    let file = event.target.files[0];
    if (!file.name.toLowerCase().endsWith(".svg")) {
      this.toastrService.warning("Invalid File Type Selected. Symbol can only be SVG File");
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.deviceTyperowData[params.rowIndex].imageSymbol = btoa(fileReader.result.toString());
      this.DeviceTypeGrid.api.redrawRows();
    };
    fileReader.readAsBinaryString(file);
  }

  getAllVendorsTypes() {
    this.loading = true;
    this.deviceManagementService.getAllVendors().subscribe((response) => {
      if (response.data != null) {
        this.newDeviceVendor.vendorSeq = response.data[0].vendorSeq;
        this.getAlldevicevendorsById();
      } else {
        this.selectedDeviceVendor = new DeviceVendor();
      }
      this.vendorList = response.data;
      this.loading = false;
      setTimeout(() => {
        if (this.DeviceVendorsGrid.api.getRowNode("0") != null) {
          this.DeviceVendorsGrid.api.getRowNode("0").setSelected(true);
          this.setFilterSetting('DeviceVendorsTable');
        }
      });
    }, (error) => {
      this.loading = false;
      this.vendorList = [];
    }
    );
  }

  public devicevendorsByIdList;
  getAlldevicevendorsById() {
    this.loading = true;
    this.devicetypemanagementService.getAlldevicevendorsById(this.newDeviceVendor.vendorSeq).subscribe((response) => {
      this.loading = false;
      this.devicevendorsByIdList = response.data;
      if (this.devicevendorsByIdList == null) {
        this.selectedDeviceVendor = new DeviceVendor();
      } else {
        this.selectedDeviceVendor = JSON.parse(JSON.stringify(this.devicevendorsByIdList));
      }
      if (this.selectedDeviceVendor.vendorSeq == null) {
        this.isAddDeviceVendor = true;
      } else {
        this.isAddDeviceVendor = false;
      }
    },
      (error) => {
        this.loading = false;
      }
    );
  }

  rowClicked(event) {
    this.DeviceVendorsGrid.api.getRowNode(event.node.id).setSelected(true);
  }

  rowClickedDeviceType(event) {
    this.DeviceTypeGrid.api.getRowNode(event.node.id).setSelected(true);
  }

  public selectedNodesId;
  rowClickedFlexiable(event) {
    let selectedNodes = this.DeviceTypeAttributesGrid.api.getSelectedNodes();
    this.selectedNodesId = selectedNodes.map(node => node.data.id);
    this.DisabledSelectedListEditButton();
  }

  public disabledEditButtonForFlex = false;
  DisabledSelectedListEditButton() {
    this.disabledEditButtonForFlex = false;
    if (this.selectedNodesId.length >= 2) {
      this.disabledEditButtonForFlex = true;
    } else {
      this.disabledEditButtonForFlex = false;
    }
  }

  getAllDeviceTypes() {
    this.loading1 = true;
    this.devicetypemanagementService.getAllDeviceTypes().subscribe((response) => {
      this.deviceTypeList = response.data;
      setTimeout(() => {
        if (this.DeviceTypeGrid.api.getRowNode("0") != null) {
          this.DeviceTypeGrid.api.getRowNode("0").setSelected(true);
          let abc = this.DeviceTypeGrid.api.getRowNode("0").data.isVirtual;
          if (abc == "Y") {
            this.disabledMeasTab = true;
          } else {
            this.disabledMeasTab = false;
          }

          this.setFilterSetting('DeviceTypeTable');
        }
      });
      if (this.deviceTypeList != null && this.deviceTypeList.length > 0) {
        this.deviceTyperowData = JSON.parse(JSON.stringify(this.deviceTypeList));
        this.loading1 = false;
        this.selectedDevice = JSON.parse(JSON.stringify(this.deviceTypeList[0]));
        this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
        this.getMeasurmentTypeList(this.selectedDevice.assetTypeSeq);
      } else {
        this.loading1 = false;
        this.deviceTyperowData = [];
        this.selectedDevice = new DeviceType();
        this.deviceTypeAttributesList = [];
        this.deviceTypeAttributesrowData = [];
        this.selectedDeviceAttributes = new DeviceTypeAttributes();
        this.disabledEditButtonForFlex = true;
        this.measurementDataList = [];
        this.measurementsAttributesrowData = [];
        this.selectedDeviceMeasurement = new DeviceTypeMeasurement();
        this.disabledEditButtonForMeas = true;
      }
    }, (error) => {
      this.loading1 = false;
      this.toastrService.error("Unable to get Asset Type List");
    }
    );
  }

  closeAddDeviceTypeModal(form: NgForm) {
    form.reset()
    this.newDeviceType = new DeviceType();
    this.newDeviceTypeSymbolFile = null;
    this.newDeviceTypeSymbolFileName = null;
    this.adddeviceTypeModal.hide();
  }

  saveDeviceType() {
    if (this.validateDeviceTypeSave()) {
      if (this.newDeviceTypeSymbolFileName != null && !this.newDeviceTypeSymbolFileName.toLowerCase().endsWith(".svg")) {
        this.toastrService.warning("Invalid File Type Selected. Symbol can only be SVG File");
        return;
      }
      if (this.newDeviceType.assetTypeName.length > 40) {
        this.toastrService.warning("Asset Type Name cannot be greater than 40 characters.");
        return;
      }
      this.newDeviceType.createTimestamp = new Date();
      this.newDeviceType.createUser = sessionStorage.getItem("hems-authenticatedUserFirstName");
      this.devicetypemanagementService.saveDeviceType(this.newDeviceType).subscribe((response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.adddeviceTypeModal.hide();

          this.toastrService.success("Asset Type Created Successfully");
          this.selectedDevice = new DeviceType();
          this.getAllDeviceTypes();
        }
      }, (error) => {
        this.loading = false;
        this.adddeviceTypeModal.hide();

        this.toastrService.error("Unable to create Asset Type at this time");
      }
      );
    } else {
      this.toastrService.warning("Duplicate Asset Type Name for selected Vendor");
    }
  }

  enableEditDeviceTypeTable() {
    this.editDeviceTypeTable = true;
    this.DeviceTypeGrid.api.redrawRows();
    this.DeviceTypeGrid.api.sizeColumnsToFit()
  }

  resetEditDeviceTypeTable() {
    this.deviceTyperowData = JSON.parse(JSON.stringify(this.deviceTypeList));
    this.DeviceTypeGrid.api.redrawRows();
  }

  cancalEditDeviceTypeTable() {
    this.editDeviceTypeTable = false;
    this.deviceTyperowData = JSON.parse(JSON.stringify(this.deviceTypeList));
    this.selectedDevice = this.deviceTypeList[0];
    this.getAllDeviceTypes()
    this.DeviceTypeGrid.api.redrawRows();
  }

  validateDeviceTypeSave() {
    let isValid = true;
    if (this.deviceTypeList != null) {
      for (let i = 0; i < this.deviceTypeList.length; i++) {
        if (
          this.newDeviceType.assetTypeName.toLowerCase() == this.deviceTypeList[i].assetTypeName.toLowerCase() &&
          this.newDeviceType.vendors.vendorSeq == this.deviceTypeList[i].vendors.vendorSeq
        ) {
          isValid = false;
        }
      }
    }
    return isValid;
  }

  validateDeviceTypesEdit() {
    let isValid = true;
    for (let i = 0; i < this.deviceTyperowData.length - 1; i++) {
      for (let j = i + 1; j < this.deviceTyperowData.length; j++) {
        if (
          this.deviceTyperowData[i].assetTypeName.toLowerCase() ==
          this.deviceTyperowData[j].assetTypeName.toLowerCase() &&
          this.deviceTyperowData[i].vendors.vendorSeq == this.deviceTyperowData[j].vendors.vendorSeq
        ) {
          isValid = false;
        }
      }
    }
    return isValid;
  }

  updatedListList = [];
  updateDeviceTypes() {
    this.loading = true;
    this.updatedListList = [];
    let body;
    if (this.validateDeviceTypesEdit()) {
      for (let i = 0; i < this.deviceTyperowData.length; i++) {
        if (this.deviceTyperowData[i].assetTypeName != this.deviceTypeList[i].assetTypeName || this.deviceTyperowData[i].description != this.deviceTypeList[i].description || this.deviceTyperowData[i].imageSymbol != this.deviceTypeList[i].imageSymbol) {
          if (this.deviceTyperowData[i].assetTypeName.length > 40) {
            this.toastrService.warning("Asset Type Name cannot be greater than 40 characters.");
            this.loading = false;
            return;
          }
          if (this.deviceTyperowData[i].createTimestamp !== null) {
            body = {
              createTimestamp: new Date(this.deviceTyperowData[i].createTimestamp),
              createUser: sessionStorage.getItem("hems-authenticatedUserFirstName"),
              description: this.deviceTyperowData[i].description,
              assetTypeName: this.deviceTyperowData[i].assetTypeName,
              assetTypeSeq: this.deviceTyperowData[i].assetTypeSeq,
              assetTypeVer: this.deviceTyperowData[i].assetTypeVer,
              symbol: this.deviceTyperowData[i].symbol,
              updateTimestamp: new Date(),
              updateUser: sessionStorage.getItem("hems-authenticatedUserFirstName"),
              vendors: this.deviceTyperowData[i].vendors,
              imageSymbol: this.deviceTyperowData[i].imageSymbol,
              isVirtual: this.deviceTyperowData[i].isVirtual
            }
          }
          else {
            body = {
              createTimestamp: new Date,
              createUser: sessionStorage.getItem("hems-authenticatedUserFirstName"),
              description: this.deviceTyperowData[i].description,
              assetTypeName: this.deviceTyperowData[i].assetTypeName,
              assetTypeSeq: this.deviceTyperowData[i].assetTypeSeq,
              assetTypeVer: this.deviceTyperowData[i].assetTypeVer,
              symbol: this.deviceTyperowData[i].symbol,
              updateTimestamp: new Date(),
              updateUser: sessionStorage.getItem("hems-authenticatedUserFirstName"),
              vendors: this.deviceTyperowData[i].vendors,
              imageSymbol: this.deviceTyperowData[i].imageSymbol,
              isVirtual: this.deviceTyperowData[i].isVirtual
            }
          }
          this.updatedListList.push(body);
        }
      }
      this.devicetypemanagementService.updateDeviceType(this.updatedListList).subscribe((response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.editDeviceTypeTable = false;
          this.toastrService.success("Asset Type Updated Successfully");
          this.selectedDevice = new DeviceType();
          this.getAllDeviceTypes();
        }
      }, (error) => {
        this.loading = false;
        this.toastrService.error("Unable to update Asset Types at this time");
      }
      );
    } else {
      this.loading = false;
      this.toastrService.error("Duplicate Asset Type Name found for a given Vendor");
    }
  }

  /* Attributes */
  getByDeviceTypes(id) {
    this.loading = true;
    this.devicetypemanagementService.getByDeviceTypes(id).subscribe((response) => {
      this.loading = false;
      this.deviceTypeAttributesList = response.data;
      if (this.deviceTypeAttributesList != null && this.deviceTypeAttributesList.length > 0) {
        this.deviceTypeAttributesrowData = JSON.parse(JSON.stringify(this.deviceTypeAttributesList));
        this.selectedDeviceAttributes = Object.assign(
          this.selectedDeviceAttributes,
          this.deviceTypeAttributesList[0]
        );
      } else {
        this.loading = false;
        this.deviceTypeAttributesrowData = [];
        this.selectedDeviceAttributes = new DeviceTypeAttributes();
      }
      this.disabledEditButtonForFlex = false;
      setTimeout(() => {
        if (this.DeviceTypeAttributesGrid != undefined && this.DeviceTypeAttributesGrid.api.getRowNode("0") != null) {
          this.DeviceTypeAttributesGrid.api.getRowNode("0").setSelected(true);
          this.setFilterSetting('DeviceTypeAttributesTable');
        }
      });
    }, (error) => {
      this.loading = false;
      this.deviceTypeAttributesList = [];
      this.deviceTypeAttributesrowData = [];
      this.selectedDeviceAttributes = new DeviceTypeAttributes();
      this.toastrService.error("Unable to get Asset Type Attributes at this time");
    }
    );
  }

  showAddDeviceTypeAttributesModal(form: NgForm) {
    form.resetForm();
    this.newDeviceFlexAttribute = new DeviceTypeAttributes();
    this.newDeviceFlexAttribute.assetTypes.assetTypeSeq = this.selectedDevice.assetTypeSeq;
    this.addDeviceTypeAttributesModal.show();
  }

  closeAddDeviceTypeAttributesModal(form: NgForm) {
    form.reset();
    this.newDeviceFlexAttribute = new DeviceTypeAttributes();
    this.addDeviceTypeAttributesModal.hide();
  }

  getAllDataType() {
    this.loading = true;
    this.modbustcpservice.getCodeType({ codeType: 'DATA_TYPES' }).subscribe((response) => {
      this.loading = false;
      this.dataTypeList = response.data;
    },
      (error) => {
        this.loading = false;
        this.toastrService.error("Unable to get Data Type at this time. Please try later");
      }
    );
  }

  getAllTimeStampFormats() {
    this.loading = true;
    this.modbustcpservice.getCodeType({ codeType: 'TIMESTAMP_FORMATS' }).subscribe(
      (response) => {
        this.loading = false;
        this.timeStampList = response.data;
      },
      (error) => {
        this.loading = false;
        this.toastrService.error("Unable to get Timestamp Formats at this time. Please try later");
      }
    );
  }

  getAllLogicalAttributeNames() {
    this.loading = true;
    this.modbustcpservice.getCodeType({ codeType: "LOGICAL_ATTRIBUTE_NAME" }).subscribe((response) => {
      this.loading = false;
      this.logicalAttrNameList = response.data;

    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to get Logical Attribute Names at this time. Please try later");
    }
    );
  }

  setOrder(isCreate) {
    if (isCreate) {
      this.newDeviceFlexAttribute.orderSeq = Number(this.newDeviceFlexAttribute.logicalAttrName.substring(9));
    } else {
      this.selectedDeviceAttributes.orderSeq = Number(this.selectedDeviceAttributes.logicalAttrName.substring(9));
    }
  }

  validateDeviceTypeAttrbute(inputAttr): boolean {
    let isValid = true;
    this.deviceTypeAttributesList?.forEach((attr) => {
      if (attr.logicalAttrName == inputAttr.logicalAttrName && attr.id != inputAttr.id) {
        this.toastrService.warning("Duplicate Logical Attribute Name");
        isValid = false;
      } else if (attr.physicalAttrName == inputAttr.physicalAttrName && attr.id != inputAttr.id) {
        this.toastrService.warning("Duplicate Physical Attribute Name");
        isValid = false;
      } else if (attr.orderSeq == inputAttr.orderSeq && attr.id != inputAttr.id) {
        this.toastrService.warning("Duplicate Order");
        isValid = false;
      }
    });
    return isValid;
  }

  saveDeviceTypeAttributes() {
    if (this.validateDeviceTypeAttrbute(this.newDeviceFlexAttribute)) {
      this.loading = true;
      this.devicetypemanagementService.saveDeviceTypeAttributes(this.newDeviceFlexAttribute).subscribe((response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.addDeviceTypeAttributesModal.hide();
          this.toastrService.success("Asset Type Attribute Created Successfully");
          this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
        }
      }, (error) => {
        this.loading = false;
        this.addDeviceTypeAttributesModal.hide();
        this.toastrService.error("Unable to create Asset Type Attribute at this time");
      }
      );
    }
  }

  showEditDeviceTypeAttributes() {
    this.updateDeviceTypeAttributesModal.show();
  }

  updateDeviceTypeAttributes() {
    if (this.validateDeviceTypeAttrbute(this.selectedDeviceAttributes)) {
      this.loading = true;
      this.devicetypemanagementService.updateDeviceTypeAttributes(this.selectedDeviceAttributes).subscribe((response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.updateDeviceTypeAttributesModal.hide();
          this.toastrService.success("Asset Type Attribute Updated Successfully");
          this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
        }
      }, (error) => {
        this.loading = false;
        this.updateDeviceTypeAttributesModal.hide();
        this.toastrService.error("Unable to update Asset Type Attribute at this time");
      }
      );
    }
  }

  closeUpdateDeviceTypeAttributesModal() {
    this.updateDeviceTypeAttributesModal.hide();
  }

  showAddMeasurementsAttributesModal1(form: NgForm) {
    this.form.reset();
    form.resetForm();
    this.isEnumeration = false;
    this.showAddMeasurementsAttributesModal.hide();

  }

  selecteddeletdID = [];
  deleteDeviceTypeAttributes() {

    let selectedNodes = this.DeviceTypeAttributesGrid.api.getSelectedNodes();
    let ids = selectedNodes.map(node => node.data.id);
    let body = {
      body: ids
    }
    this.loading = true;
    this.devicetypemanagementService.deleteDeviceTypeAttributes(body).subscribe((response) => {
      this.loading = false;
      this.deleteDeviceTypeAttributesModal.hide();
      this.toastrService.success("Asset Type Attribute deleted Successfully");
      this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
      this.disabledEditButtonForFlex = false;
    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to delete Asset Type Attribute at this time");
    }
    );
  }

  showFailedValidations(response) {
    let validationErrors = [];
    response.forEach((error) => {
      let errorMsg = DeviceTypeValidationErrors[error];
      if (errorMsg != null && !validationErrors.includes(errorMsg)) {
        validationErrors.push(errorMsg);
      } else if (error.startsWith("No vendor record for vendor name")) {
        errorMsg = "No Vendor exists with name '" + error.slice(33) + "'";
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      } else if (error.startsWith("repeating Combination for device name")) {
        errorMsg =
          "Duplicate records found for Asset Type Name '" +
          error.substring(40, error.indexOf("and Vendor") - 1) +
          "' and Vendor Name '" +
          error.substring(error.indexOf("Vendor name :") + 14) +
          "'";
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      }
      else if (error.startsWith("Duplicate records found for Asset Type Name")) {
        errorMsg =
          "Duplicate records found for Asset Types Name '" +
          error.substring(45, error.indexOf("and Vendor") - 2) +
          "'  and Vendor Name '" +
          error.substring(error.indexOf("Vendor Name") + 13)
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      }
    });
    if (validationErrors.length > 0) {
      this.validationErrors = validationErrors;
      this.importErrorModal.show();
    } else {
      this.toastrService.error("Unknown error Occurred");
    }
  }

  showFailedValidationsAttr(response) {
    let validationErrors = [];
    response.forEach((error) => {
      let errorMsg = DeviceTypeAttrValidationErrors[error];
      if (errorMsg != null && !validationErrors.includes(errorMsg)) {
        validationErrors.push(errorMsg);
      }
    });
    if (validationErrors.length > 0) {
      this.validationErrors = validationErrors;
      this.importErrorModal.show();
    } else {
      this.toastrService.error("Unknown error Occurred");
    }
  }

  public assetTypeErrormsg;
  deleteDeviceType() {
    this.loading = true;
    this.devicetypemanagementService.deleteDeviceType(this.selectedDevice.assetTypeSeq).subscribe((response) => {
      this.loading = false;
      if (response.message == 'Success') {
        this.deleteDeviceTypeModal.hide();
        this.toastrService.success("Asset Type deleted Successfully");
        this.selectedDevice = new DeviceType();
        this.newDeviceType = new DeviceType();
        this.getAllDeviceTypes();

      } else if (response.message == 'Data/mapping exists for the asset type') {
        this.assetTypeErrormsg = 'Data/mapping exists for selected asset type.';
        this.deleteDeviceTypeModal.hide();
        this.deleteDeviceTypeErrorModal.show();
      }

    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to delete Asset Type  at this time");
      this.getAllDeviceTypes();
    }
    );

  }

  importDeviceTypeCSVFile(e) {
    let file = e.target.files[0];
    this.loading = true;
    this.devicetypemanagementService.importDeviceTypeCSV(file, sessionStorage.getItem("hems-authenticatedUserFirstName")).subscribe(
      (response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.toastrService.success("Asset Type Data imported successfully.");
          this.getAllDeviceTypes();
        } else {
          this.showFailedValidations(response.data);
        }
        this.importDeviceTypeCSV.nativeElement.value = null;
      }, (error) => {
        this.loading = false;
        this.toastrService.error("Unable to import data at this time. Please try later");
        this.importDeviceTypeCSV.nativeElement.value = null;
      }
    );
  }

  importDeviceTypeAttrCSVFile(e) {
    let file = e.target.files[0];
    this.loading = true;
    this.devicetypemanagementService.importDeviceTypeAttrCSV(file, this.selectedDevice.assetTypeSeq).subscribe((response) => {
      this.loading = false;
      if (response.message == "Success") {
        this.toastrService.success("Asset Type Attribute Data imported successfully.");
        this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
      } else {
        this.showFailedValidationsAttr(response.data);
      }
      this.importDeviceTypeAttrCSV.nativeElement.value = null;
    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to import data at this time. Please try later");
      this.importDeviceTypeAttrCSV.nativeElement.value = null;
    }
    );
  }

  getAllAssetGroup() {
    this.loading = true;
    this.devicetypemanagementService.getAllDeviceGroup().subscribe(resposene => {
      if (resposene.data != null) {
        this.groupList = (resposene.data).reverse();
        this.assetGroupList = JSON.parse(JSON.stringify(this.groupList));

        this.groupList.forEach((element, i) => {
          if (element.parentGroupSeq) {
            element["parentGroupSeqName"] = this.groupList.filter(a => { return a.groupSeq == element.parentGroupSeq })[0].groupName
          } else {
            element["parentGroupSeqName"] = null;
          }
        });
        this.loading = false;
        setTimeout(() => {
          if (this.DeviceGroupGrid.api.getRowNode("0") != null) {
            this.DeviceGroupGrid.api.getRowNode("0").setSelected(true);
            this.selectedDeviceGroup = this.DeviceGroupGrid.api.getRowNode("0").data;
            this.setFilterSetting('DeviceGroupTable');
            this.getGroupSeqList();
          }
        });
      }

      if (resposene.data.length == 0) {
        this.selectedDeviceGroup = new DeviceGroup();
      }

    }, (error) => {
      this.toastrService.error("Unable to get Asset Groups at this time.");
    })
  }

  public groupList = [];
  getGroupSeqList() {
    this.groupSeqList = []
    let i = 0
    while (i < this.groupList.length) {
      if (this.groupList[i]["groupSeq"] != this.selectedDeviceGroup.groupSeq) {
        this.groupSeqList.push(this.groupList[i]);
      }
      i++;
    }
  }

  /* measurement */
  getMeasurmentTypeList(id) {
    this.loading = true;
    this.devicetypemanagementService.getAllMeasurementByDeviceType(id).subscribe((response) => {
      this.loading = false;
      this.measurementDataList = response.data;
      if (this.measurementDataList != null && this.measurementDataList.length > 0) {
        this.measurementsAttributesrowData = JSON.parse(JSON.stringify(this.measurementDataList));
        this.selectedDeviceMeasurement = Object.assign(this.measurementDataList, this.measurementsAttributesrowData[0]);

      } else {
        this.loading = false;
        this.measurementsAttributesrowData = [];
        this.selectedDeviceMeasurement = new DeviceTypeMeasurement();
      }
      this.disabledEditButtonForMeas = false;
      setTimeout(() => {
        if (this.measurementsAttributesGrid != undefined && this.measurementsAttributesGrid.api.getRowNode("0") != null) {
          this.measurementsAttributesGrid.api.getRowNode("0").setSelected(true);
          this.setFilterSetting('measurementsAttributesTable');
        }
      });
    }, (error) => {
      this.loading = false;
      this.measurementsAttributesrowData = [];
      this.selectedDeviceMeasurement = new DeviceTypeMeasurement();
      this.toastrService.error("Unable to get Asset Type Measurement at this time");
    }
    );
  }

  validateDeviceTypeMeasurement() {
    let isValid = true;
    this.measurementDataList.forEach((attr) => {
      if (
        this.newDeviceMeasurement.assetMeasurementName == attr.assetMeasurementName &&
        this.newDeviceMeasurement.assetTagName == attr.assetTagName
      ) {
        this.toastrService.warning("Duplicate Measurement Name");
        isValid = false;
      }
    });
    return isValid;
  }

  validateDeviceTypeMeasurementEdit() {
    let isValid = true;
    this.measurementDataList.forEach((attr) => {
      if (
        this.selectedDeviceMeasurement.assetMeasurementName == attr.assetMeasurementName &&
        this.selectedDeviceMeasurement.assetTagName == attr.assetTagName &&
        this.selectedDeviceMeasurement.id != attr.id
      ) {
        this.toastrService.warning("Duplicate Combination of Measurement Name and Asset Tag Name");
        isValid = false;
      }
    });
    return isValid;
  }

  showFailedValidationsMeasurement(response) {
    let validationErrors = [];
    response.forEach((error) => {
      let errorMsg = DeviceTypeMeasurementValidationError[error];
      if (errorMsg != null && !validationErrors.includes(errorMsg)) {
        validationErrors.push(errorMsg);
      }

      else if (error.startsWith("Duplicate records found for Asset Types Name")) {
        errorMsg =
          "Duplicate records found for Asset Types Name '" +
          error.substring(46, error.indexOf("and Measurement Name") - 2) +
          error.substring(error.indexOf("and Measurement Name ") - 2)
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      }
    });
    if (validationErrors.length > 0) {
      this.validationErrors = validationErrors;
      this.importErrorModal.show();
    } else {
      this.toastrService.error("Unknown error Occurred");
    }
  }

  updateCheckbox(measurement) {
    if (measurement.generateConsumptionData == "Y") {
      measurement.generateConsumptionData = "N";
      measurement.consumptionMeasurementName = null;
      measurement.consumptionOffset = null;

    } else {
      measurement.generateConsumptionData = "Y";
    }
  }

  saveMeasurement() {
    if (this.validateDeviceTypeMeasurement()) {
      this.newDeviceMeasurement.assetTypes = this.selectedDevice;
      this.loading = true;
      let data = [];
      data = this.form.get('schedulePeriod').value;
      let body1 = [];
      for (let i = 0; i < data.length; i++) {
        let f = body1.find(a => a.value == data[i].value);
        if (f) {
          this.toastrService.warning("Duplicate Enumeration Values.");
          this.loading = false;
          return;
        }
        body1.push({
          value: Number(data[i].value), interpreteMap: data[i].interpreteMap
        })
      }
      this.newDeviceMeasurement.assetMeasurementExtended = body1;

      this.devicetypemanagementService.saveDeviceMeasurement(this.newDeviceMeasurement).subscribe((response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.showAddMeasurementsAttributesModal.hide();
          this.toastrService.success("Measurement Created Successfully");
          this.disabledEditButtonForMeas = false;
          this.getMeasurmentTypeList(this.selectedDevice.assetTypeSeq);
        }
      }, (error) => {
        this.loading = false;
        this.showAddMeasurementsAttributesModal.hide();
        this.toastrService.error("Unable to create Measurement at this time.");
      }
      );
    }
  }

  updateMeasurement() {
    if (this.validateDeviceTypeMeasurementEdit()) {
      this.loading = true;
      let data = [];
      data = this.form.get('schedulePeriod').value;
      let body1 = [];
      for (let i = 0; i < data.length; i++) {
        let f = body1.find(a => a.value == data[i].value);
        if (f) {
          this.toastrService.warning("Duplicate Enumeration Values.");
          this.loading = false;
          return;
        }
        body1.push({
          value: Number(data[i].value), interpreteMap: data[i].interpreteMap
        })
      }

      let body = {
        uom: this.selectedDeviceMeasurement.uom,
        assetTypes: this.selectedDevice,
        id: this.selectedDeviceMeasurement.id,
        assetMeasurementName: this.selectedDeviceMeasurement.assetMeasurementName,
        displayMeasurementName: this.selectedDeviceMeasurement.displayMeasurementName,
        measurementType: this.selectedDeviceMeasurement.measurementType,
        assetTagName: this.selectedDeviceMeasurement.assetTagName,
        updateDate: new Date(),
        updateUser: sessionStorage.getItem("hems-authenticatedUserFirstName"),
        createUser: sessionStorage.getItem("hems-authenticatedUserFirstName"),
        createDate: new Date(),
        generateConsumptionData: this.selectedDeviceMeasurement.generateConsumptionData,
        consumptionMeasurementName: this.selectedDeviceMeasurement.consumptionMeasurementName,
        consumptionOffset: this.selectedDeviceMeasurement.consumptionOffset,
        assetMeasurementExtended: body1
      }
      this.devicetypemanagementService.updateDeviceMeasurement(body).subscribe((response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.editMeasurementsModal.hide();
          this.toastrService.success("Measurement updated Successfully");
          this.disabledEditButtonForMeas = false;
          this.getMeasurmentTypeList(this.selectedDevice.assetTypeSeq);
        } else if (response.message == "Error") {
          this.toastrService.warning(response.data);
          this.editMeasurementsModal.hide();
        }
      }, (error) => {
        this.loading = false;
        this.editMeasurementsModal.hide();
        this.toastrService.error("Unable to update Measurement at this time.");
        this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
      });
    }
  }

  measurementUomList() {
    this.loading = true;
    this.modbustcpservice.getCodeType({ codeType: 'UOM' }).subscribe(
      (response) => {
        this.loading = false;
        this.deviceMeasurementList = response.data;
      }, (error) => {
        this.loading = false;
        this.toastrService.error("Unable to get UOM List at this time.");
      }
    );
  }

  public MeasurementTypeList = [];
  MeasurementTypeCodeType() {
    this.loading = true;
    this.modbustcpservice.getCodeType({ codeType: 'MEASUREMENT_TYPE' }).subscribe(
      (response) => {
        this.loading = false;
        this.MeasurementTypeList = response.data;
      }, (error) => {
        this.loading = false;
        this.toastrService.error("Unable to get Measurement Type List at this time.");
      }
    );
  }

  deleteDeviceTypeMeasurement() {
    this.loading = true;
    this.devicetypemanagementService.deleteDeviceMeasurement(this.selectedDeviceMeasurement.id).subscribe((response) => {
      this.loading = false;
      if (response.message == "Data exists for this measurement hence it can not be deleted from the database") {
        this.toastrService.warning("Data exists for this measurement hence it can not be deleted from the database");
      } else {
        this.deleteMeasurementModal.show();
      }
    });
  }

  public validationerrormsg;
  deleteMesurement() {
    let selectedNodes = this.measurementsAttributesGrid.api.getSelectedNodes();
    let ids = selectedNodes.map(node => node.data.id);
    let body = {
      body: ids
    }
    this.loading = true;
    this.devicetypemanagementService.deleteMeasurement(body).subscribe((response) => {
      this.loading = false;
      if (response.message == 'Success') {
        this.deleteMeasurementModal.hide();
        this.toastrService.success("Asset type Measurement deleted Successfully.");
        this.getMeasurmentTypeList(this.selectedDevice.assetTypeSeq);
        this.disabledEditButtonForMeas = false;
      } else if (response.message.startsWith("Data/mapping exists for the measurements")) {
        this.validationerrormsg = response.message;
        this.deleteMeasurementModal.hide();
        this.MeasurementMappedValidation.show();
      }

    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to delete Asset Type Measurement at this time");
    }
    );

  }

  resetAdd(form: NgForm) {
    this.form.reset();
    form.resetForm();
    this.isEnumeration = false;
    this.newDeviceMeasurement = new DeviceTypeMeasurement();
  }

  openCreateMeasurement(form: NgForm) {
    this.form.reset();
    form.resetForm();
    this.isEnumeration = false;
    let data = [];
    data = this.form.get('schedulePeriod').value;
    for (let i = 0; i < data.length; i++) {
      this.deleteAddressGroup(i);
    }

    this.newDeviceMeasurement = new DeviceTypeMeasurement();
    this.showAddMeasurementsAttributesModal.show();
  }

  resetEdit() {
    this.form.reset();
    this.measurementsAttributesGrid.api.redrawRows();
    let a1 = this.measurementsAttributesGrid.api.getSelectedNodes();
    this.contextRowMeasurement = a1[0].data;
    this.selectedDeviceMeasurement = JSON.parse(JSON.stringify(this.contextRowMeasurement));
    this.openEditMeasurement();

  }


  cancleFlexAttribute() {
    this.DeviceTypeAttributesGrid.api.redrawRows();
    let a = this.DeviceTypeAttributesGrid.api.getSelectedNodes();
    this.contextRowAttributes = a[0].data;
    this.selectedDeviceAttributes = JSON.parse(JSON.stringify(this.contextRowAttributes));
  }

  get enumuration() {
    return this.enumerationForm.get('schedulePeriod') as FormArray;
  }


  openEditMeasurement() {
    this.form.reset();
    this.isEnumeration = this.selectedDeviceMeasurement.assetMeasurementExtended.length != 0 ? true : false;
    if (!this.isEnumeration) {
      this.form = this.fb.group({
        schedulePeriod: this.fb.array([])
      });
    }
    this.filteredMeasurementDataList = this.measurementsAttributesrowData.filter(obj => {
      return obj.assetMeasurementName != this.selectedDeviceMeasurement.assetMeasurementName;
    })
    if (this.isEnumeration) {
      let ctrl = <FormArray>this.form.controls.schedulePeriod;
      this.selectedDeviceMeasurement.assetMeasurementExtended.forEach(map => {
        ctrl.push(this.fb.group({
          value: map.value,
          interpreteMap: map.interpreteMap
        }))
      });

      if (ctrl != null) {
        for (let i = 0; i <= ctrl['value'].length; i++) {
          if (ctrl['value'][0].value == null) {
            this.deleteAddressGroup(0);
          }
        }
      }
    }
    this.editMeasurementsModal.show();
  }


  importMeasurementsAttrCSVFile(e) {
    let file = e.target.files[0];
    this.loading = true;
    this.devicetypemanagementService.importDeviceTypeMeasurementCSV(file, this.selectedDevice.assetTypeSeq).subscribe((response) => {
      this.loading = false;
      if (response.message == "Success") {
        this.toastrService.success("Asset Type Measurement Data imported successfully.");
        this.getMeasurmentTypeList(this.selectedDevice.assetTypeSeq);
      } else {
        this.showFailedValidationsMeasurement(response.data);
      }
      this.importMeasurementsAttrCSV.nativeElement.value = null;
    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to import data at this time. Please try later");
      this.importMeasurementsAttrCSV.nativeElement.value = null;
    }
    );
  }

  sizeColumsToFit() {
    setTimeout(() => {
      if (this.DeviceTypeAttributesGridEl.nativeElement.offsetWidth) {
        this.DeviceTypeAttributesGrid.api.sizeColumnsToFit();
      }
      if (this.DeviceTypeAttributesGrid.api.getRowNode("0") != null) {
        this.DeviceTypeAttributesGrid.api.getRowNode("0").setSelected(true);
        this.setFilterSetting('DeviceTypeAttributesTable');
      }
    });

    document.getElementById("DeviceTypeAttributesGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
  }

  sizeColumsToFitMeasurement() {
    setTimeout(() => {
      if (this.measurementsAttributesGridEl.nativeElement.offsetWidth) {
        this.measurementsAttributesGrid.api.sizeColumnsToFit();
      }
      if (this.measurementsAttributesGrid.api.getRowNode("0") != null) {
        this.measurementsAttributesGrid.api.getRowNode("0").setSelected(true);
        this.setFilterSetting('measurementsAttributesTable');
      }
    });
    document.getElementById("measurementsAttributesGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
  }

  toggleIsVirtualAdd() {
    if (this.newDeviceType.isVirtual == "Y") {
      this.newDeviceType.isVirtual = "N";
    } else this.newDeviceType.isVirtual = "Y";
  }

  /* filter, clear filter & cell right click deviceVendorsTableFilter*/
  sortChange(event, tbl) {
    let model = event.api.getSortModel();
    let strmodl = JSON.stringify(model);
    let body = {
      gridName: tbl,
      columnName: 'all'
    };
    if (model != '[]') {
      this.tableFilterService.getState(body).subscribe(res => {
        if (res.result == 'success') {
          let body2 = {
            gridName: tbl,
            gridState: strmodl,
            columnName: 'all'
          };
          this.tableFilterService.updateState(body2).subscribe(res2 => {
          }, error => {

          });
        } else {
          let body3 = {
            gridName: tbl,
            gridState: strmodl,
            columnName: 'all'
          };
          this.tableFilterService.saveState(body3).subscribe(res3 => {
          }, error => {

          });
        }
      }, error => {
        let body4 = {
          gridName: tbl,
          gridState: strmodl,
          columnName: 'all'
        };
        this.tableFilterService.saveState(body4).subscribe(res => {
        }, error1 => {

        });
      });
    }
  }

  DeviceVendorsTableSortChange(event) {
    this.sortChange(event, 'DeviceVendorsTable');
  }

  DeviceTypeTableSortChange(event) {
    this.sortChange(event, 'DeviceTypeTable');
  }

  DeviceTypeAttributesTableSortChange(event) {
    this.sortChange(event, 'DeviceTypeAttributesTable');
  }

  DeviceGroupTableSortChange(event) {
    this.sortChange(event, 'DeviceGroupTable');
  }

  measurementsAttributesTableSortChange(event) {
    this.sortChange(event, 'measurementsAttributesTable');
  }

  getAggridSortState(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'all'
    };
    this.tableFilterService.getState(body).subscribe(res => {
      this.gridSortData = res.data;
    }, error => {
    });
  }

  getAggridState(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'all'
    };
    this.tableFilterService.getState(body).subscribe(res => {
      this.gridStateData = res.data;
      let data = [];
      if (this.gridStateData != null) {
        data = JSON.parse(this.gridStateData.gridState);
        if (res.data.gridName === "DeviceVendorsTable") {
          this.DeviceVendorsGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "DeviceTypeTable") {
          this.DeviceTypeGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "DeviceTypeAttributesTable") {
          this.DeviceTypeAttributesGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "measurementsAttributesTable") {
          this.measurementsAttributesGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "DeviceGroupTable") {
          this.DeviceGroupGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "DeviceGroupTypeTable") {
          this.DeviceGroupTypeGrid.columnApi.applyColumnState({ state: data });
        }
      }
    }, error => {

    });
  }

  setStateTableState(tblname) {
    let filterData: any = [];
    this.getAggridState(tblname);
  }

  setFilterSetting(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'deviceTypeManagement_filter'
    };
    this.tableFilterService.getState(body).subscribe(res => {
      this.gridFilterData = res.data;
      let data = [];
      if (this.gridFilterData != null) {
        data = JSON.parse(this.gridFilterData.gridState);
        if (res.data.gridName == "DeviceVendorsTable") {
          this.DeviceVendorsGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "DeviceTypeTable") {
          this.DeviceTypeGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "DeviceTypeAttributesTable") {
          this.DeviceTypeAttributesGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "measurementsAttributesTable") {
          this.measurementsAttributesGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "DeviceGroupTable") {
          this.DeviceGroupGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "DeviceGroupTypeTable") {
          this.DeviceGroupTypeGrid.api.setFilterModel(data);
        }
      }
    });
  }

  saveFilter(filters, tableName) {
    if (Object.keys(filters).length != 0) {
      let data = Object.keys(filters);
      let body;
      for (let i = 0; i < data.length; i++) {
        body = {
          gridName: tableName,
          gridState: JSON.stringify(filters),
          columnName: 'deviceTypeManagement_filter'
        };
      }
      this.tableFilterService.saveState(body).subscribe(res => {
      }, error => {

      });
    }
  }

  removeFilter(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'deviceTypeManagement_filter'
    };
    this.tableFilterService.deleteState(body).subscribe(res => {
    }, error => {

    });
  }


  filterModifiedDeviceVendorsTable() {
    let filters = this.DeviceVendorsGrid.api.getFilterModel();
    this.saveFilter(filters, 'DeviceVendorsTable');
    this.deviceVendorsTableFilter = this.tableFilterService.filter(
      this.DeviceVendorsGrid,
      this.deviceVendorscolumnDefs
    );
  }

  clearFilterDeviceVendorsTable(filter) {
    this.removeFilter('DeviceVendorsTable');
    this.deviceVendorsTableFilter = this.tableFilterService.clearFilter(
      this.DeviceVendorsGrid,
      this.deviceVendorscolumnDefs,
      filter
    );
  }

  filterModifiedDeviceTypeTable() {
    let filters = this.DeviceTypeGrid.api.getFilterModel();
    this.saveFilter(filters, 'DeviceTypeTable');
    this.deviceTypeTableFilter = this.tableFilterService.filter(this.DeviceTypeGrid, this.deviceTypecolumnDefs);
  }

  clearFilterDeviceTypeTable(filter) {
    this.removeFilter('DeviceTypeTable');
    this.deviceTypeTableFilter = this.tableFilterService.clearFilter(
      this.DeviceTypeGrid,
      this.deviceTypecolumnDefs,
      filter
    );
  }

  filterModifiedDeviceTypeAttributesTable() {
    let filters = this.DeviceTypeAttributesGrid.api.getFilterModel();
    this.saveFilter(filters, 'DeviceTypeAttributesTable');
    this.deviceTypeAttributesTableFilter = this.tableFilterService.filter(
      this.DeviceTypeAttributesGrid,
      this.deviceTypeAttributescolumnDefs
    );
  }

  clearFilterDeviceTypeAttributesTable(filter) {
    this.removeFilter('DeviceTypeAttributesTable');
    this.deviceTypeAttributesTableFilter = this.tableFilterService.clearFilter(
      this.DeviceTypeAttributesGrid,
      this.deviceTypeAttributescolumnDefs,
      filter
    );
  }

  /*  measurementsTableFilter */
  filterModifiedMeasurementsAttributesTable() {
    let filters = this.measurementsAttributesGrid.api.getFilterModel();
    this.saveFilter(filters, 'measurementsAttributesTable');
    this.measurementsTableFilter = this.tableFilterService.filter(
      this.measurementsAttributesGrid,
      this.measurementsAttributescolumnDefs
    );
  }

  clearFilterMeasurementsTable(filter) {
    this.removeFilter('measurementsAttributesTable');
    this.measurementsTableFilter = this.tableFilterService.clearFilter(
      this.measurementsAttributesGrid,
      this.measurementsAttributescolumnDefs,
      filter
    );
  }

  public deviceGroupTableFilter;
  filterModifiedDeviceGroupTable() {
    let filters = this.DeviceGroupGrid.api.getFilterModel();
    this.saveFilter(filters, 'DeviceGroupTable');
    this.deviceGroupTableFilter = this.tableFilterService.filter(
      this.DeviceGroupGrid,
      this.deviceGroupcolumnDefs
    );
  }

  clearFilterDeviceGroupTable(filter) {
    this.removeFilter('DeviceGroupTable');
    this.deviceGroupTableFilter = this.tableFilterService.clearFilter(
      this.DeviceGroupGrid,
      this.deviceGroupcolumnDefs,
      filter
    );
  }

  cellRightClickMeasurementsAttributes(event) {
    let mouseevent: MouseEvent = event.event;
    this.contextRowMeasurement = JSON.parse(JSON.stringify(event.data));
    this.selectedDeviceMeasurement = JSON.parse(JSON.stringify(this.contextRowMeasurement));
    this.measurementsAttributesGrid.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.measurementsAttributesContextMenu,
      event: mouseevent,
      item: event.data
    });
  }


  cellRightClickDeviceType(event) {
    if (this.editDeviceTypeTable) {
      this.editDeviceTypeTable = false;
      this.deviceTyperowData = JSON.parse(JSON.stringify(this.deviceTypeList));

    }
    let mouseevent: MouseEvent = event.event;
    this.DeviceTypeGrid.api.getRowNode(event.node.id).setSelected(true);
    this.contextRow = JSON.parse(JSON.stringify(event.data));
    this.selectedDevice = JSON.parse(JSON.stringify(this.contextRow));
    this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
    this.DeviceTypeGrid.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.deviceTypeContextMenu,
      event: mouseevent,
      item: event.data
    });
    setTimeout(() => {
      document.getElementById("DeviceTypeGrid").
        addEventListener("contextmenu", function (e) {
          e.cancelBubble = true;
          e.stopPropagation();
          e.preventDefault();
        });
    }, 1000);
  }

  cellRightClickDeviceTypeAttributes(event) {
    let mouseevent: MouseEvent = event.event;
    this.contextRowAttributes = JSON.parse(JSON.stringify(event.data));
    this.selectedDeviceAttributes = JSON.parse(JSON.stringify(this.contextRowAttributes));
    this.DeviceTypeAttributesGrid.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.deviceTypeAttributesContextMenu,
      event: mouseevent,
      item: event.data
    });
  }



  selectedIDlistForMeas;
  public selectedNodes2 = true;
  changeMeasurementsAttributesRow(event) {
    this.contextRowMeasurement = JSON.parse(JSON.stringify(event.data));
    this.selectedDeviceMeasurement = JSON.parse(JSON.stringify(this.contextRowMeasurement));
    this.measurementsAttributesGrid.api.redrawRows();
    let selectedNodes1 = [];
    selectedNodes1 = this.measurementsAttributesGrid.api.getSelectedNodes();
    this.selectedNodes2 = true
    if (selectedNodes1.length > 1) {
      this.selectedNodes2 = false;
    }
    this.selectedIDlistForMeas = selectedNodes1.map(node => node.data.id);
    this.DisabledSelectedListEditButtonForMeas();

  }

  public disabledEditButtonForMeas = false;
  DisabledSelectedListEditButtonForMeas() {
    if (this.selectedIDlistForMeas.length >= 2) {

      this.disabledEditButtonForMeas = true;
    } else {
      this.disabledEditButtonForMeas = false;
    }
  }

  public selectedFlexNodes2 = true;
  changeSelectedDeviceTypeAttributes(event) {
    this.contextRowAttributes = JSON.parse(JSON.stringify(event.data));
    this.selectedDeviceAttributes = JSON.parse(JSON.stringify(this.contextRowAttributes));
    this.DeviceTypeAttributesGrid.api.redrawRows();
    let selectedFlexNodes1 = this.DeviceTypeAttributesGrid.api.getSelectedNodes();
    this.selectedFlexNodes2 = true
    if (selectedFlexNodes1.length > 1) {
      this.selectedFlexNodes2 = false;
    }
  }

  public disabledMeasTab = false;
  changeSelectedDeviceType(event) {
    if (!this.editDeviceTypeTable) {
      this.contextRow = JSON.parse(JSON.stringify(event.data));
      this.selectedDevice = JSON.parse(JSON.stringify(this.contextRow));
      this.getByDeviceTypes(this.selectedDevice.assetTypeSeq);
      this.getMeasurmentTypeList(this.selectedDevice.assetTypeSeq);
      this.DeviceTypeGrid.api.redrawRows();
      if (this.selectedDevice.isVirtual == "Y") {
        this.disabledMeasTab = true;
      } else {
        this.disabledMeasTab = false;
      }
    }


  }

  changeSelectedDeviceGroup(event) {
    this.contexrowDeviceGroup = JSON.parse(JSON.stringify(event.data));
    this.newDeviceGroup = JSON.parse(JSON.stringify(event.data));
    // this.selectedDeviceGroup = event.data

    this.selectedDeviceGroup = JSON.parse(JSON.stringify(event.data))
    if (this.selectedDeviceGroup.groupName == null) {
      this.getAllAssetGroup()
    }

    this.DeviceGroupGrid.api.getRowNode(event.node.id).setSelected(true);
    this.updateGroup = true;
    this.getGroupSeqList();
  }

  /* device Vendor  tab*/
  public selectedDeviceVendor = new DeviceVendor();
  public newDeviceVendor = new DeviceVendor();
  public contexrowDeviceVendor = new DeviceVendor();

  public newDeviceGroup = new DeviceGroup();
  public selectedDeviceGroup = new DeviceGroup();
  public contexrowDeviceGroup = new DeviceGroup();
  public updateGroup = true;
  public groupSeqList = [];
  public assetGroupList = [];

  AddNewDeviceVendor(form: NgForm) {
    form.resetForm();
    this.selectedDeviceVendor = new DeviceVendor();
    this.newDeviceVendor = new DeviceVendor();
    document.getElementById("ScrollId").scrollIntoView();
    this.contexrowDeviceVendor = new DeviceVendor();
    this.isAddDeviceVendor = true;
    this.DeviceVendorsGrid.api.redrawRows();
  }

  AddNewGroupVendor(form: NgForm) {
    form.resetForm();
    this.selectedDeviceGroup = new DeviceGroup();
    this.newDeviceGroup = new DeviceGroup();
    this.updateGroup = false;
    this.groupSeqList = this.assetGroupList

  }

  adddeviceTypeModal1(form: NgForm) {
    this.adddeviceTypeModal.hide();
    form.resetForm();
  }

  public deviceVendorList = [];
  public isAddDeviceVendor = false;


  saveDeviceVendors() {
    if (this.isAddDeviceVendor == true) {
      this.selectedDeviceVendor.createUser = sessionStorage.getItem("hems-authenticatedUserFirstName");
      this.selectedDeviceVendor.createTimestamp = new Date();
      this.newDeviceVendor.vendorSeq = this.selectedDeviceVendor.vendorSeq;
      this.devicetypemanagementService.saveDeviceVendors(this.selectedDeviceVendor).subscribe((response) => {
        this.loading = false;
        this.isAddDeviceVendor = false;
        if (response.message == "Success") {
          this.toastrService.success("Asset Vendor Created Successfully.");
          this.getAllVendorsTypes();
        } else {
          this.toastrService.warning('Vendor Name already exists.')
        }
      }, (error) => {
        this.loading = false;
        this.toastrService.error("Unable to create Asset Vendor at this time. Please try later.");
      }
      );
    } else {
      this.selectedDeviceVendor.updateUser = sessionStorage.getItem("hems-authenticatedUserFirstName");
      this.selectedDeviceVendor.updateTimestamp = new Date();
      this.newDeviceVendor.vendorSeq = this.selectedDeviceVendor.vendorSeq;
      this.selectedDeviceVendor = Object.assign({}, this.selectedDeviceVendor, {
      });
      this.devicetypemanagementService.saveDeviceVendors(this.selectedDeviceVendor).subscribe((response) => {
        this.loading = false;
        if (response.message == "Success") {
          this.toastrService.success("Asset Vendor Updated Successfully.");
          this.getAllVendorsTypes();
        }
        else {
          this.toastrService.warning('Vendor Name already exists.')
        }
      }, (error) => {
        this.loading = false;
        this.toastrService.error("Unable to update Asset Vendor at this time. Please try later.");
      }
      );
    }
  }

  deleteDeviceVendor() {
    this.loading = true;
    this.devicetypemanagementService.deleteDeviceVendor(this.newDeviceVendor.vendorSeq).subscribe((response) => {
      if (response.message == "Success") {
        this.loading = false;
        this.deleteDeviceVendorModal.hide();
        this.toastrService.success("Asset Vendor Deleted Successfully.");
        this.selectedDeviceVendor = new DeviceVendor();
        this.newDeviceVendor = new DeviceVendor();
        this.getAllVendorsTypes();
      } else {
        this.loading = false;
        this.deleteDeviceVendorModal.hide();
        this.showValidationErrors(response.message, 'vendor');
      }
    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to delete Device Vendor at this time. Please try again later.");
      this.getAllVendorsTypes();
    });


  }

  saveDeviceGroups() {
    this.selectedDeviceGroup.createUser = sessionStorage.getItem("hems-authenticatedUserFirstName");
    this.selectedDeviceGroup.createTimestamp = new Date()
    this.devicetypemanagementService.saveDeviceGroup(this.selectedDeviceGroup).subscribe((response) => {
      this.toastrService.success("Asset Group Created Successfully.")
      this.getAllAssetGroup();
    }, (error) => {
      this.getAllAssetGroup();
      this.toastrService.error("Failed to add Asset Group.");
    })
  }

  updateDeviceGroups() {

    let body;
    body = {

      groupSeq: this.selectedDeviceGroup.groupSeq,
      groupName: this.selectedDeviceGroup.groupName,
      latitude: this.selectedDeviceGroup.latitude,
      longitude: this.selectedDeviceGroup.longitude,
      description: this.selectedDeviceGroup.description,
      altitude: this.selectedDeviceGroup.altitude,
      createUser: this.selectedDeviceGroup.createUser,
      createTimestamp: this.selectedDeviceGroup.createTimestamp,
      updateUser: sessionStorage.getItem("hems-authenticatedUserFirstName"),
      updateTimestamp: new Date(),
      parentGroupSeq: this.selectedDeviceGroup.parentGroupSeq,
      groupType: this.selectedDeviceGroup.groupType,
      parentGroupSeqName: this.selectedDeviceGroup.parentGroupSeqName

    }
    this.devicetypemanagementService.updateDeviceGroup(body).subscribe((response) => {

      this.toastrService.success("Asset Group updated Successfully.")
      this.getAllAssetGroup();
    }, (error) => {
      this.getAllAssetGroup();
      this.toastrService.error("Failed to update Asset Group.");
    })
  }

  public validationErrors1;
  public validationErrors2;
  public device;
  public cannotDeletetext
  showValidationErrors(response, type) {
    this.validationErrors1 = response;
    if (this.validationErrors1 != null) {
      this.device = type == 'group' ? this.selectedDeviceGroup.groupName : this.selectedDeviceVendor.vendorName;
      this.cannotDeletetext = type == 'group' ? 'Cannot delete Asset Group' : 'Cannot delete Asset Vendor'
      this.validationErrors2 = JSON.parse(JSON.stringify(this.validationErrors1));
      this.deleteDeviceVendorErrorModal.show();
    } else {
      this.toastrService.error("Unknown error Occurred");
    }
  }
  cancelDeviceVendor() {
    this.getAllVendorsTypes();
  }

  cancelDeviceGroup() {
    this.selectedDeviceGroup = new DeviceGroup();
    this.getAllAssetGroup();
  }

  changeSelectedDeviceVendors(event) {
    this.contexrowDeviceVendor = JSON.parse(JSON.stringify(event.data));
    this.newDeviceVendor = JSON.parse(JSON.stringify(event.data));
    this.getAlldevicevendorsById();
    this.DeviceVendorsGrid.api.redrawRows();
  }

  cellRightClickDeviceVendors($event) {
    let mouseevent: MouseEvent = $event.event;
    this.contexrowDeviceVendor = JSON.parse(JSON.stringify($event.data));
    this.newDeviceVendor = this.contexrowDeviceVendor;
    this.getAlldevicevendorsById();
    this.DeviceVendorsGrid.api.getRowNode($event.node.id).setSelected(true);
    this.DeviceVendorsGrid.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.deviceVendorsContextMenu,
      event: mouseevent,
      item: $event.data
    });
  }

  public deviceGroupTypeList = [];
  public isAddDeviceGroupType = false;
  public groupTypeSeqList = [];
  public groupTypeList: DeviceGroupType[] = [];
  public cannotDeleteGroupType: string;
  public deviceGroupTyperowData = [];
  public deviceGroupTypeTableFilter;

  getGroupTypeSeqList() {
    this.groupTypeSeqList = []
    let i = 0
    while (i < this.groupTypeSeqList.length) {
      if (this.groupTypeSeqList[i]["id"] != this.selectedDeviceGroupType.id) {
        this.groupTypeSeqList.push(this.groupTypeSeqList[i]);
      }
      i++;
    }
  }
  getAllAssetGroupType() {
    this.devicetypemanagementService.getAllDeviceTypeGroup().subscribe(resposene => {
      this.groupTypeList = resposene.data;
      setTimeout(() => {
        if (this.DeviceGroupTypeGrid.api.getRowNode('0') != null) {
          this.DeviceGroupTypeGrid.api.getRowNode("0").setSelected(true);
          this.selectedDeviceGroupType = this.DeviceGroupTypeGrid.api.getRowNode("0").data;
          this.setFilterSetting('DeviceGroupTypeTable');
          this.getGroupTypeSeqList();
        }
      });
    }, (error) => {
      this.toastrService.error("Unable to get Asset Groups at this time.");
    })
    this.loading = false;

  }

  AddNewGroupType() {
    this.isShown = true;
    this.selectedDeviceGroupType.id = null
    this.selectedDeviceGroupType.typeName = null
    this.groupTypeSeqList = []
    let i = 0
    while (i < this.groupTypeSeqList.length) {
      if (this.groupTypeSeqList[i]["id"] != this.selectedDeviceGroupType.id) {
        this.groupTypeSeqList.push(this.groupTypeSeqList[i]);
      }
      i++;
    }
    this.isAddDeviceGroupType = true;
  }

  saveGroupType() {
    this.devicetypemanagementService.saveGroupType(this.selectedDeviceGroupType).subscribe((response) => {
      if (response.message == "Success") {
        if (this.isAddDeviceGroupType == true) {
          this.toastrService.success("Group Type Created Successfully.");
        } else {
          this.toastrService.success("Group Type Updated Successfully.");
        }
        this.isShown = false;
        this.getAllAssetGroupType();
      } else {
        this.toastrService.warning('Group Type already exists.')
      }
    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to create Group Type at this time. Please try later.");
    });
  }

  public validationErrors3;
  showValidationError(response) {
    this.validationErrors3 = response;
    if (this.validationErrors3 != null) {
      this.validationErrors3 = JSON.parse(JSON.stringify(this.validationErrors3));
      this.deleteDeviceGroupTypeErrorModal.show();
      this.deleteDeviceGroupTypeModal.hide();
    } else {
      this.toastrService.error("Unknown error Occurred");
    }
  }


  deleteGroupType() {
    this.loading = true;
    this.devicetypemanagementService.deleteDeviceGroupType(this.selectedDeviceGroupType.id).subscribe((response) => {

      if (response.message == "Success") {
        this.loading = false;
        this.deleteDeviceGroupTypeModal.hide();
        this.toastrService.success("Group Type Deleted Successfully.");
        this.selectedDeviceGroupType = new DeviceGroupType();
        this.newDeviceGroupType = new DeviceGroupType();
        this.getAllAssetGroupType();

      } else {
        this.loading = false;
        this.deleteDeviceGroupTypeModal.hide();
        this.showValidationError(response.data);
      }

    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to delete Group Type at this time. Please try again later.");
      this.getAllAssetGroupType();
    });
  }

  public typeName;
  public addGroupTypeAdd;
  public isShown: boolean = false;
  editDeviceGroup() {

    this.editDeviceTypeModal.show();
    this.getAllAssetGroupType();
    this.typeName.hide();
    this.addGroupTypeAdd.hide();
  }

  public checkdropdownvalue;
  public groupTypeValue = false;
  isValueAdded = false;
  insertedDropdownItems = [];
  isval = false;
  groupTypeDropdown = []
  addDropdownItems() {
    this.isValueAdded = true;
    this.checkdropdownvalue = this.groupTypeDropdown;
    if (this.checkdropdownvalue.match(/^[0-9a-zA-Z]+$/)) {
      this.insertedDropdownItems.push(this.groupTypeDropdown);
      this.groupTypeDropdown = null;
      this.isDisable = true;
      this.groupTypeValue = false;
      this.isval = true;
    }
    else {
      this.toastrService.error("Special character not allowed")
    }
  }


  public isDisable = false;
  checkValue(event) {
    if (event.target.value == '') {
      this.isDisable = true;
    } else if (event.target.value != '') {
      this.isDisable = false;
    }
  }
  removeDropdownItems() {
    let itemLength = this.insertedDropdownItems.length;
    if (itemLength == 0) {
      this.isValueAdded = false;
      this.groupTypeValue = true;
    } else {
      this.isValueAdded = true;
    }
    if (itemLength == 1) {
      this.isval = true;
    }
    this.insertedDropdownItems.splice(itemLength - 1, 1);
  }

  removeAllDropdownItems() {
    this.isValueAdded = false;
    this.insertedDropdownItems = [];
    this.groupTypeValue = false;
    this.isval = true;
  }

  closeDeviceGroupTypeModal() {
    this.isShown = false;
    this.editDeviceTypeModal.hide();
  }
  DeviceGroupTypeTableSortChange(event) {
    this.sortChange(event, 'DeviceGroupTypeTable');
  }

  enableEditDeviceGroupTypeTable() {
    this.isShown = true;
    this.isAddDeviceGroupType = false;
    this.editGroupTypeTable = true;
    this.DeviceGroupTypeGrid.api.redrawRows();
    this.DeviceGroupTypeGrid.api.sizeColumnsToFit()
    this.getAllAssetGroupType();
  }

  resetEditDeviceGroupTypeTable() {
    this.deviceGroupTyperowData = JSON.parse(JSON.stringify(this.groupTypeList));
    this.DeviceGroupTypeGrid.api.redrawRows();
  }

  changeSelectedGroupType(event) {
    this.contexrowDeviceGroupType = JSON.parse(JSON.stringify(event.data));
    this.selectedDeviceGroupType = event.data
    this.DeviceGroupTypeGrid.api.getRowNode(event.node.id).setSelected(true);
    this.getGroupTypeSeqList();
  }


  cellRightClickDeviceGroupType(event) {
    if (this.editGroupTypeTable) {
      this.editGroupTypeTable = false;
      this.deviceGroupTyperowData = JSON.parse(JSON.stringify(this.deviceTypeList));

    }
    let mouseevent: MouseEvent = event.event;
    this.DeviceGroupTypeGrid.api.getRowNode(event.node.id).setSelected(true);
    this.contexrowDeviceGroupType = JSON.parse(JSON.stringify(event.data));
    this.selectedDeviceGroupType = JSON.parse(JSON.stringify(this.contexrowDeviceGroupType));
    this.getByDeviceTypes(this.selectedDeviceGroupType.id);
    this.DeviceGroupTypeGrid.api.redrawRows();
    this.contextMenuService.show.next({
      event: mouseevent,
      item: event.data
    });
    setTimeout(() => {
      document.getElementById("DeviceGroupTypeGrid").
        addEventListener("contextmenu", function (e) {
          e.cancelBubble = true;
          e.stopPropagation();
          e.preventDefault();
        });
    }, 1000);
  }

  filterModifiedDeviceGroupTypeTable() {
    let filters = this.DeviceGroupTypeGrid.api.getFilterModel();
    this.saveFilter(filters, 'DeviceGroupTypeTable');
    this.deviceGroupTypeTableFilter = this.tableFilterService.filter(
      this.DeviceGroupTypeGrid,
      this.deviceGroupTypecolumnDefs
    );
  }

  clearFilterDeviceGroupTypeTable(filter) {
    this.removeFilter('DeviceGroupTypeTable');
    this.deviceGroupTypeTableFilter = this.tableFilterService.clearFilter(
      this.DeviceGroupTypeGrid,
      this.deviceGroupTypecolumnDefs,
      filter
    );
  }

  deviceGroupTypeGridReady() {
    setTimeout(() => {
      this.DeviceGroupTypeGrid.api.sizeColumnsToFit();
    }, 500)
    document.getElementById("DeviceGroupTypeGrid").addEventListener('contextmenu', function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
  }


  deleteGroup() {
    this.loading = true;
    this.devicetypemanagementService.deleteDeviceGroup(this.selectedDeviceGroup.groupSeq).subscribe((response) => {

      if (response.message == "successfully deleted") {
        this.loading = false;
        this.deleteDeviceGroupModal.hide();
        this.toastrService.success("Asset group Deleted Successfully.");
        this.selectedDeviceGroup = new DeviceGroup();
        this.newDeviceGroup = new DeviceGroup();
        this.getAllAssetGroup();
      } else {
        this.loading = false;
        this.deleteDeviceGroupModal.hide();
        this.showValidationErrors(response.data, 'group')
      }
    }, (error) => {
      this.loading = false;
      this.toastrService.error("Unable to delete Device group at this time. Please try again later.");
      this.getAllAssetGroup();
    });


  }

  ngOnDestroy(): void {
    // this.dbSubscription.unsubscribe();
    window.removeEventListener("DbChange",(value => {
      console.log(value);
    }));
  }

}

export class DeviceVendor {
  vendorSeq: number;
  vendorName: string;
  description: string;
  vendorAddress: string;
  createUser: string;
  createTimestamp: Date;
  updateUser: string;
  updateTimestamp: Date;
}

export class DeviceGroup {
  groupSeq: number;
  groupName: string;
  latitude: string;
  longitude: string;
  description: string;
  altitude: string;
  createUser: string;
  createTimestamp: Date;
  updateUser: string;
  updateTimestamp: Date;
  parentGroupSeq: number;
  groupType = new DeviceGroupType();
  parentGroupSeqName: string;
}

export class DeviceGroupType {
  id: number;
  typeName: string;
}
