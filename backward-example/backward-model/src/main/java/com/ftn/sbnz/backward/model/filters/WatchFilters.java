package com.ftn.sbnz.backward.model.filters;

import com.ftn.sbnz.backward.model.models.Watch;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class WatchFilters {
   public static Specification<Watch> priceLessThan(Double price) {
       return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("price"), price);
   }

   public static Specification<Watch> brandIsOneOf(List<String> brands) {
       return ((root, query, criteriaBuilder) -> root.get("brand").in(brands));
   }
}
