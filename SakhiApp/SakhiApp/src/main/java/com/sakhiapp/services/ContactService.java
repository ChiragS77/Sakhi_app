package com.sakhiapp.services;


import com.sakhiapp.dto.*;
import com.sakhiapp.entity.ContactEmail;
import com.sakhiapp.entity.ContactInfo;
import com.sakhiapp.entity.ContactPhone;
import com.sakhiapp.entity.OfficeHour;
import com.sakhiapp.repository.ContactEmailRepository;
import com.sakhiapp.repository.ContactInfoRepository;
import com.sakhiapp.repository.ContactPhoneRepository;
import com.sakhiapp.repository.OfficeHourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ContactService {

    private static final Long CONTACT_INFO_ID = 1L;

    private final ContactPhoneRepository phoneRepository;
    private final ContactEmailRepository emailRepository;
    private final OfficeHourRepository officeHourRepository;
    private final ContactInfoRepository contactInfoRepository;


    // ===================================================
    // PUBLIC CONTACT PAGE (everything in one call)
    // ===================================================

    @Transactional(readOnly = true)
    public ContactPageDto getContactPage() {
        ContactInfoDto info = getContactInfo();

        return new ContactPageDto(
                getPhones(),
                getEmails(),
                getOfficeHours(),
                info.getAddress(),
                info.getWhatsappEnquiryNumber()
        );
    }


    // ===================================================
    // PHONES
    // ===================================================

    @Transactional(readOnly = true)
    public List<ContactPhoneDto> getPhones() {
        return phoneRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public ContactPhoneDto addPhone(ContactPhoneDto dto) {
        System.out.println("Received phone: " + dto.getPhoneNumber());
        ContactPhone phone = new ContactPhone();
        phone.setPhoneNumber(dto.getPhoneNumber());
        phone.setDisplayOrder(resolveOrder(dto.getDisplayOrder(), phoneRepository.count()));
        return toDto(phoneRepository.save(phone));
    }

    public ContactPhoneDto updatePhone(Long id, ContactPhoneDto dto) {
        ContactPhone phone = phoneRepository.findById(id)
                .orElseThrow(() -> notFound("Phone"));

        phone.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getDisplayOrder() != null) {
            phone.setDisplayOrder(dto.getDisplayOrder());
        }
        return toDto(phoneRepository.save(phone));
    }

    public void deletePhone(Long id) {
        if (!phoneRepository.existsById(id)) {
            throw notFound("Phone");
        }
        phoneRepository.deleteById(id);
    }


    // ===================================================
    // EMAILS
    // ===================================================

    @Transactional(readOnly = true)
    public List<ContactEmailDto> getEmails() {
        return emailRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public ContactEmailDto addEmail(ContactEmailDto dto) {
        ContactEmail email = new ContactEmail();
        email.setEmail(dto.getEmail());
        email.setDisplayOrder(resolveOrder(dto.getDisplayOrder(), emailRepository.count()));
        return toDto(emailRepository.save(email));
    }

    public ContactEmailDto updateEmail(Long id, ContactEmailDto dto) {
        ContactEmail email = emailRepository.findById(id)
                .orElseThrow(() -> notFound("Email"));

        email.setEmail(dto.getEmail());
        if (dto.getDisplayOrder() != null) {
            email.setDisplayOrder(dto.getDisplayOrder());
        }
        return toDto(emailRepository.save(email));
    }

    public void deleteEmail(Long id) {
        if (!emailRepository.existsById(id)) {
            throw notFound("Email");
        }
        emailRepository.deleteById(id);
    }


    // ===================================================
    // OFFICE HOURS
    // ===================================================

    @Transactional(readOnly = true)
    public List<OfficeHourDto> getOfficeHours() {
        return officeHourRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public OfficeHourDto addOfficeHour(OfficeHourDto dto) {
        OfficeHour hour = new OfficeHour();
        hour.setDayLabel(dto.getDayLabel());
        hour.setClosed(dto.isClosed());
        hour.setTimings(dto.isClosed() ? null : dto.getTimings());
        hour.setDisplayOrder(resolveOrder(dto.getDisplayOrder(), officeHourRepository.count()));
        return toDto(officeHourRepository.save(hour));
    }

    public OfficeHourDto updateOfficeHour(Long id, OfficeHourDto dto) {
        OfficeHour hour = officeHourRepository.findById(id)
                .orElseThrow(() -> notFound("Office hour"));

        hour.setDayLabel(dto.getDayLabel());
        hour.setClosed(dto.isClosed());
        hour.setTimings(dto.isClosed() ? null : dto.getTimings());
        if (dto.getDisplayOrder() != null) {
            hour.setDisplayOrder(dto.getDisplayOrder());
        }
        return toDto(officeHourRepository.save(hour));
    }

    public void deleteOfficeHour(Long id) {
        if (!officeHourRepository.existsById(id)) {
            throw notFound("Office hour");
        }
        officeHourRepository.deleteById(id);
    }


    // ===================================================
    // ADDRESS + WHATSAPP ENQUIRY NUMBER (single row)
    // ===================================================

    @Transactional(readOnly = true)
    public ContactInfoDto getContactInfo() {
        ContactInfo info = contactInfoRepository.findById(CONTACT_INFO_ID)
                .orElseGet(() -> new ContactInfo(CONTACT_INFO_ID, "", ""));

        return new ContactInfoDto(info.getAddress(), info.getWhatsappEnquiryNumber());
    }

    // Creates the row on first save, updates it afterwards
    public ContactInfoDto updateContactInfo(ContactInfoDto dto) {
        ContactInfo info = contactInfoRepository.findById(CONTACT_INFO_ID)
                .orElseGet(() -> new ContactInfo(CONTACT_INFO_ID, "", ""));

        info.setAddress(dto.getAddress());
        info.setWhatsappEnquiryNumber(dto.getWhatsappEnquiryNumber());

        ContactInfo saved = contactInfoRepository.save(info);
        return new ContactInfoDto(saved.getAddress(), saved.getWhatsappEnquiryNumber());
    }


    // ===================================================
    // MAPPING + HELPERS
    // ===================================================

    private ContactPhoneDto toDto(ContactPhone p) {
        return new ContactPhoneDto(p.getId(), p.getPhoneNumber(), p.getDisplayOrder());
    }

    private ContactEmailDto toDto(ContactEmail e) {
        return new ContactEmailDto(e.getId(), e.getEmail(), e.getDisplayOrder());
    }

    private OfficeHourDto toDto(OfficeHour h) {
        return new OfficeHourDto(
                h.getId(), h.getDayLabel(), h.getTimings(), h.isClosed(), h.getDisplayOrder());
    }

    // If the admin doesn't send an order, put the new item at the end
    private Integer resolveOrder(Integer requested, long currentCount) {
        return requested != null ? requested : (int) currentCount + 1;
    }

    private ResponseStatusException notFound(String what) {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, what + " not found");
    }
}
