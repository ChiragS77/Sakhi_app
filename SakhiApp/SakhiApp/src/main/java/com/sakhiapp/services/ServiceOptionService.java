package com.sakhiapp.services;

import com.sakhiapp.dto.ServiceOptionRequest;
import com.sakhiapp.dto.ServiceOptionResponse;
import com.sakhiapp.entity.ServiceOption;
import com.sakhiapp.repository.ServiceOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceOptionService {

    private final ServiceOptionRepository serviceOptionRepository;


    // Get all services for admin
    @Transactional(readOnly = true)
    public List<ServiceOptionResponse> getAllServices() {

        return serviceOptionRepository
                .findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // Get one service by ID
    @Transactional(readOnly = true)
    public ServiceOptionResponse getServiceById(Long id) {

        ServiceOption serviceOption = serviceOptionRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service option not found with id: " + id)
                );

        return toResponse(serviceOption);
    }


    // Create service
    @Transactional
    public ServiceOptionResponse createService(
            ServiceOptionRequest request) {

        if (serviceOptionRepository
                .existsByNameIgnoreCase(request.getName())) {

            throw new RuntimeException(
                    "Service already exists with name: " + request.getName()
            );
        }

        ServiceOption serviceOption = new ServiceOption();

        serviceOption.setName(request.getName().trim());
        serviceOption.setDisplayOrder(request.getDisplayOrder());
        serviceOption.setActive(request.isActive());

        ServiceOption savedService =
                serviceOptionRepository.save(serviceOption);

        return toResponse(savedService);
    }


    // Update service
    @Transactional
    public ServiceOptionResponse updateService(
            Long id,
            ServiceOptionRequest request) {

        ServiceOption serviceOption = serviceOptionRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Service option not found with id: " + id
                        )
                );

        if (serviceOptionRepository
                .existsByNameIgnoreCaseAndIdNot(
                        request.getName(),
                        id
                )) {

            throw new RuntimeException(
                    "Another service already exists with name: "
                            + request.getName()
            );
        }

        serviceOption.setName(request.getName().trim());
        serviceOption.setDisplayOrder(request.getDisplayOrder());
        serviceOption.setActive(request.isActive());

        ServiceOption updatedService =
                serviceOptionRepository.save(serviceOption);

        return toResponse(updatedService);
    }


    // Delete service
    @Transactional
    public void deleteService(Long id) {

        ServiceOption serviceOption = serviceOptionRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Service option not found with id: " + id
                        )
                );

        serviceOptionRepository.delete(serviceOption);
    }


    // Entity -> Response DTO
    private ServiceOptionResponse toResponse(
            ServiceOption serviceOption) {

        ServiceOptionResponse response =
                new ServiceOptionResponse();

        response.setId(serviceOption.getId());
        response.setName(serviceOption.getName());
        response.setDisplayOrder(serviceOption.getDisplayOrder());
        response.setActive(serviceOption.isActive());

        return response;
    }
}
