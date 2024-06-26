const { shareAll, withModuleFederationPlugin } = require("@angular-architects/module-federation/webpack");

const webpackConfig = withModuleFederationPlugin({
	name: "mfe-asset-management",
	filename: "remoteEntry.js",
	library: { type: "module" },
	shared: {
		...shareAll({ singleton: true, strictVersion: false, requiredVersion: "auto" })
	},
	exposes: {
		"./RemoteMfeModule": "./src/app/remote-mfe/remote-mfe.module.ts",
    "./RemoteDevicemanagementModule": "./src/app/devicemanagement/devicemanagement.module.ts",
	"./RemoteAssetVendorsModule": "./src/app/asset-vendors/asset-vendors.module.ts",
	}
});

module.exports = {
	...webpackConfig
};
