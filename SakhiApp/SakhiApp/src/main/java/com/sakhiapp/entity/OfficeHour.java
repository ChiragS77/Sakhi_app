package com.sakhiapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "office_hour")
public class OfficeHour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // e.g. "Monday – Friday", "Saturday", "Sunday"
    @Column(name = "day_label", nullable = false, length = 50)
    private String dayLabel;

    // e.g. "9:00 AM – 7:00 PM". Null when closed
    @Column(length = 50)
    private String timings;

    // When true, the UI shows "Closed" instead of timings
    @Column(nullable = false)
    private boolean closed = false;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;
}
