package com.sakhiapp.controller;

import com.sakhiapp.dto.ContactPageDto;
import com.sakhiapp.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    // Phones, emails, office hours, address and WhatsApp number in one call
    @GetMapping
    public ContactPageDto getContactPage() {
        return contactService.getContactPage();
    }
}
