# File Upload API Documentation

This document provides information about the file upload API endpoints.

## Base URL

All API endpoints are prefixed with `/api/upload`.

## Authentication

All endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Endpoints

### Upload a File

Upload a single file to the server.

- **URL**: `/api/upload/file`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Auth Required**: Yes

**Request Body**:
- `file`: The file to upload (form-data)

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "filename": "file-1620000000000-123456789.jpg",
    "originalname": "example.jpg",
    "mimetype": "image/jpeg",
    "size": 12345,
    "path": "/uploads/file-1620000000000-123456789.jpg"
  }
}
```

**Error Responses**:
- **Code**: 400 Bad Request
  - File too large (>10MB)
  - No file uploaded
- **Code**: 401 Unauthorized
  - Invalid or missing token
- **Code**: 500 Internal Server Error
  - Server error during upload

### Get All Files

Retrieve a list of all uploaded files.

- **URL**: `/api/upload/files`
- **Method**: `GET`
- **Auth Required**: Yes

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "success": true,
  "count": 2,
  "files": [
    {
      "filename": "file-1620000000000-123456789.jpg",
      "size": 12345,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "path": "/uploads/file-1620000000000-123456789.jpg"
    },
    {
      "filename": "file-1620000000001-987654321.pdf",
      "size": 54321,
      "createdAt": "2023-01-02T00:00:00.000Z",
      "path": "/uploads/file-1620000000001-987654321.pdf"
    }
  ]
}
```

**Error Responses**:
- **Code**: 401 Unauthorized
  - Invalid or missing token
- **Code**: 404 Not Found
  - Uploads directory not found
- **Code**: 500 Internal Server Error
  - Server error retrieving files

### Delete a File

Delete a specific file by filename.

- **URL**: `/api/upload/files/:filename`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **URL Parameters**: `filename` - The name of the file to delete

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

**Error Responses**:
- **Code**: 401 Unauthorized
  - Invalid or missing token
- **Code**: 404 Not Found
  - File not found
- **Code**: 500 Internal Server Error
  - Server error deleting file

## Accessing Uploaded Files

Uploaded files can be accessed directly via their URL:

```
http://your-domain.com/uploads/filename.ext
```

For example, if your server is running on `http://localhost:5000` and the uploaded file is named `file-1620000000000-123456789.jpg`, you can access it at:

```
http://localhost:5000/uploads/file-1620000000000-123456789.jpg
```

