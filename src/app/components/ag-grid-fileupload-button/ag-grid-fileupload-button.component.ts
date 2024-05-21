import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-ag-grid-fileupload-button',
  templateUrl: './ag-grid-fileupload-button.component.html',
  styleUrls: ['./ag-grid-fileupload-button.component.scss']
})
export class AgGridFileuploadButtonComponent implements ICellRendererAngularComp {
  picture;
 
  public params: any;
constructor(
  private domSanitizer: DomSanitizer
){

}
  agInit(params) {
    this.params= params;
    console.log(params);
    this.picture = params.value;
    if(params.domSanitizer){
    //this.picture = params.value;
    this.domSanitizer = params.domSanitizer;
    }
  }

  refresh(): boolean {
    return false;
  }

  showThumbnail(base64SVG) {
    return this.domSanitizer?.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + base64SVG);
  }
  
  selectFile(event) {
    this.params.context.componentParent.updateSymbolFile(this.params, event);
  } 

 

}
