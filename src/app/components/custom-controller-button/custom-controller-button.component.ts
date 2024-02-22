import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-controller-button',
  templateUrl: './custom-controller-button.component.html',
  styleUrls: ['./custom-controller-button.component.scss']
})
export class CustomControllerButtonComponent implements ICellRendererAngularComp {

  params;
  label: string;
  enabledList=false;
  list;



  agInit(params): void {
    this.params = params;
    this.list=params.data.Enable;
    if(this.list==true){
     this.enabledList=true;
    }else {
    this.enabledList=false;
    }
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  isToggleAutorefresh($event) { 
      const params1= {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onClick(params1);    
  }

}
