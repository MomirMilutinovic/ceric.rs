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
INSERT INTO watch (name, brand, price, movement, display, case_material, style, glass_material, water_resistance_bar, image_url) VALUES
    ('Submariner Date', 'Rolex', 10500.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Sapphire Crystal', 30, 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Rolex-Submariner.jpg'),
    ('Daytona', 'Rolex', 15000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Racing', 'Sapphire Crystal', 10, 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Daytona116509.jpg'),
    ('Sky-Dweller', 'Rolex', 45000.00, 'Automatic', 'Analog', 'White Gold', 'Luxury', 'Sapphire Crystal', 10 ,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcloud.pandatells.com%2Fiblocks%2F33012%2Fimg%2Fbase_obnovlennye-rolex-sky-dweller-cto-izmenilos-v-casah-rolex-dla-putesestvennikov.webp&f=1&nofb=1&ipt=b6238d8c3d634dfab7e856212652410fbc304523234c49ea20d3c64827fef851'),
    ('Royal Oak', 'Audemars Piguet', 55000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Luxury Sports', 'Sapphire Crystal', 5, 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fhauteliving.com%2Fwp-content%2Fuploads%2F2012%2F01%2FRoyal_Oak_39mm-1.jpg&f=1&nofb=1&ipt=4babac751f862f9125d3bcbcfec86f718e255339a902e14bb80e8f7f99595b11'),
    ('Royal Oak Offshore', 'Audemars Piguet', 35000.00, 'Automatic', 'Chronograph', 'Titanium', 'Sports', 'Sapphire Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2j6dbq0eux0bg.cloudfront.net%2Fimages%2F38270005%2F3244342080.jpg&f=1&nofb=1&ipt=c6e231460791a9e6b3baac4636c28beed3e5a3dbd96a0441f39fd64e1481ced3'),
    ('Millenary', 'Audemars Piguet', 32000.00, 'Manual', 'Analog', 'Rose Gold', 'Dress', 'Sapphire Crystal', 3, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffifthwrist.com%2Fwp-content%2Fuploads%2F2019%2F10%2F1DE7DE37-10D2-478F-8673-B7FCB255A783-0.jpeg&f=1&nofb=1&ipt=70ac8cbf1f914affcd69b32a2d7adc73a9b1f71012ffb8c37404d3e8f255831e'),
    ('Nautilus', 'Patek Philippe', 120000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Luxury Sports', 'Sapphire Crystal', 12, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffifthwrist.com%2Fwp-content%2Fuploads%2F2019%2F10%2F1DE7DE37-10D2-478F-8673-B7FCB255A783-0.jpeg&f=1&nofb=1&ipt=70ac8cbf1f914affcd69b32a2d7adc73a9b1f71012ffb8c37404d3e8f255831e'),
    ('Aquanaut', 'Patek Philippe', 35000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Sports', 'Sapphire Crystal', 12, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwatch-test.com%2Fwp-content%2Fuploads%2F2021%2F05%2FPatek-Philippe-Aquanaut-Chronograph-5968G-001-front.jpg&f=1&nofb=1&ipt=93c2ac6fbc43db9cc88fcea38c61eb02002d8e6a0940a299c3dda233a8c66923'),
    ('Calatrava', 'Patek Philippe', 28000.00, 'Manual', 'Analog', 'Rose Gold', 'Dress', 'Sapphire Crystal', 3, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ablogtowatch.com%2Fwp-content%2Fuploads%2F2013%2F05%2FPatek-Philippe-Calatrava-5227.jpg&f=1&nofb=1&ipt=78cb5398fb364572913ed78d8db882edd6765207958c33280f8323bbeee26d82'),
    ('Seamaster Diver 300M', 'Omega', 5200.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Sapphire Crystal', 30, 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fablogtowatch.com%2Fwp-content%2Fuploads%2F2018%2F03%2FOmega-Seamaster-Professional-Diver-300M-42mm-Watch-08.jpg&f=1&nofb=1&ipt=a957bbc1604d409db59c6f552fda960f6378c440744eacd9498855983035259e'),
    ('Portugieser Chronograph', 'IWC', 8900.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Sapphire Crystal', 3, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcontent.thewosgroup.com%2Fproductimage%2F17810490%2F17810490_3.jpg%3Fimpolicy%3Dzoom&f=1&nofb=1&ipt=8fe900c4f7250a39a205e1f90d90488c51458a1fd90889458526eb60e3c0f710'),
    ('Pilot’s Watch Mark XX', 'IWC', 4900.00, 'Automatic', 'Analog', 'Stainless Steel', 'Pilot', 'Sapphire Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iwc.com%2Fcontent%2Fdam%2Frcq%2Fiwc%2FP0%2FR8%2Fqt%2FrD%2FeU%2FmN%2Ff7%2FOO%2F8a%2Flq%2FHA%2FP0R8qtrDeUmNf7OO8alqHA.png.transform.global_image_480_2x.png&f=1&nofb=1&ipt=f7910951ddda102fdabbb107bade0351216572144f4a846b0c24ba0c729a0838'),
    ('Carrera Chronograph', 'TAG Heuer', 4800.00, 'Automatic', 'Analog', 'Stainless Steel', 'Racing', 'Sapphire Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0125%2F7792%2Fproducts%2FTAGHeuerWatchCarreraAutomaticChronographCBN2A1AA.FT62282copy.jpg%3Fv%3D1657113521&f=1&nofb=1&ipt=be04a7c364e090911408dfa866f9471fdc5d49ba0519c32edc8da4895f9b7b69'),
    ('Aquaracer', 'TAG Heuer', 3200.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Sapphire Crystal', 30, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tagheuer.com%2Fon%2Fdemandware.static%2F-%2FLibrary-Sites-TagHeuer-Shared%2Fdefault%2Fdw40e2dcef%2Fimages%2Fsprites%2FAquaracer%2FWBP5110.BA0013%2FRTW_backUp.jpg&f=1&nofb=1&ipt=68274badf65606e8affdb4ad548a34fa83cb73a367ec1c486274a1d2b4859b9d'),
    ('Presage Cocktail Time', 'Seiko', 800.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Hardlex Crystal', 5, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.chisholmhunter.co.uk%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Fb5c81c70cd606069e5a078dfd808a05e%2F2%2F-%2F2-039-04-0148-hero_1.jpg&f=1&nofb=1&ipt=88a1b4a26d2168b8216bf495cad28d216bd559e1fc88ec126e42356accaeac07'),
    ('Prospex Diver', 'Seiko', 650.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Hardlex Crystal', 20, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcontent.thewosgroup.com%2Fproductimage%2F18280033%2F18280033_1.jpg%3Fimpolicy%3Dzoom&f=1&nofb=1&ipt=a41cc3537dd80b96f6af7e55dc3d0d3abaad1a96f94990f35ee4ae9dfccf1fb6'),
    ('Marinemaster 1000M', 'Seiko', 3200.00, 'Automatic', 'Analog', 'Titanium', 'Diver', 'Sapphire Crystal', 100, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-gzAdjX40hNo%2FVVyTfdcz2hI%2FAAAAAAAAsl8%2FqkD5YmA9O8Q%2Fs1600%2FSEIKO%252BProspex%252BMARINEMASTER%252BProfessional%252B1000m%252BHi-Beat%252B36000%252BLIMITED%252BEDITION%252B02.jpg&f=1&nofb=1&ipt=533ad66ccbc750782a80031fa50a76c48f8fba97e8f8ea0b6068d4eb1989e2bf'),
    ('Black Bay 58', 'Tudor', 4100.00, 'Automatic', 'Analog', 'Bronze', 'Diver', 'Domed Sapphire Crystal', 20, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fidwx.co%2Fcdn%2Fshop%2Ffiles%2FTUDORBLACKBAYPROBLACK.jpg%3Fv%3D1686716010&f=1&nofb=1&ipt=8ddceb5d73b87737b63c096557555bde59eee269c6da0dc93253d51826a5a297'),
    ('GMT-Master II Pepsi', 'Rolex', 18000.00, 'Automatic', 'Analog', 'Stainless Steel', 'Travel', 'Sapphire Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmonochrome-watches.com%2Fwp-content%2Fuploads%2F2018%2F03%2FRolex-GMT-Master-II-Pepsi-126710-BLRO-Steel-Jubilee-Calibre-3285-Baselworld-2018-2.jpg&f=1&nofb=1&ipt=5d5439b202eff3437738875b3ea9b72982dc4a40c5ee006b194353e2f1c90ca3'),
    ('Seiko 5 Sports SRPD', 'Seiko', 275.00, 'Automatic', 'Analog', 'Stainless Steel', 'Casual', 'Hardlex Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcorvusbrasil.com%2Fwp-content%2Fuploads%2F2020%2F08%2FSeiko-5-Sports-SRPD57K1.jpg&f=1&nofb=1&ipt=d87b3c69c9e72bcd9aa76397d21d8fd38d37fe97f5a24121a52c79d087341637'),
    ('CITIZEN Eco-Drive Promaster', 'Citizen', 325.00, 'Solar Quartz', 'Analog', 'Stainless Steel', 'Diver', 'Mineral Crystal', 20, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jupiterjewelryinc.com%2Fwp-content%2Fuploads%2F2018%2F07%2F22855-bn0195-54e-Promaster-Diver.jpg&f=1&nofb=1&ipt=514ecf8f99830ca1d7a82bdf128c297b0908208c270b747c652c9493370235b2'),
    ('Hamilton Khaki Field Auto', 'Hamilton', 795.00, 'Automatic', 'Analog', 'Stainless Steel', 'Field', 'Sapphire Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmonochrome-watches.com%2Fwp-content%2Fuploads%2F2018%2F07%2FHamilton-Khaki-Field-Day-Date-42mm-%25E2%2580%259CCamouflage%25E2%2580%259D-Automatic-2.jpg&f=1&nofb=1&ipt=f9239f22aef7e7a9317dba2ff41e82c7ea30f74920f7d78f9076a0662cd91221'),
    ('Tissot PRX Powermatic 80', 'Tissot', 675.00, 'Automatic', 'Analog', 'Stainless Steel', 'Integrated Bracelet', 'Sapphire Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmonochrome-watches.com%2Fwp-content%2Fuploads%2F2022%2F04%2FTissot-PRX-Powermatic-80-Green-Dial-Automatic-T137.407.11.091.00-hands-on-1.jpg&f=1&nofb=1&ipt=57739180d1609e3f47b11832823eb4698e5971f49021ef9ba537b98e1c3d109a'),
    ('Orient Bambino 4th Gen', 'Orient', 225.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Domed Mineral Crystal', 3, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71M12PUwEGL._AC_UL1500_.jpg&f=1&nofb=1&ipt=bd4a93e83b327be8abd3c45fb1f4da35cfbd8382880f166aa026b254b135d20d'),
    ('Timex Marlin Automatic', 'Timex', 199.00, 'Automatic', 'Analog', 'Stainless Steel', 'Retro', 'Acrylic Crystal', 3, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.QJ8OKu44zDsNbJPJwOGwFwHaI4%3Fcb%3D12%26pid%3DApi&f=1&ipt=251f9fc1424d99b2c4f384e831464baba060b6094558a4c9e851354f6f4d4f65'),
    ('Casio G-Shock DW5600E', 'Casio', 50.00, 'Quartz', 'Digital', 'Resin', 'Rugged', 'Mineral Glass', 20, 'https://www.casio.com/content/dam/casio/product-info/locales/us/en/timepiece/product/watch/D/DW/DW5/DW-5600E-1V/assets/DW-5600UE-1.png.transform/main-visual-pc/image.png'),
    ('Baltic Aquascaphe', 'Baltic', 750.00, 'Automatic', 'Analog', 'Stainless Steel', 'Diver', 'Double-Domed Sapphire Crystal', 20, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fa.storyblok.com%2Ff%2F73554%2F1446x1446%2F136eeba1c1%2Faquascaphe-dual-crown-pvd-black.jpg%2Fm%2F3840x0%2Ffilters%3Aquality(%3D75)&f=1&nofb=1&ipt=1a84e04e259318adfd33a9f2b5116ba11b7eb3a9b49eed714af65c2d69b98631'),
    ('Lorier Falcon', 'Lorier', 695.00, 'Automatic', 'Analog', 'Stainless Steel', 'Dress', 'Domed Acrylic Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.watchcharts.com%2Flistings%2F6697a257-e903-4348-99e2-029cbd2850b1.jpg%3Fd%3D600x600&f=1&nofb=1&ipt=5a6940f564c22a0f0e8b695706d2bcec295ad0597e41ee6c98d39ae6db70329e'),
    ('Seiko Alpinist SPB121', 'Seiko', 750.00, 'Automatic', 'Analog', 'Stainless Steel', 'Field', 'Sapphire Crystal', 20, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seikoboutique.co.uk%2Fwp-content%2Fuploads%2F2021%2F03%2FSPB155J1.png&f=1&nofb=1&ipt=326a8f49e8298deaa430562afb336d04456a57d046494ecdda6371f536381b7b'),
    ('Junghans Max Bill', 'Junghans', 895.00, 'Automatic', 'Analog', 'Stainless Steel', 'Bauhaus', 'Plexiglass', 3, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0125%2F7792%2Fproducts%2FJGH-099-Junghans-Watch-Max-Bill-Chronoscope--027_4502.00.jpg%3Fv%3D1478868426&f=1&nofb=1&ipt=c0cfad2b037cba420077ea91a6049179f3e5c398bebadbc79624f810c3923522'),
    ('Bulova Marine Star', 'Bulova', 350.00, 'Quartz', 'Analog', 'Stainless Steel', 'Diver', 'Mineral Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.jomashop.com%2Fmedia%2Fcatalog%2Fproduct%2Fb%2Fu%2Fbulova-marine-star-chronograph-blue-dial-mens-watch-96b256.jpg&f=1&nofb=1&ipt=0d9fb4d7c00bac4647f43ab3ec92f9baa138407773ebd7cf8e5364ab7fc8b21f'),
    ('MVMT Minimalist', 'MVMT', 95.00, 'Quartz', 'Analog', 'Stainless Steel', 'Fashion', 'Mineral Crystal', 3, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flzd-img-global.slatic.net%2Fg%2Fp%2Fe8bf40c1566518541fd74dc45c6faba6.jpg_720x720q80.jpg&f=1&nofb=1&ipt=3bcbaef8221d01583d16619ed55c7a1e57d4e29e8971fcac85d817c8086bbdf3'),
    ('Sinn 556 I', 'Sinn', 990.00, 'Automatic', 'Analog', 'Stainless Steel', 'Pilot/Dress', 'Sapphire Crystal', 20, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.watchcharts.com%2Flistings%2Fcf52a184-6f54-4c39-ab73-0e29b088a167.jpg%3Fd%3D600x600&f=1&nofb=1&ipt=c7492a1dec6973e41e79f965d29235fe6e5cf27e14a4f7e871f41fe517dc4a76'),
    ('Speedmaster Moonwatch', 'Omega', 6301.00, 'Manual', 'Analog', 'Stainless Steel', 'Pilot', 'Hesalite Crystal', 5, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fb34959663f5a3997bd0d-2668915a1d3a077262c88fab6aa0aa02.ssl.cf3.rackcdn.com%2F17331157_1_640.jpg&f=1&nofb=1&ipt=99aff391195851f14916202a9f5c4907da033d6c15ae468c7854e5a1bf4d4a17'),
    ('G-Shock GBD-200', 'Casio', 160.00, 'Quartz', 'Digital', 'Resin', 'Rugged', 'Mineral Crystal', 20, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.casio.com%2Fcontent%2Fdam%2Fcasio%2Fproduct-info%2Flocales%2Fin%2Fen%2Ftimepiece%2Fproduct%2Fwatch%2FG%2FGB%2FGBD%2Fgbd-200-9%2Fassets%2FGBD-200-9.png.transform%2Fmain-visual-sp%2Fimage.png&f=1&nofb=1&ipt=be744e6fff6e3901965f764669ca659c264efc11ace288b099b6aa733ad94600'),
    ('Seiko 5 Sports GMT', 'Seiko', 500.00, 'Automatic', 'Analog', 'Stainless Steel', 'Casual', 'Hardlex Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fraserhart.co.uk%2Fdw%2Fimage%2Fv2%2FBFNQ_PRD%2Fon%2Fdemandware.static%2F-%2FSites-ang_master-catalog%2Fdefault%2Fdw613a25db%2Fhi-res%2Fssk001k1-seiko-5-sports-black-grape-gmt-425mm-black-dial-steel-bracelet-watch-18-01-2-5384-img1.jpg%3Fsw%3D1000%26sh%3D1000%26sm%3Dfit&f=1&nofb=1&ipt=53cb739dd91ac70be3c05b7899765b416af5143d241aed98ef60465a9834e32a'),
    ('Seiko Prospex Speedtimer', 'Seiko', 650.00, 'Solar Quartz', 'Analog', 'Stainless Steel', 'Racing', 'Sapphire Crystal', 10, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fraserhart.co.uk%2Fdw%2Fimage%2Fv2%2FBFNQ_PRD%2Fon%2Fdemandware.static%2F-%2FSites-ang_master-catalog%2Fdefault%2Fdw613a25db%2Fhi-res%2Fssk001k1-seiko-5-sports-black-grape-gmt-425mm-black-dial-steel-bracelet-watch-18-01-2-5384-img1.jpg%3Fsw%3D1000%26sh%3D1000%26sm%3Dfit&f=1&nofb=1&ipt=53cb739dd91ac70be3c05b7899765b416af5143d241aed98ef60465a9834e32a');




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
