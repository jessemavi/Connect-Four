Connect-Four Game

Requirements:
- node.js
- yarn or npm package managers

Running the application:
- cd into "connect-four"
- run "yarn install" or "npm install" to install dependencies
- run "yarn start" or "npm start"
- navigate to localhost:3000 in a browser
- click on the 'Start Game' button to select a color for player 1
- click anywhere in a column to place a disc in that column


Summary:
I separated the game into three components. One was the parent component App which keeps track of what is happening in the game in its state and passed these values down as props to its children. One child component is GameTracker which displays the current state of the game and what player's turn it is and who wins a game or if the game ends with no winner. The other child component is GameGrid which has all the logic of the grid so only keeps the current representation of the grid in its state and nothing else.

Looking more closely into the GameGrid component I created a grid with 6 rows and 7 columns. The dropDisc function drops a disc into a space and then I check if there is a winner in all four directions: vertically, horizontally, diagonally down and to the right and diagonally down and to the left.

The functions for checking horizontally and vertically are similar and what I'm doing is starting at the second space in that row or column and just checking if the current value matches the one before and if it reaches four in a row there is a winner. Since I'm starting at the second space in a row or column I initialize the count to 1 instead of 0.

The functions to check diagonally are more complex. What I do is go to the space where I want to start. An example is if I am checking diagonally left and the space where a disc has been added is the bottom left corner I want to start checking at the top right corner so the function first finds that spot and then iterates down and to the left checking for four in a row. I am keeping track of the color at the current spot and am resetting in any case where the current value is not that color. 

I also have a "getDerivedStateFromProps" function in the GameGrid component. When a game has been won or when there isn't a winner a button appears to start another game. When this button is pressed is when I wanted to clear the grid. When a game has been won players should still be able to see the grid and the winning four spaces and then when they are ready to start again, they can do so by pressing a button which clears everything.

There are a couple of places where I used an async function and await on updating state and that was so that the page first displayed the current game status and then updated it.
