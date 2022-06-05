### TV-SHOWS-BROWSER

This is a MERN stack application that uses both third-party API calls, and users from the database.

### Project Description

On the first mount list of the current most popular tv shows is shown on the screen. Users can change the list by clicking the buttons "NEW" or "TOP RATED" or by clicking the value in the search bar. Users can always come back to this page by clicking the "HOME" button. Users can enter any single tv show's page just by clicking the show's icon, where they can see details like images, and actors. There is also another list of recommended tv shows on that page. If the user is registered he can add that show to his favorites list by clicking the button"Add to my Watchlist". Every registered user has a list of his favorites. On the favorites page, the user can delete any show from the list by clicking the "Remove" button. On the single tv show page user can enter the episodes list by clicking the buttons "Number of seasons" or "Number of episodes".

On the backend side for creating the users I used Node.js with the Express framework. Users are stored in the MongoDB database. On the front I used React.js, and for managing the global state I used Redux. For testing, I mostly used Redux dev tools. For style, I mostly used css, and add some bootstrap and material-ui.

If you want to clone and use only the front-end side of this project you must have your TMDB API key. If you want to clone the full app, you must have your MongoDB URL connection, and you must create your json web token secret and expiration date.
