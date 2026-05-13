import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 text-white">
              <Globe className="w-6 h-6" />
              <span className="font-bold text-lg tracking-tight">
                翻译与外事服务
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              提供专业、高效的多语种翻译及全面的外事服务支持，助力教育、科研与国际交流。
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">核心服务</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/translation" className="hover:text-white transition-colors">自动翻译</Link></li>
              <li><Link to="/translation" className="hover:text-white transition-colors">人工翻译订单</Link></li>
              <li><Link to="/translation" className="hover:text-white transition-colors">语音与视频翻译</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">外事与学院</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/foreign-affairs" className="hover:text-white transition-colors">外事政策库</Link></li>
              <li><Link to="/foreign-affairs" className="hover:text-white transition-colors">文书模板下载</Link></li>
              <li><Link to="/tiangong" className="hover:text-white transition-colors">联盟公告与资讯</Link></li>
              <li><Link to="/tiangong" className="hover:text-white transition-colors">项目成果展示</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>客服电话：400-XXX-XXXX</li>
              <li>工作时间：周一至周五 9:00 - 18:00</li>
              <li>企业邮箱：contact@example.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center text-slate-500">
          <p>版权所有 © {new Date().getFullYear()} 江西外语外贸职业学院</p>
        </div>
      </div>
    </footer>
  );
}
