import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  console.log("user is :", user);
  console.log("token is :", token);

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

