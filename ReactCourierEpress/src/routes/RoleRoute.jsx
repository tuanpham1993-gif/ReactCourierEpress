import { Navigate } from "react-router-dom";

export default function RoleRoute({ user, role, children }) {
  if (user.role_id !== role) {
    return <div>Không có quyền</div>;
  }
  return children;// nếu có quyền thì render component con
}