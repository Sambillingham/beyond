# Beyond Conference 2015
Beyond is a one day conference to inspire, motivate and support those just starting out in web development.

## Setup
Install development dependencies -
```
npm install
gem install jekyll
```
## Dev
Launch the site for development. Compile Sass, Lint JS and live reload with Browsersync.
```
gulp dev
```

## Production

Prepare the site for production -
```
gulp build
 ```
Production ready site will be generated in '\_site/' folder. Open and check index.html.

When ready push to gh-pages branch with:

```
gulp deploy --m 'Commit message'
```
