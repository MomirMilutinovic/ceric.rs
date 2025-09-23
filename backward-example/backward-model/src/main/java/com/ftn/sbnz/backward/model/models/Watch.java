package com.ftn.sbnz.backward.model.models;


import lombok.Data;
import org.kie.api.definition.type.Position;

import javax.persistence.*;
import java.util.List;
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
    private String style;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> features;

}
