package com.ftn.sbnz.backward.model.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.kie.api.definition.type.Expires;
import org.kie.api.definition.type.Role;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Role(Role.Type.EVENT)
@Expires("30m")
public class TrendingWatchEvent implements Serializable {
    private static final long serialVersionUID = 1L;
    Watch watch;
    public TrendingWatchEvent(Watch watch) {
        this.watch = watch;
    }
}
