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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
