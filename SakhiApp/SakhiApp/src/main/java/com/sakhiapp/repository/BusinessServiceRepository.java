package com.sakhiapp.repository;

import com.sakhiapp.entity.BusinessService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessServiceRepository extends JpaRepository<BusinessService,Long> {

    List<BusinessService> findByCategoryIdAndActiveTrueOrderByDisplayOrderAsc(
            Long categoryId
    );

    List<BusinessService> findByActiveTrueOrderByDisplayOrderAsc();

    boolean existsByTitleIgnoreCase(String title);

    long countByActiveTrue();
}
