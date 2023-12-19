import { Outlet, Navigate } from "react-router-dom";
import { getItem } from "../../utils/localStore";
import { useAuthContext } from "../../hooks/useAuthContext";

const PrivateRoutes = () => {
  const { user, dispatch } = useAuthContext();
  let auth = getItem("auth_token")
  console.log("user.user", user)
  if(user && user.user) {
    return (
        auth ? <Outlet/> : <Navigate to='/login'/>
      )
  } else {
    <div>LOADING</div>
  }
};

export default PrivateRoutes;
