import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TreeModule } from "@circlon/angular-tree-component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { AgGridModule } from "ag-grid-angular";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ContextMenuModule, ContextMenuService } from "ngx-contextmenu";
import { NgxDuvalChartsModule } from "ngx-duval-charts";
import { NgxLoadingModule } from "ngx-loading";
import { NgxSpinnerModule } from "ngx-spinner";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatExpansionModule } from "@angular/material/expansion";
import { AgGridFilterComponent } from "../components/ag-grid-filter-section/ag-grid-filter.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ContextMenuFixService } from "../services/custom-menu/context-menu-fix.service";

@NgModule({
	declarations: [AgGridFilterComponent],
	imports: [
		MatExpansionModule,
		TranslateModule,
		AgGridModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		HttpClientModule,
		AgGridModule.withComponents([]),
		TreeModule,
		ModalModule.forRoot(),
		TabsModule.forRoot(),
		CollapseModule.forRoot(),
		NgxLoadingModule.forRoot({}),
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyAdg2tvUCx6o4JuDw61GbeLzB10lf0CI-E"
		}),
		AgmSnazzyInfoWindowModule,
		NgxDuvalChartsModule,
		NgxSpinnerModule,
		TooltipModule.forRoot(),
		BsDatepickerModule.forRoot(),
		NgMultiSelectDropDownModule.forRoot(),
		MatTabsModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
		MatRadioModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		TranslateModule,
		ContextMenuModule.forRoot()
	],
	exports: [
		AgGridFilterComponent,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		HttpClientModule,
		AgGridModule,
		TreeModule,
		ModalModule,
		TabsModule,
		CollapseModule,
		BsDatepickerModule,
		AgmCoreModule,
		AgmSnazzyInfoWindowModule,
		NgxDuvalChartsModule,
		NgxSpinnerModule,
		TooltipModule,
		NgxLoadingModule,
		NgMultiSelectDropDownModule,
		MatTabsModule,
		MatCardModule,
		MatButtonModule,
		MatExpansionModule,
		MatAutocompleteModule,
		MatIconModule,
		MatTooltipModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
		MatRadioModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		ContextMenuModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [		{
		provide: ContextMenuService,
		useClass: ContextMenuFixService
	}]
	// providers: [
	//   { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
	//   { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS }
	//   ]
})
export class SharedModule {}
