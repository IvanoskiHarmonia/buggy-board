# Req Params

In Express.js (and similar web frameworks), these three properties of the request (`req`) object are used to extract data sent by the client, but they differ in **where** that data is located in the HTTP request.

## **Summary Table**

| Feature | `req.params` | `req.query` | `req.body` |
| :--- | :--- | :--- | :--- |
| **Location** | Part of the URL path (route parameters). | After the `?` in the URL (query string). | Inside the HTTP request payload. |
| **Main Use** | Identifying specific resources (e.g., ID). | Filtering, sorting, or searching. | Sending complex or sensitive data (e.g., forms). |
| **HTTP Methods** | Typically GET, PUT, DELETE. | Primarily GET. | POST, PUT, PATCH. |
| **Syntax Example** | `/users/:id` | `?name=john&age=30` | `{"email": "abc@xyz.com"}` |

---

### **1. req.params (Route Parameters)**

These are dynamic segments of the URL path, defined in your route with a colon (`:`). They are typically used to identify a specific resource.

* **URL Example:** `http://localhost:3000/users/123`
* **Route Definition:** `app.get('/users/:id', ...)`
* **Accessing Data:** `req.params.id` would be `"123"`.

### **2. req.query (Query Parameters)**

These appear at the end of the URL after a question mark (`?`) as key-value pairs. They are often used for optional modifiers like search filters or pagination.

* **URL Example:** `http://localhost:3000/search?term=apple&color=red`
* **Accessing Data:** `req.query.term` is `"apple"` and `req.query.color` is `"red"`.
* **Note:** These are not defined in the route path; the server automatically parses them into an object.

### **3. req.body (Request Body)**

This contains data sent in the request payload. It is generally used for creating or updating resources because it can hold large amounts of data and complex JSON objects.

* **Usage:** Commonly used with POST or PUT requests to send form data or JSON.
* **Accessing Data:** `req.body.username`
* **Requirement:** To use this in Express, you must include body-parsing middleware like `express.json()` or `express.urlencoded()`, otherwise `req.body` will be `undefined`.
