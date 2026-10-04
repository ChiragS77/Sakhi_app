import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './sections/contact/contact.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { InsightsComponent } from './sections/insights/insights.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ServicesManagementComponent } from './admin/services-management/services-management.component';
import { ContactManagementComponent } from './admin/contact-management/contact-management.component';
import { InsightDetailComponent } from './sections/insight-detail/insight-detail.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'about',     component: AboutComponent },
  { path: 'services',  component: ServicesComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'insights/:slug', component: InsightDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/services', component: ServicesManagementComponent },
  { path: 'admin/contact',component: ContactManagementComponent},
  { path: '**', component: NotFoundComponent },   // ← MUST be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // restore scroll on back/forward
      anchorScrolling: 'enabled',           // enables #section scroll
      scrollOffset: [0, 80],                // offset for fixed navbar height
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
