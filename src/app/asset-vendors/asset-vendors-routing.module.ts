import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetVendorsComponent } from './asset-vendors.component';

const routes: Routes = [{ path: '', component: AssetVendorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetVendorsRoutingModule { }
