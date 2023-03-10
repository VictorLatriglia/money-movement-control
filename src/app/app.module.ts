import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


import { AuthorizationService } from '../api/authorization.service';
import { MoneyMovementService } from '../api/moneyMovement.service';
import { HttpClientModule } from "@angular/common/http";
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "ngx-loading";
import { NgxMatDatetimePickerModule } from "@angular-material-components/datetime-picker";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";

import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
registerLocaleData(localeEs, "es");

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LogInComponent,
    DashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: "rgba(0,0,0,0.7)",
      backdropBorderRadius: "4px",
      primaryColour: "#31C942",
      secondaryColour: "#31C942",
      tertiaryColour: "#ffffff",
    })
  ],
  providers: [
    AuthorizationService,
    MoneyMovementService,
    {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
