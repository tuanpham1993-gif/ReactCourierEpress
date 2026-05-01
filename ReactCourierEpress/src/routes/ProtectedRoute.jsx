import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" />;// điều hướng về trang login nếu chưa đăng nhập
  return children;
}
