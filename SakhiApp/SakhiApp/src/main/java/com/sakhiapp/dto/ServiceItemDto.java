package com.sakhiapp.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ServiceItemDto {

    private Long id;

    private String title;

    private Integer displayOrder;

    private Boolean active;
}
