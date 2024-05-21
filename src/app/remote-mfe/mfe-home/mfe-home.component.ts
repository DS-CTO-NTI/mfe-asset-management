import { Component, OnInit, Optional } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-mfe-home',
  templateUrl: './mfe-home.component.html',
  styleUrls: ['./mfe-home.component.scss']
})
export class MfeHomeComponent implements OnInit {

  name:string | undefined;

  constructor() {

  }

  ngOnInit(): void {
    this.name = 'Hurray MFE works!';
  }

  callAlert(){
    alert('entered into the MFE');
  }

}
