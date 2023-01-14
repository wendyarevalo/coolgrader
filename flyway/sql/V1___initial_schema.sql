/* Create your schema here */
DROP TABLE IF EXISTS exercises;
CREATE TABLE exercises ("id" SERIAL PRIMARY KEY,"title" varchar NOT NULL, "description" varchar NOT NULL);

DROP TABLE IF EXISTS exercises_by_user;
CREATE TABLE exercises_by_user ("id" SERIAL PRIMARY KEY, "user_id" numeric NOT NULL, "exercise_id" numeric NOT NULL, "grade" varchar NOT NULL, "code" text);

DROP TABLE IF EXISTS users;
CREATE TABLE users("id" SERIAL PRIMARY KEY, "uuid" varchar NOT NULL);

INSERT INTO exercises (title,description) VALUES ('Sum of three values','Write a function int <code>sum(int first, int second, int third)</code> that returns the sum of the given integers. As an example, the function call <code>sum(1, 2, 3)</code> should return the value <code>6</code>.');
INSERT INTO exercises (title,description) VALUES ('Sum with formula','Write a function <code>String sumWithFormula(int first, int second)</code> that returns the written out sum of the given integers and the sum. As an example, the function call <code>sumWithFormula(1, 2)</code> should return the string <code>1+2=3</code> and the function call <code>sumWithFormula(1, 1)</code> should return the string <code>1+1=2</code>. Note! Do not add spaces to the returned string.');
INSERT INTO exercises (title,description) VALUES ('Budget check','Write a function <code>String budgetCheck(double budget, double currentSpending)</code> that returns information on whether a given budget is in order in light of given spending. If the value of <code>currentSpending</code> is larger than the value of budget, the function should return <code>"Budget: Overspending"</code>. Otherwise, the function should return <code>"Budget: OK"</code>.');
INSERT INTO exercises (title,description) VALUES ('Mystery function','Write a function <code>String mystery(int number)</code> that returns a string based on the number. If the number is divisible by <code>5</code>, the function should return the string <code>"mys"</code>. If the number is divisible by <code>7</code>, the function should return the string <code>"tery"</code>. If the number is divisible by both <code>5</code> and <code>7</code>, the function should return the string <code>"mystery"</code>. Otherwise, the function should return a string representation of the given number, e.g. if the number is <code>1</code>, the function should return <code>"1"</code>.');
INSERT INTO exercises (title,description) VALUES ('Sum of negative numbers','Write a function <code>sumOfNegatives(List&ltint&gt numbers)</code> that returns the sum of the negative numbers in the given list. For example, if the numbers list would contain the numbers <code>-1, 2, -4</code>, the function should return the value <code>-5</code>.');
INSERT INTO exercises (title,description) VALUES ('Average of positives','Write a function <code>double averageOfPositives(List&ltint&gt numbers)</code> that returns the average value of the positive numbers on the list. If there are no positive values, the function should return the value <code>-1</code>.');
INSERT INTO exercises (title,description) VALUES ('Team','Create a <code>class Team</code> and implement the two following constructors (and necessary properties) to the class. The <code>default constructor</code> should have three properties: (1) the name of the team <code>(String)</code>, (2) the home town of the team <code>(String)</code>, and (3) the year the team was formed <code>(int)</code>. The named constructor <code>nameAndYear</code> should have two properties: (1) the name of the team <code>(String)</code> and (2) the year the team was formed <code>(int)</code>. In the case of the named constructor, the home town of the team must be <code>"Unknown"</code>. <br><br>Once completed, add a <code>toString</code> method to the class which leads to outputs outlined by the following examples.<br><p class="block-code">final hjk = Team("HJK", "Helsinki", 1907);<br>print(hjk);<br>final secret = Team.nameAndYear("Secret", 1984);<br>print(secret);</p>With the code above, the output should be as follows.<p class="block-code">HJK (Helsinki, 1907)<br>Secret (Unknown, 1984)</p>');
INSERT INTO exercises (title,description) VALUES ('Video and playlist','Implement the classes <code>Video</code> and <code>Playlist</code> as follows. The class <code>Video</code> should have a name <code>(String)</code>, a duration in seconds <code>(int)</code>, a constructor with named arguments, and a <code>toString</code> method. The default name should be <code>"Unknown"</code> and the default length should be <code>0</code>. The class should work as follows.<p class="block-code">print(Video(name: "One second clip", duration: 1));<br>print(Video(name: "Hello again!", duration: 84));</p>With the code above, the output should be as follows.<p class="block-code">One second clip (1 second)<br>Hello again! (84 seconds)</p>The class <code>Playlist</code> should contain a list of videos, provide a default (no argument) constructor, and offer the following methods: (1) <code>void add(Video video)</code> that adds a video to the playlist, (2) <code>bool has(String name)</code> that returns true if the list of videos contains a video with the given name, and (3) <code>int duration()</code> that returns the sum of durations of the videos in the playlist. The class should work as follows.<p class="block-code">final playlist = Playlist();<br>print(playlist.has("One second clip"));<br>print(playlist.duration());<br>playlist.add(Video(name: "One second clip", duration: 1));<br>playlist.add(Video(name: "Hello again!", duration: 84));<br>print(playlist.has("One second clip"));<br>print(playlist.duration());</p>With the code above, the output should be as follows.<p class="block-code">false<br>0<br>true<br>85</p>');

INSERT INTO users (uuid) VALUES ('2cfa1e93-87e3-4f74-a8eb-b6e21431f8c7');