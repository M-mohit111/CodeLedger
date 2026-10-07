import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../authSlice';
import { Code2 } from 'lucide-react';

function Layout({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isProblemPage = location.pathname.startsWith('/problem/');

  // For Auth and Problem pages, return without global header/footer (they have custom ones)
  if (isAuthPage || isProblemPage) {
    return <div className="min-h-screen bg-[#0b0d14] text-gray-300 font-sans">{children}</div>;
  }

  // Global dark layout for Homepage, Admin, etc.
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d14] text-gray-300 font-sans">
      <nav className="h-14 flex items-center justify-between px-4 lg:px-8 bg-[#0b0d14] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-8 h-full">
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Code<span className="text-blue-500">Ledger</span></span>
          </NavLink>
        </div>
        
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <li className="flex items-center">
                  <span className="font-medium text-sm text-gray-400 mr-2">
                    {user?.firstName} {user?.role === 'admin' && '(Admin)'}
                  </span>
                </li>
                {user?.role === 'admin' && (
                  <li>
                    <NavLink to="/admin" className="px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-colors">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20 transition-colors">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <main className="flex-grow p-4 md:p-8">
        {children}
      </main>
      
      <footer className="py-6 border-t border-white/5 text-center text-sm text-gray-500 mt-auto">
        <div>
          <p>Copyright © 2025 - CodeLedger. Better Code, Better You.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
