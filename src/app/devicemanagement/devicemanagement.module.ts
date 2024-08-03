import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicemanagementRoutingModule } from './devicemanagement-routing.module';
import { DevicemanagementComponent } from './devicemanagement.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { AgGridModule } from 'ag-grid-angular';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from '@circlon/angular-tree-component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ContextMenuModule, ContextMenuService } from 'ngx-contextmenu';
import { NgxDuvalChartsModule } from 'ngx-duval-charts';
import { AgGridFilterComponent } from '../components/ag-grid-filter-section/ag-grid-filter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ContextMenuFixService } from '../services/custom-menu/context-menu-fix.service';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



@NgModule({
  declarations: [DevicemanagementComponent],
  imports: [
    CommonModule,
    FormsModule,
		ReactiveFormsModule,
		//ComponentsModule,
    DevicemanagementRoutingModule,
   // SharedModule,
    OwlDateTimeModule,
   // OwlNativeDateTimeModule
   TranslateModule,
   TreeModule,
   FontAwesomeModule,
   ModalModule.forRoot(),
   TabsModule.forRoot(),
   CollapseModule.forRoot(),
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
    AgGridModule,
		AgGridModule.withComponents([]),
		NgxLoadingModule.forRoot({}),
		NgxSpinnerModule,

  ],
  exports: [
		//AgGridFilterComponent,
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
	//	BsDatepickerModule,
		AgmCoreModule,
		AgmSnazzyInfoWindowModule,
		NgxDuvalChartsModule,
		NgxSpinnerModule,
		TooltipModule,
		NgxLoadingModule,
	//	NgMultiSelectDropDownModule,
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
})
export class RemoteDevicemanagementModule { }
