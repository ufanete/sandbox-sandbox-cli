// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    title: "Sandbox Node (Test)",
    production: false,
    API_URL: '/api/',
    API_URL_ACCOUNT: '/api/account',
    API_URL_USER: '/api/users',
    API_URL_POST: '/api/posts',
    PAGE_LOGIN: '/account/login',
    PAGE_SIGNUP: '/account/register',
    PAGE_HOME: '/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * http://localhost:4200
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
