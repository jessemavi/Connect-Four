Here is the challenge:

Create a two-player Connect Four game. (Connect Four is a two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.)


A few things to keep in mind when working on the challenge:

- Develop it as a web page. A user should be able to run the game by opening it in a web browser without any errors.
- Keep the code simple, readable and structured.
- Please include a quick summary of your thought process of your code and the efficiency of your solution.
- Add the steps to run the application in a readme.md file.
- Please send the completed application in a compressed file to the link provided in the email.  
- Once you submit your code, you cannot make any additional edits.

 


Plan:
Player 1 selects color
Player 2 selects color

Frontend:
- App component: function passed down as props to Grid to show which player has next move. Changes state and data is passed down to Player

- Player tracker component: shows which player is making the next move with a colored circle outline.

- Grid component:
- Create grid in semantic-ui react containing circle and circle-outline icons
- Each space has a variable for what color disc is currently there
- Keep a grid in state to keep track of all moves and have ui grid use state values
- Icon can only be clicked once. Use a flag variable set to false in which if false, you can place a disc there. When a disc is placed set variable to true. Or use state and a grid to keep variable in.
- When a player has won, display a modal and reset game


Logic:
Create a grid with rows and columns
When a space on the grid is clicked and a disc is dropped
- place disk at the lowest empty spot in the grid column 
- check for four in a row of that color in a path including the spot where disc is dropped
- column going down
- row going left to right
- diagonally down to the right if possible
- diagonally down to the left if possible


[
  [0,0,0,0,0,0,0],
  [2,0,0,0,0,0,0],
  [0,0,0,1,0,0,0],
  [0,0,2,2,1,0,0],
  [2,2,1,1,2,0,2],
  [1,1,1,2,0,0,1]
]


If looking at [2,3] position and checking diagonally:
- subtract row from column(3 - 2 = 1) and that is starting column on first row going diagonally down to the right
- (3 + 2 = 5) so start at [0, 5] for searching diagonally down to the left


If looking at [4,1] position:
- (1 - 4 = -3) so can't start searching going diagonally down to the right
- (1 + 4 = 5) so start at [0, 5] for searching diagonally down to the left

If looking at [3, 5]
- (5 - 3 = 2) so start at [0,2] for searching down to the right
- (5 + 3 = 8) so can't search going diagonally down to the left as column 8 is off the board(anything over column 6 is off the board)

