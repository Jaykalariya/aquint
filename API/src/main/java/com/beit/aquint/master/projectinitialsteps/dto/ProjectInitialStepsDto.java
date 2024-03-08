package com.beit.aquint.master.projectinitialsteps.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ProjectInitialStepsDto {

    private Long id;
    private Boolean status;

    public ProjectInitialStepsDto() {
    }

    public ProjectInitialStepsDto(Long id, Boolean status) {
        this.id = id;
        this.status = status;
    }
}
