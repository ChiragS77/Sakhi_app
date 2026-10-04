import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service, ServiceCategory, ServiceItem } from 'src/app/models/service.model';
import { AdminServiceService, CreateCategoryRequest, CreateServiceItemRequest, CreateServiceRequest } from 'src/app/services/admin-service.service';


type ModalType =
  | 'category'
  | 'service'
  | 'item'
  | null;


@Component({
  selector: 'app-services-management',
  templateUrl: './services-management.component.html',
  styleUrls: ['./services-management.component.css']
})
export class ServicesManagementComponent implements OnInit {





    categories: ServiceCategory[] = [];

  loading = true;

  saving = false;

  error = '';

  success = '';


  /* =====================================================
     MODAL
  ===================================================== */

  modalType: ModalType = null;

  modalTitle = '';

  selectedCategory?: ServiceCategory;

  selectedService?: Service;

  editingId: number | null = null;


  /* =====================================================
     CATEGORY FORM
  ===================================================== */

  categoryForm: CreateCategoryRequest = {
    title: '',
    description: '',
    displayOrder: 1,
    active: true
  };


  /* =====================================================
     SERVICE FORM
  ===================================================== */

  serviceForm: CreateServiceRequest = {
    title: '',
    description: '',
    displayOrder: 1,
    active: true
  };


  /* =====================================================
     ITEM FORM
  ===================================================== */

  itemForm: CreateServiceItemRequest = {
    title: '',
    displayOrder: 1,
    active: true
  };

  /* =====================================================
   DELETE CONFIRMATION MODAL
===================================================== */

showDeleteModal = false;

deleteType: 'category' | 'service' | 'item' | null = null;

deleteId: number | null = null;

deleteName = '';

deleteMessage = '';


  constructor(
    private adminService: AdminServiceService,private router: Router
  ) {}


  ngOnInit(): void {

    this.loadCategories();

  }


  /* =====================================================
     LOAD
  ===================================================== */

  loadCategories(): void {

    this.loading = true;

    this.error = '';

    this.adminService.getCategories().subscribe({

      next: (data) => {

        this.categories = data.map(category => ({
          ...category,
          services: category.services || []
        }));

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

        this.error = 'Unable to load services.';

      }

    });

  }


  /* =====================================================
     CATEGORY MODAL
  ===================================================== */

  openAddCategory(): void {

    this.editingId = null;

    this.categoryForm = {
      title: '',
      description: '',
      displayOrder: this.categories.length + 1,
      active: true
    };

    this.modalTitle = 'Add Category';

    this.modalType = 'category';

  }


  openEditCategory(
    category: ServiceCategory
  ): void {

    this.editingId = category.id;

    this.categoryForm = {

      title: category.title,

      description: category.description || '',

      displayOrder: category.displayOrder,

      active: category.active

    };

    this.modalTitle = 'Edit Category';

    this.modalType = 'category';

  }

  backToDashboard(): void {
  this.router.navigate(['/admin/dashboard']);
}


  saveCategory(): void {

    if (!this.categoryForm.title.trim()) {

      return;

    }

    this.saving = true;

    this.error = '';

    this.success = '';


    if (this.editingId === null) {

      this.adminService
        .addCategory(this.categoryForm)
        .subscribe({

          next: () => {

            this.closeModal();

            this.showSuccess('Category added successfully.');

            this.loadCategories();

          },

          error: (error) => {

            console.error(error);

            this.saving = false;

            this.error = 'Unable to add category.';

          }

        });

    } else {

      this.adminService
        .updateCategory(
          this.editingId,
          this.categoryForm
        )
        .subscribe({

          next: () => {

            this.closeModal();

            this.showSuccess('Category updated successfully.');

            this.loadCategories();

          },

          error: (error) => {

            console.error(error);

            this.saving = false;

            this.error = 'Unable to update category.';

          }

        });

    }

  }


  // deleteCategory(
  //   category: ServiceCategory
  // ): void {

  //   const confirmed = confirm(
  //     `Delete "${category.title}" and all services inside it?`
  //   );

  //   if (!confirmed) {
  //     return;
  //   }


  //   this.adminService
  //     .deleteCategory(category.id)
  //     .subscribe({

  //       next: () => {

  //         this.showSuccess('Category deleted successfully.');

  //         this.loadCategories();

  //       },

  //       error: (error) => {

  //         console.error(error);

  //         this.error = 'Unable to delete category.';

  //       }

  //     });

  // }

  deleteCategory(category: ServiceCategory): void {

  this.deleteType = 'category';

  this.deleteId = category.id;

  this.deleteName = category.title;

  this.deleteMessage =
    'This will also delete all services and service items inside this category.';

  this.showDeleteModal = true;
}

  /* =====================================================
     SERVICE MODAL
  ===================================================== */

  openAddService(
    category: ServiceCategory
  ): void {

    this.selectedCategory = category;

    this.editingId = null;

    this.serviceForm = {

      title: '',

      description: '',

      displayOrder: category.services.length + 1,

      active: true

    };

    this.modalTitle = 'Add Service';

    this.modalType = 'service';

  }


  openEditService(
    service: Service
  ): void {

    this.editingId = service.id;

    this.serviceForm = {

      title: service.title,

      description: service.description || '',

      displayOrder: service.displayOrder,

      active: service.active

    };

    this.modalTitle = 'Edit Service';

    this.modalType = 'service';

  }


  saveService(): void {

    if (!this.serviceForm.title.trim()) {

      return;

    }

    this.saving = true;

    this.error = '';


    if (this.editingId === null) {

      if (!this.selectedCategory) {

        this.saving = false;

        return;

      }


      this.adminService
        .addService(
          this.selectedCategory.id,
          this.serviceForm
        )
        .subscribe({

          next: () => {

            this.closeModal();

            this.showSuccess('Service added successfully.');

            this.loadCategories();

          },

          error: (error) => {

            console.error(error);

            this.saving = false;

            this.error = 'Unable to add service.';

          }

        });

    } else {

      this.adminService
        .updateService(
          this.editingId,
          this.serviceForm
        )
        .subscribe({

          next: () => {

            this.closeModal();

            this.showSuccess('Service updated successfully.');

            this.loadCategories();

          },

          error: (error) => {

            console.error(error);

            this.saving = false;

            this.error = 'Unable to update service.';

          }

        });

    }

  }


  // deleteService(
  //   service: Service
  // ): void {

  //   const confirmed = confirm(
  //     `Delete "${service.title}"?`
  //   );

  //   if (!confirmed) {
  //     return;
  //   }


  //   this.adminService
  //     .deleteService(service.id)
  //     .subscribe({

  //       next: () => {

  //         this.showSuccess('Service deleted successfully.');

  //         this.loadCategories();

  //       },

  //       error: (error) => {

  //         console.error(error);

  //         this.error = 'Unable to delete service.';

  //       }

  //     });

  // }

  deleteService(service: Service): void {

  this.deleteType = 'service';

  this.deleteId = service.id;

  this.deleteName = service.title;

  this.deleteMessage =
    'This will also remove all service items associated with this service.';

  this.showDeleteModal = true;
}


  /* =====================================================
     ITEM MODAL
  ===================================================== */

  openAddItem(
    service: Service
  ): void {

    this.selectedService = service;

    this.editingId = null;

    this.itemForm = {

      title: '',

      displayOrder: service.items
        ? service.items.length + 1
        : 1,

      active: true

    };

    this.modalTitle = 'Add Service Item';

    this.modalType = 'item';

  }


  openEditItem(
    item: ServiceItem
  ): void {

    this.editingId = item.id;

    this.itemForm = {

      title: item.title,

      displayOrder: item.displayOrder,

      active: item.active

    };

    this.modalTitle = 'Edit Service Item';

    this.modalType = 'item';

  }


  saveItem(): void {

    if (!this.itemForm.title.trim()) {

      return;

    }

    this.saving = true;

    this.error = '';


    if (this.editingId === null) {

      if (!this.selectedService) {

        this.saving = false;

        return;

      }


      this.adminService
        .addServiceItem(
          this.selectedService.id,
          this.itemForm
        )
        .subscribe({

          next: () => {

            this.closeModal();

            this.showSuccess('Service item added successfully.');

            this.loadCategories();

          },

          error: (error) => {

            console.error(error);

            this.saving = false;

            this.error = 'Unable to add service item.';

          }

        });

    } else {

      this.adminService
        .updateServiceItem(
          this.editingId,
          this.itemForm
        )
        .subscribe({

          next: () => {

            this.closeModal();

            this.showSuccess('Service item updated successfully.');

            this.loadCategories();

          },

          error: (error) => {

            console.error(error);

            this.saving = false;

            this.error = 'Unable to update service item.';

          }

        });

    }

  }


  // deleteItem(
  //   item: ServiceItem
  // ): void {

  //   const confirmed = confirm(
  //     `Delete "${item.title}"?`
  //   );

  //   if (!confirmed) {
  //     return;
  //   }


  //   this.adminService
  //     .deleteServiceItem(item.id)
  //     .subscribe({

  //       next: () => {

  //         this.showSuccess('Service item deleted successfully.');

  //         this.loadCategories();

  //       },

  //       error: (error) => {

  //         console.error(error);

  //         this.error = 'Unable to delete service item.';

  //       }

  //     });

  // }

  deleteItem(item: ServiceItem): void {

  this.deleteType = 'item';

  this.deleteId = item.id;

  this.deleteName = item.title;

  this.deleteMessage =
    'This service item will be permanently removed.';

  this.showDeleteModal = true;
}


confirmDelete(): void {

  if (
    this.deleteId === null ||
    this.deleteType === null
  ) {
    return;
  }

  const id = this.deleteId;
  const type = this.deleteType;

  this.showDeleteModal = false;

  this.error = '';
  this.success = '';

  if (type === 'category') {

    this.adminService
      .deleteCategory(id)
      .subscribe({

        next: () => {

          this.showSuccess(
            'Category deleted successfully.'
          );

          this.loadCategories();

        },

        error: (error) => {

          console.error(error);

          this.error =
            'Unable to delete category.';

        }

      });

  }

  else if (type === 'service') {

    this.adminService
      .deleteService(id)
      .subscribe({

        next: () => {

          this.showSuccess(
            'Service deleted successfully.'
          );

          this.loadCategories();

        },

        error: (error) => {

          console.error(error);

          this.error =
            'Unable to delete service.';

        }

      });

  }

  else if (type === 'item') {

    this.adminService
      .deleteServiceItem(id)
      .subscribe({

        next: () => {

          this.showSuccess(
            'Service item deleted successfully.'
          );

          this.loadCategories();

        },

        error: (error) => {

          console.error(error);

          this.error =
            'Unable to delete service item.';

        }

      });

  }

  this.resetDeleteModal();
}

cancelDelete(): void {

  this.showDeleteModal = false;

  this.resetDeleteModal();
}


private resetDeleteModal(): void {

  this.deleteType = null;

  this.deleteId = null;

  this.deleteName = '';

  this.deleteMessage = '';
}

  /* =====================================================
     MODAL
  ===================================================== */

  closeModal(): void {

    this.modalType = null;

    this.editingId = null;

    this.selectedCategory = undefined;

    this.selectedService = undefined;

    this.saving = false;

  }


  /* =====================================================
     MESSAGES
  ===================================================== */

  showSuccess(message: string): void {

    this.success = message;

    this.error = '';

    this.saving = false;


    setTimeout(() => {

      this.success = '';

    }, 3000);

  }


  trackById(
    index: number,
    item: any
  ): number {

    return item.id;

  }

}
