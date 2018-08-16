## api-portal

Api-Portal acts as an bridge between Api consumer and Api provider. Where Api providers is an our organization building APIs for either internal or external consumption and the consumers are the developers consumering these APIs.

* REMEMBER TO UPDATE THIS DOCUMENTATION FOR YOUR NEW APPLICATION!!! *

### Getting Started

First Start: 

Rename the file `.env.example` to `.env` and change configurations as necessary. 

In your terminal or command line run:

    npm install 

#### Starting The Application

To start the application in dev mode use the command: 

    npm run start

The application should then be available at [http://localhost:3004/api-portal/example](http://localhost:3004/api-portal/example).

To start the application in production mode, use the command:

    npm run start:prod

#### Running Tests

To run tests: 

    npm run test

To run tests with coverage:

    npm run test:cov

To run tests in watch mode:

    npm run test:watch
