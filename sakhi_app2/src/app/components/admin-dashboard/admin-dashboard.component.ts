import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardStats } from 'src/app/models/contact.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  stats?: DashboardStats;


  constructor(
    private router: Router,
    private adminService: AdminServiceService
  ) {}


  ngOnInit(): void {
  this.adminService.getDashboardStats().subscribe({
    next: (data) => this.stats = data,
    error: (err) => console.error('Failed to load stats', err)
  });
}


 sidebarOpen = false;

  

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  navigate(path: string): void {
    this.router.navigateByUrl(path);
    this.closeSidebar();
  }

  logout(): void {
    this.router.navigateByUrl('/admin/login');
    this.closeSidebar();
  }

}
