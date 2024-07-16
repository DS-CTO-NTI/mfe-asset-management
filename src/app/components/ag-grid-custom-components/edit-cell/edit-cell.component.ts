import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InverterService } from 'src/app/services/inverter.service';

@Component({
  selector: 'app-edit-cell',
  templateUrl: './edit-cell.component.html',
  styleUrls: ['./edit-cell.component.scss']
})
export class EditCellComponent {

  constructor(private toaster: ToastrService, private inverterService: InverterService) { }

  public params: any;
  public value: any;
  public status: any;
  public targetData = [];
  public isrowEnabled: any;
  public parentComponent = null;
  public tableRef = null;
  public columnRef = null;
  public selectedValue;
  public rowId = null;
  public rowIdFiltered = null;
  public gridStopEv = null;
  public editeddata;
  public options = [];
  public optionsArrayType = null; // Allowed values are json, string
  public displayTextField = null;
  public valueField = null;
  public newArr = [];  
  public disabled = false;
  public disabledSelectorValue = false;  
  public isBackground;
  public settingName;

  @ViewChild('input', { read: ViewContainerRef }) public input;

  agInit(params: any): void {  
    this.params = params;
    this.value = this.params.value == 'null' ? '' : this.params.value;
    this.isrowEnabled = params.isrowEnabled;  
    this.parentComponent = params.context.componentParent;
    this.tableRef = params.tableRef;
    this.columnRef = params.columnRef;
    this.selectedValue = params.value;      
    this.rowId = params.node.id;
    this.rowIdFiltered = params.rowIndex;
    this.parentComponent = params.context.componentParent;   
    this.isBackground = params.isBackground;
    this.settingName = params.settingName;
  }

  getValue(): any {
    return this.value;
  }

  isCancelAfterEnd(): boolean {
    return false;
  }

  onChangeEvent(event: any){
  this.parentComponent.updatePlant(this.rowId,event.target.value);
  }
}
