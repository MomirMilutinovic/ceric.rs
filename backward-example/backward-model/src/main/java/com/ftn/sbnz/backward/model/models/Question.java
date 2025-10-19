package com.ftn.sbnz.backward.model.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> allowedAnswers;

    @Transient
    private Optional<String> answer = Optional.empty();

    @Transient
    private boolean processed = false;

    public boolean isNotAnswered() { return answer.isEmpty(); }

    public static boolean isNumeric(String str) {
        try {
            Double.parseDouble(str);
            return true;
        } catch(NumberFormatException e){
            return false;
        }
    }

    public boolean isAnswerValid(String answer) {
        if (this.answerType.equals("number")) {
            return isNumeric(answer);
        }
        return this.allowedAnswers.stream().anyMatch(allowedAnswer -> allowedAnswer.equals(answer));
    }

    public void setAnswer(String answer) {
        if (!this.isAnswerValid(answer)) {
            throw new IllegalArgumentException("Answer is not valid");
        }
        this.answer = Optional.of(answer);
    }
}
