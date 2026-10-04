package com.sakhiapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "contact_phone")
public class ContactPhone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Display format, e.g. "+91 79728 14989"
    @Column(name = "phone_number", nullable = false, length = 30)
    private String phoneNumber;

    // Controls the order shown on the page
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;
}
