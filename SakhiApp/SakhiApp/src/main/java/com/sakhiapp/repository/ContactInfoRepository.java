package com.sakhiapp.repository;

import com.sakhiapp.entity.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactInfoRepository extends JpaRepository<ContactInfo,Long> {

    // The service will use findById(1L) and save(...).
}
