INSERT INTO Questionnaire (QQID, Title) VALUES ('QQ1', 'Customer satisfaction survey');

INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('Q1', 'QQ1', 'On a scale of 1-5, how yummy and exciting is our burrito place?', true, false);

INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('C1', 'QQ1', 'Q1', '1', 'NULLQ'), ('C2', 'QQ1', 'Q1', '2', 'NULLQ'), ('C3', 'QQ1', 'Q1', '3', 'NULLQ'), ('C4', 'QQ1', 'Q1', '4', 'NULLQ'), ('C5', 'QQ1', 'Q1', '5', 'NULLQ');

INSERT INTO Keyword (QQID, Keyword) VALUES ('QQ1', 'customer satisfaction'), ('QQ1', 'product quality');

INSERT INTO Participant (SessionID, QQID) VALUES ('S1', 'QQ1');

INSERT INTO Answer (QQID, QID, SessionID, ChoiceID) VALUES ('QQ1', 'Q1', 'S1', 'C4');