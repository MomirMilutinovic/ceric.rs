package com.ftn.sbnz.backward.model.filters;

import com.ftn.sbnz.backward.model.models.Watch;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class EqualsFilter implements Filter {
    private String property;
    private Object value;

    @Override
    public boolean evaluate(Watch watch) {
        switch (property) {
            case "brand":
                return watch.getBrand().equals(value);
            case "style":
                return watch.getStyle().equals(value);
            case "caseMaterial":
                return watch.getCaseMaterial().equals(value);
            case "movement":
                return watch.getMovement().equals(value);
        }
        return false;
    }
}
