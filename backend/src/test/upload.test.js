/**
 * This is a simple test file to demonstrate how to use the file upload API.
 * You can use tools like Postman or curl to test the API endpoints.
 * 
 * Example curl commands:
 * 
 * 1. Upload a file:
 * curl -X POST \
 *   http://localhost:5000/api/upload/file \
 *   -H 'Authorization: Bearer YOUR_TOKEN_HERE' \
 *   -F 'file=@/path/to/your/file.jpg'
 * 
 * 2. Get all files:
 * curl -X GET \
 *   http://localhost:5000/api/upload/files \
 *   -H 'Authorization: Bearer YOUR_TOKEN_HERE'
 * 
 * 3. Delete a file:
 * curl -X DELETE \
 *   http://localhost:5000/api/upload/files/filename.jpg \
 *   -H 'Authorization: Bearer YOUR_TOKEN_HERE'
 * 
 * 4. Access an uploaded file directly:
 * http://localhost:5000/uploads/filename.jpg
 */

// This is just a documentation file, not an actual test

