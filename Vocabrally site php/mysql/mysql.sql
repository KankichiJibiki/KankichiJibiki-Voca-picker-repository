CREATE TABLE vocaslist (
  id INT NOT NULL AUTO_INCREMENT,
  voca TEXT,
  mean TEXT,
  vorder INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE vocaorder (
  id INT NOT NULL AUTO_INCREMENT,
  vorder INT NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO vocaslist (voca,mean,vorder) VALUES ('take a crack at something','To attempt to do something','1');
INSERT INTO vocaslist (voca,mean,vorder) VALUES ('rant', 'to talk or complain in a loud excited and rather confused way because you feel strongly about something','1');
INSERT INTO vocaslist (voca,mean,vorder) VALUES ('grumpy', 'bad-tempered and easily annoyed','1');
INSERT INTO vocaslist (voca,mean,vorder) VALUES ('get s.t out of your system', 'Grow up out of something like you quit because you no longer want to do','1');
INSERT INTO vocaslist (voca,mean,vorder) VALUES ('date around', 'To date with many different people','1');
INSERT INTO vocaorder (vorder) VALUES ('1');

SELECT * FROM vocaslist;
SELECT * FROM vocaorder;