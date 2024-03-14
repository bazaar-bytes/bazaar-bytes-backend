# BazaarBytes REST API


## REST API for a BazaarBytes app.

This repo implements the backend REST API (built in Express + MongoDB).
A repository for the frontend (React App) can be found here: [BazaarBytes_Frontend](https://github.com/bazaar-bytes/bazaar-bytes-frontend)



## API Endpoints
### Auth Endpoints

| Endpoint             | Method | Description                                                      | Request Header                                               | Request Body                                                |
|----------------------|--------|------------------------------------------------------------------|--------------------------------------------------------------|-------------------------------------------------------------|
| `/auth/signup`      | POST   | Creates a new user in the database                              | Content-Type: application/json                               | `{ "email": "mickey@disneyland.com", "password": "topSecr3t", "name": "Mickey Mouse" }` |
| `/auth/login`       | POST   | Verifies email and password and returns a JWT                   | Content-Type: application/json                               | `{ "email": "", "password": "" }` |
| `/auth/verify`      | GET    | Used to verify JWT stored on the client                         | Authorization: Bearer \<JWT Token> (if JWT token is stored) |   N/A                                                      |

### Cart Endpoints
| Endpoint                             | Method | Description                                                   | Request Header                                               | Request Body                                           |
|--------------------------------------|--------|---------------------------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------|
| `/cart`                             | GET    | Retrieves cart items for the authenticated user              | Authorization: Bearer \<JWT Token>                        | N/A                                                    |
| `/cart`                             | POST   | Adds a new item to the user's cart                           | Authorization: Bearer \<JWT Token> <br>Content-Type: application/json | `{ "product": "product_id" }`                        |
| `/cart/:productId`                  | DELETE | Removes all instances of a specific product from the cart     | Authorization: Bearer \<JWT Token>                        | N/A                                                    |
| `/cart/reduceQuantity/:id`          | DELETE | Removes one instance of a specific product from the cart      | Authorization: Bearer \<JWT Token>                        | N/A                                                    |
| `/cart`                             | DELETE | Clears the user's entire cart                                 | Authorization: Bearer \<JWT Token>                        | N/A                                                    |

### Products Endpoints

| Endpoint                          | Method | Description                                              | Request Header                                              | Request Body                                           |
|-----------------------------------|--------|----------------------------------------------------------|-------------------------------------------------------------|--------------------------------------------------------|
| `/products`                       | GET    | Retrieves all products                                   | N/A                                                         | N/A                                                    |
| `/products/search?q={searchQuery}` | GET    | Searches for products based on a query                   | N/A                                                         | N/A                                                    |
| `/products/:productId`            | GET    | Retrieves a specific product by ID                       | N/A                                                         | N/A                                                    |
| `/my-products`                    | GET    | Retrieves products created by the authenticated user     | Authorization: Bearer \<JWT Token>                         | N/A                                                    |
| `/products`                       | POST   | Creates a new product                                    | Authorization: Bearer \<JWT Token> <br>Content-Type: application/json | `{ "name": "", "description": "", "price": "", "image": "", "category": "", "createdBy": "" }` |
| `/products/:productId`            | PUT    | Updates a specific product by ID                        | Authorization: Bearer \<JWT Token> <br>Content-Type: application/json | `{ "name": "", "description": "", "price": "", "image": "", "category": "", "createdBy": "" }` |
| `/products/:productId`            | DELETE | Deletes a specific product by ID                         | Authorization: Bearer \<JWT Token>                         | N/A                                                    |

### Stripe Endpoint

| Endpoint                               | Method | Description                                               | Request Header                                          | Request Body                                   |
|----------------------------------------|--------|-----------------------------------------------------------|---------------------------------------------------------|-----------------------------------------------|
| `/create-checkout-session`             | POST   | Creates a checkout session for processing payments        | Authorization: Bearer \<JWT Token> <br>Content-Type: application/json | `[{ "product": { "name": "", "price": "" }, "quantity": "" }]` |

## Demo
Find our app here:[BazaarBytes](https://bazaar-bytes.netlify.app)
