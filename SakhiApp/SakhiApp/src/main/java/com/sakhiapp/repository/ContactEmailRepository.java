package com.sakhiapp.repository;

import com.sakhiapp.entity.ContactEmail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactEmailRepository extends JpaRepository<ContactEmail,Long> {

    // Emails in the order the admin arranged them
    List<ContactEmail> findAllByOrderByDisplayOrderAsc();
}
