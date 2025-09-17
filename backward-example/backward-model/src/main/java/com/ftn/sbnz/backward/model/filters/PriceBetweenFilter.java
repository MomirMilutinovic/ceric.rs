package com.ftn.sbnz.backward.model.filters;

import com.ftn.sbnz.backward.model.models.Watch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PriceBetweenFilter implements Filter {
    private Double priceFrom;
    private Double priceTo;

    @Override
    public boolean evaluate(Watch watch) {
        return watch.getPrice() >= priceFrom && watch.getPrice() <= priceTo;
    }
}
