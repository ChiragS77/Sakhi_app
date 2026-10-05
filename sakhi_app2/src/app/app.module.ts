import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './sections/home/home.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './pages/landing/landing.component';
import { ContactComponent } from './sections/contact/contact.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactPreviewComponent } from './sections/contact-preview/contact-preview.component';
import { AboutPreviewComponent } from './sections/about-preview/about-preview.component';
import { ServicesPreviewComponent } from './sections/services-preview/services-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { InsightsComponent } from './sections/insights/insights.component';
import { InsightsPreviewComponent } from './sections/insights-preview/insights-preview.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ServicesManagementComponent } from './admin/services-management/services-management.component';
import { ContactManagementComponent } from './admin/contact-management/contact-management.component';
import { InsightDetailComponent } from './sections/insight-detail/insight-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    LandingComponent,
    NotFoundComponent,
    ContactComponent,
    ContactPreviewComponent,
    AboutPreviewComponent,
    ServicesPreviewComponent,
    InsightsComponent,
    InsightsPreviewComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    ServicesManagementComponent,
    ContactManagementComponent,
    InsightDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
     BrowserModule,
    BrowserAnimationsModule,
       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
