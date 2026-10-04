package com.sakhiapp.controller;

import com.sakhiapp.dto.*;
import com.sakhiapp.entity.BusinessService;
import com.sakhiapp.entity.ServiceCategory;
import com.sakhiapp.entity.ServiceItem;
import com.sakhiapp.services.ServiceManagementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/services")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ServiceManagementController {

    private final ServiceManagementService serviceManagementService;

    public ServiceManagementController(
            ServiceManagementService serviceManagementService
    ) {
        this.serviceManagementService = serviceManagementService;
    }


    // =========================================================
    // CATEGORY APIs
    // =========================================================

    // ADD CATEGORY
    @PostMapping("/categories")
    public ResponseEntity<ServiceCategory> addCategory(
            @RequestBody ServiceCategory category
    ) {

        ServiceCategory saved =
                serviceManagementService.addCategory(category);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }


    // GET ALL CATEGORIES
    @GetMapping("/categories")
    public ResponseEntity<List<ServiceCategoryDto>> getAllCategories() {
        return ResponseEntity.ok(
                serviceManagementService.getAllCategories()
        );
    }


    // UPDATE CATEGORY
    @PutMapping("/categories/{id}")
    public ResponseEntity<ServiceCategory> updateCategory(
            @PathVariable Long id,
            @RequestBody ServiceCategory category
    ) {

        return ResponseEntity.ok(
                serviceManagementService.updateCategory(
                        id,
                        category
                )
        );
    }


    // DELETE CATEGORY
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteCategory(
            @PathVariable Long id
    ) {

        serviceManagementService.deleteCategory(id);

        return ResponseEntity.ok(
                "Category deleted successfully"
        );
    }


    // =========================================================
    // BUSINESS SERVICE APIs
    // =========================================================

    // ADD SERVICE TO CATEGORY
    @PostMapping("/categories/{categoryId}/services")
    public ResponseEntity<BusinessServiceDto> addService(
            @PathVariable Long categoryId,
            @RequestBody BusinessService service) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(serviceManagementService.addService(categoryId, service));
    }


    // GET ALL SERVICES


    @GetMapping("/titles")
    public ResponseEntity<List<ServicesTitleDto>> getAllServiceTitles() {

        return ResponseEntity.ok(
                serviceManagementService.getAllServiceTitles()
        );
    }


    // GET SERVICES BY CATEGORY
    @GetMapping("/categories/{categoryId}/services")
    public ResponseEntity<List<BusinessServiceDto>> getServicesByCategory(
            @PathVariable Long categoryId
    ) {

        return ResponseEntity.ok(
                serviceManagementService
                        .getServicesByCategory(categoryId)
        );
    }


    // UPDATE SERVICE
    @PutMapping("/{id}")
    public ResponseEntity<BusinessService> updateService(
            @PathVariable Long id,
            @RequestBody BusinessService service
    ) {

        return ResponseEntity.ok(
                serviceManagementService.updateService(
                        id,
                        service
                )
        );
    }


    // DELETE SERVICE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteService(
            @PathVariable Long id
    ) {

        serviceManagementService.deleteService(id);

        return ResponseEntity.ok(
                "Service deleted successfully"
        );
    }


    // =========================================================
    // SERVICE ITEM APIs
    // =========================================================

    // ADD ITEM TO SERVICE
    @PostMapping("/{serviceId}/items")
    public ResponseEntity<ServiceItemDto> addServiceItem(
            @PathVariable Long serviceId,
            @RequestBody ServiceItemDto request
    ) {

        ServiceItemDto saved =
                serviceManagementService.addServiceItem(serviceId, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }


    // GET ITEMS OF SERVICE
    @GetMapping("/{serviceId}/items")
    public ResponseEntity<List<ServiceItem>> getServiceItems(
            @PathVariable Long serviceId
    ) {

        return ResponseEntity.ok(
                serviceManagementService
                        .getServiceItems(serviceId)
        );
    }


    // UPDATE ITEM
    @PutMapping("/items/{id}")
    public ResponseEntity<ServiceItem> updateServiceItem(
            @PathVariable Long id,
            @RequestBody ServiceItem item
    ) {

        return ResponseEntity.ok(
                serviceManagementService.updateServiceItem(
                        id,
                        item
                )
        );
    }


    // DELETE ITEM
    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteServiceItem(
            @PathVariable Long id
    ) {

        serviceManagementService.deleteServiceItem(id);

        return ResponseEntity.ok(
                "Service item deleted successfully"
        );
    }


    // DASHBOARD STATS (services + categories count)
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {

        return ResponseEntity.ok(
                serviceManagementService.getDashboardStats()
        );
    }
}