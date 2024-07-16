import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";

import {
	AgGridCheckboxComponent,
	AgGridCustomButtonComponent,
	AgGridCustomSelectComponent,
	AgGridCustomSelectModbusComponent,
	AgGridFileuploadButtonComponent,
	AgGridThumbnailComponent,
	AlertBoxComponent,

	ButtonComponent,
	CheckboxComponent,
	ConfirmationBoxComponent,
	CustomControllerButtonComponent,
	DownloadReportComponent,
	EditCellComponent,

	MultiSelectComponent,

	SelectComponent,

} from "./index";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS: any[] = [
	AgGridCheckboxComponent,
	AgGridCustomButtonComponent,
	ButtonComponent,
	CheckboxComponent,
	EditCellComponent,
	MultiSelectComponent,
	SelectComponent,
	AgGridCustomSelectComponent,
	AgGridCustomSelectModbusComponent,
	AgGridFileuploadButtonComponent,
	AgGridThumbnailComponent,
	AlertBoxComponent,
	ConfirmationBoxComponent,
	CustomControllerButtonComponent,
	DownloadReportComponent,

];

@NgModule({
	declarations: [...COMPONENTS],
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		TranslateModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		ModalModule.forRoot(),
		BsDropdownModule.forRoot(),
		NgMultiSelectDropDownModule.forRoot()
	],
	exports: [...COMPONENTS],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentModule {}
