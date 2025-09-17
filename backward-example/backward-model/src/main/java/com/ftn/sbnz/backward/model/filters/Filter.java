package com.ftn.sbnz.backward.model.filters;

import com.ftn.sbnz.backward.model.models.Watch;

public interface Filter {
    boolean evaluate(Watch watch);
}
