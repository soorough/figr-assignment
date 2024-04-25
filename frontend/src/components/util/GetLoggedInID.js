import { jwtDecode } from "jwt-decode";

// Function to get logged-in user's ID
export default function getLoggedInUserId() {
    // Retrieve token from local storage (or wherever you stored it)
    const token = localStorage.getItem("authToken");
  
    if (token) {
      // Decode the token to get the payload
      const decodedToken = jwtDecode(token);
  
      // Return the user ID from the token payload
      return decodedToken.userId;
    } else {
      // Handle case when token is not found
      console.warn("No token found");
      return null;
    }
  }