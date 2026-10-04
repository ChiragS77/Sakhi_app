package com.sakhiapp.controller;

import com.sakhiapp.dto.BusinessServiceDto;
import com.sakhiapp.dto.ServiceCategoryDto;
import com.sakhiapp.services.ServiceManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowCredentials = "true"
)
public class PublicServiceController {

    private final ServiceManagementService serviceManagementService;

    public PublicServiceController(
            ServiceManagementService serviceManagementService
    ) {
        this.serviceManagementService = serviceManagementService;
    }

    @GetMapping
    public ResponseEntity<List<ServiceCategoryDto>> getPublicServices() {

        return ResponseEntity.ok(
                serviceManagementService.getAllActiveCategories()
        );
    }

    @GetMapping("/titles")
    public ResponseEntity<List<BusinessServiceDto>> getAllServices() {

        return ResponseEntity.ok(
                serviceManagementService.getAllServices()
        );
    }
}