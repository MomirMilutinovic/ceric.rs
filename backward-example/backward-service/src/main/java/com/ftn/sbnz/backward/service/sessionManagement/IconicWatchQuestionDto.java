package com.ftn.sbnz.backward.service.sessionManagement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IconicWatchQuestionDto {
    private Long questionId;
    private Long watchId;
    private String positiveAnswer;
    private Double pointBoost;
}
