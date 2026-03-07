import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasAccess = localStorage.getItem("python_start_paid") === "true";

  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}