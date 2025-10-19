-- V1__insert_questions.sql
-- Migration script to insert initial questions and allowed answers
-- for the Watch Recommendation System

--------------------------
-- Insert Questions
--------------------------
INSERT INTO question (id, priority, question, answer_type) VALUES
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
                                                                        (13, 'Hybrid'),
                                                                        (13, 'No preference');

-- Q14: Motorsport enthusiast
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (14, 'Yes'),
                                                                        (14, 'No');

-- Q15: Space exploration
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (15, 'Yes'),
                                                                        (15, 'No');

-- Insert Watches (main table)
INSERT INTO watch (name, brand, price, movement, display, case_material, style, glass_material, water_resistance_bar) VALUES
    ('Submariner Date', 'Rolex', 10500.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Sapphire Crystal', 30),
    ('Daytona', 'Rolex', 15000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Racing', 'Sapphire Crystal', 10),
    ('Sky-Dweller', 'Rolex', 45000.00, 'Automatic', 'Analog', 'White Gold', 'Luxury', 'Sapphire Crystal', 10),
    ('Royal Oak', 'Audemars Piguet', 55000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Luxury Sports', 'Sapphire Crystal', 5),
    ('Royal Oak Offshore', 'Audemars Piguet', 35000.00, 'Automatic', 'Chronograph', 'Titanium', 'Sports', 'Sapphire Crystal', 10),
    ('Millenary', 'Audemars Piguet', 32000.00, 'Manual', 'Analog', 'Rose Gold', 'Dress', 'Sapphire Crystal', 3),
    ('Nautilus', 'Patek Philippe', 120000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Luxury Sports', 'Sapphire Crystal', 12),
    ('Aquanaut', 'Patek Philippe', 35000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Sports', 'Sapphire Crystal', 12),
    ('Calatrava', 'Patek Philippe', 28000.00, 'Manual', 'Analog', 'Rose Gold', 'Dress', 'Sapphire Crystal', 3),
    ('Seamaster Diver 300M', 'Omega', 5200.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Sapphire Crystal', 30),
    ('Portugieser Chronograph', 'IWC', 8900.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Sapphire Crystal', 3),
    ('Pilot’s Watch Mark XX', 'IWC', 4900.00, 'Automatic', 'Analog', 'Stainless Steel', 'Pilot', 'Sapphire Crystal', 10),
    ('Carrera Chronograph', 'TAG Heuer', 4800.00, 'Automatic', 'Analog', 'Stainless Steel', 'Racing', 'Sapphire Crystal', 10),
    ('Aquaracer', 'TAG Heuer', 3200.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Sapphire Crystal', 30),
    ('Presage Cocktail Time', 'Seiko', 800.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Hardlex Crystal', 5),
    ('Prospex Diver', 'Seiko', 650.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Hardlex Crystal', 20),
    ('Marinemaster 1000M', 'Seiko', 3200.00, 'Automatic', 'Analog', 'Titanium', 'Diver', 'Sapphire Crystal', 100),
    ('Black Bay 58', 'Tudor', 4100.00, 'Automatic', 'Analog', 'Bronze', 'Diver', 'Domed Sapphire Crystal', 20),
    ('GMT-Master II Pepsi', 'Rolex', 18000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Travel', 'Sapphire Crystal', 10),
    ('Seiko 5 Sports SRPD', 'Seiko', 275.00, 'Automatic', 'Analog', 'Stainless Steel', 'Casual', 'Hardlex Crystal', 10),
    ('CITIZEN Eco-Drive Promaster', 'Citizen', 325.00, 'Solar Quartz', 'Analog', 'Stainless Steel', 'Diver', 'Mineral Crystal', 20),
    ('Hamilton Khaki Field Auto', 'Hamilton', 795.00, 'Automatic', 'Analog', 'Stainless Steel', 'Field', 'Sapphire Crystal', 10),
    ('Tissot PRX Powermatic 80', 'Tissot', 675.00, 'Automatic', 'Analog', 'Stainless Steel', 'Integrated Bracelet', 'Sapphire Crystal', 10),
    ('Orient Bambino 4th Gen', 'Orient', 225.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Domed Mineral Crystal', 3),
    ('Timex Marlin Automatic', 'Timex', 199.00, 'Automatic', 'Analog', 'Stainless Steel', 'Retro', 'Acrylic Crystal', 3),
    ('Casio G-Shock DW5600E', 'Casio', 50.00, 'Quartz', 'Digital', 'Resin', 'Rugged', 'Mineral Glass', 20),
    ('Baltic Aquascaphe', 'Baltic', 750.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Double-Domed Sapphire Crystal', 20),
    ('Lorier Falcon', 'Lorier', 695.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Domed Acrylic Crystal', 10),
    ('Seiko Alpinist SPB121', 'Seiko', 750.00, 'Automatic', 'Analog', 'Stainless Steel', 'Field', 'Sapphire Crystal', 20),
    ('Junghans Max Bill', 'Junghans', 895.00, 'Automatic', 'Analog', 'Stainless Steel', 'Bauhaus', 'Plexiglass', 3),
    ('Bulova Marine Star', 'Bulova', 350.00, 'Quartz', 'Analog', 'Stainless Steel', 'Diver', 'Mineral Crystal', 10),
    ('MVMT Minimalist', 'MVMT', 95.00, 'Quartz', 'Analog', 'Stainless Steel', 'Fashion', 'Mineral Crystal', 3),
    ('Sinn 556 I', 'Sinn', 990.00, 'Automatic', 'Analog', 'Stainless Steel', 'Pilot/Dress', 'Sapphire Crystal', 20),
    ('Speedmaster Moonwatch', 'Omega', 6301.00, 'Manual', 'Analog', 'Stainless Steel', 'Pilot', 'Hesalite Crystal', 5),
    ('G-Shock GBD-200', 'Casio', 160.00, 'Quartz', 'Digital', 'Resin', 'Rugged', 'Mineral Crystal', 20),
    ('Seiko 5 Sports GMT', 'Seiko', 500.00, 'Automatic', 'Analog', 'Stainless Steel', 'Casual', 'Hardlex Crystal', 10),
    ('Seiko Prospex Speedtimer', 'Seiko', 650.00, 'Solar Quartz', 'Analog', 'Stainless Steel', 'Racing', 'Sapphire Crystal', 10);




-- Insert Features (assuming table: watch_features with columns: watch_id, features)

INSERT INTO watch_features (watch_id, features) VALUES
-- Rolex Submariner Date (1)
(1, 'Water Resistant'),
(1, 'Date Display'),
(1, 'Rotatable Bezel'),

-- Rolex Daytona (2)
(2, 'Chronograph'),
(2, 'Tachymeter Bezel'),
(2, 'Screw-down Crown'),

-- Rolex Sky-Dweller (3)
(3, 'Annual Calendar'),
(3, 'Dual Time Zone'),
(3, 'Ring Command Bezel'),
(3, 'Date Display'),
(3, 'Sapphire Crystal'),

-- Royal Oak (4)
(4, 'Integrated Bracelet'),
(4, 'Tapisserie Dial'),
(4, 'Water Resistant'),
(4, 'Sapphire Crystal'),

-- Royal Oak Offshore (5)
(5, 'Chronograph'),
(5, 'Tapisserie Dial'),
(5, 'Water Resistant'),
(5, 'Screw-down Crown'),
(5, 'Rubber Strap Option'),

-- Millenary (6)
(6, 'Open Heart Dial'),
(6, 'Manual Winding'),
(6, 'Off-center Dial'),
(6, 'Exhibition Caseback'),

-- Nautilus (7)
(7, 'Integrated Bracelet'),
(7, 'Horizontally Embossed Dial'),
(7, 'Date Display'),
(7, 'Water Resistant'),
(7, 'Sapphire Crystal'),

-- Aquanaut (8)
(8, 'Integrated Rubber Strap'),
(8, 'Travel Time Function (on some models)'),
(8, 'Water Resistant'),
(8, 'Luminous Hands'),

-- Calatrava (9)
(9, 'Minimalist Dial'),
(9, 'Manual Winding'),
(9, 'Exhibition Caseback'),
(9, 'Dauphine Hands'),

-- Seamaster Diver 300M (10)
(10, 'Helium Escape Valve'),
(10, 'Wave Dial'),
(10, 'Date Display'),
(10, 'Water Resistant 300m'),
(10, 'Screw-down Crown'),

-- Portugieser Chronograph (11)
(11, 'Chronograph'),
(11, 'Tachymeter Bezel'),
(11, 'Date Display'),
(11, 'Exhibition Caseback'),

-- Pilot’s Watch Mark XX (12)
(12, 'Soft Iron Inner Case (Anti-magnetic)'),
(12, 'Luminous Hands & Markers'),
(12, 'Screw-down Crown'),
(12, 'Water Resistant'),

-- Carrera Chronograph (13)
(13, 'Chronograph'),
(13, 'Tachymeter Bezel'),
(13, 'Date Display'),
(13, 'Sapphire Crystal'),

-- Aquaracer (14)
(14, 'Unidirectional Rotating Bezel'),
(14, 'Screw-down Crown'),
(14, 'Water Resistant 300m'),
(14, 'Luminous Markers'),

-- Presage Cocktail Time (15)
(15, 'Exhibition Caseback'),
(15, 'Cocktail-inspired Dial'),
(15, 'Date Display'),
(15, 'See-through Caseback'),

-- Prospex Diver (16)
(16, 'Water Resistant 200m'),
(16, 'Luminous Hands'),
(16, 'Unidirectional Bezel'),
(16, 'Screw-down Crown'),

-- Marinemaster 1000M (17)
(17, 'Helium Escape Valve'),
(17, 'Water Resistant 1000m'),
(17, 'High-intensity Titanium'),
(17, 'Luminous Markers'),

-- Black Bay 58 (18)
(18, 'Water Resistant 200m'),
(18, 'Domed Crystal'),
(18, 'Bronze Case Patina'),
(18, 'Heritage Design'),

-- GMT-Master II Pepsi (19)
(19, 'GMT Function'),
(19, '24-hour Rotatable Bezel'),
(19, 'Date Display'),
(19, 'Screw-down Crown'),

-- Seiko 5 Sports SRPD (20)
(20, 'Day-Date Display'),
(20, 'Exhibition Caseback'),
(20, 'Water Resistant 100m'),
(20, 'Luminous Hands'),

-- CITIZEN Eco-Drive Promaster (21)
(21, 'Solar Powered'),
(21, 'Water Resistant 200m'),
(21, 'Rotating Bezel'),
(21, 'Luminous Markers'),

-- Hamilton Khaki Field Auto (22)
(22, 'Military-inspired Design'),
(22, 'Luminous Hands & Markers'),
(22, 'Exhibition Caseback'),
(22, 'Water Resistant 100m'),

-- Tissot PRX Powermatic 80 (23)
(23, 'Integrated Bracelet'),
(23, '80-hour Power Reserve'),
(23, 'Date Display'),
(23, 'Exhibition Caseback'),

-- Orient Bambino 4th Gen (24)
(24, 'Exhibition Caseback'),
(24, 'Domed Crystal'),
(24, 'Date Display'),
(24, 'Classic Dress Design'),

-- Timex Marlin Automatic (25)
(25, 'Exhibition Caseback'),
(25, 'Domed Crystal'),
(25, 'Retro Design'),
(25, 'Date Display'),

-- Casio G-Shock DW5600E (26)
(26, 'Shock Resistant'),
(26, 'Water Resistant 200m'),
(26, 'Stopwatch'),
(26, 'Countdown Timer'),
(26, 'LED Backlight'),

-- Baltic Aquascaphe (27)
(27, 'Water Resistant 200m'),
(27, 'Dome Crystal'),
(27, 'Luminous Markers'),
(27, 'Vintage-inspired Design'),

-- Lorier Falcon (28)
(28, 'Exhibition Caseback'),
(28, 'Minimalist Dial'),
(28, 'Date Display'),
(28, 'Dress Watch Design'),

-- Seiko Alpinist SPB121 (29)
(29, 'Compass Bezel'),
(29, 'Luminous Hands'),
(29, 'Sapphire Crystal'),
(29, 'Mountain-inspired Design'),

-- Junghans Max Bill (30)
(30, 'Minimalist Bauhaus Design'),
(30, 'Domed Crystal'),
(30, 'Date Display (on some models)'),
(30, 'Exhibition Caseback'),

-- Bulova Marine Star (31)
(31, 'Chronograph'),
(31, 'Water Resistant 200m'),
(31, 'Tachymeter Scale'),
(31, 'Date Display'),

-- MVMT Minimalist (32)
(32, 'Minimalist Design'),
(32, 'Quartz Movement'),
(32, 'Date Window'),
(32, 'Fashion-focused'),

-- Sinn 556 I (33)
(33, 'Anti-magnetic'),
(33, 'Water Resistant 100m'),
(33, 'Sapphire Crystal'),
(33, 'Pilot Watch Design'),

-- Speedmaster Moonwatch (34) — You added this after 33, so watch_id = 34
(34, 'Chronograph'),
(34, 'Tachymeter Bezel'),
(34, 'Manual Winding'),
(34, 'Moon Mission Heritage'),
(34, 'Hesalite Crystal'),

-- Casio G-Shock GBD-200 (35)
(35, 'Shock Resistant'),
(35, 'Water Resistant 200m'),
(35, 'Stopwatch'),
(35, 'Countdown Timer'),
(35, 'World Time'),
(35, 'Lap Memory'),
(35, 'Bluetooth'),
(35, 'LED Backlight'),

-- Seiko 5 Sports GMT (36)
(36, 'GMT Function'),
(36, 'Date Display');

-- Insert Iconic Watch Questions
INSERT INTO iconic_watch_question (id, question_id, positive_answer, point_boost) VALUES
                                                    (1, 15, 'Yes', 100);

INSERT INTO iconic_watch_question_watches(iconic_watch_question_id, watches_id) VALUES
                                                    (1, 34);

-- Famous brands
INSERT INTO  famous_brands_for_budget(lower, upper) VALUES
 (0, 500),
 (500, 2000),
 (2000, 10000),
 (10000, 10000000);

INSERT INTO famous_brands_for_budget_brands(famous_brands_for_budget_id, brands) VALUES
 (1, 'Casio'),
 (1, 'Seiko'),
 (1, 'Swatch'),
 (2, 'Seiko'),
 (2, 'Citizen'),
 (2, 'Hamilton'),
 (2, 'Oris'),
 (2, 'Tissot'),
 (3, 'Longines'),
 (3, 'Tudor'),
 (3, 'Omega'),
 (3, 'Breitling'),
 (3, 'Tag Heuer'),
 (3, 'Cartier'),
 (3, 'Rolex'),
 (4, 'Rolex'),
 (4, 'Audemars Piguet'),
 (4, 'Patek Philippe');
