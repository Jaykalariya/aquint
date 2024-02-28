package com.beit.aquint.user.entity;

import com.beit.aquint.common.config.audit.EntityAuditInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "training_details")
public class TrainingDetails extends EntityAuditInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long userId;

    @NotBlank
    @Column(name="training_name")
    private String trainingName;

    @NotBlank
    @Column(name="training_description")
    private String trainingDescription;

    @NotBlank
    @Column(name="training_url")
    private String trainingUrl;
}
