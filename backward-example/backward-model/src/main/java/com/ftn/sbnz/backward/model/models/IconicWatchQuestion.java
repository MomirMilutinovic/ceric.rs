package com.ftn.sbnz.backward.model.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
@SequenceGenerator(name="seq_iwq", initialValue=2, allocationSize=100)
public class IconicWatchQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_iwq")
    private Long id;

    @Column(name="point_boost")
    private Double pointBoost;

    @Column(name="positive_answer")
    private String positiveAnswer;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToMany
    private List<Watch> watches;

}
