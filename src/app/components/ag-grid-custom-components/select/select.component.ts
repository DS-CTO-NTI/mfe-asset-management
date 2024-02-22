import { Component } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  public params = null;
  public rowId = null;
  public rowIdFiltered = null;
  public parentComponent = null;

  //Custom Required Params for each Select Component
  public tableRef = null;
  public columnRef = null;
  public options = [];
  public optionsArrayType = null; // Allowed values are json, string
  public displayTextField = null;
  public valueField = null;
  public newArr = [];
  public selectedValue;
 
  //Custom Optional Params for each Select Component
  public disabled = false;
  public disabledSelectorValue = false;
  public disable = false; 

  agInit(params : any): void {
    this.params = params;   
    this.rowId = params.node.id;
    this.rowIdFiltered = params.rowIndex;
    this.parentComponent = params.context.componentParent;
    this.tableRef = params.tableRef;
    this.columnRef = params.columnRef;
    this.selectedValue = params.value;
    this.disable = params.disable ;
     
    if(params.tableRef == 'plantsettingtable') {
      params.options.forEach((item, index) => {
        if (this.newArr.findIndex(i => i.dropdownValue == item.dropdownValue) === -1) 
        {
            this.newArr.push(item)
        }  
      });
      this.options = this.newArr;
    } else {     
      this.options = params.options;
    }
    this.optionsArrayType = params.optionsArrayType;
    if(this.optionsArrayType == 'json') {
      this.displayTextField = params.displayTextField;
      this.valueField = params.valueField;  
    }
    
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
    this.parentComponent.updateSelect(this.tableRef, this.columnRef, this.rowId, this.params.value);
  }
}
