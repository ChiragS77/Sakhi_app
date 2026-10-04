package com.sakhiapp.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessServiceDto {


    private Long id;

    private String title;

    private String description;

    private Integer displayOrder;

    private Boolean active;

    private List<ServiceItemDto> items;
}
