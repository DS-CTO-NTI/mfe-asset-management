import { Location } from '@angular/common';

export class EnvironmentHelper {
public static hostname = "localhost";
  
public static getEnvironmentUrl() {
// Get the hostname
this.hostname = location.host;
if (this.hostname.indexOf(':') > 0) {
 this.hostname = this.hostname.substr(0, this.hostname.indexOf(':'));
}
// Add a port or a subdomain to get the API url:
//this.apiUrl = 'https://' + this.hostname + ':9191';
return  'https://' + this.hostname + ':9191';
}
}

export const environment = {
  baseUrl:EnvironmentHelper.getEnvironmentUrl(),
  apiUrl:EnvironmentHelper.getEnvironmentUrl(),
  reportapiUrl: EnvironmentHelper.getEnvironmentUrl(),

  pyBaseUrl: 'https://127.0.0.1:5000',
  // apiUrl: "http://127.0.0.1:8080/ppc",
  production: true,
};