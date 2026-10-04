package com.sakhiapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "contact_info")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ContactInfo {

    @Id
    private Long id = 1L;

    // Office address as plain text
    @Column(nullable = false, length = 500)
    private String address;

    // Number the "Send Enquiry on WhatsApp" form sends to.
    // Country code + number, digits only, no "+" or spaces. e.g. 917972814989
    @Column(name = "whatsapp_enquiry_number", nullable = false, length = 20)
    private String whatsappEnquiryNumber;
}
