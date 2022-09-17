# GroceryStoreAPI
For testing purpose I have used REST Client Extension in VS Code, we can send requests
with file request.rest in project

I have connected my db to local Mongo however MongoDb Atlas URI is also there commented 
I have made API's such that all requests have Content-Type: application/json

Phone number acts as a primary key for customer account so it is required for 
every request to fetch and store specific customer data

Deployed at https://new-grocerystore-api.herokuapp.com/
right now .env file is not visible however it only contains mongo atlas uri 
All req data is in json 

Routes are as follows :

1. to get all the customers :
GET http://localhost:8000/customers


2. to Add a new customer to the database :
   POST http://localhost:8000/customers
   * req fields : {name, email, phone}


3. to get specific customer orders :
   GET  http://localhost:8000/customers/orders
   * req fields : {phone}


4. to get customer with max orders :
   GET http://localhost:8000/customers/maxOrder


5. to get all the products :
   GET http://localhost:8000/products


6. to Add a new product to the database :
   POST http://localhost:8000/products
   * req fields : {productName, productCategory, productInfo, price, quantityAvailable}


7. to update product price :
   PUT  http://localhost:8000/products/price
   * req fields : {product, price }


8. to create a new order :
   POST  http://localhost:8000/order
   * req fields : { phone, products, paymentType}
   * we can add products like "products":[{"name" : "Mango", "quantity" : 1}, {"name": "Apple", "quantity" : 1}]
