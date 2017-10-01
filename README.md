# bitcoinpages

- Search engine for Classified Ads with chat integration and Bitcoin payment 
- Showcase just to see what you are running

## Features

### Security

- SQL injection protection with parameterized SQL queries
- SQL injection protection using risingstack/protect
- Prepared for rate limit protection per API calls
- Bcrypt password hashing, Javascript Web Token (JWT)
- Automatic https using Letsencrypt & docker socks

### Coding

- Complete boilerplate, frontend, backend, ES6
- Backend & frontend tests using karma, mocha & sinon-chai
- Lint with AirBnb coding style
- Hot reload for front & tests 
- Next-gen. material-design-components for the web
- Modern VueJS framework
- Webpack including Babel, SASS loader
- Docker build and lauch from GitHub

## Application

- Responsive Material design
- Ghost Blog engine as a middleware
- ConverseJS XMPP Chat embeded
- Google Place API

## Setup, test & usage

### devel

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run build

# build for production
npm run dev

# run lint
npm run lint

# run unit tests
npm run test-frontend
npm run test-backkend
```

### production

``` bash
docker-compose up -d
```