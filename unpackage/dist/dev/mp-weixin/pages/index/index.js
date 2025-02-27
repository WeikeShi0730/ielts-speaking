"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_recorder = require("../../utils/recorder.js");
const api_index = require("../../api/index.js");
const config = require("../../config.js");
const part1 = {
  "Practice 1 (Accommodation & Hometown)": {
    "1": "Let’s talk about your hometown. Where is your hometown?",
    "2": "What do you like about it?",
    "3": "What do you not like about it?",
    "4": "How important is your hometown to you?",
    "5": "Do you think you will continue to live in your hometown?",
    "6": "Let’s move on to talk about accommodation. Tell me about the kind of accommodation you live in?",
    "7": "Does the place you live in have many amenities?",
    "8": "Is there anything you would like to change about the place you live in?",
    "9": "Do you plan to live there for a long time?"
  },
  "Practice 2 (Hometown & Weather)": {
    "1": "What is your country famous for?",
    "2": "Where do you live in your country?",
    "3": "Is it a interesting place to live?",
    "4": "Are you planning to live there in the future?",
    "5": "How is the weather today?",
    "6": "What’s your favourite kind of weather?",
    "7": "Is there any type of weather you really don’t like?",
    "8": "What is the climate like in your country?",
    "9": "Does the weather affect people’s lives in your country?",
    "10": "Do people change in the summer?",
    "11": "Does bad weather ever affect transport in your country?"
  },
  "Practice 3 (Work)": {
    "1": "Do you have a job right now?",
    "2": "Do you enjoy your job?",
    "3": "What responsibilities do you have at work?",
    "4": "What is your typical day like at work?",
    "5": "What would you change about your job?",
    "6": "What job do you think you will be doing in five years?",
    "7": "What skills and qualifications are required for this job?"
  },
  "Practice 4 (Volunteer works)": {
    "1": "Have you ever worked before?",
    "2": "What was your first day at work like?",
    "3": "What responsibilities did you have at work?",
    "4": "What was your typical day like at work?",
    "5": "Have you taken any volunteer works?",
    "6": "Why did you do the volunteer works?",
    "7": "Do you know any volunteers?",
    "8": "How do you define volunteer work?"
  },
  "Practice 5 (Hometown)": {
    "1": "Can you tell me about your hometown?",
    "2": "How has your hometown changed over the years?",
    "3": "Is there any way your hometown could be made better?",
    "4": "Are there good transportation links to your hometown?",
    "5": "What kind of jobs do the people in your hometown do?",
    "6": "Do you have a lot of friends?",
    "7": "Who is your best friend and why?",
    "8": "Who would you most like to be friends with and why?",
    "9": "What kind of person can you make friends with easily?",
    "10": "Which is more important to you, friends or family?"
  },
  "Practice 6 (High School & Hometown)": {
    "1": "Where is your hometown?",
    "2": "How often do you visit your hometown?",
    "3": "How many people live in your hometown?",
    "4": "What is your hometown famous for?",
    "5": "What’s the oldest part of your hometown?",
    "6": "Who was your favorite teacher in high school?",
    "7": "What’s your favorite subject in high school?",
    "8": "Do you still remember what happened on your first day of high school?",
    "9": "Do you still keep in touch with your friends from high school?",
    "10": "Do you miss your life in high school?"
  },
  "Practice 7 (Lifestyle & Work)": {
    "1": "What do you do in your free time?",
    "2": "Do you have a busy social life?",
    "3": "Do you lead an active life?",
    "4": "Has your life changed much in the last year?",
    "5": "What would you like to change about your lifestyle?",
    "6": "Do you work right now?",
    "7": "Do you get on well with your co-workers?",
    "8": "What responsibilities do you have at your work?",
    "9": "Are there good work opportunities in your home country?"
  },
  "Practice 8 (Family & Housework)": {
    "1": "How many people are there in your immediate family?",
    "2": "Who do you get on best within your family?",
    "3": "Do you have a large extended family?",
    "4": "What do you do together with your family?",
    "5": "Why is family important to you?",
    "6": "Do you do housework at home?",
    "7": "What kind of housework do you often do?",
    "8": "Did you do housework when you were a child?",
    "9": "Do you think that children should do housework?"
  },
  "Practice 9 (Books & TV)": {
    "1": "Do you like watching TV?",
    "2": "How often do you watch TV?",
    "3": "What kind of TV programmes do you like to watch?",
    "4": "What are the most popular TV shows in your country?",
    "5": "Has the internet affected your viewing habits?",
    "6": "How often do you read?",
    "7": "Do you like reading books? Why?",
    "8": "Do you have many books at home?",
    "9": "Do you prefer to buy books or borrow them?",
    "10": "What are the benefits of reading?"
  },
  "Practice 10 (Home & TV)": {
    "1": "Who do you live with?",
    "2": "What is your favourite room in your home?",
    "3": "How is your home decorated?",
    "4": "Do you like visitors coming to your home?",
    "5": "Do you like watching TV?",
    "6": "What is your favourite TV show now?",
    "7": "What was your favourite show when you were a child?",
    "8": "Do you like watching TV shows from other countries?"
  },
  "Practice 11 (Accommodation & Weather)": {
    "1": "Do you live in a house or a flat?",
    "2": "Is it a big place?",
    "3": "How long have you lived there?",
    "4": "What do you like about living there?",
    "5": "Is there a garden in the place you live in?",
    "6": "Do you prefer to hot weather or cold?",
    "7": "Tell me about the weather in your country in different times of the year?",
    "8": "Which time of the year did you enjoy the most when you were the child?",
    "9": "Do you (usually) pay attention to the weather forecasts?",
    "10": "Has the weather changed much in your country in recent years?"
  },
  "Practice 12 (Advertisements & Books)": {
    "1": "Do you like reading books? Why?",
    "2": "What book would you take on a long journey?",
    "3": "How easy is it for you to read books in English?",
    "4": "Have you given up reading a book recently?",
    "5": "What kind of people like reading and what kind of people don’t like reading very much?",
    "6": "Do you like watching advertisements?",
    "7": "Will you buy something because of an advertisement?",
    "8": "How do you feel when you see pop-up ads on the internet?",
    "9": "Do you like funny or serious advertisements?",
    "10": "What makes a good advertisement?"
  },
  "Practice 13 (Celebrity & Computer)": {
    "1": "Do you use computers?",
    "2": "What do you use a computer to do?",
    "3": "Did you use computers when you were little?",
    "4": "Do people often use computers these days?",
    "5": "Will people continue to use computers in the future?",
    "6": "Who is your favorite celebrity?",
    "7": "Do you like any foreign celebrities?",
    "8": "Would you want to be a celebrity in the future?",
    "9": "Do you think we should protect famous people’s privacy?",
    "10": "How do celebrities influence their fans in your country?"
  },
  "Practice 14 (Movies & Music)": {
    "1": "How often do you go to the cinema?",
    "2": "Are cinema tickets expensive in your country?",
    "3": "What are the advantages of seeing a film at the cinema?",
    "4": "Do you usually watch films alone or with others?",
    "5": "Which actor would you like to play you in a film?",
    "6": "How do you listen to music?",
    "7": "When do you listen to music?",
    "8": "What’s your favorite kind of music?",
    "9": "Is music an important subject at school in your country?",
    "10": "What kinds of music are (most) popular in your country?"
  },
  "Practice 15 (Music & Newspaper and magazine)": {
    "1": "What’s your favorite kind of music?",
    "2": "Do you like to listen to live music?",
    "3": "Is live music popular in your country?",
    "4": "Have you ever been to a concert before? Or Have you ever been to a musical performance?",
    "5": "Do you often read newspapers?",
    "6": "Do you prefer to read local news or international news?",
    "7": "Which is more popular where you live, newspapers or magazines?",
    "8": "Do many people today read newspapers?",
    "9": "In the future, do you think more people than today will read magazines, or fewer people?",
    "10": "Do you think newspapers will be very important to you in the future?"
  },
  "Practice 16 (Music & Travel)": {
    "1": "Where was the last place you visited on holiday?",
    "2": "Would you like to go back there again?",
    "3": "What kind of tourist destinations do you usually prefer?",
    "4": "Has a foreign visitor ever stayed at your home?",
    "5": "What’s the best way to save money while traveling?",
    "6": "How much time do you spend listening to music every day?",
    "7": "Are your music tastes varied?",
    "8": "What is your favorite song?",
    "9": "Do you like to sing along to your favorite songs?",
    "10": "Are you learning to play a musical instrument at the moment?"
  },
  "Practice 19 (Internet & Major)": {
    "1": "How important is the Internet to you?",
    "2": "Do you use the Internet more for work or in your free time?",
    "3": "Do you think you use the Internet too much?",
    "4": "How will the Internet develop in the future?",
    "5": "Are there any negative things about the Internet?",
    "6": "What is your major? Or what was your major?",
    "7": "Did you or do you like it?",
    "8": "Is it a popular major at your university?",
    "9": "If you could change to another major, what would it be?",
    "10": "Would you change it if you had the chance?"
  },
  "Practice 20 (Internet & Outdoor activities)": {
    "1": "Do you like outdoor activities?",
    "2": "What outdoor sports do you like?",
    "3": "How much time do you spend outdoors every week?",
    "4": "What types of outdoor activities are popular in your country?",
    "5": "How often do you use the Internet?",
    "6": "Do you think you use the Internet too much?",
    "7": "What are your favourite websites?",
    "8": "What are the positive and negative things about the Internet?"
  },
  "Practice 21 (Indoor activities & Transportation)": {
    "1": "Do you prefer public transportation or private transportation?",
    "2": "What’s the most popular means of transportation in your hometown?",
    "3": "Is it easy to catch a bus in your country?",
    "4": "Is driving to work popular in your country?",
    "5": "What do you think will become the most popular means of transportation in your country?",
    "6": "Do you like indoor activities?",
    "7": "What indoor activities do you like?",
    "8": "How much time do you spend indoors every week?",
    "9": "What types of indoor activities are popular in your country?"
  },
  "Practice 18 (Major & Sports)": {
    "1": "Do you work or study?",
    "2": "What is your major? Or what was your major?",
    "3": "Why did you choose that major?",
    "4": "What is the most difficult part of studying that subject?",
    "5": "Do you plan to use the subject you are studying in the future?",
    "6": "Do you play any sports?",
    "7": "Do you watch sports on TV?",
    "8": "What is the most popular sport in your country?",
    "9": "How do people in your country stay fit?",
    "10": "Is it important for children to play sports?"
  },
  "Practice 22 (Gift & Noise)": {
    "1": "Do you mind noises?",
    "2": "What types of noise do you come across in your daily life?",
    "3": "Are there any sounds that you like?",
    "4": "Where can you hear loud noises?",
    "5": "Do you think there’s too much noise in modem society?",
    "6": "Are cities becoming noisier?",
    "7": "When do you send gifts?",
    "8": "When was the last time you received a gift?",
    "9": "Have you received a gift you didn’t like?",
    "10": "How do you feel when you receive a gift?",
    "11": "Do people in your country send gifts to show their generosity?"
  },
  "Practice 23 (Patience & Politeness)": {
    "1": "What do you think patience is?",
    "2": "Do you think patience is important?",
    "3": "Do you think you are an patient person?",
    "4": "Have you ever lost your patience?",
    "5": "Are you a polite person?",
    "6": "Who taught you to be polite?",
    "7": "Is it important to be polite?",
    "8": "What do you do if others are not polite to you?"
  },
  "Practice 25 (Colors & Weather)": {
    "1": "What’s the best season of the whole year?",
    "2": "What do people normally do in that season?",
    "3": "What’s the weather usually like in your country (or, your hometown)?",
    "4": "How is the weather here different from the weather in your home country?",
    "5": "What colors do you like?",
    "6": "What’s the most popular color in your country?",
    "7": "Do you like to wear dark or bright colors?",
    "8": "What’s the difference between men and women’s preference for colors?",
    "9": "Do colors affect your mood?"
  },
  "Practice 27 (Food & Weather)": {
    "1": "Do you have a healthy diet?",
    "2": "Do you prefer eating at home or eating out?",
    "3": "Do you like ordering food to be delivered?",
    "4": "Who do you get food delivered with?",
    "5": "Do you eat meals differently now compared to when you were little?",
    "6": "What sort of weather do you like the most?",
    "7": "Would you say the weather in your hometown is suitable for working (or studying)?",
    "8": "Would you like to move to a place with the different weather?",
    "9": "What season (or weather) do you think is most suitable for work and/or study?"
  },
  "Practice 28 (Clothes & Photos)": {
    "1": "What is your favourite item of clothing?",
    "2": "Are there any traditional clothes in your country?",
    "3": "Where do you usually purchase your clothes?",
    "4": "Have you ever bought clothes online?",
    "5": "Who do you usually take photos of?",
    "6": "How do you keep your photos?",
    "7": "Do you keep your photographs on your computer?",
    "8": "Have you framed any of your photos?",
    "9": "Do you prefer to send postcards to people or to send photos that you took yourself?"
  },
  "Practice 29 (Art & Photography)": {
    "1": "Do you like art?",
    "2": "Do you think art classes are necessary?",
    "3": "How do you think art classes affect children’s development?",
    "4": "What kind of paintings do people in your country like?",
    "5": "What benefits can you get from painting as a hobby?",
    "6": "Do you like to take photographs?",
    "7": "Do you prefer to take photos yourself or to have other people take photos?",
    "8": "How often do you take photographs?",
    "9": "Do you prefer to take pictures of people or of scenery?",
    "10": "Are there any photos on the walls of your home?"
  },
  "Practice 31 (Bags & Boat)": {
    "1": "Have you ever taken a ride on a boat?",
    "2": "Do you like traveling by boat?",
    "3": "What are the advantages of travelling by boat?",
    "4": "Do people in your country like to travel by boat?",
    "5": "Will it get more popular in the future?",
    "6": "Do you like bags?",
    "7": "What types of bags do you like?",
    "8": "Do you usually carry a bag (when you go out)?",
    "9": "What types of bags do you use in your everyday life?",
    "10": "What do you put in these bags?",
    "11": "What sorts of bags do women like to buy?"
  }
};
const part2 = {};
const part3 = {
  "Practice 1 (Advertisements)": {
    "1": "What are popular types of advertising in today’s world?",
    "2": "What type of media advertising do you like most?",
    "3": "Do you think advertising influences what people buy?",
    "4": "What factors should be taken into account when making advertisements?",
    "5": "Is advertising really necessary in modern society?",
    "6": "Let’s move on from types of advertising to the impact of advertising on children. How does advertising influence children?",
    "7": "Is there any advertising that can be harmful to children?"
  },
  "Practice 2 (Art)": {
    "1": "How do people in your country feel about art?",
    "2": "Do people in your country prefer music over art?",
    "3": "What are some traditional art forms in your country?",
    "4": "How has art changed in the past few decades in your country?",
    "5": "Let’s move on from art in your country to art education. Do you think children should study art in school?",
    "6": "How can children benefit from learning about art?",
    "7": "Do you think the government should provide support for art and cultural activities?"
  },
  "Practice 3 (Books)": {
    "1": "Do people read more nowadays?",
    "2": "Do you read before going to bed?",
    "3": "In your opinion, how will e-books affect paper books?",
    "4": "What's the difference between films and books?",
    "5": "Let’s move on to the topic of traditional literature in your country. What is one example of traditional literature in your country?",
    "6": "Do you like reading the traditional literature of your country?"
  },
  "Practice 4 (Business)": {
    "1": "In your opinion, do business people have to work long hours?",
    "2": "How do business people relax?",
    "3": "Let’s move on to the topic of small businesses. How can a small business grow big?",
    "4": "In your opinion, what kind of small businesses will young people have in the future?",
    "5": "In your opinion, what skills are required to start a small business?",
    "6": "Finally, let’s talk about globalization. What are the impacts of globalization on small and large businesses?"
  },
  "Practice 5 (Change)": {
    "1": "Do you think change is good?",
    "2": "What are some of the major changes that occur to people throughout their lives?",
    "3": "Is your country changing rapidly?",
    "4": "In what ways have changes in technology changed people's lives?",
    "5": "Why do old people not accept change?"
  },
  "Practice 6 (City)": {
    "1": "In your opinion, what makes a city a good one to live in?",
    "2": "What are the advantages of living in a city?",
    "3": "Let’s move on from the positive aspects of cities to the negative aspects of cites. In your opinion, what are the negative aspects of crowded cities?",
    "4": "How can governments improve living standards in crowded cities?",
    "5": "What about air quality? What can people do to improve the air quality in the city?"
  },
  "Practice 8 (Company)": {
    "1": "What is the difference between big companies and small companies?",
    "2": "Are there many big companies in your country?",
    "3": "What are the good things about working for a big company?",
    "4": "Should big companies be punished more seriously than small companies?",
    "5": "Why do some people choose to work at an international company?",
    "6": "Let’s move on to the topic of companies’ services. How can a company maintain the quality of the service that it gives to the public?",
    "7": "Do you think it's important for a company to provide after-sales service?"
  },
  "Practice 9 (Decision)": {
    "1": "Why do some people find it hard to make decisions?",
    "2": "How important is it to get advice from other people when making decisions?",
    "3": "Why is it sometimes difficult to accept advice?",
    "4": "What are some of the most important decisions young people have to make?",
    "5": "Do you agree that parents should make important decisions for their children?",
    "6": "Is it better to make a decision thinking about what you want or thinking about what other people want?"
  },
  "Practice 10 (Electronic devices)": {
    "1": "What are the most popular electronic devices in today’s world?",
    "2": "What devices do you think will be popular in the future?",
    "3": "Let’s move on to the role of electronic devices in today’s society. Do you think people spend too much money on electronic devices?",
    "4": "In what ways can electronic devices make our lives harder?",
    "5": "What would the world be like without computers?",
    "6": "Should children be taught to use computers at school?"
  },
  "Practice 11 (Environment)": {
    "1": "What are some of the main environmental problems in your county?",
    "2": "Why should people be concerned about the environment?",
    "3": "How can people protect the environment?",
    "4": "Do you think money should be spent on protecting animals?",
    "5": "Do you think more should be done to protect natural scenic spots in your country?",
    "6": "Let’s move on to water pollution. Is water pollution a problem in your country?",
    "7": "What can individuals do to try and ensure water is kept clean?",
    "8": "Do you think problems with the cleanliness of water will improve in the future?"
  },
  "Practice 12 (Exciting experience)": {
    "1": "Can you compare some exciting activities people do now with activities people did 20 years ago?",
    "2": "Why do some people enjoy doing dangerous sports?",
    "3": "Do you think some dangerous activities should be banned?",
    "4": "Let’s move on from exciting activities to people doing new things in general. Should people try doing new things?",
    "5": "What problems can people have when they try new activities for the first time?",
    "6": "Do you think it’s best to do new things on your own or with other people?"
  },
  "Practice 13 (Family)": {
    "1": "Is family important in your country?",
    "2": "Who should be responsible to care for the elderly? Should it be the family or the government?",
    "3": "How has the size of the average family changed in your country in the last few decades?",
    "4": "How do you think families will change in the future?",
    "5": "Let’s move on to the roles of different family members. Should husbands and wives have different roles within the family?",
    "6": "What role do grandparents play in the family in your country?"
  },
  "Practice 14 (Food)": {
    "1": "What are the types of food that people eat in your country.",
    "2": "What about foreign food? What kinds of foreign food are popular in your country?",
    "3": "In your country, is it important to have a meal together with your family?",
    "4": "Is food now better than in the past?",
    "5": "Let’s move on to diet and eating habits. Do you think our diet is important?",
    "6": "What is a balanced diet?",
    "7": "How are the eating habits now in your country different from eating habits in the past?",
    "8": "How might eating habits change in coming decades?"
  },
  "Practice 15 (Friends)": {
    "1": "What is the importance of friends?",
    "2": "Would you like to have a few very good friends or a lot of just friends?",
    "3": "If you had a problem, would you go to your friends or family? Why?",
    "4": "Do you think it is always better to talk to your friends about such a problem?",
    "5": "Is it important to have friends from other countries?"
  },
  "Practice 7 (Clothes)": {
    "1": "Can clothing tell you much about a person in your country?",
    "2": "Do people still wear traditional clothing in your country?",
    "3": "How has clothing fashion changed in your country over the last few decades?",
    "4": "Let’s move on from clothing to uniforms. Why do some companies ask their staff to wear uniforms?",
    "5": "What are the advantages and disadvantages of having uniforms at work?",
    "6": "For which jobs are people required to wear a uniform in your country?",
    "7": "Do you think people are treated differently when they are in uniform?"
  },
  "Practice 16 (Furniture)": {
    "1": "In what situations do people in your country buy furniture?",
    "2": "In families in your country, who usually decides what furniture to buy for the home?",
    "3": "How do people in your country decide what furniture to buy for the home or office?",
    "4": "Do people in your country prefer traditional or modern styles of furniture?"
  },
  "Practice 18 (Health)": {
    "1": "How can people improve their health?",
    "2": "Do elderly people exercise much in your country?",
    "3": "Do you think all illnesses can be prevented?",
    "4": "Do you think that illnesses will be less common in the future?",
    "5": "Do you think healthcare should be free?",
    "6": "What makes someone a good doctor?"
  },
  "Practice 19 (Help)": {
    "1": "Do you like helping others?",
    "2": "Do you think people are less willing to help others these days compared to the past?",
    "3": "Do people today trust others as much as they used to in the past?",
    "4": "How do people in your community help each other?",
    "5": "Let’s move on to the topic of educating children to help people. In your view, should children be taught to help others?",
    "6": "In your opinion, how can we encourage children to help others?",
    "7": "What about students? How can students, such as high-school students, help each other?"
  },
  "Practice 20 (History)": {
    "1": "Do you think history is important?",
    "2": "Do you like to learn about history?",
    "3": "What do you think we can learn by studying history?",
    "4": "Let’s move on to different ways of learning about history. In your opinion, how can people learn about history?",
    "5": "Do you think people can learn history from films or TV programs?",
    "6": "Do you think the internet is a good place to learn about history?",
    "7": "What is the effect of technology on how people learn about history?"
  },
  "Practice 21 (Holiday)": {
    "1": "First of all, why do people go on holiday?",
    "2": "How important is it for families to go on holiday together?",
    "3": "Why do some people go on holiday alone?",
    "4": "How have holidays changed over the past few decades?",
    "5": "What kind of holidays will be popular in the future?",
    "6": "Let’s move on to talk about taking holidays in foreign country. Do you think is it better to take a holiday in your own country or in a foreign country?",
    "7": "What problems can people have on holiday in a foreign country?"
  },
  "Practice 22 (Influence)": {
    "1": "What types of people influence the young in your country?",
    "2": "What type of people, such as parents, teachers, or friends, are best to influence young people’s behavior?",
    "3": "Why it is important for young people to have role models?",
    "4": "What do you think young people will be influenced by the most in the future?"
  },
  "Practice 23 (Internet)": {
    "1": "How do you think the Internet will change people's buying habits in the future?",
    "2": "What are the pros and cons of shopping online?",
    "3": "Is the Internet important for education?",
    "4": "Do you think parents should supervise their children’s use of the Internet?",
    "5": "What's the best age for children to use the Internet?",
    "6": "Why do children start using the Internet very early nowadays?",
    "7": "Let’s move on to what people do on the Internet. What do you think people do on the Internet?",
    "8": "What about elderly people? Do elderly people use the Internet very much?"
  },
  "Practice 25 (Late)": {
    "1": "What is the general attitude towards arriving somewhere late in your country?",
    "2": "What is an example of a time that it is very important for people to arrive on time in your country?",
    "3": "Can you suggest some ways to make sure you are not late for anything?",
    "4": "Let’s move on to how modern technology influences the way that people manage time. Do you think computers make it easier or more difficult to manage time?",
    "5": "How can modern technology help people arrive early?",
    "6": "Do you think it is easy to manage your time in the modern world?"
  },
  "Practice 27 (Machine)": {
    "1": "What kinds of machines are used for housework in modern homes in your country?",
    "2": "How have these machines benefited people? Are there any negative effects of using them?",
    "3": "Do you think all new homes will be equipped with household machines in the future? Why?",
    "4": "Let’s move on to technology. Do you think people rely too much on technology?",
    "5": "Do you think men and women view technology differently?",
    "6": "Finally, let’s talk about the impact of technology on employment. How have developments in technology affected employment in your country?",
    "7": "Some people think that technology has brought more stress than benefits to employed people nowadays. Do you agree or disagree with this statement?"
  },
  "Practice 28 (Memory)": {
    "1": "Do you think it's important to have a good memory?",
    "2": "Why do sometimes people forget things?",
    "3": "Which do you think is more important to remember, a business meeting or a meeting with a friend?",
    "4": "Are there any things that are especially important for people to memorize?",
    "5": "Let’s move on from memory to family history. Why do people want to remember their family history?",
    "6": "What can you do to learn more about your family history?"
  },
  "Practice 29 (Money)": {
    "1": "Is money important to you?",
    "2": "What is the relationship between money and power?",
    "3": "Let’s move on to teaching children about money. How do you think parents can teach the value of money to their children?",
    "4": "Do you think it is important to teach children money skills?",
    "5": "Should we let children buy whatever they want with money they’ve saved?"
  },
  "Practice 31 (Music)": {
    "1": "What kind of music is popular in your country?",
    "2": "How does pop music now compare to when you were growing up?",
    "3": "Is foreign music or music from your country more popular with people your age?",
    "4": "Let’s move on to the role of government on music. Do you think is it necessary for the government to require all children to learn music?",
    "5": "Do you think the government needs to do more to preserve traditional music? What could they do?",
    "6": "Finally, let’s talk about illegal downloading of music. There's a lot of pirated music. Do you agree that we should support official music?",
    "7": "What are some possible advantages and disadvantages of being stricter about the illegal downloading of music?",
    "8": "Do you think CDs will have any role in the music industry in the future?"
  },
  "Practice 32 (News)": {
    "1": "How do people get their news in today’s society?",
    "2": "How do you think people will get their news in the future?",
    "3": "How does modern technology affect the delivery of news?",
    "4": "Do you believe everything you read in the newspaper?",
    "5": "Let’s move on to the topic of good news. In your opinion, when do people share good news?",
    "6": "How do people share good news?"
  },
  "Practice 33 (Parenting)": {
    "1": "For parents, what is important when bringing up their children?",
    "2": "Do you think mothers and fathers have different roles to play in bringing up a child?",
    "3": "Let’s move on to education of children. Do you think hitting children is sometimes necessary for discipline?",
    "4": "Do you think sweets are a good thing to reward children with?",
    "5": "Do you think parents spend too much on buying toys for their children?"
  },
  "Practice 34 (Party)": {
    "1": "When do people usually have parties in your country?",
    "2": "What makes a good party?",
    "3": "What are the main reasons why people organise family parties in your country?",
    "4": "In some places people spend a lot of money on parties that celebrate special family events. Is this ever true in your country? Do think this is a good trend or a bad trend?",
    "5": "How important is it to celebrate important events with a group of people?",
    "6": "Why do some people think that national celebrations are a waste of government money? Do you agree or disagree with this view? Why?"
  },
  "Practice 35 (Plans)": {
    "1": "In general, do you think planning is important?",
    "2": "Do you think people should make highly detailed plans or just general plans?",
    "3": "What types of people like to make plans?",
    "4": "Why do you think some people dislike making plans?",
    "5": "Let’s move on from planning to career plans. Do you think it's important for a person to have a career plan?",
    "6": "How do most people plan their futures in their education and careers?",
    "7": "Do you think it's important for young people to get advice from their parents when planning a career?"
  },
  "Practice 36 (Products)": {
    "1": "What kinds of products are mostly imported into your country?",
    "2": "In your opinion, why do some people like to buy imported products?",
    "3": "Let’s move on to local products. What are some famous local products in your country?",
    "4": "Do you think a country should make everything it needs or import some things?",
    "5": "What are the disadvantages of a country producing everything it needs?",
    "6": "Finally, let’s talk about globalisation. Do you think the globalisation of industries and commerce is a good thing?",
    "7": "What are the impacts of globalization on international trade?"
  },
  "Practice 37 (Restaurants)": {
    "1": "Do many people eat in restaurants in your country?",
    "2": "Why do some people enjoy eating out?",
    "3": "Is it expensive to eat out in your country?",
    "4": "Let’s move on from eating in restaurants to cooking at home. Do you like to cook at home?",
    "5": "Nowadays, more and more people are unwilling to cook. Why is this happening?",
    "6": "What’s the difference between restaurant food and home-cooked food?"
  },
  "Practice 38 (Rules)": {
    "1": "Why do we have rules in society?",
    "2": "Do you think it's necessary to set up rules about overworking people?",
    "3": "What are some examples of rules that exist in many families?",
    "4": "What are some rules that exist in schools or workplaces in your country?",
    "5": "Do you think that the students themselves should have a say in what kinds of school rules there are?"
  },
  "Practice 39 (School)": {
    "1": "Is higher education too expensive in your country?",
    "2": "Should all students pay for their university education?",
    "3": "Can you compare the education your parents had with the education that you received?",
    "4": "What changes do you think will happen in the classrooms of the near future?",
    "5": "Let’s move on to university education. What advantages do universities bring to society?",
    "6": "Which is more important, research or teaching?",
    "7": "What makes a good university student?"
  },
  "Practice 40 (Science)": {
    "1": "Do you think science is important?",
    "2": "Do you think science can change our society?",
    "3": "Which area of science has been the most important in the last one hundred years?",
    "4": "Let’s move on to talk about inventions. What do you think have been some of the most important inventions in the past 100 years or so?",
    "5": "Why do you think some inventions have not been successful in the marketplace?",
    "6": "Do you think it's good that new inventions are appearing so often?",
    "7": "Do you think there will be any negative effects resulting from future technology?"
  },
  "Practice 41 (Shopping)": {
    "1": "Is shopping a popular activity in your country?",
    "2": "How have shopping habits changed over recent years?",
    "3": "To what extent do you think advertising affects the way people shop?",
    "4": "Do you think shopping habits are likely to change in the future?",
    "5": "Why do some people prefer to purchase brand name products produced abroad?",
    "6": "Is service better in large shops or in small shops?",
    "7": "What do people do when they get bad service?"
  },
  "Practice 42 (Social problems)": {
    "1": "What social problems are there in your country?",
    "2": "What about poverty? What can be done to alleviate poverty?",
    "3": "Are there many charities in your country?",
    "4": "Let’s move on to talk about the overpopulation problem. Why do so many people move to live in cities?",
    "5": "What problems does overpopulation cause?",
    "6": "Finally, let’s talk about crime. What is the difference between major and minor crime?",
    "7": "Do you think all criminals should go to prison?"
  },
  "Practice 43 (Sports)": {
    "1": "What types of sports are popular in your country?",
    "2": "Do you think the types of sports that are popular will change in the future?",
    "3": "Let’s move on to talk about some positive aspects of sports. In your opinion, what are the benefits of playing a sport?",
    "4": "What about cultural aspects? How can sports bring people from different countries closer together?",
    "5": "Do you think old people can keep fit by playing sports or exercising?",
    "6": "Finally, let’s talk about Olympic Games. How are the Olympic players trained in your country? Do they usually start training when they are born?",
    "7": "Why would somebody dislike watching the Olympic Games?"
  },
  "Practice 44 (Teacher)": {
    "1": "How well-respected are teachers in your society?",
    "2": "Do you think teachers get paid enough money in your country?",
    "3": "What role should the teacher have in the classroom?",
    "4": "In your opinion, what are the most important qualities for a good teacher to have?",
    "5": "Let’s move on to teaching aspects. In your opinion, how can a teacher make lessons for children more interesting?",
    "6": "Do you think computers will one day replace teachers in the classroom?"
  },
  "Practice 45 (Things)": {
    "1": "What kinds of possessions are considered high-status to people in your country?",
    "2": "Were different possessions thought of as valuable in the past?",
    "3": "Why do you think people need to show their status in society?",
    "4": "Let’s move on to the role of advertising. Do you think advertising influences what people buy?",
    "5": "Do advertisements give correct information, or do they encourage people to buy things that they may not need?",
    "6": "Is advertising really necessary in modern society?"
  },
  "Practice 46 (Traditional products)": {
    "1": "What different types of traditional products are produced in your country?",
    "2": "In you opinion, why do traditional products attract tourists?",
    "3": "Do you think there are benefits of traditional products to locals?",
    "4": "Do you think the government should help in the promotion of traditional products?",
    "5": "Let’s move on from traditional products to traditions. Do you think because of globalization countries are adopting each other traditions.",
    "6": "Did the traditional things of the past are of better quality than present day things?",
    "7": "Do you think it is necessary to protect traditions?"
  },
  "Practice 47 (Transportation)": {
    "1": "Have the types of transportation people use changed much over the last few decades?",
    "2": "How has transportation improved in recent years?",
    "3": "Do you think transportation is likely to continue to improve in the future?",
    "4": "What is your take on introducing transportation passes?",
    "5": "Let’s move on to the transportation system in your country. It is faster to travel by public transportation or by car in your country?",
    "6": "What are the impacts of Uber on transportation in your country?"
  },
  "Practice 48 (Travel)": {
    "1": "Why do some people prefer to travel abroad rather than travel in their own country?",
    "2": "Do you think traveling to another country can change the way that people think?",
    "3": "Do you think it’s safer to travel today than in the past?",
    "4": "Let’s move on to tourism. What are some famous tourist spots in your country?",
    "5": "What are the positive impacts of tourism in your country?",
    "6": "What are the negative impacts of tourism in your country?",
    "7": "What can you say about the future of the tourism industry in your country?"
  },
  "Practice 49 (TV)": {
    "1": "Tell me about the types of programmes that are generally on television in your country.",
    "2": "Do you think state or private television is better?",
    "3": "Let’s move on from TV programmes to television in general. How has TV changed our lives?",
    "4": "Do you think TV influences the way we think?",
    "5": "Should children be allowed to watch a lot of TV?",
    "6": "Are all people on TV famous?"
  },
  "Practice 50 (Vegetables)": {
    "1": "What vegetables are common in your country?",
    "2": "Do people like to grow vegetables in your country?",
    "3": "How do people feel when they eat vegetables that they grew on their own?",
    "4": "Let’s move on to the topic of organic vegetables. As we know organic fruits and vegetables are more expensive than conventional fruits and vegetables, but they are actually worth the extra cost. Do you think organic fruit deserves a higher price?",
    "5": "Do you think the government should encourage farmers to grow more organic vegetables?"
  },
  "Practice 51 (Work)": {
    "1": "Do you think job satisfaction is more important than your salary when choosing a job?",
    "2": "What skills do you think are needed to get a good job these days?",
    "3": "Do you think that women should be able to do the same jobs as men?",
    "4": "What’s the difference between white collar and blue collar jobs?",
    "5": "What jobs do you think are most valuable to society?"
  }
};
const dataset = {
  part1,
  part2,
  part3
};
if (!Array) {
  const _component_path = common_vendor.resolveComponent("path");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_component_path + _component_svg)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const recordingTime = common_vendor.ref(0);
    const isRecording = common_vendor.ref(false);
    const selectedTopic = common_vendor.ref("");
    const topics = common_vendor.ref([]);
    const currentType = common_vendor.computed(() => store.state.currentType);
    const currentTopic = common_vendor.computed(() => store.state.currentTopic);
    const questions = common_vendor.computed(() => store.state.questions);
    const currentIndex = common_vendor.computed(() => store.state.currentIndex);
    const evaluation = common_vendor.computed(() => store.state.evaluation);
    const currentQuestion = common_vendor.computed(() => store.getters.currentQuestion);
    common_vendor.computed(() => store.getters.progress);
    const isFinished = common_vendor.computed(() => store.getters.isFinished);
    const practiceTypes = common_vendor.computed(() => config.config.practiceTypes);
    common_vendor.onMounted(() => {
      utils_recorder.recorder.init();
      const type = "part1";
      topics.value = Object.keys(dataset[type]);
    });
    const onTypeChange = (type) => {
      topics.value = Object.keys(dataset[type]);
      if (topics.value.length > 0) {
        store.dispatch("setType", {
          type
        });
      }
    };
    const onTopicChange = async (event) => {
      const index = event.detail.value;
      if (topics.value.length > 0) {
        selectedTopic.value = topics.value[index];
        store.dispatch("setType", {
          type: currentType.value
        });
        store.dispatch("setTopic", {
          topic: selectedTopic.value,
          questions: Object.values(dataset[currentType.value][selectedTopic.value])
        });
      }
    };
    const handleRecord = async () => {
      if (isRecording.value) {
        isRecording.value = false;
        const { filePath, duration } = await utils_recorder.recorder.stop();
        const text = await api_index.api.speechToText(filePath);
        await store.dispatch("submitAnswer", {
          audioPath: filePath,
          text
        });
        if (isFinished.value) {
          await store.dispatch("submitEvaluation");
        }
      } else {
        isRecording.value = true;
        await utils_recorder.recorder.start();
        recordingTime.value = 0;
        setInterval(() => {
          recordingTime.value = utils_recorder.recorder.getCurrentTime();
        }, 1e3);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(practiceTypes.value, (type, k0, i0) => {
          return {
            a: common_vendor.t(type.toUpperCase()),
            b: type,
            c: common_vendor.n({
              active: currentType.value === type
            }),
            d: common_vendor.o(($event) => onTypeChange(type), type)
          };
        }),
        b: common_vendor.t(currentTopic.value || "Choose a topic"),
        c: common_vendor.p({
          d: "M7 10l5 5 5-5z"
        }),
        d: common_vendor.p({
          viewBox: "0 0 24 24"
        }),
        e: topics.value,
        f: common_vendor.o(onTopicChange),
        g: currentQuestion.value
      }, currentQuestion.value ? {
        h: common_vendor.t(currentQuestion.value),
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(questions.value.length)
      } : {}, {
        k: common_vendor.t(isRecording.value ? `Recording... ${recordingTime.value}s` : "Start"),
        l: isRecording.value ? 1 : "",
        m: common_vendor.o(handleRecord),
        n: evaluation.value
      }, evaluation.value ? {
        o: common_vendor.t(evaluation.value.score),
        p: common_vendor.t(evaluation.value.feedback)
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
