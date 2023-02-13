INSERT INTO Questionnaire (QQID, Title) VALUES ('QQ1', 'Customer satisfaction survey');

INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q1', 'QQ1', 'Is Ionideios the best Model High School?', true, true);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q2', 'QQ1', 'Would you rather fight 100 duck sized horses or 1 (one) horse sized duck?', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q3', 'QQ1', 'Who do you think you are?', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q4', 'QQ1', 'What size do you think a regular size duck is?', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q5', 'QQ1', 'Because. Do you mind?', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q6', 'QQ1', 'Which of the following is your favourite artist?', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q7', 'QQ1', 'Asxoleiste me th mousikh?', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q8', 'QQ1', 'I love the smiths.', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q9', 'QQ1', 'Do you have a vinyl collection?', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q10', 'QQ1', 'I said I love the Smiths.', true, false);
INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q11', 'QQ1', 'Pistevete tha deite erwthmatologio pio endiaferon apo to diko mas?', true, false);

INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q1', 'Yes', 'Q2'), ('C2', 'QQ1', 'Q1', 'No', 'Q2');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q2', 'One horse sized duck', 'Q3'), ('C2', 'QQ1', 'Q2', '100 duck sized horses', 'Q4'), ('C3', 'QQ1', 'Q2', 'Why is this questionnaire in English?', 'Q5');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q3', 'Hercules', 'Q6'), ('C2', 'QQ1', 'Q3', 'Rocky Balboa', 'Q6'), ('C3', 'QQ1', 'Q3', '100 horse sized horses', 'Q6');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q4', 'M', 'Q6'), ('C2', 'QQ1', 'Q4', 'L', 'Q6'), ('C3', 'QQ1', 'Q4', '27', 'Q6'), ('C4', 'QQ1', 'Q4', 'XL', 'Q6');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q5', 'No', 'Q6'), ('C2', 'QQ1', 'Q5', 'No, sorry.', 'Q6');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q6', 'The Smiths', 'Q8'), ('C2', 'QQ1', 'Q6', 'Whitesnake', 'Q7'), ('C3', 'QQ1', 'Q6', 'Natassa Mpofiliou', 'Q7');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q7', 'Nai', 'Q9'), ('C2', 'QQ1', 'Q7', 'Oxi', 'Q11'), ('C3', 'QQ1', 'Q7', 'My, how informal.', 'Q11');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q8', 'what?', 'Q10'), ('C2', 'QQ1', 'Q8', 'ok', 'Q11');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q9', 'Yes', 'Q11'), ('C2', 'QQ1', 'Q9', "Yesn't", 'Q11');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q10', 'uhhh', 'Q11');
INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q11', 'oxi jerw apo twra oti auto htan to zenith ths empeirias mou twn epomenwn triwn hmerwn', 'NULLQ');

INSERT INTO Keyword (QQID, Keyword) VALUES ('QQ1', 'customer satisfaction'), ('QQ1', 'product quality');

INSERT INTO Participant (SessionID, QQID) VALUES ('S1', 'QQ1');

INSERT INTO Answer (QQID, QID, SessionID, ChoiceID) VALUES ('QQ1', 'Q1', 'S1', 'C1');