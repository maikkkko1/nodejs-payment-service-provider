# Payment Service Provider Service

##### Payment Service Provider or PSP is a payments service based on Pagar.me. Initialy developed to learn more about how payments works in Brazil.

## Context
##### The PSP service has basically two very important functions:
* Allow clients to process "cash-in" transactions.
* Make receivables payments to the customers ("cash-out").

#### We have two entities that represent this information:
* **transactions** - Representing purchase information, card details, value, etc.
* **payables** - Representing receivables to be paid to the customer.

> Note: When a customer passes a credit transaction, they typically receive the average value only 30 days later (called D+30), because that's how the financial chain (banks, flags, acquirers) works.

## How to use

#### The service was written using Node.js and MySQL, so you will need to have both of these dependencies installed before you can start.

#### If you already have all the dependencies installed, follow the steps below:

1. Clone this repository to your local environment.
2. Duplicate the .env-example file and rename his copy to just .env
3. In the .env file, set the host, db_user and db_pass according to your MySQL configs.

#### Open the terminal and in the project root: 

```
npm install
npm test
npm run dev
```

#### At this point, the application should be working fine and must have already created the database schema.
#### So now we have to run our migrations to create the database tables.

```
npx sequelize db:migrate
npm run dev
```

#### 
The database and tables should now be created.

## APIs

#### Creates a payment and his payables (cash-in).
```javascript
POST /api/v1/transaction/payment
```

