package com.sakhiapp.controller;

import com.sakhiapp.dto.ServiceOptionRequest;
import com.sakhiapp.dto.ServiceOptionResponse;
import com.sakhiapp.services.ServiceOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/services")
@RequiredArgsConstructor
public class AdminServiceController {

    private final ServiceOptionService serviceOptionService;


     @GetMapping
     public ResponseEntity<List<ServiceOptionResponse>> getAllServices() {
         return ResponseEntity.ok( serviceOptionService.getAllServices() );
     }


      @GetMapping("/{id}")
      public ResponseEntity<ServiceOptionResponse> getServiceById( @PathVariable Long id) {
         return ResponseEntity.ok( serviceOptionService.getServiceById(id) );
     }

      @PostMapping
      public ResponseEntity<ServiceOptionResponse> createService(  @RequestBody ServiceOptionRequest request) {
         ServiceOptionResponse response = serviceOptionService.createService(request);
         return ResponseEntity .status(HttpStatus.CREATED) .body(response);
     }

     @PutMapping("/{id}")
     public ResponseEntity<ServiceOptionResponse> updateService( @PathVariable Long id,  @RequestBody ServiceOptionRequest request) {
         return ResponseEntity.ok( serviceOptionService.updateService(id, request) );
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteService( @PathVariable Long id) {
         serviceOptionService.deleteService(id);
         return ResponseEntity.noContent().build();
     }
}
