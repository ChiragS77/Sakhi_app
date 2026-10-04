package com.sakhiapp.services;

import com.sakhiapp.dto.*;
import com.sakhiapp.entity.BusinessService;
import com.sakhiapp.entity.ServiceCategory;
import com.sakhiapp.entity.ServiceItem;
import com.sakhiapp.repository.BusinessServiceRepository;
import com.sakhiapp.repository.ServiceCategoryRepository;
import com.sakhiapp.repository.ServiceItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ServiceManagementService {

    private final ServiceCategoryRepository categoryRepository;
    private final BusinessServiceRepository serviceRepository;
    private final ServiceItemRepository itemRepository;


    public ServiceCategory addCategory(ServiceCategory category) {

        if (categoryRepository.existsByTitleIgnoreCase(category.getTitle())) {
            throw new RuntimeException("Category already exists");
        }

        if (category.getDisplayOrder() == null) {
            category.setDisplayOrder(0);
        }

        if (category.getActive() == null) {
            category.setActive(true);
        }

        return categoryRepository.save(category);
    }

//    @Transactional(readOnly = true)
//    public List<ServiceCategory> getAllCategories() {
//        return categoryRepository.findByActiveTrueOrderByDisplayOrderAsc();
//
//
//    }

    public List<ServiceCategoryDto> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(this::convertToCategoryDto)
                .toList();
    }

    public ServiceCategory updateCategory(
            Long id,
            ServiceCategory updatedCategory
    ) {

        ServiceCategory category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found")
                );

        category.setTitle(updatedCategory.getTitle());
        category.setDescription(updatedCategory.getDescription());
        category.setDisplayOrder(updatedCategory.getDisplayOrder());

        if (updatedCategory.getActive() != null) {
            category.setActive(updatedCategory.getActive());
        }

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {

        ServiceCategory category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found")
                );

        categoryRepository.delete(category);
    }


    // =========================================================
    // BUSINESS SERVICE
    // =========================================================
    public BusinessServiceDto addService(
            Long categoryId,
            BusinessService service
    ) {

        ServiceCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new RuntimeException("Category not found")
                );

        if (serviceRepository.existsByTitleIgnoreCase(service.getTitle())) {
            throw new RuntimeException("Service already exists");
        }

        service.setCategory(category);

        if (service.getDisplayOrder() == null) {
            service.setDisplayOrder(0);
        }

        if (service.getActive() == null) {
            service.setActive(true);
        }

        BusinessService savedService = serviceRepository.save(service);

        return convertToBusinessServiceDto(savedService);
    }

//    @Transactional(readOnly = true)
//    public List<BusinessService> getAllServices() {
//        return serviceRepository.findByActiveTrueOrderByDisplayOrderAsc();
//    }

    @Transactional(readOnly = true)
    public List<BusinessServiceDto> getAllServices() {

        return serviceRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToBusinessServiceDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ServicesTitleDto> getAllServiceTitles() {

        return serviceRepository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToServicesTitleDto)
                .toList();
    }

    private ServicesTitleDto convertToServicesTitleDto(BusinessService service) {

        return new ServicesTitleDto(
                service.getId(),
                service.getTitle()
        );
    }

//    @Transactional(readOnly = true)
//    public List<BusinessService> getServicesByCategory(
//            Long categoryId
//    ) {
//
//        return serviceRepository
//                .findByCategoryIdAndActiveTrueOrderByDisplayOrderAsc(
//                        categoryId
//                );
//    }

    @Transactional(readOnly = true)
    public List<BusinessServiceDto> getServicesByCategory(
            Long categoryId
    ) {

        return serviceRepository
                .findByCategoryIdAndActiveTrueOrderByDisplayOrderAsc(
                        categoryId
                )
                .stream()
                .map(this::convertToBusinessServiceDto)
                .toList();
    }

    public BusinessService updateService(
            Long id,
            BusinessService updatedService
    ) {

        BusinessService service = serviceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found")
                );

        service.setTitle(updatedService.getTitle());
        service.setDescription(updatedService.getDescription());
        service.setDisplayOrder(updatedService.getDisplayOrder());

        if (updatedService.getActive() != null) {
            service.setActive(updatedService.getActive());
        }

        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {

        BusinessService service = serviceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found")
                );

        serviceRepository.delete(service);
    }


    // =========================================================
    // SERVICE ITEMS
    // =========================================================
//
//    public ServiceItem addServiceItem(
//            Long serviceId,
//            ServiceItem item
//    ) {
//
//        BusinessService service = serviceRepository.findById(serviceId)
//                .orElseThrow(() ->
//                        new RuntimeException("Service not found")
//                );
//
//        if (itemRepository.existsByTitleIgnoreCaseAndServiceId(
//                item.getTitle(),
//                serviceId
//        )) {
//            throw new RuntimeException(
//                    "Service item already exists"
//            );
//        }
//
//        item.setService(service);
//
//        if (item.getDisplayOrder() == null) {
//            item.setDisplayOrder(0);
//        }
//
//        if (item.getActive() == null) {
//            item.setActive(true);
//        }
//
//        return itemRepository.save(item);
//    }

    public ServiceItemDto addServiceItem(
            Long serviceId,
            ServiceItemDto request
    ) {

        BusinessService service = serviceRepository.findById(serviceId)
                .orElseThrow(() ->
                        new RuntimeException("Service not found")
                );

        if (itemRepository.existsByTitleIgnoreCaseAndServiceId(
                request.getTitle(),
                serviceId
        )) {
            throw new RuntimeException("Service item already exists");
        }

        ServiceItem item = new ServiceItem();
        item.setTitle(request.getTitle());
        item.setDisplayOrder(
                request.getDisplayOrder() != null ? request.getDisplayOrder() : 0
        );
        item.setActive(
                request.getActive() != null ? request.getActive() : true
        );
        item.setService(service);

        ServiceItem saved = itemRepository.save(item);

        return ServiceItemDto.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .displayOrder(saved.getDisplayOrder())
                .active(saved.getActive())
                .build();
    }

    public List<ServiceItem> getServiceItems(
            Long serviceId
    ) {

        return itemRepository
                .findByServiceIdAndActiveTrueOrderByDisplayOrderAsc(
                        serviceId
                );
    }

    public ServiceItem updateServiceItem(
            Long id,
            ServiceItem updatedItem
    ) {

        ServiceItem item = itemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service item not found")
                );

        item.setTitle(updatedItem.getTitle());
        item.setDisplayOrder(updatedItem.getDisplayOrder());

        if (updatedItem.getActive() != null) {
            item.setActive(updatedItem.getActive());
        }

        return itemRepository.save(item);
    }

    public void deleteServiceItem(Long id) {

        ServiceItem item = itemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service item not found")
                );

        itemRepository.delete(item);
    }


    public List<ServiceCategoryDto> getAllActiveCategories() {

        List<ServiceCategory> categories =
                categoryRepository.findByActiveTrueOrderByDisplayOrderAsc();

        return categories.stream()
                .map(category -> ServiceCategoryDto.builder()
                        .id(category.getId())
                        .title(category.getTitle())
                        .description(category.getDescription())
                        .displayOrder(category.getDisplayOrder())
                        .active(category.getActive())
                        .services(
                                category.getServices()
                                        .stream()
                                        .filter(BusinessService::getActive)
                                        .map(service -> BusinessServiceDto.builder()
                                                .id(service.getId())
                                                .title(service.getTitle())
                                                .description(service.getDescription())
                                                .displayOrder(service.getDisplayOrder())
                                                .active(service.getActive())
                                                .items(
                                                        service.getItems()
                                                                .stream()
                                                                .filter(ServiceItem::getActive)
                                                                .map(item -> ServiceItemDto.builder()
                                                                        .id(item.getId())
                                                                        .title(item.getTitle())
                                                                        .displayOrder(item.getDisplayOrder())
                                                                        .active(item.getActive())
                                                                        .build()
                                                                )
                                                                .toList()
                                                )
                                                .build()
                                        )
                                        .toList()
                        )
                        .build()
                )
                .toList();
    }

    private ServiceCategoryDto convertToCategoryDto(ServiceCategory category) {

        ServiceCategoryDto dto = new ServiceCategoryDto();

        dto.setId(category.getId());
        dto.setTitle(category.getTitle());
        dto.setDescription(category.getDescription());
        dto.setDisplayOrder(category.getDisplayOrder());
        dto.setActive(category.getActive());

        dto.setServices(
                category.getServices()
                        .stream()
                        .map(this::convertToBusinessServiceDto)
                        .toList()
        );

        return dto;
    }

//    private BusinessServiceDto convertToBusinessServiceDto(
//            BusinessService service) {
//
//        BusinessServiceDto dto = new BusinessServiceDto();
//
//        dto.setId(service.getId());
//        dto.setTitle(service.getTitle());
//        dto.setDescription(service.getDescription());
//        dto.setDisplayOrder(service.getDisplayOrder());
//        dto.setActive(service.getActive());
//
//        dto.setItems(
//                service.getItems()
//                        .stream()
//                        .map(this::convertToServiceItemDto)
//                        .toList()
//        );
//
//        return dto;
//    }

    private BusinessServiceDto convertToBusinessServiceDto(
            BusinessService service) {

        BusinessServiceDto dto = new BusinessServiceDto();

        dto.setId(service.getId());
        dto.setTitle(service.getTitle());
        dto.setDescription(service.getDescription());
        dto.setDisplayOrder(service.getDisplayOrder());
        dto.setActive(service.getActive());

        if (service.getItems() != null) {
            dto.setItems(
                    service.getItems()
                            .stream()
                            .map(this::convertToServiceItemDto)
                            .toList()
            );
        } else {
            dto.setItems(new ArrayList<>());
        }

        return dto;
    }

    private ServiceItemDto convertToServiceItemDto(ServiceItem item) {

        ServiceItemDto dto = new ServiceItemDto();

        dto.setId(item.getId());
        dto.setTitle(item.getTitle());
        dto.setDisplayOrder(item.getDisplayOrder());
        dto.setActive(item.getActive());

        return dto;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {

        long activeServices = serviceRepository.countByActiveTrue();
        long totalCategories = categoryRepository.count();

        return new DashboardStatsDto(activeServices, totalCategories);
    }
}
