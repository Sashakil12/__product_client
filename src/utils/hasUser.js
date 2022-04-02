import jwtDecode from "jwt-decode";


export const hasAuthenticatedUser = () => (dispatch) => {
  const token = localStorage.getItem("token")
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false
    } else {
     return true
    }
  }
};