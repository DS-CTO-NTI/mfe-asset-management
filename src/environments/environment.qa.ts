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
    return  'https://' + this.hostname + ':9191' ;
    }
    }
    
    export const environment = {
       baseUrl:EnvironmentHelper.getEnvironmentUrl(),
       apiUrl:EnvironmentHelper.getEnvironmentUrl(),
       reportapiUrl: EnvironmentHelper.getEnvironmentUrl(),
  
     // baseUrl: "https://35.170.91.154:9191",
      //  apiUrl: "https://35.170.91.154:9191",
      pyBaseUrl: 'http://localhost:5000',
      production: false,
    };