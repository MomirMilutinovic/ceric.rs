package com.ftn.sbnz.backward.model.models;

import lombok.AllArgsConstructor;
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

    private Double pointBoost;
    private String postiveAnswer;

    @ManyToOne
    private Question question;

    @OneToMany
    private List<Watch> watches;
}
