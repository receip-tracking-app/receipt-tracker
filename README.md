# receipt-tracker

## Our application allows a user to easly track receipts

## API endpoints

| Method | Endpoint      | Description                                                                                                                                 |
| ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database. |
|        |

| POST | /api/login | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id.
|
| POST | /api/receipt | Creates a receipt for the user with the specified id using information sent inside of the `request body`.

| GET | /api/logedinuser | Returns the user with the specified id. |

| GET | /api/receipts | If the user is logged in, respond with an array of all the receipts associated with the user with the specified id.
|
| GET | /api/receipts/:id | Returns the receipt with the specified id for the specified user .
|  
| GET | /api/logout | Leaving the session by the user.
|

| PUT | /api/receipt/:id | Updates the receipt with the specified `id` for the specified user using data from the `request body`. Returns the modified document, **NOT the original**.
|  
| DELETE | /api/receipt/:id | Removes the receipt with the specified id for the specified user.

#### Endpoint Specifications

When the client makes a `GET` request to `/api/receipts`, use the following optional query parametrs to perform the search:

-   `merchant`
-   `amountspent`
-   `category`
-   `date`

### users

```javascript
{
}
```

### receipts

```javascript
{
}
```
