import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: "",
		loadChildren: () => import("./remote-mfe/remote-mfe.module").then((m) => m.RemoteMfeModule)
	},
	{
		path: "asset-configuration",
		loadChildren: () => import("./devicemanagement/devicemanagement.module").then((m) => m.RemoteDevicemanagementModule),
		data: {
			name: "Asset Configuration"
		}
	},
	{
		path: 'assettype-vendors-and-groups',
		loadChildren: () => import('./asset-vendors/asset-vendors.module').then((m) => m.RemoteAssetVendorsModule),
		data: {
		  // id: 4
		  name:"Asset Types,Vendors & Groups"
		},
	  },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
