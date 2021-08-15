# Products - API for Project Catwalk
This service acts as a back-end system to provide the resources and data for all Products found in Project Catwalk. This service is part of a larger service that replaces the Atelier API.

## Set up
### Set-up databases
  * Change the paths for your data in server/db/schema.sql
  * Run `npm run create-db`

### Get products
  * GET `/products`
  * Retrieves the list of products

**Query Parameters:**
  * `page` - Selects the page of results to return. Default 1.
  * `count` - Specifies how many results per page to return. Default 5.

**Success Status Code:** `200 OK`

**Returns:** JSON

```json
    {
      "id": "Number",
      "name": "String",
      "slogan": "String",
      "description": "String",
      "category": "String",
      "default_price": "String",
      "created_at": "String",
      "updated_at": "String"
    }
```

### Get product information
  * GET `/products/:product_id`
  * Retrieves product level information for a specified product id

**Path Parameters:**
  * `product_id` - Required ID of the product requested

**Success Status Code:** `200 OK`

**Returns:** JSON

```json
    {
      "id": "Number",
      "name": "String",
      "slogan": "String",
      "description": "String",
      "category": "String",
      "default_price": "String",
      "created_at": "String",
      "updated_at": "String",
      "features": [
        {
          "feature": "String",
          "value": "String"
        }
      ]
    }
```

### Get product styles
  * GET `/products/:product_id/styles`
  * Retrieves all styles for a specified product id

**Path Parameters:**
  * `product_id` - Required ID of the product requested

**Success Status Code:** `200 OK`

**Returns:** JSON