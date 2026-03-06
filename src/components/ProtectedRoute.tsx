import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasPaid = localStorage.getItem("python_start_paid") === "true";

  if (!hasPaid) {
    return <Navigate to="/payment" replace />;
  }

  return <>{children}</>;
}
