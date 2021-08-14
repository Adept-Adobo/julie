# Products - API for Project Catwalk
This service acts as a back-end system to provide the resources and data for all Products found in Project Catwalk. This service is part of a larger service that replaces the Atelier API.

### Set-up databases
  * Change the paths for your data in server/db/schema.sql
  * Run `npm run create-db`

### Get products info
  * GET `/products` - Retrieves the list of products

**Query Parameters:**
  * `page` - Selects the page of results to return. Default 1.
  * `count` - Specifies how many results per page to return. Default 5.

**Success Status Code:** `200`

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