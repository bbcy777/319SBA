### 319 SBA MongoDB Database Application

## An online grocery platform

- Three models, user, products and carts.
- I originally set up user model with option for buyer and seller. Seller could be the grocery delivery option, but I didn't complete that route.
- Product model shows what the grocery offers. Index is added to the name
- Cart model connects user with products with objectId.

- Product route can show all products, add products. With product ID, we can delete and update one product.
- Buyer route shows all users, and can post users. we can delete or modify one user with ID parameter. It also shows user's cart, and add items in cart. I can't make the route to only change item quantity work. 
- Carts route show all carts and can add carts for admin use.   
