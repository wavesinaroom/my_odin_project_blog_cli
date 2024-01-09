# Blog CLI

## Description

Sometimes you want to just want to work on projects that match the way you work. In my case, I chose to change project requirements described in The Odin Project curriculum to explore terminal CLI, something that I love. 

I'm aware that following instructions and specifications is a crucial skill not just for working well in the programming world but for worklife in general. However, I've followed The Odin Project projects requirements mostly so far and now I want to create something different. Enough of ranting and let's talk about the Blog CLI.

The goal of this project is to get rid of the browser for a while and focus on developing a backend application for the terminal. Why? Because as I said before I love terminals and two because I want to explore node.js more deeply. I feel this is my first step in the backend development world I want to be in, instead of dedicating time and effort to sharpen HTML/CSS skills as a developer. Now, during project panning I discovered that once I'm done with The Odin Project I'm heading towards learning Python for backend developement. Anyway, I ranted again.

The blog CLI works like a conventional blog where an author posts his/her thoughts and a reader enjoys this content. They only interact, produce and edit content in the terminal be it blog entries or comments. The content itself is basically shown on the screen whereas the input will be controlled from the user's text editor of preference. There's gonna be just one author for this project who needs to login to take control of the content while normal user will just need to give a name or e-mail. So roles are defined like this:

1. Author
    * Creates, edits or deletes blog entries.
    * Chooses which blog posts are actually published.
    * Deletes comments
    
2. Reader
    * Adds comments to blog entries.
    * Edit those comments.

## Technologies

1. Node.js - Runtime environment
2. Express.js - Backend framework
3. MongoDB - Database
4. Mongoose, process, inquirer and jwt packages for simplifying code



