package com.sakhiapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ContactPageDto {

    private List<ContactPhoneDto> phones;
    private List<ContactEmailDto> emails;
    private List<OfficeHourDto> officeHours;
    private String address;
    private String whatsappEnquiryNumber;

}
