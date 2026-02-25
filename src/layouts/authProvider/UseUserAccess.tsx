import { useUserStore } from "../../store/userStore";
import { Role } from "../../types/user";

export const useUserAccess = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const role = currentUser?.role;

  return {
    currentUser,
    role,
    isAdmin: role === "admin",
    isManager: role === "manager",
    hasAnyRole: (roles: Role[]) => roles.includes(role as Role),
  };
};