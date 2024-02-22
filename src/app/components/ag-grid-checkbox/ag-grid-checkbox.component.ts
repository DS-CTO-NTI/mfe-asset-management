import { Component } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-checkbox',
  templateUrl: './ag-grid-checkbox.component.html',
  styleUrls: ['./ag-grid-checkbox.component.scss']
})
export class AgGridCheckboxComponent implements AgRendererComponent  {

  public params: any;
  parentComponent: any;

 
  agInit(params: any): void {
    this.params = params;
    this.parentComponent = params.context.componentParent;
  }
  
  refresh(params: any): boolean 
  {
    params.data.amount++;
    params.data.cbox = params.value 
    params.data.colDef = params.colDef;
    params.api.refreshCells(params);
    this.parentComponent.updateCheckbox(this.params.data,this.params.data.id,params.value);
    return false;
  }
}
