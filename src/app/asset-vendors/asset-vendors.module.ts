import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetVendorsRoutingModule } from './asset-vendors-routing.module';
import { AssetVendorsComponent } from './asset-vendors.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AssetVendorsComponent],
  imports: [
    CommonModule,
    AssetVendorsRoutingModule,
    SharedModule
  ]
})
export class RemoteAssetVendorsModule { }
