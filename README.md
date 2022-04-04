# Front End Capstone: What's The Vibe?

This is my front-end capstone project for Nashville Software School. The app allows the user to find and listen to songs based on a certain mood. It also allows for the user to favorite songs to their personal favorites and also add songs to either mood for other users to see and/or listen to.

# Features

This app allows users to find, listen, and upload songs based on a mood. <br />
Features include:
* A happy, sad, and favorites pages
* The happy and sad pages show the user songs that generally go with that mood
* A favorite button on each song to favorite them and have them show up on the favorites page.
* A Spotify logo button on each song to send the user to Spotify so they can listen to it
* An add song button on the favorites page allowing you to add a song to either the happy or sad pages.

# Setup

1. First, you'll need to clone the project to your machine:
```
$ git clone git@github.com:laurabethmaddox/whats-the-vibe.git
```
2. Cd into the directory
```
cd whats-the-vibe
```
3. Next, run this in your terminal:
```
npm install
npm start
```
4. In order for the application to run as it's intended to you will need to open up a new tab in your terminal and run: 
```
cd
cd workspace
cd whats-the-vibe
cd api
json-server -p 8088 database.json
```
