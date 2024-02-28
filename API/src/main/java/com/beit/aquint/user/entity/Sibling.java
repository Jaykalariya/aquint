package com.beit.aquint.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "siblings")
public class Sibling implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "family_details_id")
    private FamilyDetails familyDetails;

    @NotBlank
    private String name;

    @NotNull
    private Integer age;

    @NotBlank
    private String gender;

    public Sibling(FamilyDetails familyDetails, String name, Integer age, String gender) {
        this.familyDetails = familyDetails;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
