package com.ftn.sbnz.backward.model.models;


import lombok.Data;
import org.kie.api.definition.type.Position;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
@Entity
public class Watch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Position(0)
    @Column
    private String name;

    @Column
    private String brand;

    @Column
    private Double price;

    @Column
    private String movement;

    @Column
    private String display;

    @Column
    private String caseMaterial;

    @Column
    private String glassMaterial;

    @Column
    private String style;

    @Column
    private Long waterResistanceBar;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> features;

    @Column(length = 1000)
    private String imageUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Watch watch = (Watch) o;
        return Objects.equals(id, watch.id);
    }
}
