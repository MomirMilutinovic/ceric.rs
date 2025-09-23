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
                                                                        (13, 'Hybrid');

-- Q14: Motorsport enthusiast
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (14, 'Yes'),
                                                                        (14, 'No');

-- Q15: Space exploration
INSERT INTO question_allowed_answers (question_id, allowed_answers) VALUES
                                                                        (15, 'Yes'),
                                                                        (15, 'No');

-- Insert Watches (main table)
INSERT INTO watch (name, brand, price, movement, display, case_material, style) VALUES
                                                                                    ('Submariner Date', 'Rolex', 10500.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver'),
                                                                                    ('Daytona', 'Rolex', 15000.00, 'Automatic', 'Chronograph', 'Stainless Steel', 'Racing'),
                                                                                    ('Sky-Dweller', 'Rolex', 45000.00, 'Automatic', 'Analog + Dual Time', 'White Gold', 'Luxury'),
                                                                                    ('Royal Oak', 'Audemars Piguet', 55000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Luxury Sports'),
                                                                                    ('Royal Oak Offshore', 'Audemars Piguet', 35000.00, 'Automatic', 'Chronograph', 'Titanium', 'Sports'),
                                                                                    ('Millenary', 'Audemars Piguet', 32000.00, 'Manual', 'Open Heart', 'Rose Gold', 'Dress'),
                                                                                    ('Nautilus', 'Patek Philippe', 120000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Luxury Sports'),
                                                                                    ('Aquanaut', 'Patek Philippe', 35000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Sports'),
                                                                                    ('Calatrava', 'Patek Philippe', 28000.00, 'Manual', 'Analog', 'Rose Gold', 'Dress'),
                                                                                    ('Speedmaster Moonwatch', 'Omega', 6300.00, 'Manual', 'Chronograph', 'Stainless Steel', 'Pilot'),
                                                                                    ('Seamaster Diver 300M', 'Omega', 5200.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver'),
                                                                                    ('Portugieser Chronograph', 'IWC', 8900.00, 'Automatic', 'Chronograph', 'Stainless Steel', 'Dress'),
                                                                                    ('Pilot’s Watch Mark XX', 'IWC', 4900.00, 'Automatic', 'Analog', 'Stainless Steel', 'Pilot'),
                                                                                    ('Carrera Chronograph', 'TAG Heuer', 4800.00, 'Automatic', 'Chronograph', 'Stainless Steel', 'Racing'),
                                                                                    ('Aquaracer', 'TAG Heuer', 3200.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver'),
                                                                                    ('Presage Cocktail Time', 'Seiko', 800.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress'),
                                                                                    ('Prospex Diver', 'Seiko', 650.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver'),
                                                                                    ('Marinemaster 1000M', 'Seiko', 3200.00, 'Automatic', 'Analog', 'Titanium', 'Diver'),
                                                                                    ('Black Bay 58', 'Tudor', 4100.00, 'Automatic', 'Analog', 'Bronze', 'Diver'),
                                                                                    ('GMT-Master II Pepsi', 'Rolex', 18000.00, 'Automatic', 'GMT', 'Stainless Steel', 'Travel'),
                                                                                    ('Seiko 5 Sports SRPD', 'Seiko', 275.00, 'Automatic', 'Analog', 'Stainless Steel', 'Casual'),
                                                                                    ('CITIZEN Eco-Drive Promaster', 'Citizen', 325.00, 'Solar Quartz', 'Analog', 'Stainless Steel', 'Diver'),
                                                                                    ('Hamilton Khaki Field Auto', 'Hamilton', 795.00, 'Automatic', 'Analog', 'Stainless Steel', 'Field'),
                                                                                    ('Tissot PRX Powermatic 80', 'Tissot', 675.00, 'Automatic', 'Analog', 'Stainless Steel', 'Integrated Bracelet'),
                                                                                    ('Orient Bambino 4th Gen', 'Orient', 225.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress'),
                                                                                    ('Timex Marlin Automatic', 'Timex', 199.00, 'Automatic', 'Analog', 'Stainless Steel', 'Retro'),
                                                                                    ('Casio G-Shock DW5600E', 'Casio', 50.00, 'Quartz', 'Digital', 'Resin', 'Sports'),
                                                                                    ('Baltic Aquascaphe', 'Baltic', 750.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver'),
                                                                                    ('Lorier Falcon', 'Lorier', 695.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress'),
                                                                                    ('Seiko Alpinist SPB121', 'Seiko', 750.00, 'Automatic', 'Analog', 'Stainless Steel', 'Field'),
                                                                                    ('Junghans Max Bill', 'Junghans', 895.00, 'Automatic', 'Minimalist Analog', 'Stainless Steel', 'Bauhaus'),
                                                                                    ('Bulova Marine Star', 'Bulova', 350.00, 'Quartz Chronograph', 'Chronograph', 'Stainless Steel', 'Diver'),
                                                                                    ('MVMT Minimalist', 'MVMT', 95.00, 'Quartz', 'Minimalist Analog', 'Stainless Steel', 'Fashion'),
                                                                                    ('Sinn 556 I', 'Sinn', 990.00, 'Automatic', 'Analog', 'Stainless Steel', 'Pilot/Dress');

-- Insert Features (assuming table: watch_features with columns: watch_id, features)

INSERT INTO watch_features (watch_id, features) VALUES
                                                    (1, 'Water Resistant'), (1, 'Date Display'), (1, 'Rotatable Bezel'),
                                                    (2, 'Chronograph'), (2, 'Tachymeter'), (2, 'Screw-down Crown'),
                                                    (3, 'Annual Calendar'), (3, 'Dual Time Zone'), (3, 'Ring Command Bezel'),
                                                    (4, 'Octagonal Bezel'), (4, 'Tapisserie Dial'), (4, 'Integrated Bracelet'),
                                                    (5, 'Chronograph'), (5, 'Screw-down Crown'), (5, 'Exhibition Caseback'),
                                                    (6, 'Open Heart'), (6, 'Manual Winding'), (6, 'Power Reserve Indicator'),
                                                    (7, 'Horizontally Embossed Dial'), (7, 'Integrated Bracelet'), (7, 'Date Window'),
                                                    (8, 'Luminous Hands'), (8, 'Composite Strap'), (8, 'Water Resistant'),
                                                    (9, 'Minimalist Dial'), (9, 'Leaf Hands'), (9, 'Manual Winding'),
                                                    (10, 'Moonphase Display'), (10, 'Tachymeter'), (10, 'Hesalite Crystal'),
                                                    (11, 'Helium Escape Valve'), (11, 'Wave Dial'), (11, 'Date Window'),
                                                    (12, 'Chronograph'), (12, 'Date Window'), (12, 'Exhibition Caseback'),
                                                    (13, 'Arabic Numerals'), (13, 'Soft Iron Inner Case'), (13, 'Sapphire Crystal'),
                                                    (14, 'Chronograph'), (14, 'Tachymeter'), (14, 'Date Window'),
                                                    (15, 'Unidirectional Bezel'), (15, 'Screw-down Crown'), (15, 'Luminous Markers'),
                                                    (16, 'Cocktail-inspired Dial'), (16, 'See-through Caseback'), (16, 'Manual Winding'),
                                                    (17, 'Lumibrite Markers'), (17, 'Screw-down Crown'), (17, 'Day-Date Display'),
                                                    (18, 'Helium Escape Valve'), (18, 'High-Intensity Titanium'), (18, 'One-piece Case'),
                                                    (19, 'Domed Crystal'), (19, 'Snowflake Hands'), (19, 'Bronze Case'),
                                                    (20, 'GMT Function'), (20, 'Cerachrom Bezel'), (20, 'Jumping Hour Hand'),

-- 👇 Features for NEW Affordable Watches (IDs 21-34) 👇
                                                    (21, 'Day-Date Display'), (21, 'See-through Caseback'), (21, '50m Water Resistance'),
                                                    (22, 'Eco-Drive Solar'), (22, '200m Water Resistance'), (22, 'Uni-directional Bezel'),
                                                    (23, 'Field Watch Design'), (23, 'Lumed Hands & Markers'), (23, 'Hacking Seconds'),
                                                    (24, 'Integrated Bracelet'), (24, '80-Hour Power Reserve'), (24, 'Sapphire Crystal'),
                                                    (25, 'Domed Crystal'), (25, 'Exhibition Caseback'), (25, 'Hand-winding Capable'),
                                                    (26, 'Domed Acrylic Crystal'), (26, 'Minimalist Design'), (26, 'Weekday Display'),
                                                    (27, 'Shock Resistant'), (27, '200m Water Resistance'), (27, 'Electroluminescent Backlight'),
                                                    (28, 'Dive Bezel'), (28, 'Super-LumiNova'), (28, 'Sapphire Crystal'),
                                                    (29, 'Minimalist Dial'), (29, 'Applied Indices'), (29, '38mm Case'),
                                                    (30, 'Compass Bezel'), (30, 'Lumibrite Markers'), (30, 'Screw-down Crown'),
                                                    (31, 'Bauhaus Design'), (31, 'Domed Crystal'), (31, 'Made in Germany'),
                                                    (32, 'Tachymeter Bezel'), (32, 'Date Display'), (32, '100m Water Resistance'),
                                                    (33, 'Minimalist Case'), (33, 'Japanese Movement'), (33, 'Interchangeable Straps'),
                                                    (34, 'Anti-magnetic'), (34, 'Sapphire Crystal'), (34, 'Hardened Steel Case');