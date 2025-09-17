-- V1__insert_questions.sql
-- Migration script to insert initial questions and allowed answers
-- for the Watch Recommendation System

--------------------------
-- Insert Questions
--------------------------
INSERT INTO question (id, priority, question, answertype) VALUES
                                                              (1, 100, 'What is your budget?', 'number'),
                                                              (2, 90, 'Do you buy your watch exclusively as an investment, or do you plan to wear it at least occasionally?', 'string'),
                                                              (3, 85, 'Is a watch a status symbol for you?', 'boolean'),
                                                              (4, 80, 'On which occasions would you wear the watch?', 'string'),
                                                              (5, 75, 'Is it acceptable to you if you have to wind or adjust your watch every few days?', 'boolean'),
                                                              (6, 70, 'Would you swim while wearing the watch?', 'boolean'),
                                                              (7, 65, 'Do you practice running?', 'boolean'),
                                                              (8, 60, 'Would you dive while wearing the watch?', 'boolean'),
                                                              (9, 55, 'Do you see a wristwatch as a tool or as a piece of craftsmanship?', 'string'),
                                                              (10, 50, 'Does your watch need to be scratch resistant?', 'boolean'),
                                                              (11, 45, 'Does your watch need to be from a well-known brand?', 'boolean'),
                                                              (12, 40, 'Do you often travel abroad?', 'boolean'),
                                                              (13, 35, 'Do you prefer analog, digital, or hybrid display watches?', 'string'),
                                                              (14, 20, 'Are you a motorsport enthusiast?', 'boolean'),
                                                              (15, 15, 'Are you fascinated by space exploration?', 'boolean');

--------------------------
-- Insert Allowed Answers
--------------------------

-- Q2: Investment or wearing
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (2, 'Investment only'),
                                                                        (2, 'I plan to wear it');

-- Q3: Status symbol
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (3, 'Yes'),
                                                                        (3, 'No');

-- Q4: Occasions
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (4, 'Everyday occasions'),
                                                                        (4, 'During physical activities'),
                                                                        (4, 'For formal occasions');

-- Q5: Winding/adjusting
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (5, 'Yes'),
                                                                        (5, 'No');

-- Q6: Swim
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (6, 'Yes'),
                                                                        (6, 'No');

-- Q7: Running
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (7, 'Yes'),
                                                                        (7, 'No');

-- Q8: Diving
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (8, 'Yes'),
                                                                        (8, 'No');

-- Q9: Tool or craftsmanship
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (9, 'Tool'),
                                                                        (9, 'Craftsmanship');

-- Q10: Scratch resistance
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (10, 'Yes'),
                                                                        (10, 'No');

-- Q11: Well-known brand
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (11, 'Yes'),
                                                                        (11, 'No');

-- Q12: Travel abroad
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (12, 'Yes'),
                                                                        (12, 'No');

-- Q13: Display preference
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (13, 'Analog'),
                                                                        (13, 'Digital'),
                                                                        (13, 'Hybrid');

-- Q14: Motorsport enthusiast
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (14, 'Yes'),
                                                                        (14, 'No');

-- Q15: Space exploration
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (15, 'Yes'),
                                                                        (15, 'No');
