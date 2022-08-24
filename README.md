# GitHub API Coding Challenge
Search your favorite repositories from GitHub and save them to a reposerver.
- [x] searches the [GitHub API](https://docs.github.com/en/rest)
- [x] autocomplete search
- [x] displays name, description, language, and stars visible
- [x] save up to 10 repos to the reposerver
- [x] can remove saved repos from the reposever
- [x] list view of saved repos with options to sort by date or stars


## Technology
I built this project using [create-react-app](https://create-react-app.dev/) and [React Redux](https://react-redux.js.org/)/[React Toolkit](https://redux-toolkit.js.org/). For styling, I used [Tailwind CSS](https://tailwindcss.com/), which I like for its utility cases and how quickly it allows me to spin up simple and clean user interfaces.


## Assumptions & Notes
- I am only showing the first 5 results from the autocomplete search, sorted in descending order by stars. Since the requirement was to be able to select repositories from a dropdown, I did not want to make the dropdown too tall. I'm assuming that the user would be searching for popular repositories, and if not, hopefully a more exact search will bring up the intended repository in the results.
- In order to avoid rate limiting issues with the GitHub API, I implemented a debounce function so that the we don't make API calls for every character typed.
- Saving a repositories from the search dropdown turns the "Save" button blue, changes the text to "Saved", and disables the button so that the user cannot try to save the same repository twice.


## Third Party Libraries
### [octokit/plugin-rest-endpoing-methods](https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/master/docs/users/getAuthenticated.md)
I found this to be an easy way to access GitHub API endpoints. This library utilizes recommend best practices and has 100% test coverage.

### [Tailwind CSS](https://tailwindcss.com/)
I like using Tailwind CSS for its utility cases. It allows me to quickly spin up simple and clean web applications.

### [date-fns]()
Simple way to parse ISO date strings and format them in a readable way.


## Known Issues
- Not sure why fetchFavorites() is getting called twice
- Tests
