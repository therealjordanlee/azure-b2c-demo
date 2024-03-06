import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Changes start here. */
// Import MSAL and MSAL browser libraries. 
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

// Import the Azure AD B2C configuration 
import { msalConfig, protectedResources } from './auth-config';

// Import the Angular HTTP interceptor. 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WebapiComponent } from './webapi/webapi.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    WebapiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Import the HTTP client. 
    HttpClientModule,
    // Initiate the MSAL library with the MSAL configuration object
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      {
        // The routing guard configuration. 
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: protectedResources.api.scopes
        }
      },
      {
        // MSAL interceptor configuration.
        // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [protectedResources.api.endpoint, protectedResources.api.scopes]
        ])
      })
  ],
  providers: [
    /* Changes start here. */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
    /* Changes end here. */
  ],
  bootstrap: [
    AppComponent,
    /* Changes start here. */
    MsalRedirectComponent
    /* Changes end here. */
  ]
})
export class AppModule { }
