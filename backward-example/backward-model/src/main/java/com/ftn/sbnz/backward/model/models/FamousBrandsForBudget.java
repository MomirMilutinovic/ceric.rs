package com.ftn.sbnz.backward.model.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class FamousBrandsForBudget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double lower;
    private Double upper;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> brands;

    public String getBrandsList() {
        StringBuilder sb = new StringBuilder();
        for (String brand : brands) {
            sb.append("\"").append(brand).append("\"").append(",");
        }
        return sb.substring(0, sb.toString().length() - 1);
    }
}
