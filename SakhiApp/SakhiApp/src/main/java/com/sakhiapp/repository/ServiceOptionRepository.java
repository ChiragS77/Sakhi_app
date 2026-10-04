package com.sakhiapp.repository;

import com.sakhiapp.entity.ServiceOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceOptionRepository extends JpaRepository<ServiceOption,Long> {

    List<ServiceOption> findByActiveTrueOrderByDisplayOrderAsc();

    List<ServiceOption> findAllByOrderByDisplayOrderAsc();

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}
