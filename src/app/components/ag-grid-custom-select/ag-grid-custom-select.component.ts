import { Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-custom-select',
  templateUrl: './ag-grid-custom-select.component.html',
  styleUrls: ['./ag-grid-custom-select.component.scss']
})
export class AgGridCustomSelectComponent implements ICellRendererAngularComp {
 public params;
 public selectedValue;
 
  agInit(params: any) {
    this.params = params;   
    this.editCheckBox();
    
  }

  refresh(): boolean {
    return false;
  }

  editCheckBox() {
    this.params.context.componentParent.editCheckbox(this.params.data.objectId);
  }

  updateCheckBox() {
    if(this.params.value == true) {
      this.params.context.componentParent.updateCheckbox(this.params.data.permissionsMenu, this.params.data.objectId, this.params.options[1]);
    }
    else {
      this.params.context.componentParent.updateCheckbox(this.params.data.permissionsMenu, this.params.data.objectId, this.params.options[0]);
    }
  }
}
