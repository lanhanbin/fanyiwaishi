import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, UserCircle, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '翻译服务', path: '/translation' },
    { name: '外事服务', path: '/foreign-affairs' },
    { name: '天工学院', path: '/tiangong' },
    { name: '资源中心', path: '/resources' },
  ];

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Globe className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                点单式翻译与外事服务
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                  >
                    <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-slate-200" />
                    <div className="hidden sm:block text-left text-sm">
                      <div className="font-medium text-slate-900 leading-none">{user.name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {user.role === 'translator' && '翻译员'}
                        {user.role === 'user' && '用户'}
                        {user.role === 'admin' && '管理员'}
                      </div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
                      >
                        <button 
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate('/dashboard');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4" /> 进入工作台
                        </button>
                        {user.role === 'admin' && (
                          <button 
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/admin');
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"
                          >
                            <Shield className="w-4 h-4" /> 进入管理后台
                          </button>
                        )}
                        <hr className="my-2 border-slate-100" />
                        <button 
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                            navigate('/');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> 退出登录
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  登录 / 注册
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
