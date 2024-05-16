import { environment } from "src/environments/environment";

/**
 * API Endpoints
 */
export class UrlMappings {
  public static loginUrl =
    environment.apiUrl + "/common/userService/userLogin/login";
  public static logoutUrl =
    environment.apiUrl + "/common/userService/userLogin/logout/";

  public static getPOIMeasurementTrendDataUrl =
    environment.apiUrl + "/hemsService/poi/getAllPOIMeasurementTrendChartData";

  public static setSetpointUrl = environment.pyBaseUrl + '/executeSetpoint';
  public static socketUrl = environment.baseUrl + '/socket';
  public static getAllSLDDevicesUrl = environment.baseUrl + '/hemsService/devicesSLD/getAllDevicesSLD';


  //Report Templete
  public static getAllReportTemplateUrl =
    "/common/report/reportTemplate/getAllReportTemplate";
  public static saveReportTemplateUrl =
    "/common/report/reportTemplate/saveReportTemplate";

  /*ReportManagement*/
  public static getAllReportManagementUrl =
    "/common/report/reportManagement/getAllReportManagement";
  public static getAllTemplateNameUrl =
    "/common/report/reportTemplate/getAllReportTemplate";
  public static getMeasurementUomByDevicesUrl =
    "deviceMeasUomMap/getMeasUomByDevices";
  public static saveReportManagementUrl =
    "/common/report/reportManagement/saveReportManagement";
  public static updateReportManagementUrl =
    "/common/report/reportManagement/UpdateReportManagement";
  public static deletereportmanagementUrl(req) {
    return (
      "/common/report/reportManagement/deleteReportManagement?reportId=" + req
    );
  }

  public static scheduleReportManagementUrl = "/common/report/reportManagement/scheduleReportMangement";
  public static runImmediateReportManagementUrl = "/common/reportService/reportRun/runImmediate";
  public static downloadReportUrl = "/common/report/reportDetails/download";
  public static runImmediateReportByTypeUrl =
    "reportManagement/runImmediateReport";
  public static getDevicesByDeviceTypeUrl =
    "devices-management/getDevicesByDeviceType";
  public static getByReportIdUrl =
    "/common/report/reportManagement/getByReportId";
  public static viewLatestReportUrl = "reportManagement/viewLatestReport";
  public static viewPreviousReportUrl = "reportManagement/viewPreviousReport";

  public static getIEC61850MeasurementandDeviceIdUrl =
    "/common/adapterService/iecAdapter/Measurements/unique";
  public static getModbusMeasurementandDeviceIdUrl =
    "/common/modbusService/modbusAssetReadMap/Measurements/unique";

  public static deleteReportTemplateUrl(req) {
    return (
      "/common/report/reportTemplate/deleteReportTemplate?templateId=" + req
    );
  }
  public static getMeasurementandDeviceIdUrl =
    "/common/adapterService/iecAdapter/Measurements/unique";
  public static EnableReportTemplateUrl(req, req1) {
    return (
      "/common/report/reportTemplate/enableDisable?templateId=" +
      req +
      "&isEnabled=" +
      req1
    );
  }

  // View Report

  public static downloadReportfile(req) {
    return "/common/report/reportDetails/download?id=" + req;
  }

  public static getAllReportViewUrl = "/common/report/reportDetails/all";
  public static getrunreportbyrunidUrl(req1) {
    return "/common/report/reportDetails/getLogs?id=" + req1;
  }
  public static getViewReportByrunIdUrl = "reportView/readBlobFile";
  public static getAllPastReportUrl = "reportManagement/viewPastReport";

  // User Management
  public static getAllOrganizationsUrl =
    "/common/userService/Users/getAllOrganizations";
  public static getAllUsersUrl = "/common/userService/Users/getAllUsers";
  public static updateUserUrl = "/common/userService/Users/updateUser";
  public static lockUnlockUserUrl = "/common/userService/Users/enableUser";
  public static activateDeactivateUserUrl =
    "/common/userService/Users/activateUser";
  public static assignRoleUrl = "/common/userService/Users/assignRole";
  public static terminateRoleUrl = "/common/userService/Users/terminateRole";
  public static setPasswordUrl = "/common/userService/Users/setUserPassword";
  public static getPasswordRulesUrl =
    "/common/userService/Users/getAllPasswordRules";
  public static getAllUserRolesUrl(userId) {
    return "/common/userService/Users/getRolesForUser/" + userId;
  }
  public static saveUserLanguageUrl = "/common/userService/Users/saveLanguage";
  public static getMemsVersionUrl = "/MemsVersion/getAllMemsVersion";
  public static getScadaStat = "/hemsService/poi/getSCADAStatus";
  public static getAllLdapConfigurationsUrl =
    "/ldapConfiguration/getAllLdapConfigurations";
  public static getRolePermissionsUrl(roleId) {
    return "/common/userService/Users/rolePermissionsByRole/" + roleId;
  }
  public static createUserUrl = "/common/userService/Users/createUser";
  public static saveUpdateLdapConfigurationUrl =
    "/ldapConfiguration/saveUpdateLdapConfiguration";
  public static saveRoleUrl = "/common/userService/Users/SetRoleAndPermissions";
  public static updateRoleUrl =
    "/common/userService/Users/UpdateRolePermissions";
  public static updateRoleObjectPermissions =
    "/common/userService/Users/updateRoleObjectPermissions";
  public static deleteUser = "/common/userService/Users/deleteUser/";

  // ViewPPCLogs

  // public static getPPCLogOutput = '/ppcoutputLog';
  // public static getMODBusLog = '/modbusserverlog';
  // public static getPPCLogOutput = '/ppcoutputlogpagination';
  // public static getMODBusLog = '/modbusserverlogPagination';
  public static getPPCLogOutput =
    "/common/logViewService/log/adapterOutputLogSearch";
  public static getMODBusLog = "/common/logViewService/log/adapterLogSearch";
  public static getCount = "/common/logViewService/log/getlogcount";

  // POI SetPoints

  public static getSetPoints = "/hemsService/poi/getSetPoints";
  public static codeType = "/common/userService/codes/CodeType";
  public static setSetPoints = "/hemsService/poi/executeSetpoint";
  public static roleVerifyForSetpoint = "/hemsService/poi/modeChange";
  public static getErrorQuality = "/hemsService/poi/getErrorCodeAndQuality";

  //Inverters

  public static getAllInverters = "/hemsService/inverter/getAllInverters";
  public static getInverterById = "/hemsService/inverter/getInverterById/{id}";
  public static createInverters = "/hemsService/inverter/createInverters";
  public static updateStatusById = "/hemsService/inverter/updateStatusById";
  public static updateInvertersById =
    "/hemsService/inverter/updateInvertersById/";
  public static getAllInverterSettings =
    "/hemsService/inverterSettings/getAllInverterSettings";
  public static getAllInverterSettingsByInverterId =
    "/hemsService/inverterSettings/getAllInverterSettingsByInverterId/";
  static getAllInverterSettingsByInverterIdAndRole =
    "/hemsService/inverterSettings/getAllInverterSettingsByInverterIdAndRole/";
  public static saveInverterSetting =
    "/hemsService/inverterSettings/saveInverterSetting";
  public static getAllHmiConnections =
    "/hemsService/hmiConnections/getAllHmiConnections";
  public static resetSettings =
    "/hemsService/plantSettings/resetToDefaultPlantSettings";
  public static applyToOthers =
    "/hemsService/inverterSettings/applyToOtherInverters";
  public static resetInverterSettings =
    "/hemsService/inverterSettings/resetToDefaultInverterSettings";

  //Plant Setting
  public static savePlantSettings =
    "/hemsService/plantSettings/savePlantSettings";
  public static getAllPlantSettings =
    "/hemsService/plantSettings/getAllPlantSettings";
  public static getByIdPlantSettings =
    "/hemsService/plantSettings/getByIdPlantSettings/{id}";

  // plant Data
  public static savePlantData = "/hemsService/serverData/saveServerData";
  public static getPlantData = "/hemsService/serverData/getServerData";
  public static getAllPlantData = "/hemsService/serverData/getAllServerData";

  //Hmi Registers
  public static getAllHmiRegistersByObjectAndRegistersType(type, register) {
    return (
      "/hemsService/hmiRegisters/getAllHmiRegistersByObjectAndRegistersType/" +
      type +
      "/" +
      register
    );
  }
  public static getAllHmiRegisters =
    "/hemsService/hmiRegisters/getAllHmiRegisters/";
  public static deleteHmiRegisters =
    "/hemsService/hmiRegisters/deleteHmiRegisters/";
  public static deleteHmiConnections =
    "/hemsService/hmiConnections/deleteHmiConnections/";

  public static saveHmiConnection =
    "/hemsService/hmiConnections/saveHmiConnections";
  public static saveHmiRegisters = "/hemsService/hmiRegisters/saveHmiRegisters";
  public static setInvertersCount =
    "/hemsService/hmiConnections/setInvertersCount/";
  public static getDropDownData =
    "/hemsService/hmiRegisters/getHmiDropdownData";
  public static setInvertersCountAfterCount =
    "/hemsService/hmiConnections/setInvertersCountAfterUpload/";
  public static getByObjectType =
    "/hemsService/hmiConnections/getAllHmiConnectionsByType/";

  //Metadata Setting
  public static getMetadataSettings =
    "/hemsService/settingsMetaData/getAllSettingsMetaData";
  public static deleteSettingsMetaDataById =
    "/hemsService/settingsMetaData/deleteSettingsMetaDataById/";
  public static addMetadataSetting =
    "/hemsService/settingsMetaData/saveSettingsMetaData";
  public static updateSettingsMetaData =
    "/hemsService/settingsMetaData/updateSettingsMetaData";
  public static updateMetaDataSetting =
    "/hemsService/settingsMetaData/updateMetaDataSetting"; //update defaultvalue,start & end range in MetadataList
  public static saveSettingsMetaData =
    "/hems/hemsService/settingsMetaData/saveSettingsMetaData";
  public static saveMetadataRoleMapping =
    "/hemsService/metadataRoleMapping/saveMetadataRoleMapping";
  public static deleteMetadataRoleMapping =
    "/hemsService/metadataRoleMapping/deleteMetadataRoleMapping";
  //file data
  public static saveConfigFile = "/hemsService/fileData/saveconfigfile/";
  public static saveDraftConfigFile = "/hemsService/fileData/saveconfigfile/";
  public static saveJson = "/hemsService/fileData/savejsonfile";

  //Image on Login Screen
  public static getLogo = "/common/userService/userLogin/getclientconfig/1";

  //Stateful management API URLs

  public static saveState = "/common/userService/aggridstate/saveAggridState";
  public static updateState =
    "/common/userService/aggridstate/updateAggridState";
  public static getState = "/common/userService/aggridstate/getAggridState";
  public static deleteState =
    "/common/userService/aggridstate/deleteAggridState";
  public static getAllHmiRegistersByType =
    "/hems/hemsService/hmiRegisters/getAllHmiRegistersByRegisterType/";

  // Countries - Cities
  public static getAllCountriesCities =
    "/common/userService/countries/getAllCountriesCites";

  // password encryption
  public static encryptedBase64Key = "MnBlZzdXRGVtWFJlTmR4eg==";
  public static getHMIStatus = "/hemsService/poi/getHMIStatus";
  public static openCloseBreaker = "/hemsService/poi/openCloseCommand";

  public static getEmergencyStatus(req) {
    return "/hemsService/poi/essEmergencystop/" + req;
  }
  public static getESSStatus(req) {
    return "/hemsService/poi/getpcsstatus/" + req;
  }

  // Dashboard
  public static getDashboardData = "/hemsService/dashboard/getplantData";
  public static getPOIMeasurementTrendData = "/getPOIMeasurementTrendDataUrl";
  public static startStopPPC(uri) {
    return "/hemsService/dashboard" + uri;
  }
  public static getAllAssetMeasurementExtended =
    "/common/asset-service/deviceTypes/getAllAssetMeasurementExtended";
  //Alarm Viewer

  public static AcknowledgeAlarmUrl =
    "/common/alarm-service/alarm-notifications/ack";
  public static ClearAlarmUrl =
    "/common/alarm-service/alarm-notifications/clear";
  public static getAllAllClearedAlarmUrl(Status, Severity, isAcknowledge) {
    return (
      "/common/alarm-service/alarm-notifications/all?isCleared=" +
      Status +
      "&severity=" +
      Severity +
      "&isAcknowledge=" +
      isAcknowledge
    );
  }
  public static getAllClearedAlarmUrl(Severity) {
    return (
      "/common/alarm-service/alarm-notifications/alarmNotificationsBySeverity/" +
      Severity
    );
  }
  public static getAlarmCountUrl =
    "/common/alarm-service/alarm-notifications/count";
  public static getDisplayed =
    "/common/alarm-service/alarm-notifications/not-displayed";

  //Asset Group
  public static getAllDeviceTypeGroup =
    "/common/asset-service/devices-management/device-group-types";
  public static saveDeviceGroupTypes =
    "/common/asset-service/asset-group-type/saveDeviceGroupTypes";

  //Asset Group Tab
  public static getAllDeviceGroup =
    "/common/asset-service/asset-groups";
  public static saveDeviceGroup =
    "/common/asset-service/asset-groups";
  public static updateDeviceGroup =
    "/common/asset-service/asset-groups";
  public static saveGroupType =
    "/common/asset-service/asset-group-type";

  public static updateAssetTypeGroupById(id) {
    return (
      "/common/asset-service/devices-management/updateAssetTypeGroupById/" + id
    );
  }

  public static deleteDeviceGroupType(id) {
    return "/common/asset-service/asset-group-type/deleteAssetGroupTypeById/" + id;
  }

  public static deleteDeviceGroup(id) {
    return "/common/asset-service/asset-group/asset-group/" + id;
  }

  //asset service
  public static getAllInterfacesUrl =
    "/common/asset-service/interfacemapping/getAllInterfaces";
  public static createAssetUrl =
    "/common/asset-service/devices-management/device";
  public static updateAssetUrl =
    "/common/asset-service/devices-management/device";
  public static getByAssetClass =
    "/common/asset-service/devices-management/devices-byclass?assetClass=";
  public static getAllDeviceTypesUrl =
    "/common/asset-service/devices-management/device-types";
  public static getAllDeviceGroupsUrl =
    "/common/asset-service/devices-management/device-groups";
  public static getAllVendorsUrl =
    "/common/asset-service/devices-management/vendors";
  public static getAllDevicesUrl =
    "/common/asset-service/devices-management/devices";
  public static getAllDevicesTreeUrl =
    "/common/asset-service/devices-management/devices-by-hierarchy?assetClass=";
  public static getAllDeviceTypesDescUrl =
    "/common/asset-service/device-types";
  public static getDevicesAndMeasurementsByHierarchy =
    "/common/asset-service/devices-management/devices-and-measurements-by-hierarchy?assetClass=";

  public static getAllSelectInputMeasurementUrl =
    "/common/asset-service/devices-management/measurement-byisvirtual";
  public static createUpdateDeviceUrl =
    "/common/asset-service/devices-management/createUpdateDevice";
  public static getMemsDeviceStatusUrl =
    "/common/asset-service/devices-management/getDeviceStatus";
  public static getPictureByDeviceIDUrl =
    "/common/asset-service/devices-management/getPictureByDeviceId";
  public static getNoteByDeviceIdUrl =
    "/common/asset-service/devices-management/noteby-deviceid";
  public static getCalRulesByDeviceIdurl =
    "/common/asset-service/devices-management/calrules-bydeviceid";
  public static getMemsDeviceStatusGroupUrl =
    "/common/asset-service/devices-management/devices-status-groups";
  public static importDeviceConfigurationCSVUrl =
    "/common/asset-service/devices/importDeviceData";
  public static saveDeviceTypesUrl =
    "/common/asset-service/device-types";
  public static updateDeviceTypesUrl =
    "/common/asset-service/device-types";
  public static saveDeviceAttributesUrl =
    "/common/asset-service/device-types/attributes-List";
  public static updateDeviceAttributesUrl =
    "/common/asset-service/device-types/attributes-List";
  public static deleteDeviceAttributesUrl =
    "/common/asset-service/device-types/attributes-List";
  public static importDeviceTypeCSVUrl =
    "/common/asset-service/device-types/importDeviceTypeData";
  public static importDeviceTypeAttrCSVUrl =
    "/common/asset-service/device-types/flex-attributedata";
  public static importDeviceTypeMeasurementCSVUrl =
    "/common/asset-service/device-types/device-type-measurementdata";
  public static saveDeviceMeasurmentsUrl =
    "/common/asset-service/device-types/measurements";
  public static updateDeviceMeasurementUrl =
    "/common/asset-service/device-types/measurements";
  public static deleteMeasurementByIdUrl =
    "/common/asset-service/device-types/measurement-list";
  public static saveDeviceVendorsUrl =
    "/common/asset-service/device-types/vendors";

  public static getAllMeasurementsByDeviceTypeUrl(req) {
    return (
      "/common/asset-service/device-types/measurements-by-devicetype?assetTypeSeq=" +
      req
    );
  }

  public static getMemsDeviceStatusCodeUrl(status) {
    return (
      "/common/asset-service/devices-management/getDeviceStatusCode?codeGroup=" +
      status
    );
  }

  public static getDeviceTypeByVendorUrl(vendorSeq): string {
    return (
      "/common/asset-service/devices-management/device-typesbyvendor?vendorSeq=" +
      vendorSeq
    );
  }

  public static getAttributesByDeviceSeqUrl(seq): string {
    return "/common/asset-service/devices-management/attributes?seq=" + seq;
  }

  public static deleteDeviceUrl(id): string {
    return "/common/asset-service/devices-management/deleteDevice?id=" + id;
  }

  public static getByDeviceTypesUrl(req) {
    return (
      "/common/asset-service/devices-management/attributes?seq=" + req
    );
  }

  public static deleteDeviceMeasurementUrl(req) {
    return "/common/asset-service/device-types/deleteMeasurement?id=" + req;
  }

  public static getAlldevicevendorsByIdUrl(req) {
    return "/common/asset-service/device-types/vendors?vendorSeq=" + req;
  }

  public static deleteDeviceVendorUrl(req) {
    return "/common/asset-service/device-types/vendors?vendorSeq=" + req;
  }

  public static deleteDeviceTypeUrl(req) {
    return (
      "/common/asset-service/device-types/asset-type?assetTypeSeq=" + req
    );
  }

  public static getMeasurementsByDevices(id) {
    return (
      "/common/asset-service/devices-management/measurements-by-devicetype?assetTypeSeq=" +
      id
    );
  }

  //hems service
  public static getAllDeviceTreeForGISUrl =
    "/hemsService/devices/getDevicesByHierarchy";

  public static getDeviceAnalogDataLatestUrl(deviceId) {
    return "/hemsService/analogData/getLatest?deviceId=" + deviceId;
  }

  public static getGraphDataUrl(req) {
    return "/hemsService/chargerdata/getLatest?deviceId=" + req;
  }

  /* Device Vendor Tab */
  public static getAlldeviceVendorsUrl(siteId) {
    return "devicevendors?siteId=" + siteId;
  }

  //Energy Performance Indicator Management
  public static createAdapterAllUrl = "iecAdapter/saveAll";
  public static createAdapterUrl = "iecAdapter/save";
  public static deleteAdpterUrl = "iecAdapter/dalete";
  public static getAllAdpterMasterUrl = "iecAdapter/allMaster";
  public static createAdapterMasterUrl = "iecAdapter/saveMaster";
  public static getAllFcUrl = "iecAdapter/fc";
  public static getAllDataTypeUrl = "iecAdapter/dataTypes";

  public static getAllAdpterUrl(id) {
    return "iecAdapter/all?adapterId=" + id;
  }

  public static getServerModalUrl(req) {
    return "iecAdapter/serverModel?adapterId=" + req;
  }

  public static getAdapterMeasurementsUrl(req) {
    return "iecAdapter/Measurements/all?id=" + req;
  }

  public static saveAdapterMeasurementsUrl(id) {
    return "iecAdapter/Measurements/save?adapterId=" + id;
  }

  //user service
  public static getByCodeTypeUrl = "/common/user-service/codes/by-code-type";
  public static allCodeType = "/common/userService/codes/getAll";

  //newDashboard
  public static newDashboard = "/hemsService/dashboard/dashboardData";
  public static newDashboardBulletGraph =
    "/hemsService/dashboard/dashboardData/panel3";
  //modbus service
  public static getAllModbusAdapterUrl =
    "/common/modbusService/modbusSlave/getAll";
  public static saveModbusAdapterUrl = "/common/modbusService/modbusSlave/save";
  public static updateModbusAdapterUrl =
    "/common/modbusService/modbusSlave/update";
  public static analogInputfileUploadUrl =
    "/common/modbusService/ModbusAnalogInput/saveModbusAnalogInput";
  public static updateModbusAnalogInputUrl =
    "/common/modbusService/ModbusAnalogInput/updateModbusAnalogInput";
  public static getAllModbusDigitalInputUrl =
    "/common/modbusService/ModbusDigitalInput/getByModbusAdapterSeq";
  public static uploadReadAssetMap =
    "/common/modbusService/fileData/uploadReadAssetMap";
  public static uploadWriteAssetMap =
    "/common/modbusService/fileData/uploadWriteAssetMap";
  public static updateModbusAnalogOutputUrl =
    "/common/modbusService/ModbusAnalogOutput/updateModbusAnalogOutput";
  public static jsonFile = "/common/modbusService/fileData/jsonFile";
  public static getAllMinMaxValuesUrl =
    "/common/modbusService/ModbusAdapterProtocolParameter/getModbusAdapterProtocolParameter";
  public static SaveReadRegisterUrl =
    "/common/modbusService/modbusSlaveRead/saveModbusSlaveRead";
  public static SaveAllReadRegisterUrl =
    "/common/modbusService/modbusSlaveRead/saveAllModbusSlaveRead";
  public static SaveWriteRegisterUrl =
    "/common/modbusService/modbusSlaveWrite/saveModbusSlaveWrite";
  public static SaveAllWriteRegisterUrl =
    "/common/modbusService/modbusSlaveWrite/saveAllModbusSlaveWrite";
  public static getAllDeviceWithTypeUrl =
    "/common/asset-service/devices-management/getAllDevicesWithType";
  public static SaveAllDevicesUrl =
    "/common/modbusService/modbusSlaveAssets/saveAllModbusSlaveAssets";
  public static deleteModbusSlaveAssetsIn =
    "/common/modbusService/modbusSlaveAssets/deleteModbusSlaveAssetsIn";
  public static getHmiDropdownDataUrl =
    "/common/modbusService/hmiDropdown/getHmiDropdownData";
  public static cloneModbusSlave = "/common/modbusService/modbusSlave/clone";

  // Sld Action Buttons
  public static pcsstart = "/hemsService/poi/pcsstart";
  public static pcsstop = "/hemsService/poi/pcsstop";
  public static pcsreset = "/hemsService/poi/pcsreset";

  public static getAllReadMapByModbusId(req) {
    return (
      "/common/modbusService/modbusAssetReadMap/getAllReadMapByModbusId?id=" +
      req
    );
  }

  public static getAllWriteMapByModbusId(req) {
    return (
      "/common/modbusService/modbusAssetWriteMap/getAllWriteMapByModbusId?id=" +
      req
    );
  }

  public static deleteModbusSlave(req) {
    return "/common/modbusService/modbusSlave/delete?id=" + req;
  }

  public static deleteReadRegister(req) {
    return (
      "/common/modbusService/modbusSlaveRead/deleteModbusSlaveRead?id=" + req
    );
  }

  public static deleteWriteRegister(req) {
    return (
      "/common/modbusService/modbusSlaveWrite/deleteModbusSlaveWrite?id=" + req
    );
  }

  public static validateReadRegisterMapping(req) {
    return (
      "/common/modbusService/modbusSlaveRead/validateReadRegisterMapping?id=" +
      req
    );
  }

  public static validateWriteRegisterMapping(req) {
    return (
      "/common/modbusService/modbusSlaveWrite/validateWriteRegisterMapping?id=" +
      req
    );
  }

  public static enableModbusAdapterUrl(req) {
    return "/common/modbusService/modbusSlave/enable?id=" + req;
  }

  public static getReadRegisterValueBySlaveID(req) {
    return (
      "/common/modbusService/modbusSlaveRead/getAllReadByModbusSlaveId?id=" +
      req
    );
  }

  public static getWriteRegisterValueBySlaveID(req) {
    return (
      "/common/modbusService/modbusSlaveWrite/getAllWriteByModbusSlaveId?id=" +
      req
    );
  }

  public static deleteAllAssociatedAssetsByServer(req) {
    return (
      "/common/modbusService/modbusSlaveAssets/deleteAllModbusSlaveAssetsByServerId?id=" +
      req
    );
  }

  public static getAssetByAssetIdUrl(req) {
    return (
      "/common/modbusService/modbusSlaveAssets/getModbusSlaveAssetsByServer?id=" +
      req
    );
  }

  public static deleteUploadedDataForReadUrl(req) {
    return (
      "/common/modbusService/modbusSlaveRead/deleteModbusSlaveReadByModebusId?id=" +
      req
    );
  }

  public static deleteUploadedDataForWriteUrl(req) {
    return (
      "/common/modbusService/modbusSlaveWrite/deleteModbusSlaveWriteByModebusId?id=" +
      req
    );
  }

  //internal Slave
  public static getAllInternalSlaveUrl =
    "/common/modbusService/internalSlaves/getAllInternalSlaves";
  public static updateInternalSlaveUrl =
    "/common/modbusService/internalSlaves/saveInternalSlaves";
  public static saveInternalSlavesDataurl =
    "/common/modbusService/internalSlaves/saveInternalSlavesData";
  public static saveInternalH2SlaveDataUrl =
    "/common/modbusService/internalSlaves/saveInternalSlavesData";

  public static getInputRegisterByInternalSlaveID(req) {
    return (
      "/common/modbusService/internalSlaves/getAllInternalSlavesDataBySlaveid?id=" +
      req
    );
  }
  public static updateInternalSlavesData(id) {
    return (
      "/common/modbusService/internalSlaves/updateInternalSlavesData/" + id
    );
  }
  //Trend Analysis
  public static getMeasurementListByDeviceInMeasurementDataUrl(req) {
    return (
      "/common/asset-service/devices-management/getMeasurementByDeviceId?assetId=" +
      req
    );
  }

  public static getAnalogByDeviceAndMeasurementUrl =
    "/common/assetdataService/analogData/getAnalogByDeviceAndMeasurement";
  public static getDeviceDataTimestamp =
    "/common/assetdataService/analogData/getAnalogByDeviceAndMeasurementAndTimestamp";

  /* Adapter */

  public static getAsciiBySystemInterfaceSeqUrl =
    "adapter/getAsciiBySystemInterfaceSeq";
  public static getDatabseBySystemInterfaceSeqUrl =
    "adapter/getDatabseBySystemInterfaceSeq";
  public static getDnpBySystemInterfaceSeqUrl =
    "adapter/getDnpBySystemInterfaceSeq";
  public static getModbusBySystemInterfaceSeqUrl =
    "adapter/getModbusBySystemInterfaceSeq";
  public static getMqttBySystemInterfaceSeqUrl =
    "adapter/getMqttBySystemInterfaceSeq";
  public static getOcppBySystemInterfaceSeqUrl =
    "adapter/getOcppBySystemInterfaceSeq";
  public static getRteBySystemInterfaceSeqUrl =
    "adapter/getRteBySystemInterfaceSeq";
  public static getSnmpBySystemInterfaceSeqUrl =
    "adapter/getSnmpBySystemInterfaceSeq";
  public static getOpcuaBySystemInterfaceSeqUrl =
    "adapter/getOpcuaBySystemInterfaceSeq";

  //asset data serice
  public static getByMeasurementAndTimestamp =
    "/common/assetdataService/analogData/getByMeasurementAndTimestamp";
  public static postAuxSystem =
    "/common/assetdataService/descreteData/getLatestAuxDataByDeviceAndMeasurement";
  public static getLatestByDeviceAndMeasurement =
    "/common/assetdataService/analogData/getLatestByDeviceAndMeasurement";
  public static getDiscreteDataByDeviceAndMeasurement =
    "/common/assetdataService/descreteData/getDiscreteDataByDeviceAndMeasurement";

  // Alarm Configuration

  public static getAllAlertRegisterMap =
    "/common/alarm-service/alarm-configuration/getAllRegisterMap";
  public static deletelAlertRegisterMap =
    "/common/alarm-service/alarm-configuration/deleteAlertConfiguration/";
  public static saveAlertRegisterMap =
    "/common/alarm-service/alarm-configuration/saveAlertConfiguration";
  public static uploadAlarmConfiguration =
    "/common/alarm-service/alarm-configuration/uploadAlarmConfiguration";
  public static getAlarmsDevicesHierarchy =
    "/common/alarm-service/alarm-configuration/alarm-device-hierarchy?assetClass=";
  public static getAlarmsDevicesMeasurement =
    "/common/alarm-service/alarm-configuration/getAlarmConfigByMeasurementAndDevice/";
  public static getAlarmConfigurationById =
    "/common/alarm-service/alarm-configuration/alarm-configurations/";
  public static getAlarmConfigurationByAssetId =
    "/common/alarm-service/alarm-configuration/alarm-configurations-device";
  public static getAlarmConfigurationByGroupId =
    "/common/alarm-service/alarm-configuration/alarm-configurations-group";
  public static saveAlarmConfigurations =
    "/common/alarm-service/alarm-configuration/alarm-configurations";
  public static updateAlarmConfigurations =
    "/common/alarm-service/alarm-configuration/alarm-configurations/";

  //Alarm History
  public static getAllClearedAlarmByPageUrl(page, size) {
    return (
      "/common/alarm-service/alarm-history/all?page=" + page + "&size=" + size
    );
  }

  //alarm Slave
  public static getAllAlarmSlave =
    "/common/modbusService/alarmSlaves/getAllAlarmSlaves";
  public static saveAlarmSlave =
    "/common/modbusService/alarmSlaves/saveAlarmSlaves";

  public static updateAlarmSlave(id) {
    return "/common/modbusService/alarmSlaves/updateAlarmSlaves/" + id;
  }

  public static deleteOtherAlarmSlave(req) {
    return (
      "/common/modbusService/alarmSlaves/deleteAlarmInternalSlaveData?id=" + req
    );
  }

  public static deleteOtherSlave(req) {
    return (
      "/common/modbusService/internalSlaves/deleteInternalSlaveData?id=" + req
    );
  }

    
    public static getControllerValue = "/hemsService/fileData/getcontrollerconfig";
    public static updateControllerValue = "/hemsService/fileData/updatecontrollerconfig";

  // public static getControllerValue = "/hemsService/fileData/updatecontrollerconfig";



  //Peak Time Configuration

  public static getpeaktimeValue = "/hemsService/fileData/getpeaktimeconfig";
  public static updatepeaktimeValue =
    "/hemsService/fileData/updatepeaktimeconfig";

  //save All config
  public static saveAllConfig = "/hemsService/fileData/updateconfig";
  //get max discharge value

  public static getmax = "/hemsService/plantSettings/getMaxDischargeValue";
}
