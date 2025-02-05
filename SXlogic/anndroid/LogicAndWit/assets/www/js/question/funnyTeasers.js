<<<<<<< HEAD
(function (win) {

	"use strict";
	/*global window */

	win.sections = win.sections || {};

	win.sections.funnyTeasers = {
		name: 'Funny teasers',
		lang: 'en', // ru || en
		//вЂ™
		questions: [
			{
				title: 'Family',
				text: 'A father goes to prison and the mother will have to sell her hotel, but their young daughter is happy. How can these parents tolerate such ingratitude and what put them in this situation?',
				
				answer: 'The three of them are playing Monopoly'
			},
			{
				title: 'Vehicle',
				text: 'A man wants to buy a used car. He finds a beautiful Buick for $9500, but he buys it without paying a dime. How did he manage this?',
				
				answer: 'If he is paying $9500 he wouldn\'t use any dimes to pay for it.'
			},
			{
				title: 'Fruits and vegetables',
				text: 'If you have three apples and four oranges in one hand and four apples and three oranges in the other hand, what do you have?',
				
				answer: 'Very large hands.'
			},
			{
				title: 'Two men',
				text: 'Two men are facing each other alone in a large room. There is a clock on the wall. One man, who thinks of himself as a prophet, says to the other, "In five minutes you\'ll be stabbed in the back." The other man is very distraught and stares at the clock. After five minutes he is stabbed in the back. What happened?',
				
				answer: 'After five minutes the man turned around to make sure no one was there and his friend, the prophet, stabbed him in the back.'
			},
			{
				title: 'Coolest letter',
				text: 'What is the coolest letter in the alphabet?',
				
				answer: '"B", because it\'s always surrounded by AC.'
			},
			{
				title: 'Ten letters word',
				text: 'What has ten letters and starts with gas?',
				
				answer: 'An automobile.'
			},
			{
				title: 'All of your knowledge',
				text: 'I have all of your knowledge but could fit in your hands. What am I?',
				
				answer: 'Your brain.'
			},
			{
				title: 'Cat',
				text: 'Which side of a cat has the most fur?',
				
				answer: 'The outside.'
			},
			{
				title: 'What tastes better than it smells?',
				text: 'What tastes better than it smells?',
				
				answer: 'A tongue.'
			},
			{
				title: 'Incognito',
				text: 'The more places I be, the less you can see. What am I?',
				
				answer: 'Darkness.'
			},
			{
				title: 'A man who shaves',
				text: 'A man shaves several times a day, yet he still has a beard. Who is this man?',
				
				answer: 'He is a barber.'
			},
			{
				title: 'No doors room',
				text: 'What kind of room has no doors or windows?',
				
				answer: 'A mushroom.'
			},
			{
				title: 'Man and boss',
				text: 'A man and his boss have the same parents, but are not siblings. How is this possible?',
				
				answer: 'He is self-employed. He is his own boss.'
			},
			{
				title: 'Apple tree',
				text: 'How many apples grow on a tree?',
				
				answer: 'All apples grow on trees.'
			},
			{
				title: 'White house',
				text: 'A blue man lives in a blue house. A green man lives in a green house. Who lives in the white house?',
				
				answer: 'The president.'
			},
			{
				title: 'Construction work',
				text: 'It takes ten men ten hours to build a certain wall. How long does it take five men to build the same wall?',
				
				answer: 'No time, the wall is already built. There is no need to build it again.'
			},
			{
				title: 'Lost mother',
				text: 'You have lost your mother at the carnival. You search for her and eventually you see her. What\'s the first thing you do when you see her?',
				
				answer: 'Stop searching!'
			},
			{
				title: '1940',
				text: 'A person was born in 1940. Today is his 18th birthday. How is that possible?',
				
				answer: 'He was born in hospital room 1940.'
			},
			{
				title: 'Snow White',
				text: 'Snow White had the dwarfs were having dinner. The dwarfs asked for more food so snow white got them more. How many seconds did she take?',
				
				answer: '7, one for each dwarf. 8 if she was still hungry.'
			},
			{
				title: 'Heaven and Earth',
				text: 'Scientists are trying to figure out what is between Heaven and Earth. What is it?',
				
				answer: 'The word "and".'
			},
			{
				title: 'Poor rich man',
				text: 'A poor man is sitting in a pub. He sees that the man next to him is extremely rich. Poor man: I have an amazing talent; I know almost every song that has ever existed. The rich man laughs. Poor man: I am willing to bet you all the money you have in your wallet that I can sing a popular song that includes a lady\'s name of your choosing. The rich man laughs again. Rich man: OK, how about my daughter\'s name, Joanna Armstrong-Miller? The poor man goes home rich. What song did he sing?',
				
				answer: '"Happy Birthday." This song can be sang with anybody\'s name in it.'
			},
			{
				title: 'Brother',
				text: 'You are my brother, but I am not your brother. Who am I?',
				
				answer: 'I am your sister..'
			},
			{
				title: 'Walking man',
				text: 'A man is walking through the park one day and sees a group of four boys standing in a circle. A smaller boy is holding a large stick and hands it to a larger boy saying "I couldn\'t do it, your turn." The larger boy swings the stick twice and the other two boys go to the ground. The smaller boy says "I\'ll get \'em next time." The man walks away smiling.What just happened?',
				
				answer: 'The boys were at a birthday party hitting a pinata.'
			},
			{
				title: 'A bus',
				text: 'An empty bus pulls up to a stop and 10 people get on. At the next stop 5 people get off and twice as many people get on as at the first stop. At the third stop 25 get off. How many people are on the bus at this point?',
				
				answer: 'Just 1, the driver.'
			},
			{
				title: 'Little Johnny',
				text: 'Little Johnny is walking home. He has $300 he has to bring home to his mom. While he is walking a man stops him and gives him a chance to double his money. The man says "I\'ll give you $600 if you can roll 1 die and get a 4 or above, you can roll 2 dice and get a 5 or 6 on at least one of them, or you can roll 3 dice and get a 6 on at least on die. If you don\'t I get your $300." What does Johnny do to have the best chance of getting home with the money?',
				
				answer: 'He just doesn\'t take the bet. This gives him a 100 percent chance of getting the money home. If he takes the bet with 1 die he has a 50 percent chance of winning. If he takes the bet with 2 dice he has about a 56 percent chance of winning. If he takes the bet with 3 dice he has about a 42 percent chance of winning.'
			},
			{
				title: 'Hamburger',
				text: 'Why did the hamburger go to the gym?',
				
				answer: 'It wanted better buns.'
			},
			{
				title: 'Robbers',
				text: 'Three men rob a store but come out completely changed. Yet they continue robbing other stores. What kind of store did they first rob?',
				
				answer: 'A clothing store. They changed clothes.'
			},
			{
				title: 'A thief',
				text: 'A thief enters a shop and threatens the clerk, forcing him to open the safe. The clerk says, "The code for the safe is different every day, and if you hurt me you\'ll never get the code". But the thief manages to guess the code on his own. How did he do it?',
				
				answer: 'The code is "different." The clerk told him this.'
			},
			{
				title: 'Cowhides',
				text: 'What is the most common use of cowhides?',
				
				answer: 'To keep cows warm.'
			},
			{
				title: 'A hat',
				text: 'What is the best way to keep your hat from falling off your head?',
				
				answer: 'Don\'t put it on your head.'
			},
			{
				title: 'What are they?',
				text: 'Walk on the living, they don\'t even mumble. But walk on the dead, they mutter and grumble. What are they?',
				
				answer: 'Leaves.'
			},
			{
				title: 'Organ that named itself?',
				text: 'I am the only organ that named myself. What am I?',
				
				answer: 'Brain.'
			},
			{
				title: 'O100 high-powered politicians',
				text: 'There is a party of 100 high-powered politicians. All of them are either honest or liars. You walk in knowing two things: - At least one of them is honest. - If you take any two politicians, at least one of them is a liar. From this information, can you know how many are liars and how many are honest?',
				
				answer: 'Yes, from the information you know 1 is honest and 99 are liars. One of them is honest satisfying the first piece of information. Then if you take the honest man and any other politician, the other politician must be a liar to satisfy the second piece of information, \'If you take any two politicians, at least one of them is a liar.\' So 99 are liars..'
			},
			{
				title: 'Parents visit',
				text: ' You are awoken at 3 A.M. by a knock on your door. Your parents call you to let you know that they are there for breakfast. You are confused but quickly think of what food you have. You have bread, jam, butter, and eggs. What do you open first?',
				
				answer: 'The door for your parents.'
			},
			{
				title: 'Boston Red Sox player',
				text: 'Which Boston Red Sox player wears the biggest hat?',
				
				answer: 'The one with the biggest head.'
			},
			{
				title: 'Goes up and down',
				text: 'What goes up, lets out a load, then goes back down?',
				
				answer: 'An elevator!'
			},
			{
				title: 'A dog',
				text: 'What is the best way to stop a dog from barking in, and digging up the front yard?',
				
				answer: 'Put it in the backyard.'
			},
			{
				title: 'Dinner with friends',
				text: 'Wednesday, Tom and Joe went to a restaurant and ate dinner. When they were done they paid for the food and left. But Tom and Joe didn\'t pay for the food. Who did?',
				
				answer: 'Their friend Wednesday.'
			},
			{
				title: 'The question you cannot answer yes',
				text: 'What is the only question you can\'t answer yes to?',
				
				answer: 'Are you dead? (assuming you are dead) Every other question you can answer \'yes\' even if you are wrong.'
			},
			{
				title: 'Speaking parrot',
				text: 'A pet shop owner had a parrot with a sign on its cage that said "Parrot repeats everything it hears." A young man bought the parrot and for two weeks he spoke to it but it didn\'t say a word. He tried to return the parrot but the shopkeeper said he never lied. How can this be?',
				
				answer: 'The parrot was deaf!'
			},
			{
				title: 'The ark',
				text: 'How many animals of each kind did Moses bring on the ark?',
				
				answer: 'None, Noah built the ark, not Moses.'
			},
			{
				title: 'Dollar',
				text: 'What is the difference between a dollar and a half and thirty five-cents?',
				
				answer: 'Nothing. A dollar and a half is the same as thirty five-cents (nickels). But not the same as thirty-five cents.'
			},
			{
				title: 'A bunch of hungry sharks',
				text: 'Imagine you are swimming in the ocean and a bunch of hungry sharks surround you. How do you get out alive?',
				
				answer: 'Stop imagining.'
			},
			{
				title: 'Coins',
				text: 'You have 2 coins that add up to 35 cents. One of the coins is not a quarter. What kind of coins do you have?',
				
				answer: 'A quarter and a dime. One is not a quarter, but the other is.'
			},
			{
				title: 'A truck driver',
				text: 'A truck driver is going opposite traffic on a one-way street. A police officer sees him but doesn\'t stop him.Why didn\'t the police officer stop him?',
				
				answer: 'He was walking.'
			},
			{
				title: 'Rain',
				text: 'No matter how much rain comes down on it it won\'t get any wetter. What is it?',
				
				answer: 'Water.'
			},
			{
				title: 'Very easy to get into',
				text: 'I am very easy to get into, but it is hard to get out of me.What am I?',
				
				answer: 'Trouble.'
			},
			{
				title: 'Balloon',
				text: 'What is the easiest way to poke a balloon without popping it?',
				
				answer: 'Do it when it\'s not blown up!'
			},
			{
				title: 'Two planes',
				text: 'There are two planes. One is going from New York to London at a speed of 600 MPH. The other is traveling from London to New York at a speed of 500 MPH. When the planes meet which one will be closer to London?',
				
				answer: 'They will be the same distance away when they meet.'
			},
			{
				title: 'A hair stylist',
				text: 'Why would a hair stylist rather cut the hair of two brunettes than one red head?',
				
				answer: 'They would get paid more for two haircuts than one.'
			},
			{
				title: 'A hair stylist',
				text: 'Why would a hair stylist rather cut the hair of two brunettes than one red head?',
				
				answer: 'They would get paid more for two haircuts than one.'
			}

		]

	};

=======
(function (win) {

	"use strict";
	/*global window */

	win.sections = win.sections || {};

	win.sections.funnyTeasers = {
		name: 'Funny teasers',
		lang: 'en', // ru || en
		//вЂ™
		questions: [
			{
				title: 'Family',
				text: 'A father goes to prison and the mother will have to sell her hotel, but their young daughter is happy. How can these parents tolerate such ingratitude and what put them in this situation?',
				
				answer: 'The three of them are playing Monopoly'
			},
			{
				title: 'Vehicle',
				text: 'A man wants to buy a used car. He finds a beautiful Buick for $9500, but he buys it without paying a dime. How did he manage this?',
				
				answer: 'If he is paying $9500 he wouldn\'t use any dimes to pay for it.'
			},
			{
				title: 'Fruits and vegetables',
				text: 'If you have three apples and four oranges in one hand and four apples and three oranges in the other hand, what do you have?',
				
				answer: 'Very large hands.'
			},
			{
				title: 'Two men',
				text: 'Two men are facing each other alone in a large room. There is a clock on the wall. One man, who thinks of himself as a prophet, says to the other, "In five minutes you\'ll be stabbed in the back." The other man is very distraught and stares at the clock. After five minutes he is stabbed in the back. What happened?',
				
				answer: 'After five minutes the man turned around to make sure no one was there and his friend, the prophet, stabbed him in the back.'
			},
			{
				title: 'Coolest letter',
				text: 'What is the coolest letter in the alphabet?',
				
				answer: '"B", because it\'s always surrounded by AC.'
			},
			{
				title: 'Ten letters word',
				text: 'What has ten letters and starts with gas?',
				
				answer: 'An automobile.'
			},
			{
				title: 'All of your knowledge',
				text: 'I have all of your knowledge but could fit in your hands. What am I?',
				
				answer: 'Your brain.'
			},
			{
				title: 'Cat',
				text: 'Which side of a cat has the most fur?',
				
				answer: 'The outside.'
			},
			{
				title: 'What tastes better than it smells?',
				text: 'What tastes better than it smells?',
				
				answer: 'A tongue.'
			},
			{
				title: 'Incognito',
				text: 'The more places I be, the less you can see. What am I?',
				
				answer: 'Darkness.'
			},
			{
				title: 'A man who shaves',
				text: 'A man shaves several times a day, yet he still has a beard. Who is this man?',
				
				answer: 'He is a barber.'
			},
			{
				title: 'No doors room',
				text: 'What kind of room has no doors or windows?',
				
				answer: 'A mushroom.'
			},
			{
				title: 'Man and boss',
				text: 'A man and his boss have the same parents, but are not siblings. How is this possible?',
				
				answer: 'He is self-employed. He is his own boss.'
			},
			{
				title: 'Apple tree',
				text: 'How many apples grow on a tree?',
				
				answer: 'All apples grow on trees.'
			},
			{
				title: 'White house',
				text: 'A blue man lives in a blue house. A green man lives in a green house. Who lives in the white house?',
				
				answer: 'The president.'
			},
			{
				title: 'Construction work',
				text: 'It takes ten men ten hours to build a certain wall. How long does it take five men to build the same wall?',
				
				answer: 'No time, the wall is already built. There is no need to build it again.'
			},
			{
				title: 'Lost mother',
				text: 'You have lost your mother at the carnival. You search for her and eventually you see her. What\'s the first thing you do when you see her?',
				
				answer: 'Stop searching!'
			},
			{
				title: '1940',
				text: 'A person was born in 1940. Today is his 18th birthday. How is that possible?',
				
				answer: 'He was born in hospital room 1940.'
			},
			{
				title: 'Snow White',
				text: 'Snow White had the dwarfs were having dinner. The dwarfs asked for more food so snow white got them more. How many seconds did she take?',
				
				answer: '7, one for each dwarf. 8 if she was still hungry.'
			},
			{
				title: 'Heaven and Earth',
				text: 'Scientists are trying to figure out what is between Heaven and Earth. What is it?',
				
				answer: 'The word "and".'
			},
			{
				title: 'Poor rich man',
				text: 'A poor man is sitting in a pub. He sees that the man next to him is extremely rich. Poor man: I have an amazing talent; I know almost every song that has ever existed. The rich man laughs. Poor man: I am willing to bet you all the money you have in your wallet that I can sing a popular song that includes a lady\'s name of your choosing. The rich man laughs again. Rich man: OK, how about my daughter\'s name, Joanna Armstrong-Miller? The poor man goes home rich. What song did he sing?',
				
				answer: '"Happy Birthday." This song can be sang with anybody\'s name in it.'
			},
			{
				title: 'Brother',
				text: 'You are my brother, but I am not your brother. Who am I?',
				
				answer: 'I am your sister..'
			},
			{
				title: 'Walking man',
				text: 'A man is walking through the park one day and sees a group of four boys standing in a circle. A smaller boy is holding a large stick and hands it to a larger boy saying "I couldn\'t do it, your turn." The larger boy swings the stick twice and the other two boys go to the ground. The smaller boy says "I\'ll get \'em next time." The man walks away smiling.What just happened?',
				
				answer: 'The boys were at a birthday party hitting a pinata.'
			},
			{
				title: 'A bus',
				text: 'An empty bus pulls up to a stop and 10 people get on. At the next stop 5 people get off and twice as many people get on as at the first stop. At the third stop 25 get off. How many people are on the bus at this point?',
				
				answer: 'Just 1, the driver.'
			},
			{
				title: 'Little Johnny',
				text: 'Little Johnny is walking home. He has $300 he has to bring home to his mom. While he is walking a man stops him and gives him a chance to double his money. The man says "I\'ll give you $600 if you can roll 1 die and get a 4 or above, you can roll 2 dice and get a 5 or 6 on at least one of them, or you can roll 3 dice and get a 6 on at least on die. If you don\'t I get your $300." What does Johnny do to have the best chance of getting home with the money?',
				
				answer: 'He just doesn\'t take the bet. This gives him a 100 percent chance of getting the money home. If he takes the bet with 1 die he has a 50 percent chance of winning. If he takes the bet with 2 dice he has about a 56 percent chance of winning. If he takes the bet with 3 dice he has about a 42 percent chance of winning.'
			},
			{
				title: 'Hamburger',
				text: 'Why did the hamburger go to the gym?',
				
				answer: 'It wanted better buns.'
			},
			{
				title: 'Robbers',
				text: 'Three men rob a store but come out completely changed. Yet they continue robbing other stores. What kind of store did they first rob?',
				
				answer: 'A clothing store. They changed clothes.'
			},
			{
				title: 'A thief',
				text: 'A thief enters a shop and threatens the clerk, forcing him to open the safe. The clerk says, "The code for the safe is different every day, and if you hurt me you\'ll never get the code". But the thief manages to guess the code on his own. How did he do it?',
				
				answer: 'The code is "different." The clerk told him this.'
			},
			{
				title: 'Cowhides',
				text: 'What is the most common use of cowhides?',
				
				answer: 'To keep cows warm.'
			},
			{
				title: 'A hat',
				text: 'What is the best way to keep your hat from falling off your head?',
				
				answer: 'Don\'t put it on your head.'
			},
			{
				title: 'What are they?',
				text: 'Walk on the living, they don\'t even mumble. But walk on the dead, they mutter and grumble. What are they?',
				
				answer: 'Leaves.'
			},
			{
				title: 'Organ that named itself?',
				text: 'I am the only organ that named myself. What am I?',
				
				answer: 'Brain.'
			},
			{
				title: 'O100 high-powered politicians',
				text: 'There is a party of 100 high-powered politicians. All of them are either honest or liars. You walk in knowing two things: - At least one of them is honest. - If you take any two politicians, at least one of them is a liar. From this information, can you know how many are liars and how many are honest?',
				
				answer: 'Yes, from the information you know 1 is honest and 99 are liars. One of them is honest satisfying the first piece of information. Then if you take the honest man and any other politician, the other politician must be a liar to satisfy the second piece of information, \'If you take any two politicians, at least one of them is a liar.\' So 99 are liars..'
			},
			{
				title: 'Parents visit',
				text: ' You are awoken at 3 A.M. by a knock on your door. Your parents call you to let you know that they are there for breakfast. You are confused but quickly think of what food you have. You have bread, jam, butter, and eggs. What do you open first?',
				
				answer: 'The door for your parents.'
			},
			{
				title: 'Boston Red Sox player',
				text: 'Which Boston Red Sox player wears the biggest hat?',
				
				answer: 'The one with the biggest head.'
			},
			{
				title: 'Goes up and down',
				text: 'What goes up, lets out a load, then goes back down?',
				
				answer: 'An elevator!'
			},
			{
				title: 'A dog',
				text: 'What is the best way to stop a dog from barking in, and digging up the front yard?',
				
				answer: 'Put it in the backyard.'
			},
			{
				title: 'Dinner with friends',
				text: 'Wednesday, Tom and Joe went to a restaurant and ate dinner. When they were done they paid for the food and left. But Tom and Joe didn\'t pay for the food. Who did?',
				
				answer: 'Their friend Wednesday.'
			},
			{
				title: 'The question you cannot answer yes',
				text: 'What is the only question you can\'t answer yes to?',
				
				answer: 'Are you dead? (assuming you are dead) Every other question you can answer \'yes\' even if you are wrong.'
			},
			{
				title: 'Speaking parrot',
				text: 'A pet shop owner had a parrot with a sign on its cage that said "Parrot repeats everything it hears." A young man bought the parrot and for two weeks he spoke to it but it didn\'t say a word. He tried to return the parrot but the shopkeeper said he never lied. How can this be?',
				
				answer: 'The parrot was deaf!'
			},
			{
				title: 'The ark',
				text: 'How many animals of each kind did Moses bring on the ark?',
				
				answer: 'None, Noah built the ark, not Moses.'
			},
			{
				title: 'Dollar',
				text: 'What is the difference between a dollar and a half and thirty five-cents?',
				
				answer: 'Nothing. A dollar and a half is the same as thirty five-cents (nickels). But not the same as thirty-five cents.'
			},
			{
				title: 'A bunch of hungry sharks',
				text: 'Imagine you are swimming in the ocean and a bunch of hungry sharks surround you. How do you get out alive?',
				
				answer: 'Stop imagining.'
			},
			{
				title: 'Coins',
				text: 'You have 2 coins that add up to 35 cents. One of the coins is not a quarter. What kind of coins do you have?',
				
				answer: 'A quarter and a dime. One is not a quarter, but the other is.'
			},
			{
				title: 'A truck driver',
				text: 'A truck driver is going opposite traffic on a one-way street. A police officer sees him but doesn\'t stop him.Why didn\'t the police officer stop him?',
				
				answer: 'He was walking.'
			},
			{
				title: 'Rain',
				text: 'No matter how much rain comes down on it it won\'t get any wetter. What is it?',
				
				answer: 'Water.'
			},
			{
				title: 'Very easy to get into',
				text: 'I am very easy to get into, but it is hard to get out of me.What am I?',
				
				answer: 'Trouble.'
			},
			{
				title: 'Balloon',
				text: 'What is the easiest way to poke a balloon without popping it?',
				
				answer: 'Do it when it\'s not blown up!'
			},
			{
				title: 'Two planes',
				text: 'There are two planes. One is going from New York to London at a speed of 600 MPH. The other is traveling from London to New York at a speed of 500 MPH. When the planes meet which one will be closer to London?',
				
				answer: 'They will be the same distance away when they meet.'
			},
			{
				title: 'A hair stylist',
				text: 'Why would a hair stylist rather cut the hair of two brunettes than one red head?',
				
				answer: 'They would get paid more for two haircuts than one.'
			},
			{
				title: 'A hair stylist',
				text: 'Why would a hair stylist rather cut the hair of two brunettes than one red head?',
				
				answer: 'They would get paid more for two haircuts than one.'
			}

		]

	};

>>>>>>> 7a0fb1fe99c92abf88459e8fe8d30f908a8d64f1
}(window));