// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const selfDomain = 'https://test.enrichmvp.com';
export const environment = {
    angularDomain: `${selfDomain}`,
    production: false,
    serverUrl: 'https://testapi.enrichmvp.com',
    Auth0: {
        auth0Domain: "dev-ra8ftf8g.us.auth0.com",
        appId: "https://dev-ra8ftf8g.us.auth0.com/api/v2/",
        clientID: "z2DEuF6jbvRoaLkqHp5FWsfPkLWlMO2X",
        callbackURL: `${selfDomain}/account/callback`,
        databaseConnection: "Username-Password-Authentication",
        logoutCallbackURL: `${selfDomain}/embed/logout`,
        responseType: "code"
    },
    Auth0Authorize: `${selfDomain}/account/authorize`,
    Stripe: {
        publishableKey: "pk_test_51NWMLEAd06Ln7yXkajBBLj49JE671us2ZfQTp4VobwpcoAuFJixejBlJsq7wkXd2QZJD0PbrVvBzfmRLlstfvfAH00Jqdgz29Y",
        // publishableKey: "pk_test_VJB6SURR07ZGZYbpqEUChpWy",
    },
};
  
/*
    * For easier debugging in development mode, you can import the following file
    * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
    *
    * This import should be commented out in production mode because it will have a negative impact
    * on performance if an error is thrown.
    */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  