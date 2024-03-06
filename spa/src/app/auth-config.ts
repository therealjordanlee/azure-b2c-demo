import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
export const b2cPolicies = {
     names: {
         signUpSignIn: "B2C_1_signin_signout"
     },
     authorities: {
         signUpSignIn: {
             authority: "https://jordanleemedium.b2clogin.com/jordanleemedium.onmicrosoft.com/B2C_1_signin_signout",
         }
     },
     authorityDomain: "jordanleemedium.b2clogin.com"
 };
 
 
export const msalConfig: Configuration = {
     auth: {
         clientId: 'b8dce5e6-47c6-4243-aeb3-de6fb621aa58',
         authority: b2cPolicies.authorities.signUpSignIn.authority,
         knownAuthorities: [b2cPolicies.authorityDomain],
         redirectUri: '/', 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }

export const protectedResources = {
  api: {
    endpoint: "http://localhost:3000/WeatherForecast",
    scopes: ["https://jordanleemedium.onmicrosoft.com/test-api/all.read"],
  },
}
export const loginRequest = {
  scopes: []
};