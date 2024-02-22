import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicemanagementRoutingModule } from './devicemanagement-routing.module';
import { DevicemanagementComponent } from './devicemanagement.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



@NgModule({
  declarations: [DevicemanagementComponent],
  imports: [
    CommonModule,
    DevicemanagementRoutingModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class RemoteDevicemanagementModule { }
