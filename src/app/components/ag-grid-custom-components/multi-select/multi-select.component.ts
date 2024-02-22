import { Component, OnInit, ViewChild, ViewContainerRef,ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiSelectComponent implements OnInit {

  @ViewChild('input', {read: ViewContainerRef}) public input;

  myForm: FormGroup;
  selectedItems = [];
  optionsId = [];
  public tableRef = null;
  public columnRef = null;
  public options = [];
  public optionsArrayType = null; // Allowed values are json, string
  public displayTextField = null;
  public valueField = null;
  public newArr = [];
  public selectedValue;
  public params = null;
  public rowId = null;
  public rowIdFiltered = null;
  public parentComponent = null;
  public placeholder;

  //Custom Optional Params for each Select Component
  public disabled = false;
  public disabledSelectorValue = false;

  dropdownSettings: IDropdownSettings;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      addedPermission: [],
    });
  }

  agInit(params : any): void {  
    this.dropdownSettings = {
      singleSelection: false,
      idField: params.valueField,
      textField: params.displayTextField,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: params.allowSearchFilter,
      // maxHeight: 150,
    };
    this.params = params;   
    this.rowId = params.node.id;
    this.rowIdFiltered = params.rowIndex;
    this.parentComponent = params.context.componentParent;
    this.tableRef = params.tableRef;
    this.columnRef = params.columnRef;
    this.placeholder = params.placeholder;
    this.selectedValue = params.value;   
    this.options = params.options;    
    this.optionsArrayType = params.optionsArrayType;   
    this.selectedItems = params.selectedItems;    

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

  ngAfterViewInit() {
    window.setTimeout(() => {
    })
}

  onItemSelect(item: any) {
    this.optionsId.push(item.roleId);
    this.parentComponent.updateOnItemSelect(this.tableRef, this.columnRef, this.rowId, item);
  }

  onSelectAll(items: any) {
    this.optionsId = [];
    this.selectedItems.push(items);
    items.forEach((obj) => {
      this.optionsId.push(obj.roleId);
    });
    this.parentComponent.updateOnAllItemSelect(this.tableRef, this.columnRef, this.rowId, items);
  }

  onItemDeSelect(item: any) {   
    this.optionsId.forEach((obj) => {
      if (obj == item.roleId) {
        this.optionsId.splice(item.roleId, 1);
      }
    });
    this.parentComponent.updateOnItemDeselect(this.tableRef, this.columnRef, this.rowId, item);
  }

  onDeSelectAll(items: any){
    this.parentComponent.updateOnItemDeselectAll(this.tableRef, this.columnRef, this.rowId, items);
  }
}
