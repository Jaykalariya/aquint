// FamilyDetails.java
package com.beit.aquint.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "family_details")
public class FamilyDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotBlank
    @Column(name = "father_name")
    private String fatherName;

    @NotBlank
    @Column(name = "mother_name")
    private String motherName;

    @Column(name = "spouse_name")
    private String spouseName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "familyDetails", orphanRemoval = true)
    private List<Sibling> siblings;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "familyDetails", orphanRemoval = true)
    private List<Child> children;

    public FamilyDetails(Long userId, String fatherName, String motherName, String spouseName, List<Sibling> siblings, List<Child> children) {
        this.userId = userId;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.spouseName = spouseName;
        this.siblings = siblings;
        this.children = children;
    }
}
