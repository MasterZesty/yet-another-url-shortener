# yet-another-url-shortener
a simple and lightweight flask based solution for creating and managing shortened URLs with analytics.

![App UI](https://github.com/MasterZesty/yet-another-url-shortener/blob/main/docs/yaus-demo-v1.gif)

# App Architecture:
![App Architecture](https://github.com/MasterZesty/yet-another-url-shortener/blob/main/docs/yaus-architecture-diagram.png)

<!-- ## alembic commands for ref
```
alembic init alembic
alembic revision --autogenerate
alembic upgrade head
``` -->

# Backend
![Backend API](https://github.com/MasterZesty/yet-another-url-shortener/blob/main/docs/yaus-backend-api-swagger-v1.png)

## API endpoints for URL shortener:

1. **Shorten URL Endpoint:**
   - **Endpoint:** `/api/shorten`
   - **Method:** POST
   - **Parameters:**
     - `original_url` (required): The URL you want to shorten.
     - `custom_alias` (required): Allowing users to specify a custom short alias.

2. **Expand URL Endpoint:**
   - **Endpoint:** `/api/expand`
   - **Method:** GET
   - **Parameters:**
     - `short_code` (required): The short code or alias to expand.

3. **Custom Alias Availability Check Endpoint:**
   - **Endpoint:** `/api/alias_available`
   - **Method:** GET
   - **Parameters:**
     - `custom_alias` (required): The custom alias to check for availability.

## Planned Features

4. **URL Analytics Endpoint:***
   - **Endpoint:** `/api/analytics`
   - **Method:** GET
   - **Parameters:**
     - `short_code` (required): The short code or alias for which analytics are requested.

4. **Delete URL Endpoint:***
   - **Endpoint:** `/api/delete`
   - **Method:** DELETE
   - **Parameters:**
     - `short_code` (required): The short code or alias to be deleted.

7. **Update URL Endpoint:***
   - **Endpoint:** `/api/update`
   - **Method:** PUT
   - **Parameters:**
     - `short_code` (required): The short code or alias to be updated.
     - `new_url` (required): The new URL.

8. **Authentication Endpoint:***
   - secure endpoints, implement an authentication endpoint.

9. **User Registration and Management:***
   - If you plan to have user accounts, you may need endpoints for user registration, login, and profile management.

10. **API Documentation Endpoint:**
    - **Endpoint:** `/swagger`
    - **Method:** GET
    - **Parameters:** None
    - To provide documentation for API using Swagger.

11. **Rate limiting and security measures to protect service from abuse.***


<!-- 1. **Shorten URL Method:**
   ```python
   def shorten_url():
   ```

2. **Expand URL Method:**
   ```python
   def expand_url(short_code):
   ```

3. **URL Analytics Method:**
   ```python
   def url_analytics(short_code):
   ```

4. **Delete URL Method:**
   ```python
   def delete_url(short_code):
   ```

5. **List All Shortened URLs Method:**
   ```python
   def list_shortened_urls():
   ```

6. **Custom Alias Availability Check Method:**
   ```python
   def alias_available(custom_alias):
   ```

7. **Update URL Method:**
   ```python
   def update_url(short_code):
   ```

8. **Authentication Method (Optional):**
   ```python
   def authenticate_user():
   ```

9. **User Registration Method (Optional):**
   ```python
   def register_user():
   ```

10. **User Login Method (Optional):**
    ```python
    def login_user():
    ```

11. **User Profile Management Method (Optional):**
    ```python
    def manage_user_profile():
    ```

12. **API Documentation Method:**
    ```python
    def api_documentation():
    ``` -->

# Frontend
![Frontend](https://github.com/MasterZesty/yet-another-url-shortener/blob/main/docs/yaus-ui-diagram-v1.png)