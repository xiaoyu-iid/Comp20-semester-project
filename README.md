# Proposal for COMP20 Final Group Project

By: Siming Chen, Xiaoyu Shi, Jailu Wei, Tianyu Zhu


## Project title: 

Shapes Pop!

## Problem statement:

You want to teach your 2-5 year old kids how to learn colors and shapes in a fun way (and colors, animals, or other things). 


## How do we solve the problem:

Play our game and get more knowledge about geometry (or other items). For example, for shapes, there will be randomized, color-popping, sparkly shapes falling from the sky for your children to match, and you can find out about your ranking in your area!


## Features that our team will implement:

- We will collect user performance data (including scores, progress in the game, etc.) on the server. 
        
        Utilizing: Server-side data persistence
- We would ask for user’s Google accounts for secure log-in. 
        
        Utilizing: use Google Identity Platform API
        (NOTE: This one is optional, we will decide how much user's personal information we need to use when we implement the score ranking. )
- We will store user's progress, as well as user-selected username and profile pictures(if we implement user login) locally. 
         
        Utilizing: Client-side data persistence 
- We would create the game with a Javascript API. We will provide fancy animations of shapes falling and popping after being matched. 

        Utilizing: JavaScript API for games (Phaser.io)
- We will rank users after each game among all players in your area!
        
        Utilizing: Geolocation
- We will present scores and ranking to the user after each game. 

        Utilizing: Reporting with charts and graphs 
        
        
## What data will your prototype be using and collecting:

- Collect and store the users' scores.
- Collect and store nearby players’ scores according to the user’s geolocation.
- Locally store the user’s username and profile photo(optional).


## Algorithms or special techniques that will be necessary:

- Matching algorithm: When the player clicks on a shape, it is considered “shot.” We then check if the properties (shape/color) of the shot shape matches the current randomly selected properties displayed on screen. If it’s a match, then the player scores. If not, then there’s a penalty.
- Sorting algorithm to present user's personal scores and his/her ranking in the area.


## Electronic mockups

![Mockup 1 - login page](https://github.com/tuftsdev/comp20-f2016-team8/blob/master/proposal-mockup/Mockup%201.png)
![Mockup 2 - begin games](https://github.com/tuftsdev/comp20-f2016-team8/blob/master/proposal-mockup/Mockup%202.png)
![Mockup 3 - game](https://github.com/tuftsdev/comp20-f2016-team8/blob/master/proposal-mockup/Mockup%203.png)
![Mockup 4 - scores & ranking](https://github.com/tuftsdev/comp20-f2016-team8/blob/master/proposal-mockup/Mockup%204.png)

#Comments by Ming
* Yes, we talked about this.  One thing missing: how will you be generating the shapes and cute animals to use in the game?
