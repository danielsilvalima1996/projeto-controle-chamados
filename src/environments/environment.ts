// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
    //  apirest: 'https://apirest-mecanica.herokuapp.com/api'
    // apirest: 'http://192.168.43.184:5000/api' // FACULDADE
    // apirest: 'http://172.20.10.6:5000/api'
    // apirest: 'http://localhost:5000/api'
    // apirest: 'http://34.196.102.36:5000/api'
    // apirest: 'http://ec2-18-229-133-182.sa-east-1.compute.amazonaws.com:5000/api'
    apirest: 'http://localhost:5000/api'	
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
