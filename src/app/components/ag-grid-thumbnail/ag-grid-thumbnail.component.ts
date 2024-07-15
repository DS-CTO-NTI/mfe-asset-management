import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-thumbnail',
  templateUrl: './ag-grid-thumbnail.component.html',
  styleUrls: ['./ag-grid-thumbnail.component.scss']
})
export class AgGridThumbnailComponent implements ICellRendererAngularComp {
  picture;
  constructor(private domSanitizer: DomSanitizer) {

  }

  agInit(params: any) {
    this.picture = params.value;
    if(params.domSanitizer){
    this.domSanitizer = params.domSanitizer;
    }
  }

  showThumbnail(base64SVG) {
    if(base64SVG){
        return this.domSanitizer?.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + base64SVG);
    }
  }

  refresh(): boolean {
    return false;
  }

}
