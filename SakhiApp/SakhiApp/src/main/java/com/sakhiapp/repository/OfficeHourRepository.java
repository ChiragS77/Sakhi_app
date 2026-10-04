package com.sakhiapp.repository;

import com.sakhiapp.entity.OfficeHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficeHourRepository extends JpaRepository<OfficeHour,Long> {

    // Office hours in display order (Mon–Fri, Sat, Sun...)
    List<OfficeHour> findAllByOrderByDisplayOrderAsc();

}
