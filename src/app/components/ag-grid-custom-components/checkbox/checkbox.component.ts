import { Component } from '@angular/core';

@Component({
  selector: 'ag-grid-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  public params = null;
  public rowId = null;
  public rowIdFiltered = null;
  public parentComponent = null;

  //Custom Required Params for each Checkbox Component
  public tableRef = null;
  public columnRef = null;
  public checkedValue = null;
  public uncheckedValue = null;

  //Custom Optional Params for each Checkbox Component
  public disabled = false;
  public disabledSelectorValue = false;

  agInit(params : any): void {  
    this.params = params;
    this.rowId = params.node.id;
    this.rowIdFiltered = params.rowIndex;
    this.parentComponent = params.context.componentParent;

    this.tableRef = params.tableRef;
    this.columnRef = params.columnRef;
    this.checkedValue = params.checkedValue;
    this.uncheckedValue = params.uncheckedValue;

    this.disabled = params.disabled!=null ? params.disabled : false;
    if(params.disabledSelector!=null && params.disabledSelector.length>0) {
      params.disabledSelector.forEach(ds => {
        if(params.data[ds.field]==ds.value) {
          this.disabledSelectorValue = true;
        }
      })
    }
  }

  refresh(params : any): boolean {
    return false;
  }

  onChange() {
    if(this.params.value==this.checkedValue) {
      this.params.value = this.uncheckedValue;
     }
     else {
       this.params.value = this.checkedValue;
     }
    this.parentComponent.updateCheckbox(this.tableRef, this.columnRef, this.rowId, this.params.value);
  }
}
