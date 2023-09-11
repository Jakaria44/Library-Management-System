import Admin from "./Admin";
import Employee from "./Employee";
import Homepage from "./Homepage";
import Reader from "./Reader";
export const MenuItems = {
  items:
    localStorage.getItem("role") == "admin"
      ? [Homepage, Reader, Employee, Admin]
      : localStorage.getItem("role") == "employee"
      ? [Homepage, Reader, Employee]
      : localStorage.getItem("role") == "user"
      ? [Homepage, Reader]
      : [Homepage],
};
