package com.ftn.sbnz.backward.service.questionnaire.dto;

import com.ftn.sbnz.backward.model.models.Watch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TrendingWatchesDto {
    private List<Watch> trendingWatches;
}
