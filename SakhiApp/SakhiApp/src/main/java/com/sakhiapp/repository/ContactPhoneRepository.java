package com.sakhiapp.repository;

import com.sakhiapp.entity.ContactPhone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactPhoneRepository extends JpaRepository<ContactPhone,Long> {

    List<ContactPhone> findAllByOrderByDisplayOrderAsc();

}
