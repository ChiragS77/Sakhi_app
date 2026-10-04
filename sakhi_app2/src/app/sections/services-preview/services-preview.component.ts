import { Component } from '@angular/core';
import { Service, ServiceCategory } from 'src/app/models/service.model';
import { BusinessService } from 'src/app/services/business.service';




interface ServicePreview {
  number: string;
  category: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services-preview',
  templateUrl: './services-preview.component.html',
  styleUrls: ['./services-preview.component.css']
})
export class ServicesPreviewComponent {
services: ServicePreview[] = [];



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

      next: (categories: ServiceCategory[]) => {

        const previewServices: ServicePreview[] = [];

        categories.forEach(category => {

          category.services.forEach((service: Service ) => {

            // Stop after 6 services
            if (previewServices.length < 6) {

              previewServices.push({
                number: service.displayOrder
                  .toString()
                  .padStart(2, '0'),

                category: category.title.toUpperCase(),

                title: service.title,

                description: service.description
              });

            }

          });

        });

        this.services = previewServices;

        this.loading = false;
      },

      error: (error) => {

        console.error(
          'Error loading service preview:',
          error
        );

        this.loading = false;
        this.error = true;
      }

    });
  }
  

}
