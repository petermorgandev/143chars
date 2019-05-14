# Changes

## 5/14/19
* Nested routes

## 5/9/19
* Added API POST route for /new/message

## 5/6/19
* Seperated routes into routes/api.js and routes/server.js

## 5/5/19
* Began implementation of API:
  * Added cors via NPM
  * Added initial API routes
  * Added morgan via NPM for additional logging

## 5/4/19
* Added authentication to /delete routes.
  * Users cannot delete other users' messages or accounts.
* Settings page update:
  * Users can now delete all of their messages
  * Users can now delete their account (and all of their messages)
* Users can now delete individual messages

## 5/2/19
* Fixed Bootstrap container issue
* Navbar now visible on small viewport

## 4/28/19
* Added more SVG avatars
* Changed the page title and username displayed on the profile page to async/await
* Fixed oversight on Bootstrap implementation
* Integrated moment.js
* Moved navbar.pug to /includes
* Seperated avatar options to /includes/avatar.pug
* Switched navbar to dark theme
* Updated title on user profile page to display username
* Users can now change thier avatar and username

## 4/27/19
* Added SVG avatars
* Added number of messages on user profiles
* Established relation between Message and User models
* Fixed issue with login
* Implemented user avatars
* Messages now show usernames and avatars
* Switched from Skeleton to Bootstrap

## 4/25/19
* Added content to views
* Added date to display of messages
* Added middleware to restrict access to pages if visitor is logged in or not
* All messages are displayed on the homepage
* Created Message model
* Created User model
* Date added to Message model
* Implemented session storing
* Messages are now displayed sorted by date
* Messages are now stored in the database
* Profile page implemented
* Worked on routes

## 4/24/18
* Added /views
* Defined initial routes