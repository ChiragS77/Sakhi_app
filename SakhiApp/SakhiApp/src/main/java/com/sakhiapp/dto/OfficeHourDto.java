package com.sakhiapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeHourDto {

    private Long id;

    private String dayLabel;

    private String timings;

    private boolean closed;

    private Integer displayOrder;
}
