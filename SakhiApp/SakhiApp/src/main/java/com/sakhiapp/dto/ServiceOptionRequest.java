package com.sakhiapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServiceOptionRequest {

    private String name;
    private Integer displayOrder;
    private boolean active;

}
