package com.ftn.sbnz.backward.model.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class RecommendationEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Date timestamp;

    @OneToMany
    private List<Recommendation> recommendations;

    @ManyToOne
    private User user;
}
