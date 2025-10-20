import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AppRoutingModule } from "./app.routing.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from "@angular/common/http";
import {NgChartsModule} from "ng2-charts";
import {HouseholdsModule} from "./households/households.module";

import { RealEstateModule } from "./real-estate/real-estate.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { MaterialModule } from "./infrastructure/material/material.module";
import { JwtModule } from "@auth0/angular-jwt";
import { NavigationComponent } from "./navigation/navigation.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TokenInterceptor } from "./interceptor/TokenInterceptor";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
      AppComponent,
      NavBarComponent,
      NavigationComponent
    ],
    imports: [
        AppRoutingModule,
        AuthModule,
        HouseholdsModule,
        FormsModule,
        MatAutocompleteModule,
      AppRoutingModule,
      AuthModule,
      BrowserAnimationsModule,
      CommonModule,
      FormsModule,
      MatAutocompleteModule,
      RealEstateModule,
      MaterialModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:8787"],
          disallowedRoutes: ["http://localhost:8787/auth/login"],
        },
      }),
    ],
    providers: [

    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([TokenInterceptor])),
  ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
