import { Component } from '@angular/core';
import { Service, ServiceCategory } from 'src/app/models/service.model';
import { BusinessService } from 'src/app/services/business.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  categories: ServiceCategory[] = [];

  loading = true;
  error = false;

  constructor(
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {

    this.businessService.getServices().subscribe({
      
      next: (data: ServiceCategory[]) => {

        this.categories = data.map(category => ({
          ...category,

          services: category.services.map(service => ({
            ...service,
            expanded: false
          }))

        }));

        this.loading = false;
      },

      error: (error) => {

        console.error('Error loading services:', error);

        this.loading = false;
        this.error = true;
      }

    });
  }

  toggleService(service: Service): void {
    service.expanded = !service.expanded;
  }

  getServiceIcon(service: Service): string {
    return service.displayOrder.toString().padStart(2, '0');
  }
}
