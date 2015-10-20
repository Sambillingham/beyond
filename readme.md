# Beyond Conference 2015
Beyond is a one day conference to inspire, motivate and support those just starting out in web development.

The Beyond Conference site is a Jekyll generated static site hosted on Github Pages. External dependencies are managed through NPM, Bower and Ruby Gems.

## Setup

To work on this project you will need the following tools installed on your machine

- [Node.js (including npm)](https://nodejs.org/en/)
- Ruby
- Git
- [Bower](https://github.com/bower/bower)

Before you can make changes to the project you will need to install a number of development dependencies

This project is built using [Jekyll](https://jekyllrb.com/) a static site generator. Install Jekyll by running the following command in the terminal.
```
gem install jekyll
```

The project uses Gulp as a build tool, along with a number of other dependencies that are controlled via npm. You can see a full list of the dependencies controlled via npm in the `package.json` file.
```
npm install
```

A further set of dependencies are controlled via bower these are client-side JS & CSS dependencies such a jQuery or bourbon.
```
bower install
```

## Development
Ensure you have installed all of the dependencies listed in **setup** before continuing.

### Running the project locally
Launch the site for development. When start the project in development a number of tasks will be performed for you.

- The site will be compiled through Jekyll - rather interacting with the Jekyll gem directly using the command line like the documentation suggests we use gulp to do this for us.
- Sass files will be compiled, ran through auto prefixer to add any vendor prefixes.
- Javascript files will be linted for errors, transpiled using Babel, bundled together into one file with Browserify.
- A local server will be started and a browser window opened at the index page.
- A watch task will be started that allows Gulp to re-perfom any of these tasks when you make changes to files so you don't have to keep starting gulp it will keep running and wait for changes.
- When making changes to CSS+JS BrowserSync is able to inject these into the page without reloaded however when making changes to the HTML you will see the page refresh automatically for you

Start the site in development with gulp:
```
gulp dev
```

To launch Jekyll with draft posts enabled run gulp dev with the --drafts flag
```
gulp dev --drafts
```

### Bower
Bower is a dependency manager. When using Bower there is no need to check in dependencies to source control and individual dependencies can easily be updated when necessary.

Install new dependencies with `bower install name` most vendors list bower as a method of installation, a list of the current dependencies for the project are stored in `bower.json`. The dependencies downloaded are stored in the `bower_components` folder that is ignored by github but used through the project just like any another.

#### Browserify Shim
To allow some third party modules/plugins to work such as fitvids that expects `$` to be defined globally. We can use the shim that ids included, as normally browserify will not allow anything to pollute the global scope. Files that need to be shimmed are listed in the `package.json`, they still need to be included in the JS file via an import.

## Production

To prepare the site for production there is a slightly different set of tasks that minifies the JS/CSS while also cleaning folders so only strickly necessary files remain. The watch task is not started and no local server is initalized.  

```
gulp build
```
The production ready site will be generated in `_site/` folder. Check the production version of the site was generated correctly.
```
gulp serve
```
if everything looks good you can deploy this build.

## Deploying to Github Pages
Deploy the contents of `_site/` to Github Pages with an optional message for this version
```
gulp deploy --m 'Commit message'
```
