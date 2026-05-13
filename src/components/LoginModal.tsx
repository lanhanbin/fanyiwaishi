import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, KeyRound, User, Globe, Users, Shield, Building2 } from 'lucide-react';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { user, login, setRole } = useAuth();
  
  const [loginMethod, setLoginMethod] = useState<'phone' | 'password'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is logged in but hasn't selected a role, we show the role selection screen
  const isSelectingRole = user && !user.role;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'phone' && (!phone || !code)) return;
    if (loginMethod === 'password' && (!username || !password)) return;

    setIsSubmitting(true);
    // Mock login duration
    setTimeout(() => {
      setIsSubmitting(false);
      login({
        id: Math.random().toString(36).substr(2, 9),
        name: loginMethod === 'phone' ? `用户${phone.slice(-4)}` : username,
        phone: loginMethod === 'phone' ? phone : '13800138000',
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${Math.random()}`,
        translatorLevel: '高级',
        ratingStats: {
          accuracy: 4.8,
          timeliness: 4.7,
          attitude: 4.9,
          average: 4.8,
          count: 128
        }
      });
    }, 1000);
  };

  const handleSelectRole = (role: UserRole) => {
    setRole(role);
    onClose();
  };

  const roles = [
    { id: 'user', name: '用户', icon: User, desc: '发布订单，使用校内资源，查看公开信息' },
    { id: 'translator', name: '翻译员', icon: Globe, desc: '接取订单，管理翻译任务' },
    { id: 'admin', name: '管理员', icon: Shield, desc: '系统管理与人员配置' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md z-50 overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSelectingRole ? (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">欢迎回来</h2>
              <p className="text-slate-500 mb-8">请登录以继续使用翻译与外事服务平台</p>

              <div className="flex gap-4 mb-8">
                <button 
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    loginMethod === 'phone' 
                      ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' 
                      : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Smartphone className="w-4 h-4" /> 手机号登录
                </button>
                <button 
                  type="button"
                  onClick={() => setLoginMethod('password')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    loginMethod === 'password' 
                      ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' 
                      : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <KeyRound className="w-4 h-4" /> 密码登录
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {loginMethod === 'phone' ? (
                  <>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="请输入手机号" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="请输入验证码" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                      />
                      <button type="button" className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 whitespace-nowrap">
                        获取验证码
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <input 
                        type="text" 
                        placeholder="请输入账号/学号/工号" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <input 
                        type="password" 
                        placeholder="请输入密码" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                      />
                    </div>
                  </>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium shadow-sm transition-colors mt-2"
                >
                  {isSubmitting ? '登录中...' : '登录'}
                </button>
              </form>
              
              <div className="mt-8 text-center text-xs text-slate-400">
                登录即代表您同意 <a href="#" className="text-blue-600 hover:underline">《用户服务协议》</a> 和 <a href="#" className="text-blue-600 hover:underline">《隐私政策》</a>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">选择身份进入</h2>
              <p className="text-slate-500 mb-6">请选择您当前需要登录的角色身份</p>
              
              <div className="space-y-3">
                {roles.map((role) => (
                  <button 
                    key={role.id}
                    onClick={() => handleSelectRole(role.id as UserRole)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group bg-white text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <role.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{role.name}</h3>
                      <p className="text-sm text-slate-500">{role.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
