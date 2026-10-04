package com.sakhiapp.controller;

import com.sakhiapp.dto.ContactEmailDto;
import com.sakhiapp.dto.ContactInfoDto;
import com.sakhiapp.dto.ContactPhoneDto;
import com.sakhiapp.dto.OfficeHourDto;
import com.sakhiapp.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/contact")
@RequiredArgsConstructor
public class AdminContactController {

    private final ContactService contactService;


    // ---------------- PHONES ----------------

    @GetMapping("/phones")
    public List<ContactPhoneDto> getPhones() {
        return contactService.getPhones();
    }

    @PostMapping("/phones")
    public ResponseEntity<ContactPhoneDto> addPhone(@RequestBody ContactPhoneDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.addPhone(dto));
    }

    @PutMapping("/phones/{id}")
    public ContactPhoneDto updatePhone(@PathVariable Long id, @RequestBody ContactPhoneDto dto) {
        return contactService.updatePhone(id, dto);
    }

    @DeleteMapping("/phones/{id}")
    public ResponseEntity<Void> deletePhone(@PathVariable Long id) {
        contactService.deletePhone(id);
        return ResponseEntity.noContent().build();
    }


    // ---------------- EMAILS ----------------

    @GetMapping("/emails")
    public List<ContactEmailDto> getEmails() {
        return contactService.getEmails();
    }

    @PostMapping("/emails")
    public ResponseEntity<ContactEmailDto> addEmail(@RequestBody ContactEmailDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.addEmail(dto));
    }

    @PutMapping("/emails/{id}")
    public ContactEmailDto updateEmail(@PathVariable Long id, @RequestBody ContactEmailDto dto) {
        return contactService.updateEmail(id, dto);
    }

    @DeleteMapping("/emails/{id}")
    public ResponseEntity<Void> deleteEmail(@PathVariable Long id) {
        contactService.deleteEmail(id);
        return ResponseEntity.noContent().build();
    }


    // ---------------- OFFICE HOURS ----------------

    @GetMapping("/office-hours")
    public List<OfficeHourDto> getOfficeHours() {
        return contactService.getOfficeHours();
    }

    @PostMapping("/office-hours")
    public ResponseEntity<OfficeHourDto> addOfficeHour(@RequestBody OfficeHourDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.addOfficeHour(dto));
    }

    @PutMapping("/office-hours/{id}")
    public OfficeHourDto updateOfficeHour(@PathVariable Long id, @RequestBody OfficeHourDto dto) {
        return contactService.updateOfficeHour(id, dto);
    }

    @DeleteMapping("/office-hours/{id}")
    public ResponseEntity<Void> deleteOfficeHour(@PathVariable Long id) {
        contactService.deleteOfficeHour(id);
        return ResponseEntity.noContent().build();
    }


    // ---------------- ADDRESS + WHATSAPP NUMBER ----------------

    @GetMapping("/info")
    public ContactInfoDto getContactInfo() {
        return contactService.getContactInfo();
    }

    @PutMapping("/info")
    public ContactInfoDto updateContactInfo(@RequestBody ContactInfoDto dto) {
        return contactService.updateContactInfo(dto);
    }
}
