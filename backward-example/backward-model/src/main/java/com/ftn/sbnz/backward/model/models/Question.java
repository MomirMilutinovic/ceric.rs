package com.ftn.sbnz.backward.model.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long priority;

    @Column
    private String question;

    @Column(name = "answer_type")
    private String answerType;

    @ElementCollection
    private List<String> allowedAnswers;

    @Transient
    private Optional<String> answer = Optional.empty();

    public boolean isAnswered() {
        return answer.isPresent();
    }

    public boolean isAnswerValid(String answer) {
        return this.allowedAnswers.stream().anyMatch(allowedAnswer -> allowedAnswer.equals(answer));
    }

    public void setAnswer(String answer) {
        if (!this.isAnswerValid(answer)) {
            throw new IllegalArgumentException("Answer is not valid");
        }
        this.answer = Optional.of(answer);
    }
}
