import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeHomeComponent } from './mfe-home/mfe-home.component';
import { Route, RouterModule } from '@angular/router';
import { MfeFragmentComponent } from './mfe-fragment/mfe-fragment.component';


export const remoteRoutes: Route[] = [
  { path: '', component: MfeHomeComponent }
];

@NgModule({
  declarations: [
    MfeHomeComponent,
    MfeFragmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes)
  ]
})
export class RemoteMfeModule { }
