package com.ftn.sbnz.backward.model.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class IconicWatchQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="point_boost")
    private Double pointBoost;

    @Column(name="positive_answer")
    private String positiveAnswer;

    @ManyToOne
    private Question question;

    @OneToMany
    private List<Watch> watches;
}
