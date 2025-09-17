package com.ftn.sbnz.backward.model.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column
    public Double score;

    @ManyToOne
    public Watch watch;
}
