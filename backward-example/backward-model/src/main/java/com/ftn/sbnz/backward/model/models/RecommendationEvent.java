package com.ftn.sbnz.backward.model.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import org.kie.api.definition.type.Expires;
import org.kie.api.definition.type.Role;
import org.kie.api.definition.type.Timestamp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Role(Role.Type.EVENT)
@Expires("25h")
@Timestamp("timestamp")
public class RecommendationEvent implements Serializable {
   private static final long serialVersionUID = 1L;

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
