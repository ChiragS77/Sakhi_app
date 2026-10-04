package com.sakhiapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ContactPhoneDto {

    private Long id;

    private String phoneNumber;

    private Integer displayOrder;
}
