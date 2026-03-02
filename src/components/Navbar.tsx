import { useNavigate } from "react-router";
import type { IUser } from "../types/auth";
import { logouts as logoutService } from "../services/auth.service";
import { logout as logoutAction } from "../store/slices/auth.slice";
import { useAppDispatch } from "../store/hooks";

interface NavbarProps {
    user: IUser;
}

export default function Navbar({ user }: NavbarProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleLogout() {
        logoutService();
        dispatch(logoutAction());
        navigate("/signin");
    }

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 w-full shadow-sm">
            <div className="flex items-center">
                
                <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                        {user.email}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
