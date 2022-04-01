import jwtDecode from "jwt-decode";
// import useAuthenticationState from "../hooks/auth";

export const sessionInit = () => (dispatch) => {
  const token = localStorage.getItem("token");
//   const { authenticated, setauthenticated } = useAuthenticationState();
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      // localStorage.setItem('authenticated', false);
    //   setauthenticated(false);
    } else {
      // localStorage.setItem('authenticated', true);
    //   setauthenticated(true);
    }
  }
};
