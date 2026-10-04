package com.sakhiapp.repository;

import com.sakhiapp.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory,Long> {


    List<ServiceCategory> findByActiveTrueOrderByDisplayOrderAsc();

    boolean existsByTitleIgnoreCase(String title);
}
