import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  public params = null;
  public rowId = null;
  public rowIdFiltered = null;
  public parentComponent = null;

  //Custom Required Params for each Select Component
  public tableRef = null;
  public columnRef = null;
  public buttonType = 'standard'; //Allowed values are standard, icon
  public customClass = null;

  //Custom Optional Params for each Select Component
  public title = null;
  public disabled = false;
  public disabledSelectorValue = false;
  
  agInit(params : any): void {
    this.params = params;
    this.rowId = params.node.id;
    this.rowIdFiltered = params.rowIndex;
    this.parentComponent = params.context.componentParent;

    this.tableRef = params.tableRef;
    this.columnRef = params.columnRef;
    this.buttonType = params.buttonType;
    this.customClass = params.customClass;
    
    this.title = params.title;
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

  onClick() {
    this.parentComponent.agButtonClicked(this.tableRef, this.columnRef, this.rowId, this.params.value);
  }
}
