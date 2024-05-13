
import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren, OnDestroy, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';;
import { Router } from '@angular/router';
import { IActionMapping, ITreeOptions, TreeComponent } from '@circlon/angular-tree-component';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from "xlsx";
import * as mathjs from "mathjs";
import * as moment from 'moment';
import { MemsDeviceVirtualCalcRules } from 'src/app/Models/mems-device-virtual-calc-rules';
import { AssetPicture } from 'src/app/Models/asset-picture';
import { Device } from 'src/app/Models/device';
import { MemsDeviceStatusCode } from 'src/app/Models/mems-device-status-code';
import { Interface } from 'src/app/Models/interface';
import { AssetNotes } from 'src/app/Models/asset-notes';
import { SystemAdapterService } from '../services/systemAdapter/system-adapter.service';

import { DeviceManagementService } from 'src/app/services/devicemanagement/device-management.service';
import { ModbustcpService } from 'src/app/services/modbustcp/modbustcp.service';
import { localeEs } from 'src/assets/i18n/localeEn';
import { DeviceConfigurationValidationErrors } from 'src/app/Models/device-configuration-validation-errors';
import { DataRefreshService } from 'src/app/services/dataRefreshService/data-refresh.service';
import { Subscription } from 'rxjs';
import { TablefilterserviceService } from '../services/tableFilterService/tablefilterservice.service';


@Component({
  selector: 'app-devicemanagement',
  templateUrl: './layout/devicemanagement.component.html',
  styleUrls: ['./layout/devicemanagement.component.scss']
})
export class DevicemanagementComponent implements OnInit, OnDestroy {

  @ViewChild('form') forms: NgForm;

  language;
  selectedLangVariable = { noRowsToShow: "" };
  selectedDeviceId;
  selectedOperator;
  name;
  name1;
  deviceTypeName;
  isCollapsed = false;
  isCollapsed1 = false;
  isCollapsed2 = false;
  loading = false;
  searchBarEnable = false;
  showAllDevice = false;
  init = true;
  isFullScreen = true;
  isChange: boolean = true;
  editDeviceId = false;
  isreset = false;
  zoom = 14;
  modalRef: BsModalRef;
  rowData: any;
  selectedDevices = 0;
  changeTab = 0;
  childDeviceIds = [];
  measurementNameAddRowData = [];
  measurementlist = new MemsDeviceVirtualCalcRules();
  newMemsDevicePicture = new AssetPicture();
  selectedDeviceShow = new Device();
  tableFilter = null;
  newUploadPictureFile: File = null;
  currentSection = "section1";
  currentSectionCreate = "section11";
  selectedFileName: string;

  public refreshFrequency: any = "15";
  public isEdit = false;
  public showCreate: boolean = false;
  public isAutoRefresh = false;
  public isValidExpression = true;
  public noteIsCreate = true;
  public noteIsNew = true;
  public noteEditMode = false;
  public pictureIsCreate = true;
  public uploadPictureValidationErrorMsg = null;
  public refreshInterval;
  public contextRow;
  public contextRow1;
  public deviceTypeSeq;
  public nodatatable;
  public lat;
  public lng;
  public rowClassRules;
  public keys;
  public selectedNoteIndex;
  public selectedNoteIndexView;
  public selectedMeasurementName: any;
  public measurementNameShowRowData: any;
  public deviceMeasurementNewFilter;
  public deviceMeasurementNewEditFilter;
  public rowClassRuleDeviceMeasurementNewTable;
  public deviceMeasurementNewRowData = [];
  public rowClassRuleDeviceMeasurementNewEditTable;
  public deviceMeasurementNewEditRowData = [];

  public deviceMeasurementNewSelectedFilter;
  public measurementNameTableFilter;
  public measurementInputTableFilter;
  public measurementNameShowTableFilter;
  public deviceNotesTableFilter;
  public deviceNotesTableFilterEdit;
  public deviceNotesTableFilterView;
  public rowClassRuleDeviceMeasurementNewSelectedTable;
  public rowClassRuleMeasurementNameTable;
  public rowClassRuleMeasurementInputTable;
  public rowClassRuleMeasurementNameShowTable;
  public rowClassRulesdeviceNotes;
  public rowClassRulesdeviceNotesEdit;
  public rowClassRulesdeviceNotesView;
  public selectedMemsDeviceStatusGroup;
  public deviceMeasurementNewSelectedRowData = [];
  public measurementNameRowData = [];
  public measurementInputRowData = [];
  public rowDataDeviceNotes = [];
  public rowDataDeviceNotesEdit = [];
  public rowDataDeviceNotesView = [];
  public deviceTypeList: any[] = [];
  public deviceTypeListEdit = [];
  public deviceTypeAllList: any[] = [];
  public deviceGroupsList: any[] = [];
  public vendorsList: any[] = [];
  public markers = [];
  public deviceHierarchyList = [];
  public deviceHierarchyListOriginal = [];
  public attributesList = [];
  public createAttributesList = [];
  public hourData = [];
  public legendItems = [];
  public codeTypeList = [];
  public inputMeasurementList = [];
  public list = [];
  public list1 = [];
  public timezoneList = [];
  public validationErrors = [];
  public newMeasurementList = [];
  public newMeasurementListShow = [];
  public adapterListAdd = [];
  public adapterListEdit = [];
  public adapterListShow = [];
  public showSelectedPicture = [];
  public memsDeviceStatusGroupList: MemsDeviceStatusCode[];
  public memsDeviceStatusList: any[];
  public interfaceList: Interface[] = [];
  public newDevice: Device = new Device();
  public selectedDevice: Device = new Device();
  public originalSelectedDevice: Device = new Device();
  public deviceList: Device[] = [];
  public selectedDevice2: Device = new Device();
  public contextDevice: Device = new Device();
  public measurement = new MemsDeviceVirtualCalcRules();
  public measurementShow = new MemsDeviceVirtualCalcRules();
  public selectedMeasurement = new MemsDeviceVirtualCalcRules();
  public selectedMeasurementShow = new MemsDeviceVirtualCalcRules();
  public newNote: AssetNotes = new AssetNotes();
  public memDeviceSubscription = new Subscription();
  public memdeviceTimeOut;
  public protocolEdit = null;
  public protocolAdd = null;

  public refreshFrequency1: string;
  public assetConfiguration: string
  public assetList: string
  public electrical: string
  public communication: string
  public all: string
  public noAssetsConfigured: string
  public edit: string
  public createChildAsset: string
  public cloneAsset: string
  public deleteAsset: string
  public assetMap: string
  public statusGroup: string
  public autoRefresh: string
  public assetId: string
  public parentAssetId: string
  public description: string
  public selectedAsset: string

  public vendor: string
  public assetType: string
  public assetClass: string
  public latitude: string
  public longitude: string
  public location: string
  public assetTimezone: string
  public isVirtualAsset: string
  public assetIpAddress: string
  public ipAddressNotValid: string
  public assetName: string


  public assetUserId: string
  public assetPassword: string
  public assetAccessPort: string
  public assetAccessType: string
  public assetAlias: string
  public assetRecordVersion: string
  public choose: string
  public filters: string
  public noFilterSelected: string
  public geoX: string
  public geoY: string
  public installationDate: string
  public registrationTime: string
  public provisioningTime: string
  public altitude: string
  public outputMeasurements: string
  public equation: string
  public group: string
  public downloadTemplate1: any

  public outputMeasurementName: string;
  public UOM1: string;
  public saveMeasurement1: string;

  public systemInterface1: string;
  public protocol1: string;
  public adapter1: string;
  public noPictureSelected: string;
  public createAsset: string;
  public validate: string;

  public upload: string
  public delete: string
  public close: string
  public reset1: string
  public save: string
  public editAsset: string;
  public deleteDevice1: string;
  public yes: string;
  public no: string;
  public deleteMeasurementMessage: string
  public cancel: string
  public uploadPictures: any
  public ok: string
  public importFailed: string;
  public selectPicture: string;
  public selectInputMeasurement: string
  public noAttributeSelected: string;
  public title1: string
  public browse: string
  public addNewNote: string
  public editNote: string
  public maximumNoteSizeAllowed: string
  public viewNote: string
  public importAssetConfiguration: string;
  public assetConfigurationMessage: string

  public unableToGetLocationDataMessage: any
  public errorLoadingDataFromServerMessage: any
  public unableToGetMeasurementDataMessage: any
  public assetIdAlreadyExist: any
  public assetNameAlreadyExist: any
  public assetClonedSuccessfully: any
  public assetCreatedSuccessfully: any
  public assetUpdatedSuccessfully: any
  public somethingHappendAtOurEndMessage: any
  public invalidValueForVendorSequence: any
  public assetIdCannotBeEmpty: any
  public noAssetSelected: any
  public assetDeletedSuccessfully: any
  public validationFailed: any
  public validationSuccess: any
  public noEquationEntered: any
  public duplicateMeasurementName: any
  public virtualAssetCouldNotBeCloned: any
  public assetConfigurationImportedSuccessfully: any
  public unableToImportDataThisTime: any
  public unknownErrorOccured: any
  public assetInformation: any
  public assetDetails: any
  public measurements: any
  public picture: any
  public notes: any

  public downloadAsset: any
  public uploadAsset: any

  public expandMap: any

  public zoomIn: any
  public zoomOut: any
  public collapseMap: any

  public aggridSubscription: Subscription;
  public getTimezoneSubscription: Subscription;
  public getCodeTypeByUomSubscription: Subscription;
  public getMemsDeviceStatusGroupSubscription: Subscription;
  public getAllMemsInterfacesSubscription: Subscription;
  public getAllInputMeasurementsSubscription: Subscription;
  public getAllDeviceGroupsSubscription: Subscription;
  public getAllDeviceTypesSubscription: Subscription;
  public getAllVendorsSubscription: Subscription;
  public getAllDevicesTreeSubscription: Subscription;
  public getCodeTypeBySystemInterfaceSubscription: Subscription;
  public getCodeTypeByProtocolSubscription: Subscription;
  public getCodeTypeByAdapterSubscription: Subscription;
  public getCodeTypeByAssetClassSubscription: Subscription;
  public getAllDeviceByHierarchyRootNodeSubscription: Subscription;
  public getassetFreuencySubscription: Subscription;

  dropdown = [];
  public currentState = 'Electrical';

  bsConfig = { dateInputFormat: "MM/DD/YYYY hh:mm:ss" };
  selectedTabIndex: number = 0;
  selectedCreateTabIndex: number = 0;
  selectedEditTabIndex: number = 0;

  public mapStyles: any = [{
    featureType: "poi",
    elementType: "all",
    stylers: [{
      visibility: "off",
    }]
  },];

  public selectedDeviceDDN = {
    vendor: null,
    deviceType: null,
    group: null
  };

  public options: ITreeOptions = {
    displayField: "displayField",
    actionMapping: <IActionMapping>{
      mouse: {
        contextMenu: (tree, node, $event) => {
          this.contextDevice = Object.assign(
            this.contextDevice,
            this.deviceListData.find((device) => {
              return device.assetId == node.data.id;
            })
          );
          setTimeout(() => {
            this.tree.treeModel.getNodeById(node.data.id).setIsActive(true);
          }, 200);
          this.currentSection = "section1";
          this.showSelectedDevice(this.contextDevice.assetId, "marker");
          console.log(node);
          $event.preventDefault();
        }
      }
    },
    scrollOnActivate: false
  };

  @ViewChildren("searchInput") searchInput;
  @ViewChild("tree") tree: TreeComponent;
  @ViewChild("deleteModal") deleteModal: ModalDirective;
  @ViewChild("createModal") createModal: ModalDirective;
  @ViewChild("deleteMeasurementModal") deleteMeasurementModal: ModalDirective;
  @ViewChild("deleteMeasurementEditModal") deleteMeasurementEditModal: ModalDirective;
  @ViewChild("cloneDeviceModal") cloneDeviceModal: ModalDirective;
  @ViewChild("createBillDeterminantModal") createBillDeterminantModal: ModalDirective;
  @ViewChild("editModal") editModal: ModalDirective;
  @ViewChild("uploadPictureModal") uploadPictureModal: ModalDirective;
  @ViewChild("showFullPictureModal") showFullPictureModal: ModalDirective;
  @ViewChild("addNewNotesModal") addNewNotesModal: ModalDirective;
  @ViewChild("viewNotesModal") viewNotesModal: ModalDirective;
  @ViewChild("importDeviceConfigurationErrorModal") importDeviceConfigurationErrorModal: ModalDirective;
  @ViewChild("deviceTreeContextmenu") deviceTreeContextmenu: ContextMenuComponent;
  @ViewChild("measurementNameContextMenu") measurementNameContextMenu: ContextMenuComponent;
  @ViewChild("addNoteContextmenu") addNoteContextmenu: ContextMenuComponent;
  @ViewChild("editNoteContextmenu") editNoteContextmenu: ContextMenuComponent;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @ViewChild("deviceTable") deviceTable: AgGridAngular;
  @ViewChild("measurementNameGrid") measurementNameGrid: AgGridAngular;
  @ViewChild("measurementInputGrid") measurementInputGrid: AgGridAngular;
  @ViewChild("measurementNameShowGrid") measurementNameShowGrid: AgGridAngular;
  @ViewChild("deviceMeasurementNewGrid") deviceMeasurementNewGrid: AgGridAngular;
  @ViewChild("deviceMeasurementNewEditGrid") deviceMeasurementNewEditGrid: AgGridAngular;
  @ViewChild("deviceMeasurementNewSelectedGrid") deviceMeasurementNewSelectedGrid: AgGridAngular;
  @ViewChild("measurementInputEditGrid") measurementInputEditGrid: AgGridAngular;
  @ViewChild("measurementInputShowGrid") measurementInputShowGrid: AgGridAngular;
  @ViewChild("deviceNotes") deviceNotes: AgGridAngular;
  @ViewChild("deviceNotesEdit") deviceNotesEdit: AgGridAngular;
  @ViewChild("deviceNotesView") deviceNotesView: AgGridAngular;
  @ViewChild("deviceTable", { read: ElementRef }) deviceTableEl: ElementRef;
  @ViewChild("measurementNameGrid", { read: ElementRef }) measurementNameGridEl: ElementRef;
  @ViewChild("measurementInputGrid", { read: ElementRef }) measurementInputGridEl: ElementRef;
  @ViewChild("measurementNameShowGrid", { read: ElementRef }) measurementNameShowGridEl: ElementRef;
  @ViewChild("deviceMeasurementNewGrid", { read: ElementRef }) deviceMeasurementNewGridEl: ElementRef;
  @ViewChild("deviceMeasurementNewEditGrid", { read: ElementRef }) deviceMeasurementNewEditGridEl: ElementRef;
  @ViewChild("deviceMeasurementNewSelectedGrid", { read: ElementRef }) deviceMeasurementNewSelectedGridEl: ElementRef;
  @ViewChild("measurementInputEditGrid", { read: ElementRef }) measurementInputEditGridEl: ElementRef;
  @ViewChild("measurementInputShowGrid", { read: ElementRef }) measurementInputShowGridEl: ElementRef;
  @ViewChild("deviceNotes", { read: ElementRef }) deviceNotesEl: ElementRef;
  @ViewChild("deviceNotesEdit", { read: ElementRef }) deviceNotesEditEl: ElementRef;
  @ViewChild("deviceNotesView", { read: ElementRef }) deviceNotesViewEl: ElementRef;
  @ViewChild("importPictureFile") importPictureFile: ElementRef;
  @ViewChild("importDeviceConfigurationCSV") importDeviceConfigurationCSV: ElementRef;
  @ViewChild("dp4") dp4: BsDatepickerDirective;
  @ViewChild(MatTabGroup) selectedTabs: MatTabGroup;
  @ViewChild("createTabs") createTabs;
  @ViewChild("editTabs") editTabs;

  deviceMeasurementNewColumnDefs = [
    {
      headerName: "Measurement Name",
      headerTooltip: "Measurement Name",
      field: "assetMeasurementName",
      tooltipField: "assetMeasurementName",
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
    },
    {
      headerName: "UOM",
      headerTooltip: "UOM",
      field: "uom",
      tooltipField: "uom",
    },
    {
      headerName: "Measurement Type",
      headerTooltip: "Measurement Type",
      field: "measurementType",
      tooltipField: "measurementType",
    }
  ];

  columnDefsdeviceNotes = [
    {
      headerName: "Asset Note",
      headerTooltip: "Asset Note",
      field: "assetNote",
      tooltipField: "assetNote",
    },
    {
      headerName: "Created By",
      headerTooltip: "Created By",
      field: "createdBy",
      tooltipField: "createdBy",
    },
    {
      headerName: "Created Date",
      headerTooltip: "Created Date",
      field: "createdDate",
      valueGetter: (node) => {
        if (node.data.createdDate != null) {
          return moment(node.data.createdDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.createdDate != null) {
          return moment(node.data.createdDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    },
    {
      headerName: "Updated By",
      headerTooltip: "Updated By",
      field: "updatedBy",
      tooltipField: "updatedBy",
    },
    {
      headerName: "Updated Date",
      headerTooltip: "Updated Date",
      field: "updatedDate",
      valueGetter: (node) => {
        if (node.data.updatedDate != null) {
          return moment(node.data.updatedDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.updatedDate != null) {
          return moment(node.data.updatedDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    }
  ];

  columnDefsdeviceNotesEdit = [
    {
      headerName: "Asset Note",
      headerTooltip: "Asset Note",
      field: "assetNote",
      tooltipField: "assetNote",
    },
    {
      headerName: "Created By",
      headerTooltip: "Created By",
      field: "createdBy",
      tooltipField: "createdBy",
    },
    {
      headerName: "Created Date",
      headerTooltip: "Created Date",
      field: "createdDate",
      valueGetter: (node) => {
        if (node.data.createdDate != null) {
          return moment(node.data.createdDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.createdDate != null) {
          return moment(node.data.createdDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    },
    {
      headerName: "Updated By",
      headerTooltip: "Updated By",
      field: "updatedBy",
      tooltipField: "updatedBy",
    },
    {
      headerName: "Updated Date",
      headerTooltip: "Updated Date",
      field: "updatedDate",
      valueGetter: (node) => {
        if (node.data.updatedDate != null) {
          return moment(node.data.updatedDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.updatedDate != null) {
          return moment(node.data.updatedDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    }
  ];

  deviceMeasurementNewEditColumnDefs = [
    {
      headerName: "Measurement Name",
      headerTooltip: "Measurement Name",
      field: "assetMeasurementName",
      tooltipField: "assetMeasurementName",
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
    },
    {
      headerName: "UOM",
      headerTooltip: "UOM",
      field: "uom",
      tooltipField: "uom",
    },
    {
      headerName: "Measurement Type",
      headerTooltip: "Measurement Type",
      field: "measurementType",
      tooltipField: "measurementType",
    }
  ];

  deviceMeasurementNewSelectedColumnDefs = [
    {
      headerName: "Measurement Name",
      headerTooltip: "Measurement Name",
      field: "assetMeasurementName",
      tooltipField: "assetMeasurementName",
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
    },
    {
      headerName: "UOM",
      headerTooltip: "UOM",
      field: "uom",
      tooltipField: "uom",
    },
    {
      headerName: "Measurement Type",
      headerTooltip: "Measurement Type",
      field: "measurementType",
      tooltipField: "measurementType",
    }
  ];

  columnDefsdeviceNotesView = [
    {
      headerName: "Asset Note",
      headerTooltip: "Asset Note",
      field: "assetNote",
      tooltipField: "assetNote",
    },
    {
      headerName: "Created By",
      headerTooltip: "Created By",
      field: "createdBy",
      tooltipField: "createdBy",
    },
    {
      headerName: "Created Date",
      headerTooltip: "Created Date",
      field: "createdDate",
      valueGetter: (node) => {
        if (node.data.createdDate != null) {
          return moment(node.data.createdDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.createdDate != null) {
          return moment(node.data.createdDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    },
    {
      headerName: "Updated By",
      headerTooltip: "Updated By",
      field: "updatedBy",
      tooltipField: "updatedBy"
    },
    {
      headerName: "Updated Date",
      headerTooltip: "Updated Date",
      field: "updatedDate",
      valueGetter: (node) => {
        if (node.data.updatedDate != null) {
          return moment(node.data.updatedDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      },
      tooltip: (node) => {
        if (node.data.updatedDate != null) {
          return moment(node.data.updatedDate).format('DD/MM/yyyy hh:mm:ss A');
        } else return null;
      }
    }
  ];

  measurementNameColumnDefs = [
    {
      headerName: "Measurement Name",
      headerTooltip: "Measurement Name",
      field: "assetMeasurementName",
      tooltipField: "assetMeasurementName",
    }

  ];

  measurementInputColumnDefs = [
    {
      headerName: "Asset Type",
      headerTooltip: "Asset Type",
      field: "assetTypeName",
      tooltipField: "assetTypeName",
    },
    {
      headerName: "Asset ID",
      headerTooltip: "Asset ID",
      field: "assetId",
      tooltipField: "assetId",
    },
    {
      headerName: "Asset Name",
      headerTooltip: "Asset Name",
      field: "assetName",
      tooltipField: "assetName",
    },
    {
      headerName: "Measurement Name",
      headerTooltip: "Measurement Name",
      field: "measurementName",
      tooltipField: "measurementName",
    },
    {
      headerName: "UOM",
      headerTooltip: "UOM",
      field: "uom",
      tooltipField: "uom",
    }
  ];

  measurementNameShowColumnDefs = [
    {
      headerName: "Measurement Name",
      headerTooltip: "Measurement Name",
      field: "assetMeasurementName",
      tooltipField: "assetMeasurementName"
    }
  ];

  fullScreenPicture = {
    title: null,
    pictureData: null
  };

  public site: any;
  gridStateData: any;
  gridSortData: any;
  gridFilterData: any;
  deviceNotesEditTableFilter: any[];
  deviceNotesViewTableFilter: any[];
  measurementInputEditTableFilter: any[];
  measurementInputShowTableFilter: any[];
  createMeasurementNameTableFilter: any[];
  createMeasurementInputTableFilter: any[];

  private dbSubscription: Subscription;
  hemssdbName: string;

  constructor(
    private adapterService: SystemAdapterService,
    private tableFilterService: TablefilterserviceService,
    private router: Router,
    private deviceManagementService: DeviceManagementService,
    private toaster: ToastrService,
    private contextMenuService: ContextMenuService,
    private modbustcpservice: ModbustcpService,
    private translate: TranslateService, public dataRefreshService: DataRefreshService) {

    if (sessionStorage.getItem('hems-loggedInUserLanguage') === 'English')
      this.translate.use('en')
    else if (sessionStorage.getItem('hems-loggedInUserLanguage') === 'French')
      this.translate.use('fr')

      window.addEventListener('DbChange', (value => {
        console.log(value);
        if (value) {
          this.ngOnInit();
        }
      }));
  }

  gridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  deviceMeasurementNewGridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  deviceMeasurementNewEditGridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  deviceMeasurementNewSelectedGridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  measurementNameGridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  measurementInputGridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: true,
    suppressDragLeaveHidesColumns: true,
  };

  measurementNameShowGridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: false,
    suppressDragLeaveHidesColumns: true,
  };

  gridOptionsdeviceNotes: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: false,
    suppressDragLeaveHidesColumns: true,
  };

  gridOptionsdeviceNotesEdit: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: false,
    suppressDragLeaveHidesColumns: true,
  };

  gridOptionsdeviceNotesView: GridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
    localeTextFunc: (key: string) => this.getUserLang(key),
    animateRows: true,
    suppressCellSelection: false,
    suppressDragLeaveHidesColumns: true,
  };
 //mat selection panel with scroll code
 @HostListener('window:scroll', [])
 onWindowScroll() {
   const selectPanel = document.querySelector('.mat-select-panel');
   if (selectPanel) {
     selectPanel.classList.add('hidden');
   }
 }
//////////////
  ngOnInit() {
    this.translate.get(['refreshFrequency', 'assetConfiguration', 'assetList', 'electrical', 'communication', 'all', 'noAssetsConfigured', 'edit', 'noPictureSelected', 'validate', 'deleteMeasurementMessage', 'yes', 'no', 'cancel', 'uploadPicture', 'importFailed', 'selectInputMeasurement',
      'createChildAsset', 'cloneAsset', 'deleteAsset', 'assetMap', 'statusGroup', 'autoRefresh', 'assetId', 'parentAssetId', 'description', 'selectedAsset', 'vendor', 'protocol', 'adapter', 'createAsset', 'upload', 'delete', 'close', 'reset', 'save', 'editAsset', 'deleteDevice', 'selectPicture', 'zoomOut', 'downloadTemplate',
      'assetType', 'assetClass', 'latitude', 'longitude', 'location', 'assetTimezone', 'isVirtualAsset', 'assetIpAddress', 'ipAddressNotValid', 'assetName', 'assetUserId', 'assetPassword', 'assetAccessPort', 'assetAccessType', 'assetAlias', 'assetRecordVersion', 'choose', 'ok', 'noAttributeSelected',
      'filters', 'noFilterSelected', 'geoX', 'geoY', 'installationDate', 'registrationTime', 'provisioningTime', 'altitude', 'outputMeasurements', 'eqaution', 'group', 'outputMeasurementName', 'UOM', 'saveMeasurement', 'systemInterface', 'title1', 'browse', 'unableToGetLocationDataMessage',
      'errorLoadingDataFromServerMessage', 'unableToGetMeasurementDataMessage', 'assetIdAlreadyExist', 'assetNameAlreadyExist', 'assetClonedSuccessfully', 'somethingHappendAtOurEndMessage', 'invalidValueForVendorSequence', 'validationFailed', 'validationSuccess', 'zoomIn', 'collapseMap',
      'addNewNote', 'editNote', 'maximumNoteSizeAllowed', 'viewNote', 'importAssetConfiguration', 'assetConfigurationMessage', 'assetCreatedSuccessfully', 'assetUpdatedSuccessfully', 'assetIdCannotBeEmpty', 'noAssetSelected', 'assetDeletedSuccessfully', 'noEquationEntered',
      'duplicateMeasurementName', 'virtualAssetCouldNotBeCloned', 'assetConfigurationImportedSuccessfully', 'unableToImportDataThisTime', 'unknownErrorOccured', 'assetInformation', 'assetDetails', 'measurements', 'picture', 'notes', 'downloadAsset', 'uploadAsset', 'expandMap']).
      subscribe(translations => {
        this.assetInformation = translations['assetInformation']
        this.assetDetails = translations['assetDetails']
        this.measurements = translations['measurements']
        this.picture = translations['picture']
        this.notes = translations['notes']
        this.downloadTemplate1 = translations['downloadTemplate']
        this.downloadAsset = translations['downloadAsset']
        this.uploadAsset = translations['uploadAsset']
        this.expandMap = translations['expandMap']
        this.zoomIn = translations['zoomIn']
        this.zoomOut = translations['zoomOut']
        this.collapseMap = translations['collapseMap']
        this.refreshFrequency1 = translations['refreshFrequency']
        this.assetConfiguration = translations['assetConfiguration']
        this.assetList = translations['assetList']
        this.electrical = translations['electrical']
        this.communication = translations['communication']
        this.all = translations['all']
        this.noAssetsConfigured = translations['noAssetsConfigured']
        this.edit = translations['edit']
        this.createChildAsset = translations['createChildAsset']
        this.cloneAsset = translations['cloneAsset']
        this.deleteAsset = translations['deleteAsset']
        this.assetMap = translations['assetMap']
        this.statusGroup = translations['statusGroup']
        this.autoRefresh = translations['autoRefresh']
        this.assetId = translations['assetId']
        this.parentAssetId = translations['parentAssetId']
        this.description = translations['description']
        this.selectedAsset = translations['selectedAsset']
        this.vendor = translations['vendor']
        this.assetType = translations['assetType']
        this.assetClass = translations['assetClass']
        this.latitude = translations['latitude']
        this.longitude = translations['longitude']
        this.location = translations['location']
        this.assetTimezone = translations['assetTimezone']
        this.isVirtualAsset = translations['isVirtualAsset']
        this.assetIpAddress = translations['assetIpAddress']
        this.ipAddressNotValid = translations['ipAddressNotValid']
        this.assetName = translations['assetName']
        this.assetUserId = translations['assetUserId']
        this.assetPassword = translations['assetPassword']
        this.assetAccessPort = translations['assetAccessPort']
        this.assetAccessType = translations['assetAccessType']
        this.assetAlias = translations['assetAlias']
        this.assetRecordVersion = translations['assetRecordVersion']
        this.choose = translations['choose']
        this.filters = translations['filters']
        this.noFilterSelected = translations['noFilterSelected']
        this.geoX = translations['geoX']
        this.geoY = translations['geoY']
        this.installationDate = translations['installationDate']
        this.registrationTime = translations['registrationTime']
        this.provisioningTime = translations['provisioningTime']
        this.altitude = translations['altitude']
        this.outputMeasurements = translations['outputMeasurements']
        this.equation = translations['equation']
        this.group = translations['group']
        this.outputMeasurementName = translations['outputMeasurementName']
        this.UOM1 = translations['UOM']
        this.saveMeasurement1 = translations['saveMeasurement']
        this.systemInterface1 = translations['systemInterface']
        this.protocol1 = translations['protocol']
        this.adapter1 = translations['adapter']
        this.noPictureSelected = translations['noPictureSelected']
        this.createAsset = translations['createAsset']
        this.validate = translations['validate']
        this.upload = translations['upload']
        this.delete = translations['delete']
        this.close = translations['close']
        this.reset1 = translations['reset']
        this.save = translations['save']
        this.editAsset = translations['editAsset']
        this.deleteDevice1 = translations['deleteDevice']
        this.yes = translations['yes']
        this.no = translations['no']
        this.deleteMeasurementMessage = translations['deleteMeasurementMessage']
        this.cancel = translations['cancel']
        this.uploadPictures = translations['uploadPicture']
        this.ok = translations['ok']
        this.importFailed = translations['importFailed']
        this.selectPicture = translations['selectPicture']
        this.selectInputMeasurement = translations['selectInputMeasurement']
        this.noAttributeSelected = translations['noAttributeSelected']
        this.title1 = translations['title1']
        this.browse = translations['browse']
        this.addNewNote = translations['addNewNote']
        this.editNote = translations['editNote']
        this.maximumNoteSizeAllowed = translations['maximumNoteSizeAllowed']
        this.viewNote = translations['viewNote']
        this.importAssetConfiguration = translations['importAssetConfiguration']
        this.assetConfigurationMessage = translations['assetConfigurationMessage']
        this.unableToGetLocationDataMessage = translations['unableToGetLocationDataMessage']
        this.errorLoadingDataFromServerMessage = translations['errorLoadingDataFromServerMessage']
        this.unableToGetMeasurementDataMessage = translations['unableToGetMeasurementDataMessage']
        this.assetIdAlreadyExist = translations['assetIdAlreadyExist']
        this.assetNameAlreadyExist = translations['assetNameAlreadyExist']
        this.assetClonedSuccessfully = translations['assetClonedSuccessfully']
        this.assetCreatedSuccessfully = translations['assetCreatedSuccessfully']
        this.assetUpdatedSuccessfully = translations['assetUpdatedSuccessfully']
        this.somethingHappendAtOurEndMessage = translations['somethingHappendAtOurEndMessage']
        this.invalidValueForVendorSequence = translations['invalidValueForVendorSequence']
        this.assetIdCannotBeEmpty = translations['assetIdCannotBeEmpty']
        this.noAssetSelected = translations['noAssetSelected']
        this.assetDeletedSuccessfully = translations['assetDeletedSuccessfully']
        this.validationFailed = translations['validationFailed']
        this.validationSuccess = translations['validationSuccess']
        this.noEquationEntered = translations['noEquationEntered']
        this.duplicateMeasurementName = translations['duplicateMeasurementName']
        this.virtualAssetCouldNotBeCloned = translations['virtualAssetCouldNotBeCloned']
        this.assetConfigurationImportedSuccessfully = translations['assetConfigurationImportedSuccessfully']
        this.unableToImportDataThisTime = translations['unableToImportDataThisTime']
        this.unknownErrorOccured = translations['unknownErrorOccured']
      })

    window.scrollTo(0, 0);
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    

    this.getAggridSortState('measurementNameShowTable');
    this.setStateTableState('measurementNameShowTable');
    this.getAggridSortState('measurementInputShowTable');
    this.setStateTableState('measurementInputShowTable');
    this.getAggridSortState('deviceMeasurementNewSelectedTable');
    this.setStateTableState('deviceMeasurementNewSelectedTable');
    this.getAggridSortState('deviceNotesViewTable');
    this.setStateTableState('deviceNotesViewTable');
    this.getAggridSortState('measurementNameTable');
    this.setStateTableState('measurementNameTable');
    this.getAggridSortState('measurementInputEditTable');
    this.setStateTableState('measurementInputEditTable');
    this.getAggridSortState('measurementInputTable');
    this.setStateTableState('measurementInputTable');
    this.getAggridSortState('deviceMeasurementNewEditTable');
    this.setStateTableState('deviceMeasurementNewEditTable');
    this.getAggridSortState('deviceNotesEditTable');
    this.setStateTableState('deviceNotesEditTable');
    this.site = JSON.parse(sessionStorage.getItem("hems-site"));
    this.hemssdbName = sessionStorage.getItem('hems-dbName');
    this.getTimezone();
    this.getCodeTypeByUom();
    this.getMemsDeviceStatusGroup();
    this.getAllInputMeasurements();
    this.getAllDeviceTypes();
    this.getAllDeviceGroups();
    this.getAllVendors();
    this.getAllDevicesTree();
    this.getCodeTypeBySystemInterface();
    this.getCodeTypeByProtocol();
    this.getCodeTypeByAdapter();
    this.getCodeTypeByAssetClass();
    this.getassetFreuency();

    this.rowClassRuleMeasurementNameTable = {
      "table-selected": (param) => {
        return param.data.assetMeasurementName == this.selectedMeasurement.assetMeasurementName;
      }
    };

    this.rowClassRuleMeasurementNameShowTable = {
      "table-selected": (param) => {
        return param.data.assetMeasurementName == this.selectedMeasurementShow.assetMeasurementName;
      }
    };

    this.rowClassRulesdeviceNotes = {
      "table-selected": (param) => {
        return param.rowIndex == this.selectedNoteIndex;
      }
    };

    this.rowClassRulesdeviceNotesEdit = {
      "table-selected": (param) => {
        return param.rowIndex == this.selectedNoteIndex;
      }
    };

    this.rowClassRulesdeviceNotesView = {
      "table-selected": (param) => {
        return param.rowIndex == this.selectedNoteIndexView;
      }
    };

    this.measurementNameAddRowData = [];

    let that = this;
    document.addEventListener("fullscreenchange", function () {
      if (that.isFullScreen) {
        that.isFullScreen = false;
        if (that.isCollapsed1) {
          document.getElementById("mapDiv").style.height = "calc(100vh - 258px)";
        } else {
          document.getElementById("mapDiv").style.height = "calc(100vh - 606px)";
        }
      }
    });
   

    document.addEventListener("mozfullscreenchange", function () {
      if (that.isFullScreen) {
        that.isFullScreen = false;
        if (that.isCollapsed1) {
          document.getElementById("mapDiv").style.height = "calc(100vh - 258px)";
        } else {
          document.getElementById("mapDiv").style.height = "calc(100vh - 606px)";
        }
      }
    });
    

    document.addEventListener("webkitfullscreenchange", function () {
      if (that.isFullScreen) {
        that.isFullScreen = false;
        if (that.isCollapsed1) {
          document.getElementById("mapDiv").style.height = "calc(100vh - 258px)";
        } else {
          document.getElementById("mapDiv").style.height = "calc(100vh - 606px)";
        }
      }
    });

    document.addEventListener("msfullscreenchange", function () {
      if (that.isFullScreen) {
        that.isFullScreen = false;
        if (that.isCollapsed1) {
          document.getElementById("mapDiv").style.height = "calc(100vh - 258px)";
        } else {
          document.getElementById("mapDiv").style.height = "calc(100vh - 606px)";
        }
      }
    });
  }

  agInit() {
    this.language = localStorage.getItem("hems-language");
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   if (window.innerHeight < document.body.clientHeight) {
    //     (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
    //       "calc(" + document.body.clientHeight + "px - 187px";
    //   } else {
    //     (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
    //   }
    // }, 2000);
    this.searchInput.first.nativeElement.focus();

    if (this.measurementInputGrid) {
      setTimeout(() => {
        if (this.measurementInputGridEl.nativeElement.offsetWidth) {
          this.measurementInputGrid.api.sizeColumnsToFit();
        }
      });
    }
  }

  cellrightClick(event, node) {
    this.contextDevice = Object.assign(
      this.contextDevice,
      this.deviceListData.find((device) => {
        return device.assetId == node.data.id;
      })
    );
    setTimeout(() => {
      this.tree.treeModel.getNodeById(node.data.id).setIsActive(true);
    }, 200);
    this.currentSection = "section1";
    this.showSelectedDevice(this.contextDevice.assetId, "marker");
  }

  collapseDeviceMap() {
    this.isCollapsed = !this.isCollapsed;
    setTimeout(() => {
      (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      if (window.innerHeight < document.body.clientHeight) {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
          "calc(" + document.body.clientHeight + "px - 187px";
      } else {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      }
    }, 150);
  }

  collpaseSelectedDeviceView() {
    this.isCollapsed1 = !this.isCollapsed1;
    if (this.isCollapsed1) {
      document.getElementById("mapDiv").style.height = "calc(100vh - 258px)";
    } else {
      document.getElementById("mapDiv").style.height = "calc(100vh - 606px)";
    }

    setTimeout(() => {
      (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      if (window.innerHeight < document.body.clientHeight) {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
          "calc(" + document.body.clientHeight + "px - 187px";
      } else {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      }
    }, 150);
  }

  getAllMemsInterfaces() {
    this.getAllMemsInterfacesSubscription = this.deviceManagementService.getAllInterfaces().subscribe((response) => {
      if (response.message == "Success") {
        this.interfaceList = response.data;
      }
    });
  }

  changeAssetList(event, title) {
    this.currentState = title;
    this.deviceList = [];
    this.getAllDeviceByHierarchy();
    this.getAllDevicesTree();
  }

  getAllDeviceTypes() {
    this.newDevice.vendorSeq = null;
    this.newDevice.assetTypeSeq = null;
    this.getAllDeviceTypesSubscription = this.deviceManagementService.getAllDeviceTypes().subscribe((response) => {

      this.loading = false;
      this.deviceTypeAllList = response.data;
      this.getAllDevice();
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.errorLoadingDataFromServerMessage);
      this.getAllDevice();
    }
    );
  }

  getAllDeviceGroups() {
    this.loading = true;
    this.getAllDeviceGroupsSubscription = this.deviceManagementService.getAllDeviceGroups().subscribe((response) => {
      this.loading = false;
      this.deviceGroupsList = response.data;
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.errorLoadingDataFromServerMessage);
    }
    );
  }

  getAllVendors() {
    this.loading = true;
    this.getAllVendorsSubscription = this.deviceManagementService.getAllVendors().subscribe((response) => {
      this.loading = false;
      this.vendorsList = response.data;
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.errorLoadingDataFromServerMessage);
    }
    );
  }

  public deviceListData: Device[] = [];
  getAllDevice() {
    this.newDevice.vendorSeq = null;
    this.newDevice.assetTypeSeq = null;
    this.loading = true;
    this.deviceManagementService.getAllDevice().subscribe((response) => {
      this.loading = false;
      this.deviceListData = response.data;
      this.getAllDeviceByHierarchy();
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.errorLoadingDataFromServerMessage);
    }
    );
  }

  getAllDeviceByHierarchy() {
    this.newDevice.vendorSeq = null;
    this.newDevice.assetTypeSeq = null;
    this.deviceList = [];
    this.loading = true;
    this.deviceManagementService.getDevicesByHierarchyAssetClass(this.currentState).subscribe((response) => {
      this.loading = false;
      this.deviceList = response.data;
      if (this.deviceList != null) {
        this.selectedDevice = this.deviceListData.find((data: any) =>(data.assetId == this.deviceList[0].id))
        this.deviceHierarchyList = JSON.parse(JSON.stringify(response.data));
        setTimeout(() => {
          if (this.init) {
            this.currentSection = "section1";
            setTimeout(() => {
              const newSelectedDevice = this.deviceListData[0].assetId;
              this.tree.treeModel.getNodeById(newSelectedDevice).setIsActive(true);
            }, 200);
            this.init = false;
          } else {
            this.showSelectedDevice(this.selectedDevice['assetId'], "inline");
          }
          if (this.isAutoRefresh) {
            this.refreshInterval = setTimeout(() => {
              this.getMemsDeviceStatus();
            }, this.refreshFrequency * 1000);
          }
          this.showDeviceMarker(true);
        }, 250);
        this.selectedDeviceId = this.selectedDevice.assetId;
      }
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.errorLoadingDataFromServerMessage);
    }
    );
  }

  getAllDevicesTree() {
    this.newDevice.vendorSeq = null;
    this.newDevice.assetTypeSeq = null;
    this.deviceList = [];
    this.loading = true;
    this.getAllDevicesTreeSubscription = this.deviceManagementService.getDevicesByHierarchyAssetClass(this.currentState).subscribe((response) => {
      this.loading = false;

      this.deviceList = response.data;
      this.deviceHierarchyListOriginal = response.data;
      this.deviceHierarchyList = JSON.parse(JSON.stringify(this.deviceHierarchyListOriginal));

      if (response.data != null && response.data.length > 0) {
        setTimeout(() => {
          this.tree.treeModel.getFirstRoot().setIsActive(true);
        }, 400);
      }
      else {
        this.selectedDevice = new Device();
        this.selectedDeviceId = null;
        this.selectedDeviceShow = new Device();
        this.markers = [];
        this.measurementNameShowRowData = [];
        this.measurementInputRowData = [];
        this.deviceMeasurementNewEditRowData = [];
        this.attributesList = [];
        this.deviceHierarchyList = [];
      }
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.errorLoadingDataFromServerMessage);
    });
  }

  getAllInputMeasurements() {
    this.getAllInputMeasurementsSubscription = this.deviceManagementService.getAllInputMeasurements({ deviceId: "" }).subscribe((response) => {
      this.loading = false;
      this.inputMeasurementList = response.data;
      this.measurementInputRowData = Object.assign(this.measurementInputRowData, this.inputMeasurementList);
    });
  }

  getAllMeasurment() {
    this.loading = true;
    this.deviceManagementService.getAllMeasurementsByDeviceTypeUrl(this.newDevice.assetTypeSeq).subscribe((response) => {
      this.loading = false;
      this.newMeasurementList = response.data;
      this.deviceMeasurementNewRowData = JSON.parse(JSON.stringify(this.newMeasurementList));
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.unableToGetMeasurementDataMessage);
    }
    );
  }

  getAllMeasurmentEdit() {
    this.loading = true;
    this.deviceManagementService.getAllMeasurementsByDeviceTypeUrl(this.selectedDevice.assetTypeSeq).subscribe((response) => {
      this.loading = false;
      this.newMeasurementList = response.data;
      this.deviceMeasurementNewEditRowData = JSON.parse(JSON.stringify(this.newMeasurementList));
    },
      (error) => {
        this.loading = false;
        this.toaster.error(this.unableToGetMeasurementDataMessage);
      }
    );
  }

  getAllMeasurmentShow() {
    this.loading = true;
    this.deviceManagementService.getAllMeasurementsByDeviceTypeUrl(this.selectedDeviceShow.assetTypeSeq).subscribe((response) => {
      this.loading = false;
      this.newMeasurementListShow = response.data;
      this.deviceMeasurementNewSelectedRowData = JSON.parse(JSON.stringify(this.newMeasurementListShow));
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.unableToGetMeasurementDataMessage);
    }
    );
  }

  getAllSelectInputMeasurementEdit() {
    this.deviceManagementService.getAllInputMeasurements({ deviceId: this.selectedDevice.assetId }).subscribe((response) => {
      this.loading = false;
      this.inputMeasurementList = response.data;
      this.measurementInputRowData = Object.assign(this.measurementInputRowData, this.inputMeasurementList);
    });
  }

  getAllDeviceConfiguration() {
    let json = [];
    this.deviceListData.forEach((device) => {

      let obj = {
        "Asset ID": device.assetId,
        "Asset Name": device.assetName,
        "Asset Alias": device.assetAlias,
        "Description": device.description,
        "Asset IP Address": device.assetIpaddr,
        "Asset Class": device.assetClass,
        "Parent Asset ID": device.assetClass == 'Electrical' ? device.parentElecAssetId : device.parentCommAssetId,
        "Group": this.deviceGroupsList.find((group) => {
          return group.groupSeq == device.groupSeq;
        }).groupName,
        "Vendor": this.vendorsList.find((vendor) => {
          return vendor.vendorSeq == device.vendorSeq;
        }).vendorName,
        "Asset Type": this.deviceTypeAllList.find((deviceType) => {
          return (
            deviceType.vendors.vendorSeq == device.vendorSeq && deviceType.assetTypeSeq == device.assetTypeSeq
          );
        }).assetTypeName,
        "Latitude": device.latitude,
        "Longitude": device.longitude,
        "Asset Timezone": device.assetTz
      };
      json.push(obj);
    });
    this.createXLSXFile(json);
  }

  changeDevicesTypes(value) {
    let assetTypeSeq = Number(value);
    if (assetTypeSeq == 0) {
      this.deviceHierarchyList = JSON.parse(JSON.stringify(this.deviceHierarchyListOriginal));
    } else {
      let filteredList = this.deviceHierarchyListOriginal.filter((data) => {
        return data.assetTypeSeq == assetTypeSeq;
      });
      this.deviceHierarchyList = filteredList;
    }
  }

  getMemsDeviceStatusGroup() {
    this.getMemsDeviceStatusGroupSubscription = this.deviceManagementService.getMemsDeviceStatusGroup().subscribe((response) => {
      this.memsDeviceStatusGroupList = response.data;
      if (this.memsDeviceStatusGroupList.length > 0) {
        this.selectedMemsDeviceStatusGroup = this.memsDeviceStatusGroupList[0].statusCodeGroup;
      }
    });
  }

  getCodeTypeByUom() {
    this.getCodeTypeByUomSubscription = this.modbustcpservice.getCodeType({ codeType: 'UOM' }).subscribe((response) => {
      this.loading = false;
      this.codeTypeList = response.data;
    });
  }

  getTimezone() {
    this.getTimezoneSubscription = this.modbustcpservice.getCodeType({ codeType: 'TIME_ZONE' }).subscribe((response) => {
      this.loading = false;
      this.timezoneList = response.data;
    });
  }

  public systemInterface;
  getCodeTypeBySystemInterface() {
    this.getCodeTypeBySystemInterfaceSubscription = this.modbustcpservice.getCodeType({ codeType: 'SYSTEM_INTERFACE' }).subscribe((response) => {
      this.loading = false;
      this.systemInterface = response.data;
    });
  }

  public protocol;
  getCodeTypeByProtocol() {
    this.getCodeTypeByProtocolSubscription = this.modbustcpservice.getCodeType({ codeType: 'PROTOCOL' }).subscribe((response) => {
      this.loading = false;
      this.protocol = response.data;
    });
  }

  public adapter;
  getCodeTypeByAdapter() {
    this.getCodeTypeByAdapterSubscription = this.modbustcpservice.getCodeType({ codeType: 'ADAPTER' }).subscribe((response) => {
      this.loading = false;
      this.adapter = response.data;
    });
  }

  public assetClass1;
  getCodeTypeByAssetClass() {
    this.getCodeTypeByAssetClassSubscription = this.modbustcpservice.getCodeType({ codeType: 'ASSETCLASS' }).subscribe((response) => {
      this.loading = false;
      this.assetClass1 = response.data;
      this.assetClass1 = this.assetClass1.splice(0, 1);
    });
  }

  getAdaptersShow() {
    if (this.selectedDeviceShow.systemInterfaceSeq != null) {
      let protocol = this.interfaceList.find((iface) => {
        return iface.systemInterfaceSeq == this.selectedDeviceShow.systemInterfaceSeq;
      }).protocol;
      switch (protocol) {
        case "ASCII":
          this.adapterService
            .getAsciiBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.asciiAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "Database":
          this.adapterService
            .getDatabseBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.dbAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "DNP":
          this.adapterService
            .getDnpBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.dnpAdapterSeq;
                adapter.adapterName = obj.masterDnpAddress;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "MODBUS":
          this.adapterService
            .getModbusBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.modbusAdapterSeq;
                adapter.adapterName = obj.clientName;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "MQTT":
          this.adapterService
            .getMqttBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.mqttAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "OCPP":
          this.adapterService
            .getOcppBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.ocppAdapterSeq;
                adapter.adapterName = obj.ocppServerHostName;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "OPCUA":
          this.adapterService
            .getOpcuaBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.opcuaAdapterSeq;
                adapter.adapterName = obj.opcServerUrl;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "REST":
          this.adapterService
            .getRteBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.rteAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListShow.push(adapter);
              });
            });
          break;
        case "SNMP":
          this.adapterService
            .getSnmpBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDeviceShow.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListShow = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.snmpAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListShow.push(adapter);
              });
            });
          break;
      }
    }
  }

  getAdaptersAdd() {
    if (this.newDevice.systemInterfaceSeq != null) {
      let protocol = this.interfaceList.find((iface) => {
        return iface.systemInterfaceSeq == this.newDevice.systemInterfaceSeq;
      }).protocol;
      switch (protocol) {
        case "ASCII":
          this.adapterService
            .getAsciiBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.asciiAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "Database":
          this.adapterService
            .getDatabseBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.dbAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "DNP":
          this.adapterService
            .getDnpBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.dnpAdapterSeq;
                adapter.adapterName = obj.masterDnpAddress;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "MODBUS":
          this.adapterService
            .getModbusBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.modbuAdapterSeq;
                adapter.adapterName = obj.clientName;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "MQTT":
          this.adapterService
            .getMqttBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.mqttAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "OCPP":
          this.adapterService
            .getOcppBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.ocppAdapterSeq;
                adapter.adapterName = obj.ocppServerHostName;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "OPCUA":
          this.adapterService
            .getOpcuaBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.opcuaAdapterSeq;
                adapter.adapterName = obj.opcServerUrl;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "REST":
          this.adapterService
            .getRteBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.rteAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
        case "SNMP":
          this.adapterService
            .getSnmpBySystemInterfaceSeq({ systemInterfaceSeq: this.newDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListAdd = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.snmpAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListAdd.push(adapter);
              });
            });
          break;
      }
    }
  }

  getAdaptersEdit() {
    if (this.selectedDevice.systemInterfaceSeq != null) {
      let protocol = this.interfaceList.find((iface) => {
        return iface.systemInterfaceSeq == this.selectedDevice.systemInterfaceSeq;
      }).protocol;
      switch (protocol) {
        case "ASCII":
          this.adapterService
            .getAsciiBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.asciiAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "Database":
          this.adapterService
            .getDatabseBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.dbAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "DNP":
          this.adapterService
            .getDnpBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.dnpAdapterSeq;
                adapter.adapterName = obj.masterDnpAddress;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "MODBUS":
          this.adapterService
            .getModbusBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.modbusAdapterSeq;
                adapter.adapterName = obj.clientName;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "MQTT":
          this.adapterService
            .getMqttBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.mqttAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "OCPP":
          this.adapterService
            .getOcppBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.ocppAdapterSeq;
                adapter.adapterName = obj.ocppServerHostName;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "OPCUA":
          this.adapterService
            .getOpcuaBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.opcuaAdapterSeq;
                adapter.adapterName = obj.opcServerUrl;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "REST":
          this.adapterService
            .getRteBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.rteAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
        case "SNMP":
          this.adapterService
            .getSnmpBySystemInterfaceSeq({ systemInterfaceSeq: this.selectedDevice.systemInterfaceSeq })
            .subscribe((response) => {
              let adapterResponse = response.data;
              this.adapterListEdit = [];
              adapterResponse.forEach((obj) => {
                let adapter = new AdapterDTO();
                adapter.adapterSeq = obj.snmpAdapterSeq;
                adapter.adapterName = obj.adapterName;
                this.adapterListEdit.push(adapter);
              });
            });
          break;
      }
    }
  }

  getProtocolEdit() {
    if (this.selectedDevice.systemInterfaceSeq != null) {
      this.protocolEdit = this.interfaceList.find((iface) => {
        return iface.systemInterfaceSeq == this.selectedDevice.systemInterfaceSeq;
      }).protocol;
    } else {
      this.protocolEdit = null;
    }
  }

  // show zoom in zoom out
  mapReady(map) {
    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM

      }
    });
  }

  getProtocolAdd() {
    if (this.newDevice.systemInterfaceSeq != null) {
      this.protocolAdd = this.interfaceList.find((iface) => {
        return iface.systemInterfaceSeq == this.newDevice.systemInterfaceSeq;
      }).protocol;
    } else {
      this.protocolAdd = null;
    }
  }

  sizeColumnsToFit(event) {
    setTimeout(() => {
      if (this.deviceTableEl.nativeElement.offsetWidth) {
        this.deviceTable.api.sizeColumnsToFit();
      }
      window.addEventListener("resize", () => {
        if (this.deviceTableEl.nativeElement.offsetWidth) {
          this.deviceTable.api.sizeColumnsToFit();
        }
      });

      if (this.measurementInputGridEl.nativeElement.offsetWidth) {
        this.measurementInputGrid.api.sizeColumnsToFit();
      }
      window.addEventListener("resize", () => {
        if (this.measurementInputGridEl.nativeElement.offsetWidth) {
          this.measurementInputGrid.api.sizeColumnsToFit();
        }
      });
    }, 150);
  }

  sizeColumnsDeviceNotes(event) {
    setTimeout(() => {
      if (this.deviceNotesEl.nativeElement.offsetWidth) {
        this.deviceNotes.api.sizeColumnsToFit();
      }
      window.addEventListener("resize", () => {
        if (this.deviceNotesEl.nativeElement.offsetWidth) {
          this.deviceNotes.api.sizeColumnsToFit();
        }
      });
    }, 150);
  }

  sizeColumnsDeviceNotesEdit(event) {
    setTimeout(() => {
      if (this.deviceNotesEditEl.nativeElement.offsetWidth) {
        this.deviceNotesEdit.api.sizeColumnsToFit();
        this.setFilterSetting('deviceNotesEditTable');
      }
      window.addEventListener("resize", () => {
        if (this.deviceNotesEditEl.nativeElement.offsetWidth) {
          this.deviceNotesEdit.api.sizeColumnsToFit();
          this.setFilterSetting('deviceNotesEditTable');
        }
      });
    }, 150);
  }

  sizeColumnsDeviceNotesView(event) {
    this.changeTab = 4;
    setTimeout(() => {
      // (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      // if (window.innerHeight < document.body.clientHeight) {
      //   (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
      //     "calc(" + document.body.clientHeight + "px - 187px";
      // } else {
      //   (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      // }

      if (this.deviceNotesViewEl.nativeElement.offsetWidth) {
        this.deviceNotesView.api.sizeColumnsToFit();
        this.setFilterSetting('deviceNotesViewTable');
      }
      window.addEventListener("resize", () => {
        if (this.deviceNotesViewEl.nativeElement.offsetWidth) {
          this.deviceNotesView.api.sizeColumnsToFit();
          this.setFilterSetting('deviceNotesViewTable');
        }
      });
    }, 150);
  }

  sizeColumnsMeasurement($event) {
    setTimeout(() => {
      if (this.measurementNameGridEl.nativeElement.offsetWidth) {
        this.measurementNameGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameTable');
      }
      if (this.measurementInputGridEl.nativeElement.offsetWidth) {
        this.measurementInputGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementInputTable');
      }

      document.getElementById("measurementNameGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
      document.getElementById("measurementInputGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
      window.addEventListener("resize", () => {
        if (this.measurementNameGridEl.nativeElement.offsetWidth) {
          this.measurementNameGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementNameTable');
        }
        if (this.measurementInputGridEl.nativeElement.offsetWidth) {
          this.measurementInputGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementInputTable');
        }
      });
    }, 150);
  }

  getUserLang = (key: string) => {
    return localeEs[key]
  }

  sizeColumnsMeasurementEdit($event) {
    if (this.measurementNameGridEl.nativeElement.offsetWidth) {
      this.measurementNameGrid.api.sizeColumnsToFit();
      this.setFilterSetting('measurementNameTable');
    }
    document.getElementById("measurementNameGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });

    window.addEventListener("resize", () => {
      if (this.measurementNameGridEl.nativeElement.offsetWidth) {
        this.measurementNameGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameTable');
      }
    });
    setTimeout(() => {
      if (this.measurementNameGridEl.nativeElement.offsetWidth) {
        this.measurementNameGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameTable');
      }
      document.getElementById("measurementNameGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
      window.addEventListener("resize", () => {
        if (this.measurementNameGridEl.nativeElement.offsetWidth) {
          this.measurementNameGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementNameTable');
        }
      });


      if (this.measurementNameGridEl.nativeElement.offsetWidth) {
        this.measurementNameGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameTable');
      }
      if (this.measurementInputEditGridEl.nativeElement.offsetWidth) {
        this.measurementInputEditGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementInputEditTable');
      }

      window.addEventListener("resize", () => {
        if (this.measurementNameGridEl.nativeElement.offsetWidth) {
          this.measurementNameGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementNameTable');
        }
        if (this.measurementInputEditGridEl.nativeElement.offsetWidth) {
          this.measurementInputEditGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementInputEditTable');
        }
      });
    }, 150);
  }

  setHeightDeviceInfo($event) {
    setTimeout(() => {
      (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      if (window.innerHeight < document.body.clientHeight) {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
          "calc(" + document.body.clientHeight + "px - 187px";
      } else {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      }
    }, 150);
    this.changeTab = 1;
  }

  setHeightDeviceDetails($event) {
    setTimeout(() => {
      (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      if (window.innerHeight < document.body.clientHeight) {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
          "calc(" + document.body.clientHeight + "px - 187px";
      } else {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      }
    }, 150);
    this.changeTab = 2;
  }

  setHeightDevicePicture($event) {
    setTimeout(() => {
      (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      if (window.innerHeight < document.body.clientHeight) {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
          "calc(" + document.body.clientHeight + "px - 187px";
      } else {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      }
    }, 150);
    if (this.selectedDeviceShow.assetPicture?.length <= 0) {
      this.changeTab = 3;
    } else {
      this.changeTab = 7;
    }
  }

  sizeColumnsMeasurementShow($event) {
    this.changeTab = 5;
    if (this.measurementNameShowGridEl.nativeElement.offsetWidth) {
      this.measurementNameShowGrid.api.sizeColumnsToFit();
      this.setFilterSetting('measurementNameShowTable');
    }
    document.getElementById("measurementNameShowGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
    window.addEventListener("resize", () => {
      if (this.measurementNameShowGridEl.nativeElement.offsetWidth) {
        this.measurementNameShowGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameShowTable');
      }
    });
    this.rowClassRuleMeasurementNameShowTable = {
      "table-selected": (param) => {
        return param.data.assetMeasurementName == this.selectedMeasurementShow.assetMeasurementName;
      }
    };

    setTimeout(() => {
      (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)";
      if (window.innerHeight < document.body.clientHeight) {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
          "calc(" + document.body.clientHeight + "px - 187px";
      } else {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)";
      }
      if (this.measurementNameShowGridEl.nativeElement.offsetWidth) {
        this.measurementNameShowGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameShowTable');
      }
      document.getElementById("measurementNameShowGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
      window.addEventListener("resize", () => {
        if (this.measurementNameShowGridEl.nativeElement.offsetWidth) {
          this.measurementNameShowGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementNameShowTable');
        }
      });
      if (this.measurementNameShowGridEl.nativeElement.offsetWidth) {
        this.measurementNameShowGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameShowTable');
      }
      if (this.measurementInputShowGridEl.nativeElement.offsetWidth) {
        this.measurementInputShowGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementInputShowTable');
      }
      window.addEventListener("resize", () => {
        if (this.measurementNameShowGridEl.nativeElement.offsetWidth) {
          this.measurementNameShowGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementNameShowTable');
        }
        if (this.measurementInputShowGridEl.nativeElement.offsetWidth) {
          this.measurementInputShowGrid.api.sizeColumnsToFit();
          this.setFilterSetting('measurementInputShowTable');
        }
      });
    }, 1500);
  }

  sizeColumnsMeasurementNew($event) {
    if (this.deviceMeasurementNewGridEl.nativeElement.offsetWidth) {
      this.deviceMeasurementNewGrid.api.sizeColumnsToFit();
    }
    document.getElementById("deviceMeasurementNewGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
    window.addEventListener("resize", () => {
      if (this.deviceMeasurementNewGridEl.nativeElement.offsetWidth) {
        this.deviceMeasurementNewGrid.api.sizeColumnsToFit();
      }
    });
  }

  sizeColumnsMeasurementNewEdit($event) {
    if (this.deviceMeasurementNewEditGridEl.nativeElement.offsetWidth) {
      this.deviceMeasurementNewEditGrid.api.sizeColumnsToFit();
      this.setFilterSetting('deviceMeasurementNewEditTable')
    }
    document.getElementById("deviceMeasurementNewEditGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
    window.addEventListener("resize", () => {
      if (this.deviceMeasurementNewEditGridEl.nativeElement.offsetWidth) {
        this.deviceMeasurementNewEditGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewEditTable')
      }
    });
    setTimeout(() => {
      if (this.deviceMeasurementNewEditGridEl.nativeElement.offsetWidth) {
        this.deviceMeasurementNewEditGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewEditTable')
      }
      document.getElementById("deviceMeasurementNewEditGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
      window.addEventListener("resize", () => {
        if (this.deviceMeasurementNewEditGridEl.nativeElement.offsetWidth) {
          this.deviceMeasurementNewEditGrid.api.sizeColumnsToFit();
          this.setFilterSetting('deviceMeasurementNewEditTable')
        }
      });

      if (this.deviceMeasurementNewEditGridEl.nativeElement.offsetWidth) {
        this.deviceMeasurementNewEditGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewEditTable')
      }
      window.addEventListener("resize", () => {
        if (this.deviceMeasurementNewEditGridEl.nativeElement.offsetWidth) {
          this.deviceMeasurementNewEditGrid.api.sizeColumnsToFit();
          this.setFilterSetting('deviceMeasurementNewEditTable')
        }
      });
    }, 150);
  }

  sizeColumnsMeasurementNewShow($event) {
    this.changeTab = 6;

    if (this.deviceMeasurementNewSelectedGridEl.nativeElement.offsetWidth) {
      this.deviceMeasurementNewSelectedGrid.api.sizeColumnsToFit();
      this.setFilterSetting('deviceMeasurementNewSelectedTable')
    }
    document.getElementById("deviceMeasurementNewSelectedGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
    window.addEventListener("resize", () => {
      if (this.deviceMeasurementNewSelectedGridEl.nativeElement.offsetWidth) {
        this.deviceMeasurementNewSelectedGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewSelectedTable')
      }
    });

    setTimeout(() => {
      (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      if (window.innerHeight < document.body.clientHeight) {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height =
          "calc(" + document.body.clientHeight + "px - 187px";
      } else {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 190px)";
      }
      if (this.deviceMeasurementNewSelectedGridEl.nativeElement.offsetWidth) {
        this.deviceMeasurementNewSelectedGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewSelectedTable')
      }
      document.getElementById("deviceMeasurementNewSelectedGrid").addEventListener("contextmenu", function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.preventDefault();
      });
      window.addEventListener("resize", () => {
        if (this.deviceMeasurementNewSelectedGridEl.nativeElement.offsetWidth) {
          this.deviceMeasurementNewSelectedGrid.api.sizeColumnsToFit();
          this.setFilterSetting('deviceMeasurementNewSelectedTable')
        }
      });

      if (this.deviceMeasurementNewSelectedGridEl.nativeElement.offsetWidth) {
        this.deviceMeasurementNewSelectedGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewSelectedTable')
      }
      window.addEventListener("resize", () => {
        if (this.deviceMeasurementNewSelectedGridEl.nativeElement.offsetWidth) {
          this.deviceMeasurementNewSelectedGrid.api.sizeColumnsToFit();
          this.setFilterSetting('deviceMeasurementNewSelectedTable')
        }
      });
    }, 150);
  }

  changeStatusGroup() {
    this.legendItems = [];
    if (this.selectedMemsDeviceStatusGroup != "None") {
      this.deviceManagementService.getMemsDeviceStatusCode(this.selectedMemsDeviceStatusGroup).subscribe(
        (response) => {
          this.legendItems = response.data;
        },
        (error) => {
          this.toaster.error("Unable to get Status Data. Please try later");
        }
      );
    }
  }

  assetRefreshFrequency;
  getassetFreuency() {
    this.getassetFreuencySubscription = this.modbustcpservice.getCodeType({ codeType: 'ASSET_REFRESH_FREQUENCY' }).subscribe((response) => {
      this.loading = false;
      this.assetRefreshFrequency = response.data;
    });
  }

  changeRefreshFrequency() {
    clearTimeout(this.memdeviceTimeOut);
      this.getMemsDeviceStatus();
  }

  toggleAutoRefresh() {
    this.isAutoRefresh = !this.isAutoRefresh;
    this.getMemsDeviceStatus();
  }

  setRowClassRules() {
    this.rowClassRules = {
      "table-selected": (param) => {
        return param.data.deviceid == this.selectedDeviceId;
      }
    };
  }

  getChildDeviceIds(assetId) {
    let childArray = [];
    if (this.hasChildNodes(assetId)) {
      let node = this.tree.treeModel.getNodeById(assetId);
      this.getChildren(childArray, node);
      this.childDeviceIds = childArray;
    }
  }

  isSelected(deviceid) {
    if (deviceid == this.selectedDeviceId) {
      return true;
    } else if (this.childDeviceIds.includes(deviceid)) {
      return true;
    } else {
      return false;
    }
  }

  getChildren(childArray, node) {
    node.children.forEach((child) => {
      childArray.push(child.id);
      if (child.hasChildren) {
        this.getChildren(childArray, child);
      }
    });
  }

  isEditDeviceId() {
    this.editDeviceId = true;
  }

  populateTable() {
    let rowData = [];
    this.deviceList.forEach((device) => {
      let tableData = {
        deviceid: device.assetId,
        deviceName: device.assetName,
        location: device.location,
        vendor: null,
        deviceType: null,
        parentDevice: device.parentAssetid,
        group: null
      };
      for (let i = 0; i < this.vendorsList.length; i++) {
        if (device.vendorSeq == this.vendorsList[i].vendorSeq) {
          tableData.vendor = this.vendorsList[i].vendorName;
          break;
        }
      }
      for (let j = 0; j < this.deviceTypeAllList.length; j++) {
        if (device.assetTypeSeq == this.deviceTypeAllList[j].assetTypeSeq) {
          tableData.deviceType = this.deviceTypeAllList[j].deviceTypeName;
          break;
        }
      }
      for (let k = 0; k < this.deviceGroupsList.length; k++) {
        if (device.groupSeq == this.deviceGroupsList[k].groupSeq) {
          tableData.group = this.deviceGroupsList[k].groupName;
          break;
        }
      }
      rowData.push(tableData);
    });
    this.rowData = rowData;
    this.setRowClassRules();
  }

  getDropDownNames(device) {
    for (let i = 0; i < this.vendorsList.length; i++) {
      if (device.vendorSeq == this.vendorsList[i].vendorSeq) {
        this.selectedDeviceDDN.vendor = this.vendorsList[i].vendorName;
        break;
      }
    }
    for (let j = 0; j < this.deviceTypeAllList.length; j++) {
      if (device.assetTypeSeq == this.deviceTypeAllList[j].assetTypeSeq) {
        this.selectedDeviceDDN.deviceType = this.deviceTypeAllList[j].assetTypeName;
        break;
      }
    }
    for (let k = 0; k < this.deviceGroupsList.length; k++) {
      if (device.groupSeq == this.deviceGroupsList[k].groupSeq) {
        this.selectedDeviceDDN.group = this.deviceGroupsList[k].groupName;
        break;
      }
    }
  }

  toggle() {
    this.isChange = !this.isChange;
  }

  searchDeviceTree(device) {
    if (device == "") this.showAllDevice = false;
    else this.showAllDevice = true;
    this.tree.treeModel.filterNodes(device, true);
  }

  markerUrl(deviceid): string {
    if (this.memsDeviceStatusList) {
      let tdevice = this.memsDeviceStatusList.find(function (device) {
        return device.deviceId == deviceid;
      });

      if (this.selectedMemsDeviceStatusGroup == "None") {
        return "assets/images/markers/marker1.png";
      } else if (tdevice != null) {
        if (tdevice.memsDeviceStatusCodes.statusCodeGroup == this.selectedMemsDeviceStatusGroup) {
          return "assets/images/markers/" + tdevice.memsDeviceStatusCodes.statusColor + ".png";
        } else {
          return "assets/images/markers/marker1.png";
        }
      } else {
        return "assets/images/markers/marker1.png";
      }
    } else {
      return "assets/images/markers/marker1.png";
    }
  }

  showCreateDevice() {
    this.currentSection = "section11";
    this.selectedDevice = new Device();
    this.selectedDeviceId = null;
    this.showCreate = true;
    if (this.tree.treeModel.getActiveNode()) {
      this.tree.treeModel.getActiveNode().setIsActive(false).blur();
    }
    this.newDevice.assetTypeSeq = null;
    this.newDevice.groupSeq = null;
    this.newDevice.parentAssetid = null;
    this.newDevice.vendorSeq = null;
  }

  AssetClassDisabled: boolean = false;
  parentAssetIdDisabled: boolean = false;
  titleForCreateAsset: boolean = false;

  openModal(isContextMenu) {
    this.createTabs.selectedIndex = 0;
    this.selectedCreateTabIndex = this.createTabs.selectedIndex;
    this.deviceMeasurementNewRowData = [];
    this.measurementNameAddRowData = [];
    this.list = [];
    this.measurement = new MemsDeviceVirtualCalcRules();
    this.selectedMeasurement = new MemsDeviceVirtualCalcRules();

    this.deviceTypeList = null;
    if (isContextMenu) {
      if (this.contextDevice.assetClass == 'Electrical' || this.contextDevice.assetClass == 'Communication') {
        this.onAssetClassSelected(this.contextDevice.assetClass)
        this.newDevice.parentAssetid = this.selectedDevice.assetId;
        this.AssetClassDisabled = true;
        this.parentAssetIdDisabled = true;
        this.titleForCreateAsset = true;
        this.forms.controls['ven_seqCreate'].reset();
        this.forms.controls['inputStateCreate'].reset();
        this.forms.controls['moid'].reset();
        this.forms.controls['latitudeCreate'].reset();
        this.forms.controls['longitudeCreate'].reset();
        this.forms.controls['dev_nameCreateDetails'].reset();
        this.forms.controls['grp_seqCreateDetails'].reset();
      }
      this.newDevice.assetClass = this.contextDevice.assetClass;
    } else {
      this.newDevice.groupSeq = null;
      this.newDevice.parentAssetid = null;
      this.newDevice.assetClass = null;
      this.newDevice = new Device();
      this.AssetClassDisabled = false;
      this.parentAssetIdDisabled = false;
      this.titleForCreateAsset = false;
      this.deviceListByClass = [];

    }
    this.currentSectionCreate = "section11";
    this.newDevice.assetTypeSeq = null;
    this.newDevice.vendorSeq = null;
    this.selectedNoteIndex = null;
    this.newMeasurementList = [];
    this.createModal.show();
  }

  closeModal() {
    this.newDevice.assetTypeSeq = null;
    this.newDevice.vendorSeq = null;
    this.deviceMeasurementNewRowData = [];
    this.measurementNameAddRowData = [];
    this.createModal.hide();
    this.reset();
  }

  resetCreateAsset(form: NgForm) {
    this.newDevice.assetNotes = [];
    this.rowDataDeviceNotes = [];
    this.newDevice.assetPicture = []
    form.resetForm();
  }

  resetChildAsset() {
    this.newDevice.assetNotes = [];
    this.rowDataDeviceNotes = [];
    this.newDevice.assetPicture = [];
    this.forms.controls['ven_seqCreate'].reset();
    this.forms.controls['inputStateCreate'].reset();
    this.forms.controls['moid'].reset();
    this.forms.controls['latitudeCreate'].reset();
    this.forms.controls['longitudeCreate'].reset();
    this.forms.controls['dev_nameCreateDetails'].reset();
    this.forms.controls['grp_seqCreateDetails'].reset();
  }

  reset() {
    this.newDevice = new Device();
    this.newDevice.assetTypeSeq = null;
    this.newDevice.groupSeq = null;
    this.newDevice.parentAssetid = null;
    this.newDevice.vendorSeq = null;
    this.createAttributesList = [];
    this.deviceTypeList = [];
    this.isValidExpression = true;
    this.list = [];
    this.measurementNameAddRowData = [];
    this.measurement = new MemsDeviceVirtualCalcRules();
    this.selectedMeasurement = new MemsDeviceVirtualCalcRules();
    this.rowDataDeviceNotes = [];
    this.protocolAdd = null;
    this.adapterListAdd = [];
    this.newMeasurementList = [];
    this.deviceMeasurementNewRowData = [];
  }

  public mainTabIndex = 0;
  onCreateTabChanged(event) {
    if (event.tab.textLabel == 'Measurements') {
      if (this.checkDeviceType()) {
        this.measurementInputGrid.api.sizeColumnsToFit();
      } else {
        this.deviceMeasurementNewGrid.api.sizeColumnsToFit();
      }
    } else if (event.tab.textLabel == 'Notes') {
      this.deviceNotes.api.sizeColumnsToFit();
      document.getElementById("deviceNotes").addEventListener("contextmenu", function (e) {
        e.cancelBubble = true;
        e.stopPropagation();
        e.preventDefault();
      });
    }
  }

  sizeToFitMeasurementEdit() {
    if (!this.checkDeviceTypeEdit()) {
      this.measurementInputEditGrid.api.sizeColumnsToFit();
      this.setFilterSetting('measurementInputEditTable');
    }
  }

  sizeToFitmeasurementGrid() {
    this.measurementNameGrid.api.sizeColumnsToFit();
    this.setFilterSetting('measurementNameTable');
  }

  onMainTabChanged(event) {
    if (event.tab.textLabel == 'Measurements') {
      if (!this.checkDeviceTypeEdit()) {
        this.deviceMeasurementNewEditGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewEditTable')
      } else {
        this.sizeToFitMeasurementEdit();
        this.measurementNameGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementNameTable');
        this.getAggridState('measurementNameTable');
        this.setStateTableState('measurementNameTable')
        this.measurementInputEditGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementInputEditTable');
        this.getAggridState('measurementInputEditTable');
        this.setStateTableState('measurementInputEditTable');
        if (this.measurementNameGrid.api.getRowNode("0") != null) {
          this.measurementNameGrid.api.getRowNode("0").setSelected(true);
          this.setFilterSetting('measurementNameTable');
        }
      }
    } else if (event.tab.textLabel == 'Notes') {
      this.deviceNotesEdit.api.sizeColumnsToFit();
      this.setFilterSetting('deviceNotesEditTable');
      document.getElementById("deviceNotesEdit").addEventListener("contextmenu", function (e) {
        e.cancelBubble = true;
        e.stopPropagation();
        e.preventDefault();
      });
    }
  }

  sizeToFitForShowSelectedMeas() {
    this.measurementInputShowGrid.api.sizeColumnsToFit();
    this.setFilterSetting('measurementInputShowTable');
  }

  onViewTabChanged(event) {
    if (event.tab.textLabel == 'Measurements') {
      if (this.checkDeviceTypeEdit() == true) {
        this.measurementNameShowGrid.api.sizeColumnsToFit();
        setTimeout(() => {
          this.setFilterSetting('measurementNameShowTable');
        }, 1500);
        this.getAggridSortState('measurementNameShowTable');
        this.setStateTableState('measurementNameShowTable');

        this.measurementInputShowGrid.api.sizeColumnsToFit();
        this.setFilterSetting('measurementInputShowTable');
        this.getAggridSortState('measurementInputShowTable');
        this.setStateTableState('measurementInputShowTable');
        this.getCalRulesByDeviceId(this.selectedDeviceShow.assetId);
        setTimeout(() => {
          (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)"
        }, 150);
      } else if (!this.checkDeviceTypeEdit()) {
        this.deviceMeasurementNewSelectedGrid.api.sizeColumnsToFit();
        this.setFilterSetting('deviceMeasurementNewSelectedTable');
        setTimeout(() => {
          (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)"
        }, 150);
      }
    } else if (event.tab.textLabel == 'Notes') {
      this.deviceNotesView.api.sizeColumnsToFit();
      this.setFilterSetting('deviceNotesViewTable');
      document.getElementById("deviceNotesView").addEventListener("contextmenu", function (e) {
        e.cancelBubble = true;
        e.stopPropagation();
        e.preventDefault();
      });
      setTimeout(() => {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)"
      }, 150);
    }
    else if (event.tab.textLabel == 'Asset Information' || event.tab.textLabel == 'Asset Details' || event.tab.textLabel == 'Picture') {
      setTimeout(() => {
        (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)"
      }, 150);
    }

  }

  isSelectedDevice(deviceid) {
    return this.selectedDeviceId = deviceid;
  }

  mouseOver(gm, infowindow, deviceid) {
    if (this.selectedDeviceId != deviceid) {
      gm.lastOpen = infowindow;
      gm.lastOpen.open();
    }
  }

  mouseOut(gm, deviceid) {
    if (this.selectedDeviceId != deviceid) {
      if (gm.lastOpen) {
        gm.lastOpen.close();
      }
    }
  }

  refresh() {
    this.getAllDevice();
    this.getAllDevicesTree();
  }

  getDeviceTypesByVendor(vendorSeq) {
    this.deviceManagementService.getDeviceTypesByVendor(vendorSeq).subscribe(
      (response) => {
        this.deviceTypeList = response.data;
        this.createAttributesList = [];
      },
      (error) => {
        this.deviceTypeList = [];
        this.newDevice.assetTypeSeq = null;
        this.createAttributesList = [];
      }
    );
  }

  onTabSelect(e) {
  }

  showDeviceMarker(isForceShowAll) {
    let deviceList: Device[] = [];
    let selectedDevice = this.selectedDevice;
    deviceList.push(this.selectedDevice);
    let markers = [];
    deviceList.forEach((device) => {
      let marker = {
        deviceid: device.assetId,
        lat: Number(device.latitude),
        lng: Number(device.longitude),
        deviceTypeSeq: device.assetTypeSeq,
        parentAssetid: selectedDevice.assetClass == 'Electrical' ? selectedDevice.parentElecAssetId :
          selectedDevice.assetClass == 'Communication' ? selectedDevice.parentCommAssetId : '',
        description: device.description
      };
      markers.push(marker);
    });
    this.markers = markers;
  }

  showSelectedDeviceNewView(assetId) {
    this.selectedTabIndex = 0;
    this.newDevice.vendorSeq = null;
    this.newDevice.assetTypeSeq = null;

    this.selectedDeviceShow = Object.assign(this.selectedDeviceShow,
      this.deviceListData.find(function (device) {
        return device.assetId == assetId;
      })
    );
    if (this.selectedDeviceShow.assetClass == 'Electrical') {
      this.onAssetClassSelected(this.selectedDeviceShow.assetClass)
      this.selectedDeviceShow.parentAssetid = this.selectedDeviceShow.parentElecAssetId;
    } else if (this.selectedDeviceShow.assetClass == 'Communication') {
      this.onAssetClassSelected(this.selectedDeviceShow.assetClass)
      this.selectedDeviceShow.parentAssetid = this.selectedDeviceShow.parentCommAssetId;
    }
    if (this.selectedDeviceShow.installationDate == null) {
      this.selectedDeviceShow.installationDate = null;
    } else {
      this.selectedDeviceShow.installationDate = new Date(this.selectedDeviceShow.installationDate);
    }
    if (this.selectedDeviceShow.registrationTs == null) {
      this.selectedDeviceShow.registrationTs = null;
    } else {
      this.selectedDeviceShow.registrationTs = new Date(this.selectedDeviceShow.registrationTs);
    }
    if (this.selectedDeviceShow.provisioningTs == null) {
      this.selectedDeviceShow.provisioningTs = null;
    } else {
      this.selectedDeviceShow.provisioningTs = new Date(this.selectedDeviceShow.provisioningTs);
    }

    if (this.selectedDeviceShow.vendorSeq != null) {
      this.getDeviceTypesByVendor(this.selectedDeviceShow.vendorSeq);
    }

    this.getCalRulesByDeviceId(assetId);
    this.getPictureByDeviceId(assetId);
    this.getNoteByDeviceId(assetId);
    this.getDropDownNames(this.selectedDevice);
    // setTimeout(() => {
    //   (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)"
    // }, 150);
    this.selectedTabs.selectedIndex = 0;
  }

  getAllDeviceS() {
    this.newDevice.vendorSeq = null;
    this.newDevice.assetTypeSeq = null;
    this.loading = true;
    this.deviceManagementService.getAllDevice().subscribe((response) => {
      this.loading = false;
      this.deviceListData = response.data;
    }, (error) => {
      this.loading = false;
      this.toaster.error(this.errorLoadingDataFromServerMessage);
    }
    );
  }

  showSelectedDevice(assetId, initiator) {
    this.showCreate = false;
    this.newDevice.vendorSeq = null;
    this.newDevice.assetTypeSeq = null;
    this.getAllDeviceS();

    this.showSelectedDeviceNewView(assetId);
    let selectedDevice;
    if (this.deviceList != null) {
      selectedDevice = JSON.parse(JSON.stringify(this.deviceListData.find((device) => {
        return device.assetId == assetId;
      })
      )
      );
    }
    this.selectedDevice = Object.assign(this.selectedDevice, selectedDevice);
    this.showDeviceMarker(true);
    if (this.selectedDevice.installationDate == null) {
      this.selectedDevice.installationDate = null;
    } else {
      this.selectedDevice.installationDate = new Date(this.selectedDevice.installationDate);
    }
    if (this.selectedDevice.registrationTs == null) {
      this.selectedDevice.registrationTs = null;
    } else {
      this.selectedDevice.registrationTs = new Date(this.selectedDevice.registrationTs);
    }
    if (this.selectedDevice.provisioningTs == null) {
      this.selectedDevice.provisioningTs = null;
    } else {
      this.selectedDevice.provisioningTs = new Date(this.selectedDevice.provisioningTs);
    }

    this.selectedDeviceId = this.selectedDevice.id;
    this.getAttributes();
    this.isEdit = false;
    this.deviceTypeList.forEach((deviceType) => {
      if (this.selectedDevice.assetTypeSeq == deviceType.assetTypeSeq) {
        this.deviceTypeName = deviceType.deviceTypeName;
      }
    });

    if (initiator == "reset") {
      this.editDeviceId = true;
    } else {
      this.editDeviceId = false;
    }
    if (initiator == "marker") {
      setTimeout(() => {
        this.tree.treeModel.getNodeById(assetId).setIsActive(true);
      }, 200);
    }
    this.getChildDeviceIds(assetId);
  }

  checkSelectedDeviceType() {
    let deviceTypeName;
    this.deviceTypeList.forEach((deviceType) => {
      if (this.selectedDevice.assetTypeSeq == deviceType.deviceTypeSeq) {
        deviceTypeName = deviceType.deviceTypeName;
      }
    });
    if (deviceTypeName == "Virtual Device") {
      return true;
    } else {
      return false;
    }
  }

  getAttributes() {
    this.deviceManagementService.getAttributesByDeviceSeq(this.selectedDevice.assetTypeSeq).subscribe(
      (response) => {
        let attributesList = [];
        let attributes = response.data;
        if (attributes != null) {
          attributes.forEach((data) => {
            let attribute = {
              name: data.physicalAttrName,
              value: this.selectedDevice[data.logicalAttrName.toLowerCase()],
              lname: data.logicalAttrName,
              type: data.dataType,
              orderSeq: data.orderSeq
            };
            attributesList.push(attribute);
          });
          attributesList.sort((a, b) => {
            return a.orderSeq - b.orderSeq;
          });
          this.attributesList = attributesList;
        } else {
          this.attributesList = [];
        }
      },
      (error) => {
        this.toaster.error(this.errorLoadingDataFromServerMessage);
      }
    );
    this.getAllMeasurmentEdit();
  }

  showCreateAttributes(deviceTypeSeq) {
    this.deviceTypeSeq = deviceTypeSeq;
    this.deviceManagementService.getAttributesByDeviceSeq(deviceTypeSeq).subscribe(
      (response) => {
        let createAttributesList = [];
        let attributes = response.data;
        if (attributes != null) {
          attributes.forEach((data) => {
            let attribute = {
              name: data.physicalAttrName,
              value: null,
              lname: data.logicalAttrName,
              type: data.dataType
            };
            createAttributesList.push(attribute);
          });
          this.createAttributesList = createAttributesList;
        } else {
          this.createAttributesList = [];
        }
      },
      (error) => {
        this.toaster.error(this.errorLoadingDataFromServerMessage);
      }
    );
    this.getAllMeasurment();
  }

  public selectedAssetClass;
  public deviceListByClass: any[] = [];
  onAssetClassSelected(event) {
    this.selectedAssetClass = event;
    this.deviceListByClass = [];
    this.newDevice.parentAssetid = null;
    this.deviceManagementService.getParentIdByAssetClass(event).subscribe(res => {
      this.deviceListByClass = res.data;
    }, error => {
    });
  }

  createDevice(isCreate, isClone) {
    let device: Device;
    this.loading = true;
    if (isCreate) {
      device = JSON.parse(JSON.stringify(this.newDevice));
      device.assetNotes.forEach(note => {
        note.id = null;
      })

      if (isClone) {
        device.assetNotes.forEach(note => {
          note.id = null;
        })

        device = this.selectedDevice
        device.assetId = this.newDevice.assetId
        device.assetName = this.newDevice.assetName

        if (this.selectedDevice.assetNotes.length > 0) {
          this.selectedDevice.assetNotes.forEach(element => {
            element.id = null;
          });
        }

        if (this.newDevice.assetNotes.length > 0) {
          this.newDevice.assetNotes.forEach(element => {
            element.id = null;
          });
        }
      }

      if (this.selectedAssetClass == 'Electrical') {
        device.parentElecAssetId = this.newDevice.parentAssetid;
        device.parentCommAssetId = null;
      } else if (this.selectedAssetClass == 'Communication') {
        device.parentCommAssetId = this.newDevice.parentAssetid;
        device.parentElecAssetId = null;
      }
      if (this.checkDeviceType()) {
        device.isVirtual = 'Y';
      }
      else device.isVirtual = 'N';
      if (this.deviceListData != null) {
        if (this.deviceListData.findIndex(device1 => {
          return device1.assetId == device.assetId;
        }) >= 0) {
          this.loading = false;
          this.toaster.warning(this.assetIdAlreadyExist);
          return 0;
        }
      }

      if (!isClone) {
        for (let i = 1; i <= 50; i++) {
          if (i < 10) {
            device['attribute0' + i] = null;
          }
          else {
            device['attribute' + i] = null;
          }
        }
        this.createAttributesList.forEach(data => {
          device[data.lname.toLowerCase()] = data.value;
        })
      }
      device.createDate = new Date();
      device.createUser = sessionStorage.getItem("hems-loggedInUser");
    }
    if (this.deviceListData != null) {
      if (this.deviceListData.findIndex(device1 => {
        if (device1.assetName == device.assetName && device1.assetId != device.assetId) {
          return true;
        }
        return false;
      }) >= 0) {
        this.loading = false;
        this.toaster.warning(this.assetNameAlreadyExist);
        return 0;
      }
    }

    if (device.parentAssetid == "null") {
      device.parentAssetid = null;
    }
    if (device.assetId != null && device.assetId != "" && device.assetId != undefined && device.assetId) {
      if (device.vendorSeq != null && device.vendorSeq > 0 && device.vendorSeq != undefined) {
        if (this.checkDeviceType() == true || this.checkDeviceTypeEdit() == true) {
          device.assetsVirtualCalcRules = this.list
        }
        this.deviceManagementService.createAsset(device).subscribe(response => {
          this.loading = false;
          this.loading = false;
          this.selectedTabs.selectedIndex = 0;
          if (isCreate) {
            this.init = true;
            if (isClone) {
              if (response.message == 'Success') {
                this.toaster.success(this.assetClonedSuccessfully)
              } else {
                this.toaster.warning(response.message);
              }
            }
            else {
              this.toaster.success(this.assetCreatedSuccessfully)
            }
            this.getAllDevice();
            this.getAllDevicesTree();
            this.measurement = new MemsDeviceVirtualCalcRules();
            this.closeModal();
            this.cloneDeviceModal.hide();
          }
          else {
            this.toaster.success(this.assetUpdatedSuccessfully);
            this.measurementNameShowRowData = this.measurementNameRowData;
            this.cancelDevice();
            this.getAllDevice();
            this.getAllDevicesTree();
          }
          this.loading = false
        },
          error => {
            this.loading = false;
            this.toaster.error(this.somethingHappendAtOurEndMessage);
          })
      }
      else {
        this.loading = false;
        this.toaster.warning(this.invalidValueForVendorSequence);
      }
    }
    else {
      this.loading = false;
      this.toaster.warning(this.assetIdCannotBeEmpty);
    }
  }

  updateDevice(isCreate, isClone) {
    let device: Device;
    device = this.selectedDevice;
   if (this.selectedAssetClass == 'Electrical') {
      device.parentElecAssetId = this.selectedDevice.parentAssetid;
      device.parentCommAssetId = null;
    } else if (this.selectedAssetClass == 'Communication') {
      device.parentCommAssetId = this.selectedDevice.parentAssetid;
      device.parentElecAssetId = null;
    }
    if (this.checkDeviceTypeEdit()) {
      device.isVirtual = 'Y';
    }
    else device.isVirtual = 'N';
    for (let i = 1; i <= 50; i++) {
      if (i < 10) {
        device['attribute0' + i] = null;
      }
      else {
        device['attribute' + i] = null;
      }
    }
    this.attributesList.forEach(data => {
      device[data.lname.toLowerCase()] = data.value;
    })

    device.assetNotes.forEach(note => {
      note.id = null;
    })
    device.assetPicture.forEach(picture => {
      picture.pictureId = null;
    })
    device.updateDate = new Date();
    device.updateUser = sessionStorage.getItem("hems-loggedInUser");

    if (this.deviceList.findIndex(device1 => {
      if (device1.assetName == device.assetName && device1.assetId != device.assetId) {
        return true;
      }
      return false;
    }) >= 0) {
      this.loading = false;
      this.toaster.warning(this.assetNameAlreadyExist);
      return 0;
    }
    if (device.parentAssetid == "null") {
      device.parentAssetid = null;
    }
    if (device.assetId != null && device.assetId != "" && device.assetId != undefined && device.assetId) {
      if (device.vendorSeq != null && device.vendorSeq > 0 && device.vendorSeq != undefined) {
        if (this.checkDeviceType() == true || this.checkDeviceTypeEdit() == true) {
          device.assetsVirtualCalcRules = this.list
        }
        let msg;
        this.deviceManagementService.updateAsset(device).subscribe(response => {
          this.loading = false;
          if (isCreate) {
            this.init = true;
            if (isClone) {
              msg = 'Asset Cloned Successfully';
            }
            else {
              msg = 'Asset Created Successfully';
            }

     
            this.toaster.success(msg);
            this.getAllDevice();
            this.getAllDevicesTree();
            this.measurement = new MemsDeviceVirtualCalcRules();
            this.cloneDeviceModal.hide();
            this.closeModal();
            this.refresh();
          }
          else {
            this.toaster.success('Asset Updated Successfully');
            this.measurementNameShowRowData = this.measurementNameRowData;
            this.originalSelectedDevice = this.selectedDevice;
            this.cancelDevice();
            
          }
          this.showSelectedDevice(this.originalSelectedDevice.assetId, "inline");
          setTimeout(() => {
            
            this.tree.treeModel.getNodeById(this.originalSelectedDevice.assetId).setIsActive(true);
          }, 4250);
          
        },
          error => {
            this.loading = false;
            this.toaster.error(this.somethingHappendAtOurEndMessage);
          })
      }
      else {
        this.loading = false;
        this.toaster.warning(this.invalidValueForVendorSequence);
      }
    }
    else {
      this.loading = false;
      this.toaster.warning(this.assetIdCannotBeEmpty);
    }
  }

  hasChildNodes(assetId) {
    let node = this.tree.treeModel.getNodeById(assetId);
    if (node != null) return node.hasChildren;
    else return false;
  }

  confirmDeleteDevice() {
    if (this.selectedDeviceId != null) this.deleteModal.show();
    else {
      this.toaster.warning(this.noAssetSelected);
    }
  }

  deleteDevice() {
    this.loading = true;
    this.deviceManagementService.deleteDevice(this.selectedDeviceId).subscribe((response) => {
      this.loading = false;
      if (response.message == "Success") {
        this.deleteModal.hide();
        this.toaster.success(this.assetDeletedSuccessfully);
        this.selectedDevice = new Device();
        this.selectedDeviceShow = new Device();
        this.selectedDeviceId = null;
        if (this.selectedDevice.parentAssetid == null) {
          setTimeout(() => {
            const newSelectedDevice1 = this.deviceHierarchyListOriginal[0].id;
            this.tree.treeModel.getNodeById(newSelectedDevice1).setIsActive(true);
          }, 200);

        } else {
          this.tree.treeModel.getFirstRoot().setIsActive(true);
        }
        this.refresh();
      }

    }, (error) => {
      this.loading = false;
      this.deleteModal.hide();
      this.toaster.error("Cannot delete mapped asset");
    }
    );
  }

  public assetClassEdit;
  public assetParentId;

  openEditModal() {
    this.selectedEditTabIndex = 0;
    this.editTabs.selectedIndex = 0;
    this.selectedEditTabIndex = this.editTabs.selectedIndex;
    if (this.selectedDevice.vendorSeq != null) {
      this.getDeviceTypesByVendor(this.selectedDevice.vendorSeq);
    }
    if (this.selectedDevice.assetClass == 'Electrical') {
      this.onAssetClassSelected(this.selectedDevice.assetClass)
      this.selectedDevice.parentAssetid = this.selectedDevice.parentElecAssetId;
    } else if (this.selectedDevice.assetClass == 'Communication') {
      this.onAssetClassSelected(this.selectedDevice.assetClass)
      this.selectedDevice.parentAssetid = this.selectedDevice.parentCommAssetId;
    }
    this.list.forEach((data) => {
      data.id = null;
    });
    this.measurementNameRowData = JSON.parse(JSON.stringify(this.list));
    if (this.list != null && this.list.length > 0) {
      this.measurement = JSON.parse(JSON.stringify(this.list[0]));
      this.selectedMeasurement = Object.assign({}, this.list[0]);
    }
    this.selectedNoteIndex = null;
    this.getAllSelectInputMeasurementEdit();
    this.editModal.show();

  }

  cancelDevice() {
    this.editModal.hide();
    this.showSelectedDevice(this.selectedDeviceId, "inline");
    this.currentSection = "section1";
    this.deviceTypeList = [];
    this.measurementNameRowData = [];
    this.list = [];
    this.measurement = new MemsDeviceVirtualCalcRules();
    this.selectedMeasurement = new MemsDeviceVirtualCalcRules();
  }

  resetChanges() {
    this.isreset = true;
    this.showSelectedDevice(this.selectedDeviceId, "reset");
    this.getDeviceTypesByVendor(this.selectedDevice.vendorSeq);
    this.list.forEach((data) => {
      data.id = null;
    });
    this.measurementNameRowData = JSON.parse(JSON.stringify(this.list));

    if (this.list != null && this.list.length > 0) {
      this.measurement = JSON.parse(JSON.stringify(this.list[0]));
      this.selectedMeasurement = Object.assign({}, this.list[0]);
    }
  }

  onSectionChange(sectionId) {
    this.currentSection = sectionId;
  }

  onSectionChangeCreate(sectionId: string) {
    this.currentSectionCreate = sectionId;
  }

  scrollTo(section) {
    document.querySelector("#" + section).scrollIntoView();
  }

  getMemsDeviceStatus() {
    this.memDeviceSubscription = this.deviceManagementService.getMemsDeviceStatus().subscribe((response) => {
      this.memsDeviceStatusList = response.data;
      if (this.isAutoRefresh) {
      clearTimeout(this.memdeviceTimeOut)
      this.memdeviceTimeOut=setTimeout(() => {
          this.getMemsDeviceStatus(); 
      }, this.refreshFrequency * 1000);
    }
    else{
      clearTimeout(this.memdeviceTimeOut)
    }
    }, error => {
      if (this.isAutoRefresh) {
        clearTimeout(this.memdeviceTimeOut)
        this.memdeviceTimeOut=setTimeout(() => {
            this.getMemsDeviceStatus(); 
        }, this.refreshFrequency * 1000);
      }
    });
  }

  checkDeviceType() {
    let isVirtual = false;
    if (this.deviceTypeList != null) {
      this.deviceTypeList.forEach((deviceType) => {
        if (this.newDevice.assetTypeSeq == deviceType.assetTypeSeq) {
          if (deviceType.isVirtual == "Y") {
            isVirtual = true;
          }
        }
      });
    }
    return isVirtual;
  }

  addMeasurement() {
    this.selectedMeasurement = new MemsDeviceVirtualCalcRules();
    this.measurement = new MemsDeviceVirtualCalcRules();
    this.measurementNameGrid.api.redrawRows();
  }

  selectMeasurement(event) {
    this.selectedMeasurement = Object.assign({}, event.data);
    this.measurement = JSON.parse(JSON.stringify(event.data));
    this.measurementNameGrid.api.redrawRows();
    this.measurementNameGrid.api.getRowNode(event.node.id).setSelected(true);
  }

  selectMeasurementShow(event) {
    this.selectedMeasurementShow = Object.assign({}, event.data);
    this.measurementShow = JSON.parse(JSON.stringify(event.data));
    this.measurementNameShowGrid.api.redrawRows();
  }

  rowDoubleClickMeasurementInput($event) {
    this.isValidExpression = false;
    if ($event) {
      this.contextRow = JSON.parse(JSON.stringify($event.data));
      let str = this.measurement.calculationEquation;
      if (str.length == 0) {
        this.measurement.calculationEquation = this.contextRow.assetId + "." + this.contextRow.measurementName;
      } else if (str.length > 0) {
        this.measurement.calculationEquation =
          this.measurement.calculationEquation + this.contextRow.assetId + "." + this.contextRow.measurementName;
      }
    }
  }

  setValue(value) {
    this.isValidExpression = false;
    if (value == 1) {
      this.selectedOperator = "+";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 2) {
      this.selectedOperator = "-";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 3) {
      this.selectedOperator = "/";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 4) {
      this.selectedOperator = "%";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 5) {
      this.selectedOperator = "*";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 6) {
      this.selectedOperator = "=";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 7) {
      this.selectedOperator = "<";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 8) {
      this.selectedOperator = ">";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 9) {
      this.selectedOperator = "&";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 10) {
      this.selectedOperator = "<=";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 11) {
      this.selectedOperator = ">=";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 12) {
      this.selectedOperator = "!=";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 13) {
      this.selectedOperator = "|";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 14) {
      this.selectedOperator = "==";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 15) {
      this.selectedOperator = "!==";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 16) {
      this.selectedOperator = "===";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 17) {
      this.selectedOperator = "(";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 18) {
      this.selectedOperator = ")";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 19) {
      this.selectedOperator = "[";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
    if (value == 20) {
      this.selectedOperator = "]";
      this.measurement.calculationEquation = this.measurement.calculationEquation + this.selectedOperator;
    }
  }

  validateExpressionAdd() {
    this.isValidExpression = false;
    if (this.measurement.calculationEquation != null && this.measurement.calculationEquation != "") {
      setTimeout(() => {
        if (!this.isValidExpression) {
          this.toaster.error(this.validationFailed);
        }
      }, 1000);
      if (mathjs.parse(this.measurement.calculationEquation) != null) {
        this.isValidExpression = true;
        this.toaster.success(this.validationSuccess);
      }
    } else {
      this.toaster.warning(this.noEquationEntered);
    }
  }

  toggleValidation() {
    if (this.measurement.calculationEquation != "" && this.measurement.calculationEquation != null)
      this.isValidExpression = false;
    else this.isValidExpression = true;
  }

  saveMeasurement() {
    document.getElementById("measurementNameGrid").addEventListener("contextmenu", function (ev) {
      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();
    });
    window.addEventListener("resize", () => {
      if (this.measurementNameGridEl.nativeElement.offsetWidth) {
        this.measurementNameGrid.api.sizeColumnsToFit();
        if (this.measurementNameGrid.api.getRowNode("0") != null) {
          this.measurementNameGrid.api.getRowNode("0").setSelected(true);
          this.setFilterSetting('measurementNameTable');
        }
      }
    });
    if (this.selectedMeasurement.assetMeasurementName != null) {
      let index = this.list.findIndex((meas) => {
        return meas.assetMeasurementName == this.selectedMeasurement.assetMeasurementName;
      });
      if (this.selectedMeasurement.assetMeasurementName == this.measurement.assetMeasurementName) {
        this.list[index] = JSON.parse(JSON.stringify(this.measurement));
      } else {
        if (
          this.list.findIndex((meas) => {
            return meas.assetMeasurementName == this.measurement.assetMeasurementName;
          }) >= 0
        ) {
          this.toaster.warning(this.duplicateMeasurementName);
          return;
        } else {
          this.list[index] = JSON.parse(JSON.stringify(this.measurement));
        }
      }
    } else {
      if (
        this.list.findIndex((meas) => {
          return meas.assetMeasurementName == this.measurement.assetMeasurementName;
        }) >= 0
      ) {
        this.toaster.warning("Duplicate Measurement Name.");
        return;
      } else {
        this.list.push(this.measurement);
        this.measurementNameGrid.api.sizeColumnsToFit();

        if (this.measurementNameGrid.api.getRowNode("0") != null) {
          this.measurementNameGrid.api.getRowNode("0").setSelected(true);
          this.setFilterSetting('measurementNameTable');
        }
      }
    }
    this.getOutputMeasurement(this.list);
  }

  saveMeasurementAdd() {
    if (this.selectedMeasurement.assetMeasurementName != null) {
      let index = this.list.findIndex((meas) => {
        return meas.assetMeasurementName == this.selectedMeasurement.assetMeasurementName;
      });
      if (this.selectedMeasurement.assetMeasurementName == this.measurement.assetMeasurementName) {
        this.list[index] = JSON.parse(JSON.stringify(this.measurement));
      } else {
        if (this.list.findIndex((meas) => {
          return meas.assetMeasurementName == this.measurement.assetMeasurementName;
        }) >= 0
        ) {
          this.toaster.warning(this.duplicateMeasurementName);
          return;
        } else {
          this.list[index] = JSON.parse(JSON.stringify(this.measurement));
        }
      }
    } else {
      if (
        this.list.findIndex((meas) => {
          return meas.assetMeasurementName == this.measurement.assetMeasurementName;
        }) >= 0
      ) {
        this.toaster.warning(this.duplicateMeasurementName);
        return;
      } else {
        this.list.push(this.measurement);
      }
    }
    this.getOutputMeasurementAdd(this.list);
  }

  getOutputMeasurement(list) {
    this.measurementNameRowData = JSON.parse(JSON.stringify(list));
    this.selectedMeasurement = Object.assign({}, this.selectedMeasurement, list[0]);
    this.measurement = JSON.parse(JSON.stringify(this.selectedMeasurement, list[0]));
    this.measurementNameGrid.api.redrawRows();
  }

  getOutputMeasurementAdd(list) {
    this.measurementNameAddRowData = JSON.parse(JSON.stringify(list));
    this.selectedMeasurement = Object.assign({}, this.selectedMeasurement, list[0]);
    this.measurement = JSON.parse(JSON.stringify(this.selectedMeasurement, list[0]));
    this.measurementNameGrid.api.redrawRows();
    this.measurementNameGrid.api.sizeColumnsToFit();
    if (this.measurementNameGrid.api.getRowNode("0") != null) {
      this.measurementNameGrid.api.getRowNode("0").setSelected(true);
    }
  }

  checkDeviceTypeEdit() {
    let isVirtual = false;
    if (this.deviceTypeListEdit != null) {
      this.deviceTypeListEdit.forEach((deviceType) => {
        if (this.selectedDevice.assetTypeSeq == deviceType.assetTypeSeq) {
          if (deviceType.isVirtual == "Y") {
            isVirtual = true;
          }
        }
      });
    }
    return isVirtual;
  }

  newList = [];
  deleteMeasurement() {
    this.list.splice(this.list.findIndex((data) => {
      return data.assetMeasurementName == this.selectedMeasurement.assetMeasurementName;
    }), 1);
    this.measurementNameRowData = JSON.parse(JSON.stringify(this.list));
    this.measurementNameGrid.api.setRowData(this.measurementNameRowData);
    this.measurement = new MemsDeviceVirtualCalcRules();
    this.deleteMeasurementModal.hide();
    this.sizeColumnsMeasurement(event);
  }

  deleteMeasurementEdit() {
    this.list.splice(
      this.list.findIndex((data) => {
        return data.assetMeasurementName == this.selectedMeasurement.assetMeasurementName;
      }),
      1
    );
    this.measurementNameRowData = JSON.parse(JSON.stringify(this.list));
    this.measurement = new MemsDeviceVirtualCalcRules();
    this.measurementShow = new MemsDeviceVirtualCalcRules();
    this.deleteMeasurementEditModal.hide();
    this.measurementNameGrid.api.redrawRows();
    this.sizeColumnsMeasurementEdit(event);
  }

  openCloneDevice(form: NgForm) {
    form.resetForm();
    let deviceTypeName;
    this.newDevice = Object.assign(this.newDevice, this.selectedDevice);
    if (this.selectedDevice.vendorSeq != null) {
      this.deviceManagementService.getDeviceTypesByVendor(this.selectedDevice.vendorSeq).subscribe((response) => {
        let deviceTypeListEdit = response.data;
        deviceTypeListEdit.forEach((deviceType) => {
          if (this.selectedDevice.assetTypeSeq == deviceType.assetTypeSeq) {
            deviceTypeName = deviceType.isVirtual;
          }
        });

        if (deviceTypeName == "Y") {
          this.toaster.info(this.virtualAssetCouldNotBeCloned);
        } else {
          this.newDevice.assetId = null;
          this.newDevice.assetName = null;
          this.newDevice.assetPicture = [];
          this.cloneDeviceModal.show();
        }
      });
    }
  }

  resetClone(form: NgForm) {
    form.resetForm();
    this.newDevice.assetId = null;
    this.newDevice.assetName = null;
  }

  cancelClone() {
    this.newDevice = new Device();
    this.cloneDeviceModal.hide();
  }

  /* Picture */
  selectFile(event) {
    this.newUploadPictureFile = event.target.files[0];
    this.selectedFileName = this.newUploadPictureFile.name;
  }

  validatePictureDetails() {
    this.uploadPictureValidationErrorMsg = null;
    if (
      this.newDevice.assetPicture.findIndex((picture) => {
        return picture.pictureTitle.toLowerCase() == this.newMemsDevicePicture.pictureTitle.toLowerCase();
      }) != -1
    ) {
      this.uploadPictureValidationErrorMsg = "Duplicate Picture Title.";
      return false;
    }
    if (this.newUploadPictureFile.size > 2 * 1024 * 1024) {
      this.uploadPictureValidationErrorMsg = "Image size should be less than 2 MB.";
      return false;
    }
    return true;
  }

  validatePictureDetailsEdit() {
    this.uploadPictureValidationErrorMsg = null;
    if (
      this.selectedDevice.assetPicture.findIndex((picture) => {
        return picture.pictureTitle.toLowerCase() == this.newMemsDevicePicture.pictureTitle.toLowerCase();
      }) != -1
    ) {
      this.uploadPictureValidationErrorMsg = "Duplicate Picture Title.";
      return false;
    }
    if (this.newUploadPictureFile.size > 2 * 1024 * 1024) {
      this.uploadPictureValidationErrorMsg = "Image size should be less than 2 MB.";
      return false;
    }
    return true;
  }

  checkExetension() {
    if (
      this.newUploadPictureFile.name.toLowerCase().endsWith("jfif") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("webp") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("png") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("jpeg") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("bmp") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("xbm") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("tif") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("pjp") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("pjpeg") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("svgz") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("ico") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("tiff") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("gif") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("svg") ||
      this.newUploadPictureFile.name.toLowerCase().endsWith("jpg")
    ) {
      return true;
    } else {
      this.uploadPictureValidationErrorMsg = "Invalid File Type Selected";
      return false;
    }
  }

  uploadNewPicture() {
    if (this.pictureIsCreate) {
      if (this.validatePictureDetails() && this.checkExetension()) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          this.newMemsDevicePicture.pictureFile = btoa(fileReader.result.toString());
          this.newDevice.assetPicture.push(this.newMemsDevicePicture);
          this.uploadPictureModal.hide();
          this.newMemsDevicePicture = new AssetPicture();
          this.newUploadPictureFile = null;
          this.importPictureFile.nativeElement.value = null;
        };
        fileReader.readAsBinaryString(this.newUploadPictureFile);
      }
    } else {
      if (this.validatePictureDetailsEdit() && this.checkExetension()) {
        let fileReader1 = new FileReader();
        fileReader1.onload = () => {
          this.newMemsDevicePicture.pictureFile = btoa(fileReader1.result.toString());
          this.selectedDevice.assetPicture.push(this.newMemsDevicePicture);
          this.uploadPictureModal.hide();
          this.newMemsDevicePicture = new AssetPicture();
          this.newUploadPictureFile = null;
          this.importPictureFile.nativeElement.value = null;
        };
        fileReader1.readAsBinaryString(this.newUploadPictureFile);
      }
    }
  }

  removeNewPicture(title) {
    this.newDevice.assetPicture.splice(
      this.newDevice.assetPicture.findIndex((picture) => {
        return picture.pictureTitle == title;
      }),
      1
    );
  }

  removePictureEdit(title) {
    this.selectedDevice.assetPicture.splice(
      this.selectedDevice.assetPicture.findIndex((picture) => {
        return picture.pictureTitle == title;
      }),
      1
    );
  }

  openUplaod(isCreate) {
    this.pictureIsCreate = isCreate;
    this.selectedFileName = null;
    this.uploadPictureModal.show();
    this.uploadPictureValidationErrorMsg = null;
  }

  resetupload(form: NgForm) {
    form.resetForm();
  }

  cancelUploadNewPicture() {
    this.uploadPictureModal.hide();
    this.newMemsDevicePicture = new AssetPicture();
    this.importPictureFile.nativeElement.value = null;
    this.newUploadPictureFile = null;
  }

  showFullScreen(picture) {
    this.fullScreenPicture.title = picture.pictureTitle;
    this.fullScreenPicture.pictureData = picture.pictureFile;
    this.showFullPictureModal.show();
  }

  closeFullScreen() {
    this.fullScreenPicture.title = null;
    this.fullScreenPicture.pictureData = null;
    this.showFullPictureModal.hide();
  }

  /* Device Notes */
  cancelAddNote() {
    this.addNewNotesModal.hide();
    this.newNote = new AssetNotes();
  }

  resetNote() {
    if (this.noteIsNew) {
      this.newNote = new AssetNotes();
    } else if (this.noteIsCreate) {
      this.newNote = JSON.parse(JSON.stringify(this.rowDataDeviceNotes[this.selectedNoteIndex]));
    } else {
      this.newNote = JSON.parse(JSON.stringify(this.rowDataDeviceNotesEdit[this.selectedNoteIndex]));
    }
  }

  openAddNote(isCreate, isNew, isViewOnly, e) {
    if (isCreate) {
      if (isNew) {
        this.newNote = new AssetNotes();
        this.addNewNotesModal.show();
        this.noteIsCreate = true;
        this.noteIsNew = true;
      } else {
        this.newNote = Object.assign(this.newNote, e.data);
        this.addNewNotesModal.show();
        this.noteIsCreate = true;
        this.noteIsNew = false;
        this.noteEditMode = false;
        this.selectedNoteIndex = e.rowIndex;
        this.deviceNotes.api.redrawRows();
      }
    } else {
      if (isViewOnly) {
        this.newNote = Object.assign(this.newNote, e.data);
        this.noteIsCreate = false;
        this.noteIsNew = false;
        this.selectedNoteIndexView = e.rowIndex;
        this.deviceNotesView.api.redrawRows();
        this.viewNotesModal.show();
      } else {
        if (isNew) {
          this.newNote = new AssetNotes();
          this.addNewNotesModal.show();
          this.noteIsCreate = false;
          this.noteIsNew = true;
        } else {
          this.newNote = Object.assign(this.newNote, e.data);
          this.addNewNotesModal.show();
          this.noteIsCreate = false;
          this.noteIsNew = false;
          this.noteEditMode = false;
          this.selectedNoteIndex = e.rowIndex;
          this.deviceNotesEdit.api.redrawRows();
        }
      }
    }
  }

  cancelViewNote() {
    this.viewNotesModal.hide();
  }

  toggleEditMode() {
    this.noteEditMode = true;
  }

  saveNote() {
    if (this.noteIsCreate) {
      this.newNote.createdBy = sessionStorage.getItem("hems-loggedInUser");
      this.newNote.createdDate = new Date();
      if (this.noteIsNew) {
        this.newDevice.assetNotes.push(this.newNote);
      } else {
        this.newDevice.assetNotes.splice(this.selectedNoteIndex, 1, this.newNote);
      }
      this.addNewNotesModal.hide();
      this.newNote = new AssetNotes();
      this.rowDataDeviceNotes = JSON.parse(JSON.stringify(this.newDevice.assetNotes));
    } else {
      if (this.noteIsNew) {
        this.newNote.createdBy = sessionStorage.getItem("hems-loggedInUser");
        this.newNote.createdDate = new Date();
        this.selectedDevice.assetNotes.push(this.newNote);
      } else {
        if (this.newNote.id != null) {
          this.newNote.updatedBy = sessionStorage.getItem("hems-loggedInUser");
          this.newNote.updatedDate = new Date();
          this.selectedDevice.assetNotes.splice(
            this.selectedDevice.assetNotes.findIndex((note) => {
              return note.id == this.newNote.id;
            }),
            1,
            this.newNote
          );
        } else {

          this.newNote.createdBy = sessionStorage.getItem("hems-loggedInUser");
          this.newDevice.createDate = new Date();
          this.selectedDevice.assetNotes.splice(this.selectedNoteIndex, 1, this.newNote);
        }
      }
      this.addNewNotesModal.hide();
      this.newNote = new AssetNotes();
      this.rowDataDeviceNotesEdit = JSON.parse(JSON.stringify(this.selectedDevice.assetNotes));
    }
  }

  deleteNote(isCreate, e) {
    let index = this.selectedNoteIndex;
    if (isCreate) {
      this.newDevice.assetNotes.splice(index, 1);
      this.rowDataDeviceNotes = JSON.parse(JSON.stringify(this.newDevice.assetNotes));
    } else {
      this.selectedDevice.assetNotes.splice(index, 1);
      this.rowDataDeviceNotesEdit = JSON.parse(JSON.stringify(this.selectedDevice.assetNotes));
    }
  }

  validateCharCount() {
    if (this.newNote.assetNote != null) {
      if (this.newNote.assetNote.length > 2048) {
        this.newNote.assetNote = this.newNote.assetNote.slice(0, 2048);
      }
    }
  }
 
  /* Device Import */
  importDeviceConfigurationCSVFile(e1) {
    let file = e1.target.files[0];
    this.loading = true;
    //XLSX to CSV
    let csvFileData: string;
    let fileReader = new FileReader();
    let that = this;
    fileReader.onload = function (e: any) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      csvFileData = XLSX.utils.sheet_to_csv(worksheet, { blankrows: false });
      let csvFile = new File([csvFileData], "upload.csv");

      that.deviceManagementService
        .importDeviceConfigurationCSV(csvFile, sessionStorage.getItem("hems-loggedInUser"))
        .subscribe(
          (response) => {
            that.loading = false;
            if (response.message == "Success") {
              that.toaster.success(that.assetConfigurationImportedSuccessfully);
              that.getAllDevice();
              that.getAllDevicesTree();
            } else {
              that.showFailedValidations(response.data);
            }
            that.importDeviceConfigurationCSV.nativeElement.value = null;
                        
            setTimeout(() => {
              const newSelectedDevice = response.data.assets[0].assetId;
              that.tree.treeModel.getNodeById(newSelectedDevice).setIsActive(true);
            }, 4250);
            that.showSelectedDevice(response.data.assets[0].assetId, "inline");
          },
          (error) => {
            that.loading = false;
            that.toaster.error(that.unableToImportDataThisTime);
            that.importDeviceConfigurationCSV.nativeElement.value = null;
          }
        );
    };
    fileReader.readAsArrayBuffer(file);
  }

  showFailedValidations(response) {
    let validationErrors = [];
    response.forEach((error) => {
      let errorMsg = DeviceConfigurationValidationErrors[error];
      if (errorMsg != null && !validationErrors.includes(errorMsg)) {
        validationErrors.push(errorMsg);
      } else if (error.startsWith("No vendor record for vendor name")) {
        errorMsg = "Vendor with name '" + error.slice(32) + "' does not exist.";
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      } else if (error.startsWith("No Group record for Group name")) {
        errorMsg = "Group with name '" + error.slice(30) + "' does not exist.";
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      } else if (error.startsWith("No AssetType record for AssetType name")) {
        errorMsg = "Asset Type with name '" + error.slice(38, error.indexOf(" for vendor")) + "' does not exist for vendor '" + error.substring(error.indexOf("for vendor") + 11) + "'.";
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      } else if (error.startsWith("This Combinations of Asset Id  And Parent Id")) {
        errorMsg = "File contains rows where AssetId '" + error.substring(68, error.indexOf(" ParentId=")) + "' has Parent Asset Id '" + error.substring(error.indexOf("ParentId=") + 9) + "'.";
        if (!validationErrors.includes(errorMsg)) {
          validationErrors.push(errorMsg);
        }
      } else if (error.startsWith("null value for Asset class")) {
        if (!validationErrors.includes('Asset Class Name is missing in file data')) {
          validationErrors.push('Asset Class Name is missing in file data');
        }
      }
      else if (error.startsWith("Asset Class with name")) {
        if (!validationErrors.includes(error)) {
          validationErrors.push(error);
        }
      } else {
        validationErrors.push(errorMsg);
      }
    });
    if (validationErrors.length > 0) {
      this.validationErrors = validationErrors;
      this.importDeviceConfigurationErrorModal.show();
    } else {
      this.toaster.error(this.unknownErrorOccured);
    }
  }

  createXLSXFile(json: any[]) {
    let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    let workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Asset_config_export_" + formatDate(new Date(), "MMddyyyy", "en-US") + ".csv");
  }

  navigateToVirtualDevice() {
    this.router.navigate(["devicemanagement/devicedataimport"], {
      queryParams: { deviceid: this.selectedDevice.assetId },
      skipLocationChange: true
    });
  }

  getPictureByDeviceId(deviceId) {
    this.loading = true;
    this.deviceManagementService.getPictureByDeviceId({ assetId: deviceId }).subscribe((response) => {
      this.loading = false;
      if (response.data != null) {
        this.selectedDevice.assetPicture = JSON.parse(JSON.stringify(response.data));
        this.selectedDeviceShow.assetPicture = JSON.parse(JSON.stringify(response.data));
      } else {
        this.selectedDevice.assetPicture = [];
        this.selectedDeviceShow.assetPicture = [];
      }

      if (this.selectedDevice.assetPicture != null && this.selectedDevice.assetPicture?.length > 0) {
        this.selectedDevice.assetPicture.forEach((picture) => {
          picture.pictureId = null;
        });
      }
    }, (error) => {
      this.loading = false;
    }
    );
  }

  getNoteByDeviceId(assetId) {
    this.loading = true;
    this.deviceManagementService.getNoteByDeviceId({ assetId: assetId }).subscribe((response) => {
      this.loading = false;
      if (response.data != null) {
        this.selectedDevice.assetNotes = JSON.parse(JSON.stringify(response.data));
        this.selectedDeviceShow.assetNotes = JSON.parse(JSON.stringify(response.data));
        this.rowDataDeviceNotesEdit = JSON.parse(JSON.stringify(this.selectedDevice.assetNotes));
      } else {
        this.selectedDevice.assetNotes = [];
        this.selectedDeviceShow.assetNotes = [];
      }
      setTimeout(() => {
        if (this.deviceNotesEdit.api.getRowNode('0') != null) {
          this.deviceNotesEdit.api.getRowNode('0').setSelected(true);
        }
      });
    }, (error) => {
      this.loading = false;
    }
    );
  }

  getCalRulesByDeviceId(deviceId) {
    this.loading = true;
    this.deviceManagementService.getCalRulesByDeviceId({ assetId: deviceId }).subscribe(
      (response1) => {
        this.loading = false;
        if (response1.data != null) {
          this.selectedDevice.assetsVirtualCalcRules = JSON.parse(JSON.stringify(response1.data));
          this.selectedDeviceShow.assetsVirtualCalcRules = JSON.parse(JSON.stringify(response1.data));
        } else {
          this.selectedDevice.assetsVirtualCalcRules = [];
          this.selectedDeviceShow.assetsVirtualCalcRules = [];
        }

        this.deviceManagementService.getDeviceTypesByVendor(this.selectedDeviceShow.vendorSeq).subscribe(
          (response) => {
            let deviceTypeListEdit = response.data;
            this.deviceTypeListEdit = JSON.parse(JSON.stringify(deviceTypeListEdit));
            this.deviceTypeListEdit.forEach((deviceType) => {
              if (this.selectedDeviceShow.assetTypeSeq == deviceType.assetTypeSeq) {
                if (deviceType.isVirtual == "Y") {
                  if (this.isreset == false) {
                    this.list1 = JSON.parse(JSON.stringify(this.selectedDeviceShow.assetsVirtualCalcRules));
                    this.measurementNameShowRowData = JSON.parse(JSON.stringify(this.list1));
                    if (this.list1 != null && this.list1.length > 0) {
                      this.measurementShow = JSON.parse(JSON.stringify(this.list1[0]));
                      this.selectedMeasurementShow = Object.assign({}, this.list1[0]);
                    } else {
                      this.measurementShow = new MemsDeviceVirtualCalcRules();
                      this.selectedMeasurementShow = new MemsDeviceVirtualCalcRules();
                    }
                  }
                } else {
                  this.getAllMeasurmentEdit();
                  this.getAllMeasurmentShow();
                }
              }
            });
          },
          (error) => {
            this.deviceTypeListEdit = [];
          }
        );

        this.list = JSON.parse(JSON.stringify(this.selectedDevice.assetsVirtualCalcRules));
        this.list.forEach((data) => {
          data.id = null;
        });
        this.measurementNameRowData = JSON.parse(JSON.stringify(this.list));

        if (this.list != null && this.list.length > 0) {
          this.measurement = JSON.parse(JSON.stringify(this.list[0]));
          this.selectedMeasurement = Object.assign({}, this.list[0]);
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  expandDeviceMap() {
    this.isFullScreen = !this.isFullScreen;
    let elem: any = document.getElementById("mapDiv");
    if (!this.isFullScreen) {
      document.getElementById("selectedDeviceContainer").style.display = "None";
      elem.style.height = "calc(100vh - 296px)";
    //  (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 285px)";
      //document.getElementById("mainDiv").classList.remove("mb-2");
    } else {
      document.getElementById("selectedDeviceContainer").style.display = "Block";
      elem.style.height = "calc(100vh - 449px)";
     // (document.getElementsByClassName("devList").item(0) as HTMLElement).style.height = "calc(100vh - 13px)";
      //document.getElementById("mainDiv").classList.add("mb-2");
    }
  }

  /* Stateful filter */
  sortChange(event, tbl) {
    let model = event.api.getSortModel();
    let strmodl = JSON.stringify(model);
    let body = {
      gridName: tbl,
      columnName: 'all'
    };
    if (model != '[]') {
      this.aggridSubscription = this.tableFilterService.getState(body).subscribe(res => {
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
      });
    }
  }

  measurementNameShowTableSortChange(event) {
    this.sortChange(event, 'measurementNameShowTable');
  }

  measurementInputShowGridSortChange(event) {
    this.sortChange(event, 'measurementInputShowTable');
  }

  deviceMeasurementNewSelectedSortChange(event) {
    this.sortChange(event, 'deviceMeasurementNewSelectedTable');
  }

  deviceNotesViewSortChange(event) {
    this.sortChange(event, 'deviceNotesViewTable');
  }

  measurementNameGridSortChanged(event) {
    this.sortChange(event, 'measurementNameTable');
  }

  measurementInputEditGridSortChanged(event) {
    this.sortChange(event, 'measurementInputEditTable');
  }

  deviceMeasurementNewEditGridSortChanged(event) {
    this.sortChange(event, 'deviceMeasurementNewEditTable');
  }

  deviceNotesEditSortChanged(event) {
    this.sortChange(event, 'deviceNotesEditTable');
  }

  getAggridSortState(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'all'
    };
    this.aggridSubscription = this.tableFilterService.getState(body).subscribe(res => {
      this.gridSortData = res.data;
    }, error => {

    });
  }

  getAggridState(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'all'
    };
    this.aggridSubscription = this.tableFilterService.getState(body).subscribe(res => {
      this.gridStateData = res.data;
      let data = [];
      if (this.gridStateData != null) {
        data = JSON.parse(this.gridStateData.gridState);
        if (res.data.gridName === "measurementNameShowTable") {
          this.measurementNameShowGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "measurementInputShowTable") {
          this.measurementInputShowGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "deviceMeasurementNewSelectedTable") {
          this.deviceMeasurementNewSelectedGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "deviceNotesViewTable") {
          this.deviceNotesView.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "measurementNameTable") {
          this.measurementNameGrid.columnApi.applyColumnState({ state: data });
        }
        else if (res.data.gridName === "measurementInputTable") {
          this.measurementInputGrid.columnApi.applyColumnState({ state: data });
        }
        else if (res.data.gridName === "measurementInputEditTable") {
          this.measurementInputEditGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "deviceMeasurementNewEditTable") {
          this.deviceMeasurementNewEditGrid.columnApi.applyColumnState({ state: data });
        } else if (res.data.gridName === "deviceNotesEditTable") {
          this.deviceNotesEdit.columnApi.applyColumnState({ state: data });
        }
      }
    }, error => {
    });
  }

  setStateTableState(tblname) {
    this.getAggridState(tblname);
  }

  setFilterSetting(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'deviceManagement_filter'
    };
    this.aggridSubscription = this.tableFilterService.getState(body).subscribe(res => {
      this.gridFilterData = res.data;
      let data = [];
      if (this.gridFilterData != null) {
        data = JSON.parse(this.gridFilterData.gridState);
        if (res.data.gridName == "measurementNameShowTable") {
          this.measurementNameShowGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "measurementInputShowTable") {
          this.measurementInputShowGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "deviceMeasurementNewSelectedTable") {
          this.deviceMeasurementNewSelectedGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "deviceNotesViewTable") {
          this.deviceNotesView.api.setFilterModel(data);
        }
        else if (res.data.gridName == "measurementNameTable") {
          this.measurementNameGrid.api.setFilterModel(data);
        }
        else if (res.data.gridName == "measurementInputTable") {
          this.measurementInputGrid.api.setFilterModel(data);
        }
        else if (res.data.gridName == "measurementInputEditTable") {
          this.measurementInputEditGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "deviceMeasurementNewEditTable") {
          this.deviceMeasurementNewEditGrid.api.setFilterModel(data);
        } else if (res.data.gridName == "deviceNotesEditTable") {
          this.deviceNotesEdit.api.setFilterModel(data);
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
          columnName: 'deviceManagement_filter'
        };
      }
      this.aggridSubscription = this.tableFilterService.saveState(body).subscribe(res => {
      }, error => {

      });
    }
  }

  removeFilter(tableName) {
    let body = {
      gridName: tableName,
      columnName: 'deviceManagement_filter'
    };
    this.aggridSubscription = this.tableFilterService.deleteState(body).subscribe(res => {
    }, error => {

    });
  }

  clearFilterDeviceMeasurementNewTable(filter) {
    this.deviceMeasurementNewFilter = this.tableFilterService.clearFilter(
      this.deviceMeasurementNewGrid,
      this.deviceMeasurementNewColumnDefs,
      filter
    );
  }

  filterModifiedDeviceMeasurementNewTable() {
    this.deviceMeasurementNewFilter = this.tableFilterService.filter(
      this.deviceMeasurementNewGrid,
      this.deviceMeasurementNewColumnDefs
    );
  }

  /* Import Data Edit */
  clearFilterDeviceMeasurementNewEditTable(filter) {
    this.removeFilter('deviceMeasurementNewEditTable')
    this.deviceMeasurementNewEditFilter = this.tableFilterService.clearFilter(
      this.deviceMeasurementNewEditGrid,
      this.deviceMeasurementNewEditColumnDefs,
      filter
    );
  }

  filterModifiedDeviceMeasurementNewEditTable() {
    let filters = this.deviceMeasurementNewEditGrid.api.getFilterModel();
    this.saveFilter(filters, 'deviceMeasurementNewEditTable');
    this.deviceMeasurementNewEditFilter = this.tableFilterService.filter(
      this.deviceMeasurementNewEditGrid,
      this.deviceMeasurementNewEditColumnDefs
    );
  }

  /* Import Data Selected */
  clearFilterDeviceMeasurementNewSelectedTable(filter) {
    this.removeFilter('deviceMeasurementNewSelectedTable');
    this.deviceMeasurementNewSelectedFilter = this.tableFilterService.clearFilter(
      this.deviceMeasurementNewSelectedGrid,
      this.deviceMeasurementNewSelectedColumnDefs,
      filter
    );
  }

  filterModifiedDeviceMeasurementNewSelectedTable() {
    let filters = this.deviceMeasurementNewSelectedGrid.api.getFilterModel();
    this.saveFilter(filters, 'deviceMeasurementNewSelectedTable');
    this.deviceMeasurementNewSelectedFilter = this.tableFilterService.filter(
      this.deviceMeasurementNewSelectedGrid,
      this.deviceMeasurementNewSelectedColumnDefs
    );
  }

  filterModifiedMeasurementNameTable() {
    let filters = this.measurementNameGrid.api.getFilterModel();
    this.saveFilter(filters, 'measurementNameTable');
    this.measurementNameTableFilter = this.tableFilterService.filter(
      this.measurementNameGrid,
      this.measurementNameColumnDefs
    );
  }

  clearFilterMeasurementNameTable(filter) {
    this.removeFilter('measurementNameTable');
    this.measurementNameTableFilter = this.tableFilterService.clearFilter(
      this.measurementNameGrid,
      this.measurementNameColumnDefs,
      filter
    );
  }

  filterModifiedCreateMeasurementNameTable() {
    this.createMeasurementNameTableFilter = this.tableFilterService.filter(
      this.measurementNameGrid,
      this.measurementNameColumnDefs
    );
  }

  clearFilterCreateMeasurementNameTable(filter) {
    this.createMeasurementNameTableFilter = this.tableFilterService.clearFilter(
      this.measurementNameGrid,
      this.measurementNameColumnDefs,
      filter
    );
  }

  filterModifiedMeasurementNameShowTable() {
    let filters = this.measurementNameShowGrid.api.getFilterModel();
    this.saveFilter(filters, 'measurementNameShowTable');
    this.measurementNameShowTableFilter = this.tableFilterService.filter(
      this.measurementNameShowGrid,
      this.measurementNameShowColumnDefs
    );
  }

  clearFilterMeasurementNameShowTable(filter) {
    this.removeFilter('measurementNameShowTable');
    this.measurementNameShowTableFilter = this.tableFilterService.clearFilter(
      this.measurementNameShowGrid,
      this.measurementNameShowColumnDefs,
      filter
    );
  }

  filterModifiedmeasurementInputEditTable() {
    let filters = this.measurementInputEditGrid.api.getFilterModel();
    this.saveFilter(filters, 'measurementInputEditTable');
    this.measurementInputEditTableFilter = this.tableFilterService.filter(
      this.measurementInputEditGrid,
      this.measurementInputColumnDefs
    );
  }

  clearFilterMeasurementInputEditTable(filter) {
    this.removeFilter('measurementInputEditTable');
    this.measurementInputEditTableFilter = this.tableFilterService.clearFilter(
      this.measurementInputEditGrid,
      this.measurementInputColumnDefs,
      filter
    );
  }

  filterModifiedMeasurementInputShowTable() {
    let filters = this.measurementInputShowGrid.api.getFilterModel();
    this.saveFilter(filters, 'measurementInputShowTable');
    this.measurementInputShowTableFilter = this.tableFilterService.filter(
      this.measurementInputShowGrid,
      this.measurementInputColumnDefs
    );
  }

  clearFiltermeasurementInputShowTable(filter) {
    this.removeFilter('measurementInputShowTable');
    this.measurementInputShowTableFilter = this.tableFilterService.clearFilter(
      this.measurementInputShowGrid,
      this.measurementInputColumnDefs,
      filter
    );

  }

  filterModifieddeviceNotes() {
    this.deviceNotesTableFilter = this.tableFilterService.filter(this.deviceNotes, this.columnDefsdeviceNotes);
  }

  clearFilterDeviceNotes(filter) {
    this.deviceNotesTableFilter = this.tableFilterService.clearFilter(
      this.deviceNotes,
      this.columnDefsdeviceNotes,
      filter
    );
  }

  filterModifieddeviceNotesEdit() {
    let filters = this.deviceNotesEdit.api.getFilterModel();
    this.saveFilter(filters, 'deviceNotesEditTable');
    this.deviceNotesEditTableFilter = this.tableFilterService.filter(this.deviceNotesEdit, this.columnDefsdeviceNotesEdit);
  }

  clearFilterDeviceNotesEdit(filter) {
    this.removeFilter('deviceNotesEditTable');
    this.deviceNotesEditTableFilter = this.tableFilterService.clearFilter(
      this.deviceNotesEdit,
      this.columnDefsdeviceNotesEdit,
      filter
    );
  }

  filterModifieddeviceNotesView() {
    let filters = this.deviceNotesView.api.getFilterModel();
    this.saveFilter(filters, 'deviceNotesViewTable');
    this.deviceNotesViewTableFilter = this.tableFilterService.filter(this.deviceNotesView, this.columnDefsdeviceNotesView);
  }

  clearFilterDeviceNotesView(filter) {
    this.removeFilter('deviceNotesViewTable');
    this.deviceNotesViewTableFilter = this.tableFilterService.clearFilter(
      this.deviceNotesView,
      this.columnDefsdeviceNotesView,
      filter
    );
  }

  filterModifiedMeasurementInputTable() {
    let filters = this.measurementInputGrid.api.getFilterModel();
    this.saveFilter(filters, 'measurementInputTable');
    this.measurementInputTableFilter = this.tableFilterService.filter(
      this.measurementInputGrid,
      this.measurementInputColumnDefs
    );
  }

  clearFilterMeasurementInputTable(filter) {
    this.removeFilter('measurementInputTable')
    this.measurementInputTableFilter = this.tableFilterService.clearFilter(
      this.measurementInputGrid,
      this.measurementInputColumnDefs,
      filter
    );
  }

  filterModifiedCreateMeasurementInputTable() {
    this.createMeasurementInputTableFilter = this.tableFilterService.filter(
      this.measurementInputGrid,
      this.measurementInputColumnDefs
    );
  }

  clearFilterCreateMeasurementInputTable(filter) {
    this.createMeasurementInputTableFilter = this.tableFilterService.clearFilter(
      this.measurementInputGrid,
      this.measurementInputColumnDefs,
      filter
    );
  }

  cellRightClickAddNote(event) {
    let mouseevent: MouseEvent = event.event;
    this.selectedNoteIndex = event.rowIndex;
    this.deviceNotes.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.addNoteContextmenu,
      event: mouseevent,
      item: event.data
    });
  }

  cellRightClickEditNote(event) {
    let mouseevent: MouseEvent = event.event;
    this.selectedNoteIndex = event.rowIndex;
    this.deviceNotesEdit.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.editNoteContextmenu,
      event: mouseevent,
      item: event.data
    });
  }

  cellRightClickMeasurementName($event) {
    let mouseevent: MouseEvent = $event.event;
    this.contextRow1 = JSON.parse(JSON.stringify($event.data));
    this.selectedMeasurementName = this.contextRow1;
    this.measurementNameGrid.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.measurementNameContextMenu,
      event: mouseevent,
      item: $event.data
    });
  }


  public currentDate = new Date();
  templateData;
  filename;
  downloadTemplate() {
    this.templateData = this.ConvertToCSV([
      'Asset ID',
      'Asset Name',
      'Asset Alias',
      'Description',
      'Asset IP Address',
      'Asset Class',
      'Parent Asset ID',
      'Group',
      'Vendor',
      'Asset Type',
      'Latitude',
      'Longitude',
      'Asset Timezone',
    ]
    );

    let currentTime = moment(this.currentDate).format('DD-MM-YYYY');
    let fileName = 'asset_template' + '_' + currentTime;
    this.filename = fileName;
    let blob = new Blob(['\ufeff' + this.templateData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', this.filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(headerList) {
    let str = '';
    let row = '';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    return str;
  }

  maxFromAndTo() {
    return new Date();
  }

  sizeToFitMeasurementTable() {
    this.measurementNameGrid.api.sizeColumnsToFit();
  }


  ngOnDestroy() {
    clearTimeout(this.refreshInterval);
    this.aggridSubscription.unsubscribe();
    this.getTimezoneSubscription.unsubscribe();
    this.getCodeTypeByUomSubscription.unsubscribe();
    this.getMemsDeviceStatusGroupSubscription.unsubscribe();
    this.getAllInputMeasurementsSubscription.unsubscribe();
    this.getAllDeviceGroupsSubscription.unsubscribe();
    this.getAllDeviceTypesSubscription.unsubscribe();
    this.getAllVendorsSubscription.unsubscribe();
    this.getAllDevicesTreeSubscription.unsubscribe();
    this.getCodeTypeBySystemInterfaceSubscription.unsubscribe();
    this.getCodeTypeByProtocolSubscription.unsubscribe();
    this.getCodeTypeByAdapterSubscription.unsubscribe();
    this.getCodeTypeByAssetClassSubscription.unsubscribe();
    this.getassetFreuencySubscription.unsubscribe();
    this.memDeviceSubscription.unsubscribe();
    clearTimeout(this.memdeviceTimeOut);
    window.removeEventListener("DbChange",(value => {
      console.log(value);
    }));
  }
}

export class AdapterDTO {
  adapterSeq: number;
  adapterName: string;
}
