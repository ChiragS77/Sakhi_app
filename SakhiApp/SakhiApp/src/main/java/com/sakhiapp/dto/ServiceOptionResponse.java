package com.sakhiapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServiceOptionResponse {

    private Long id;
    private String name;
    private Integer displayOrder;
    private boolean active;
}
