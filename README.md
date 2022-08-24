# GitHub API Coding Challenge
Search your favorite repositories from GitHub and save them to a reposerver.
- [x] searches the [GitHub API](https://docs.github.com/en/rest)
- [x] autocomplete search
- [x] displays name, description, language, and stars visible
- [x] save up to 10 repos to the reposerver
- [x] can remove saved repos from the reposever
- [x] list view of saved repos with options to sort by date or stars


## Run in Docker
1. Clone this project and ```cd``` into it
2. ```docker-compose up```
3. The app should be running at :3000, with the backend listening at :8080

The image for this application is here: https://hub.docker.com/repository/docker/sarahyucodes/github-api-coding-challenge


## Technology
I built this project using [create-react-app](https://create-react-app.dev/) and [React Redux](https://react-redux.js.org/)/[React Toolkit](https://redux-toolkit.js.org/). For styling, I used [Tailwind CSS](https://tailwindcss.com/), which I like for its utility cases and how quickly it allows me to spin up simple and clean user interfaces. For testing, I am using [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) (pre-packaged with create-react-app).


## Third Party Libraries
- [octokit/plugin-rest-endpoing-methods](https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/master/docs/users/getAuthenticated.md): I found this to be an easy way to access GitHub API endpoints. This library utilizes recommend best practices and has 100% test coverage.
- [date-fns](https://date-fns.org/): Simple way to parse ISO date strings and format them in a readable way.


## Assumptions & Notes
- I am only showing the first 5 results from the autocomplete search, sorted in descending order by stars. Since the requirement was to be able to select repositories from a dropdown, I did not want to make the dropdown too tall. I'm assuming that the user would be searching for popular repositories, and if not, hopefully a more exact search will bring up the intended repository in the results.
- In order to avoid rate limiting issues with the GitHub API, I implemented a debounce function so that the we don't make API calls for every character typed.
- Saving a repositories from the search dropdown turns the "Save" button blue, changes the text to "Saved", and disables the button so that the user cannot try to save the same repository twice.
- There are error messages for non-successful statuses and empty data states.


## Known Issues
- Not sure why fetchFavorites() is getting called twice.
- Could definitely spend more time refactoring and optimizing performance, prevent unncessary re-rendering of components, etc.
- Currently at 56.98% test coverage; admittedly, I do not have much experience writing tests and could not figure out how to write integration tests for this app given the time restraints of this coding challenge. I have manually tested the logic and functionality of my application as well as the basic responsiveness of it.
