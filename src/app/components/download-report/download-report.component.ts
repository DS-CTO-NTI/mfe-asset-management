
import { Component,OnInit} from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss']
})
export class DownloadReportComponent implements OnInit {
  public onClose: Subject<boolean>;
    constructor(private bsModalRef: BsModalRef) {
   }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  downloadReport(yes){
    this.onClose.next(yes);
    this.bsModalRef.hide();
  }

  cancelDownload(cancel){
    this.onClose.next(cancel);
    if(cancel){
      this.bsModalRef.hide();
    }
   
  }
}