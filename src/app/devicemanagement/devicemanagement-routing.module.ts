import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicemanagementComponent } from './devicemanagement.component';

const routes: Routes = [{ path: '', component: DevicemanagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicemanagementRoutingModule { }
