import { useState } from 'react';
import { ArrowRightLeft, Search, FileText, BookOpen, Award, ChevronRight, Mic, Video, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TranslationStudio from '../components/TranslationStudio';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Translation */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              跨界无碍，<span className="text-blue-600">专业随行</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              覆盖教育、科研、外事等核心领域，提供精准高效的多语种互译及全面的外事服务支持。
            </p>
          </div>

          {/* Translation Interface */}
          <TranslationStudio />
          
          <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500">
             <Link to="/translation" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
               需要更专业的翻译？了解人工翻译订单 <ChevronRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>

      {/* Foreign Affairs Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">外事服务资源库</h2>
              <p className="text-slate-600">获取最新的政策指南、协议模板与外事礼仪培训资料。</p>
            </div>
            <Link to="/foreign-affairs" className="hidden sm:flex text-blue-600 font-medium items-center gap-1 hover:text-blue-700 transition-colors">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '出国境管理政策指南 (2025修订版)', category: '政策文件', icon: BookOpen, date: '2025-10-12' },
              { title: '中外合作办学协议标准模板', category: '文书模板', icon: FileText, date: '2025-09-28' },
              { title: '国际学术会议外事礼仪规范', category: '服务指南', icon: Users, date: '2025-09-15' },
            ].map((item) => (
              <motion.div 
                key={item.title}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all bg-white cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md mb-3">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400">更新于 {item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiangong Academy */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6">
                <Award className="w-4 h-4" /> 天工学院协作网络
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                汇聚联盟力量<br />共享创新成果
              </h2>
              <p className="text-slate-400 mb-8 max-w-sm">
                实时展示联盟院校项目进展，提供内部资源沉淀、版本控制及跨机构学术交流协作平台。
              </p>
              <Link to="/tiangong" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                进入天工学院 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                 <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                   最新联盟公告 <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">2 条新</span>
                 </h3>
                 <ul className="space-y-4">
                   <li className="border-b border-white/10 pb-4">
                     <p className="font-medium hover:text-blue-300 cursor-pointer transition-colors line-clamp-1">2026年度联合翻译人才培养项目启动通知</p>
                     <p className="text-xs text-slate-400 mt-1">今天 09:30 • 联盟秘书处</p>
                   </li>
                   <li>
                     <p className="font-medium hover:text-blue-300 cursor-pointer transition-colors line-clamp-1">关于开展外事翻译高级研修班的报名函</p>
                     <p className="text-xs text-slate-400 mt-1">昨天 14:00 • 培训中心</p>
                   </li>
                 </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                 <h3 className="text-xl font-bold mb-4">项目成果展示</h3>
                 <div className="group cursor-pointer">
                    <div className="h-32 bg-slate-800 rounded-lg mb-4 overflow-hidden relative">
                      <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/40 transition-colors" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-md">多语种语料库项目</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      由三所重点联盟院校共建的「教育装备」垂直领域多语种专业术语语料库发布V2.0版本。
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features simple section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500/50">
             <div>
               <div className="text-4xl font-bold mb-2">11+</div>
               <div className="text-blue-100 text-sm">支持人工翻译语种</div>
             </div>
             <div>
               <div className="text-4xl font-bold mb-2">2,000+</div>
               <div className="text-blue-100 text-sm">专业领域认证译员</div>
             </div>
             <div>
               <div className="text-4xl font-bold mb-2">15,000+</div>
               <div className="text-blue-100 text-sm">外事与项目资源</div>
             </div>
             <div>
               <div className="text-4xl font-bold mb-2">35+</div>
               <div className="text-blue-100 text-sm">天工学院联盟单位</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
