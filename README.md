# Tic Tac Toe Game

A simple, interactive Tic Tac Toe game built with HTML, CSS, and JavaScript.

## How to Play

1. Open `index.html` in any modern web browser
2. The game starts with Player X's turn
3. Click on any empty cell to make your move
4. Players alternate turns (X and O)
5. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins
6. If all cells are filled without a winner, the game ends in a draw
7. Click "Reset Game" to start a new game

## Features

- **Interactive Game Board**: Click on cells to make moves
- **Turn Indicator**: Shows whose turn it is
- **Win Detection**: Automatically detects when a player wins
- **Draw Detection**: Recognizes when the game ends in a tie
- **Visual Feedback**: Winning cells are highlighted in green
- **Game Reset**: Start a new game at any time
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Hover effects and transitions for better user experience

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `script.js` - Game logic and functionality

## Technical Details

The game is implemented using:
- **HTML**: Structure and semantic markup
- **CSS**: Modern styling with grid layout and CSS gradients
- **JavaScript**: ES6 classes and event-driven programming

### Game Logic

- Uses a 3x3 array to represent the game board
- Implements win detection by checking all possible winning combinations
- Handles player turns and move validation
- Provides visual feedback for game state changes

## Browser Compatibility

This game works in all modern browsers that support:
- CSS Grid
- ES6 Classes
- Modern JavaScript features

No external dependencies or frameworks required.