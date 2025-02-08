import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
  const location = useLocation(); 
  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
   setIsOpen(false) 
  };
  const isActive = (path) => location.pathname === path ? "text-blue-600 font-bold" : "text-gray-700"; 

  return (
    <nav className="bg-white shadow-md px-6 py-5 w-full fixed top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-4">
          <button onClick={() => navigate("/")} className="text-xl font-bold outline-none cursor-pointer">
            Shopi
          </button>

          <ul className="hidden md:flex space-x-6">
            <li><button onClick={() => navigate("/all")} className={`hover:text-blue-600 cursor-pointer ${isActive("/all")}`}>All</button></li>
            <li><button onClick={() => navigate("/clothes")} className={`hover:text-blue-600 cursor-pointer ${isActive("/clothes")}`}>Clothes</button></li>
            <li><button onClick={() => navigate("/electronics")} className={`hover:text-blue-600 cursor-pointer ${isActive("/electronics")}`}>Electronics</button></li>
            <li><button onClick={() => navigate("/furnitures")} className={`hover:text-blue-600 cursor-pointer ${isActive("/furnitures")}`}>Furnitures</button></li>
            <li><button onClick={() => navigate("/toys")} className={`hover:text-blue-600 cursor-pointer ${isActive("/toys")}`}>Toys</button></li>
          </ul>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2 cursor-pointer">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm">{user?.name}</span>
          </div>

          <div className="hidden md:flex space-x-4 text-sm">
            <button onClick={() => navigate("/orders")} className={`hover:text-blue-600 cursor-pointer ${isActive("/orders")}`}>My Orders</button>
            <button onClick={() => navigate("/account")} className={`hover:text-blue-600 cursor-pointer ${isActive("/account")}`}>My Account</button>
          </div>

          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <button className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 bg-gray-100 p-4 rounded-lg">
          <ul className="space-y-3">
            <li><button onClick={() => {navigate("/all"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/all")}`}>All</button></li>
            <li><button onClick={() => {navigate("/clothes"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/clothes")}`}>Clothes</button></li>
            <li><button onClick={() => {navigate("/electronics"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/electronics")}`}>Electronics</button></li>
            <li><button onClick={() => {navigate("/furnitures"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/furnitures")}`}>Furnitures</button></li>
            <li><button onClick={() => {navigate("/toys"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/toys")}`}>Toys</button></li>
            <li className="mt-4 border-t pt-3"><button onClick={() => {navigate("/orders"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/orders")}`}>My Orders</button></li>
            <li><button onClick={() => {navigate("/account"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/account")}`}>My Account</button></li>
           
           {
            user?
            <li><button onClick={handleLogout} className={`block hover:text-blue-600 cursor-pointer ${isActive("/logout")}`}>Logout</button></li>
          :
          <li><button onClick={() => {navigate("/login"); setIsOpen(false)}} className={`block hover:text-blue-600 cursor-pointer ${isActive("/login")}`}>Login</button></li>
          } 

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
