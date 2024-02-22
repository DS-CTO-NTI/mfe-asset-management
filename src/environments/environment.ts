// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export class EnvironmentHelper {
public static hostname = "localhost"; 
public static getEnvironmentUrl() {
// Get the hostname
this.hostname = location.host;
if (this.hostname.indexOf(':') > 0) {
 this.hostname = this.hostname.substr(0, this.hostname.indexOf(':'));
}
return  'https://' + this.hostname + ':9191' ;
}
}

export const environment = {
 baseUrl: EnvironmentHelper.getEnvironmentUrl(),
 apiUrl: EnvironmentHelper.getEnvironmentUrl(),
 //baseUrl: "https://35.170.91.154:9191",
 //apiUrl: "https://35.170.91.154:9191",
  pyBaseUrl: 'http://localhost:5000',
  reportapiUrl: EnvironmentHelper.getEnvironmentUrl(),
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
