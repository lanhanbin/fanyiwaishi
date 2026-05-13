import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, ClipboardList, Settings, ShieldCheck, Globe, Star, Award, Video, FileText, Database, Presentation, X, Check, Upload, XCircle, ChevronDown } from 'lucide-react';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { motion, AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'resources'>('profile');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  
  const [sharingResource, setSharingResource] = useState<any | null>(null);
  const [selectedResource, setSelectedResource] = useState<any | null>(null);
  const [showReuploadModal, setShowReuploadModal] = useState<boolean>(false);
  const [shareName, setShareName] = useState<string>('');
  const [shareSummary, setShareSummary] = useState<string>('');
  const [shareKeywords, setShareKeywords] = useState<string>('');
  const [shareCategory, setShareCategory] = useState<string>('政策文件');
  const [shareRegion, setShareRegion] = useState<string>('通用');
  const [shareDomain, setShareDomain] = useState<string>('通用');
  const [isForeignAffairs, setIsForeignAffairs] = useState<boolean>(true);

  useEffect(() => {
    if (sharingResource) {
      setShareName(sharingResource.name || '');
      setShareSummary('');
      setShareKeywords('');
      setShareCategory('政策文件');
      setShareRegion('通用');
      setShareDomain('通用');
      setIsForeignAffairs(true);
    }
  }, [sharingResource]);

  // If not logged in or hasn't selected a role, redirect to home
  if (!user || !user.role) {
    return <Navigate to="/" replace />;
  }

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  const renderProfile = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800">个人中心</h3>
        <p className="text-sm text-slate-500 mt-1">管理您的账号信息与偏好设置</p>
      </div>
      <div className="p-8 max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md" />
          <div>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              更换头像
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">姓名 / 昵称</label>
            <input 
              type="text" 
              defaultValue={user.name}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">手机号码</label>
            <input 
              type="tel" 
              defaultValue={user.phone}
              disabled
              className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
            />
          </div>
          {user.role === 'translator' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                   <Award className="w-6 h-6 text-blue-500 mb-2" />
                   <div className="text-sm border-blue-200 text-blue-600/80 mb-1">译员等级</div>
                   <div className="font-bold text-blue-700 text-lg">{user.translatorLevel || '中级'}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                   <div className="font-bold text-slate-800 text-2xl tracking-tight leading-none mb-1">{user.ratingStats?.average?.toFixed(1) || '0.0'}</div>
                   <div className="flex items-center text-yellow-500 mb-1">
                     {[1, 2, 3, 4, 5].map(i => (
                       <Star key={`rating-stat-dash-${i}`} className={`w-3 h-3 ${((user.ratingStats?.average || 0) >= i) ? 'fill-current' : ''}`} />
                     ))}
                   </div>
                   <div className="text-xs text-slate-500">综合评分 ({user.ratingStats?.count || 0}条)</div>
                </div>
                <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-center gap-2">
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-600">译稿准确性</span>
                     <span className="font-medium text-slate-800">{user.ratingStats?.accuracy?.toFixed(1) || '0.0'} <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 inline pb-0.5"/></span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-600">交付时效</span>
                     <span className="font-medium text-slate-800">{user.ratingStats?.timeliness?.toFixed(1) || '0.0'} <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 inline pb-0.5"/></span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-600">服务态度</span>
                     <span className="font-medium text-slate-800">{user.ratingStats?.attitude?.toFixed(1) || '0.0'} <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 inline pb-0.5"/></span>
                   </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">擅长领域 (翻译员标签)</label>
                <input 
                  type="text" 
                  defaultValue="教育/学术, 法律合规"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 transition-colors"
                />
              </div>
            </>
          )}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
            保存修改
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => {
    if (user.role === 'translator') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-800">我的接单记录</h3>
              <p className="text-sm text-slate-500 mt-1">查看您已接取的翻译订单和匹配推送</p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {/* Mock Translator Order */}
            <div 
              className="p-6 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => handleOrderClick({
                id: 'TR-20260512-005',
                sourceLang: '中文',
                targetLang: '俄语',
                domain: '教育/学术',
                status: 'translating',
                publishTime: '今日 10:30',
                publisher: '王研究员',
                deadline: '2026-05-20',
                requirements: '科研论文翻译，注意专业术语准确性，需符合目标期刊格式。'
              })}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 mb-2 inline-block">
                    翻译执行中
                  </span>
                  <div className="font-bold text-slate-800 text-lg">TR-20260512-005</div>
                  <div className="text-sm text-slate-500 mt-1">发布人：王研究员 • 今日 10:30派单</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800 flex items-center justify-end gap-1">
                    <Globe className="w-5 h-5 text-blue-500" /> 中文 → 俄语
                  </div>
                  <div className="text-sm text-slate-500 mt-1">交付时限：2026-05-20</div>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4 bg-slate-100 p-3 rounded-lg">
                要求：科研论文翻译，注意专业术语准确性，需符合目标期刊格式。
              </p>
              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  联系用户
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  提交译稿
                </button>
              </div>
            </div>

            {/* Completed Order */}
            <div 
              className="p-6 hover:bg-slate-50 transition-colors opacity-75 cursor-pointer"
              onClick={() => handleOrderClick({
                id: 'TR-20260501-112',
                sourceLang: '英语',
                targetLang: '中文',
                domain: '通用/日常',
                status: 'completed',
                publishTime: '2026-05-01',
                publisher: '李校办'
              })}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 mb-2 inline-block">
                    已完成验收
                  </span>
                  <div className="font-bold text-slate-800 text-lg">TR-20260501-112</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1">
                    英语 → 中文
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> 用户评价 5 星：翻译非常准确，排版也很用心！
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default: User Orders (Campus User, External, Alliance)
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-800">我发布的订单</h3>
            <p className="text-sm text-slate-500 mt-1">查看您的发布记录和进度</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            发布新订单
          </button>
        </div>
        <div className="divide-y divide-slate-100">
            {/* Mock User Order - Matching */}
            <div 
              className="p-6 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => handleOrderClick({
                id: 'TR-20260512-088',
                sourceLang: '中文',
                targetLang: '英语',
                domain: '教育/学术',
                status: 'matching',
                publishTime: '刚刚',
                publisher: user.name,
                level: '中级'
              })}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 mb-2 inline-block">
                    智能匹配中
                  </span>
                  <div className="font-bold text-slate-800 text-lg">TR-20260512-088</div>
                  <div className="text-sm text-slate-500 mt-1">发布于 刚刚</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800 flex items-center justify-end gap-1">
                    <Globe className="w-5 h-5 text-blue-500" /> 中文 → 英语
                  </div>
                  <div className="text-sm text-slate-500 mt-1">需中级译员</div>
                </div>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800 flex items-start gap-2">
                 <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                 系统正在为您匹配符合条件（教育/学术）的中级译员，请稍候。如长时间无响应，系统会转换为手动接单模式。
              </div>
            </div>

            {/* Mock User Order - Translating */}
            <div 
              className="p-6 hover:bg-slate-50 transition-colors cursor-pointer opacity-90"
              onClick={() => handleOrderClick({
                id: 'TR-20260511-042',
                sourceLang: '英语',
                targetLang: '中文',
                domain: '法律合规',
                status: 'translating',
                publishTime: '昨天 14:20',
                publisher: user.name,
                level: '高级'
              })}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 mb-2 inline-block">
                    翻译执行中
                  </span>
                  <div className="font-bold text-slate-800 text-lg">TR-20260511-042</div>
                  <div className="text-sm text-slate-500 mt-1">发布于 昨天 14:20 • 接单译员：李译员</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800 flex items-center justify-end gap-1">
                    <Globe className="w-5 h-5 text-purple-500" /> 英语 → 中文
                  </div>
                  <div className="text-sm text-slate-500 mt-1">需高级译员</div>
                </div>
              </div>
            </div>

            {/* Mock User Order - Reviewing */}
            <div 
              className="p-6 hover:bg-slate-50 transition-colors cursor-pointer opacity-90"
              onClick={() => handleOrderClick({
                id: 'TR-20260510-015',
                sourceLang: '中文',
                targetLang: '俄语',
                domain: '机械制造',
                status: 'reviewing',
                publishTime: '前天 09:15',
                publisher: user.name,
                level: '中级',
                translatedFileName: 'TR-20260510-015_ru_translation.docx',
                translatedText: '本设备操作说明书的翻译内容如下...\n\n设备正常运行条件：\n1. 环境温度：-10℃ ~ 40℃\n2. 相对湿度：≤ 85%\n3. 电源电压：AC 380V ± 10% (三相五线制)'
              })}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200 mb-2 inline-block">
                    待验收
                  </span>
                  <div className="font-bold text-slate-800 text-lg">TR-20260510-015</div>
                  <div className="text-sm text-slate-500 mt-1">发布于 前天 09:15</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800 flex items-center justify-end gap-1">
                    <Globe className="w-5 h-5 text-yellow-500" /> 中文 → 俄语
                  </div>
                  <div className="text-sm text-slate-500 mt-1">需中级译员</div>
                </div>
              </div>
              <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-3 text-sm text-yellow-800 flex items-start gap-2">
                 <ClipboardList className="w-4 h-4 mt-0.5 shrink-0" />
                 译员已提交译稿，请尽快预览验收订单。
              </div>
            </div>

            {/* Mock User Order - Completed */}
            <div 
              className="p-6 hover:bg-slate-50 transition-colors cursor-pointer opacity-75"
              onClick={() => handleOrderClick({
                id: 'TR-20260505-108',
                sourceLang: '日语',
                targetLang: '中文',
                domain: '文学艺术',
                status: 'completed',
                publishTime: '上周',
                publisher: user.name,
                level: '初级',
                translatedFileName: 'TR-20260505-108_zh_translation_final.pdf',
                translatedText: '文学艺术作品翻译...\n这是一个已经完成验收的订单。您可以下载完整的译稿。',
                rating: {
                  accuracy: 5,
                  timeliness: 4,
                  attitude: 5,
                  comment: '翻译得非常优美，交付很及时！'
                }
              })}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 mb-2 inline-block">
                    已完成验收
                  </span>
                  <div className="font-bold text-slate-800 text-lg">TR-20260505-108</div>
                  <div className="text-sm text-slate-500 mt-1">发布于 上周</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800 flex items-center justify-end gap-1">
                    <Globe className="w-5 h-5 text-green-500" /> 日语 → 中文
                  </div>
                  <div className="text-sm text-slate-500 mt-1">需初级译员</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  };

  const renderResources = () => {
    const mockResources = [
      { id: 1, name: 'AI产业图谱.mp4', time: '2026-02-05 16:52:26', size: '6MB', shared: false, type: 'video' },
      { id: 2, name: '《塑料模具设计与制造》课程标准.docx', time: '2026-02-03 09:36:11', size: '22KB', shared: false, type: 'doc' },
      { id: 3, name: '项目总结报告演示.pptx', time: '2025-12-25 14:58:46', size: '4.5MB', shared: true, type: 'ppt' },
      { id: 4, name: '新员工入职培训.mp4', time: '2025-12-25 14:56:41', size: '125MB', shared: false, type: 'video' },
      { id: 5, name: '翻译服务合作协议范本.pdf', time: '2025-12-15 10:15:28', size: '1.2MB', shared: true, type: 'doc' },
      { id: 6, name: '季度财务分析汇报.ppt', time: '2025-12-16 09:39:29', size: '3.1MB', shared: false, type: 'ppt' },
      { id: 7, name: '学术英语词汇整理.xlsx', time: '2025-11-26 17:15:07', size: '926KB', shared: false, type: 'doc' },
      { id: 8, name: '软件开发流程培训.pptx', time: '2026-01-13 09:09:17', size: '8.4MB', shared: true, type: 'ppt' },
      { id: 9, name: '操作规范说明.docx', time: '2025-11-07 09:25:40', size: '540KB', shared: false, type: 'doc' },
      { id: 10, name: '机器翻译发展史.mp4', time: '2026-01-07 16:12:50', size: '256MB', shared: false, type: 'video' }
    ];

    const getResourceIcon = (type: string) => {
      switch (type) {
        case 'video': return <div className="p-1.5 bg-purple-100 text-purple-600 rounded"><Video className="w-4 h-4" /></div>;
        case 'doc': return <div className="p-1.5 bg-blue-100 text-blue-600 rounded"><FileText className="w-4 h-4" /></div>;
        case 'ppt': return <div className="p-1.5 bg-orange-100 text-orange-600 rounded"><Presentation className="w-4 h-4" /></div>;
        default: return <div className="p-1.5 bg-slate-100 text-slate-600 rounded"><FileText className="w-4 h-4" /></div>;
      }
    };

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-bold text-slate-800">个人资源</h3>
            <p className="text-sm text-slate-500 mt-1">管理您上传的各类实训资源，支持视频、文档、PPT格式</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            上传资源
          </button>
        </div>
        
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="font-medium py-4 px-6 w-1/2">文件名称</th>
                <th className="font-medium py-4 px-6">时间</th>
                <th className="font-medium py-4 px-6">大小</th>
                <th className="font-medium py-4 px-6">共享状态</th>
                <th className="font-medium py-4 px-6 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {mockResources.map(resource => (
                <tr key={resource.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {getResourceIcon(resource.type)}
                      <span className="font-medium text-slate-800">{resource.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{resource.time}</td>
                  <td className="py-4 px-6 text-slate-500">{resource.size}</td>
                  <td className="py-4 px-6 text-slate-500">{resource.shared ? '已共享' : '未共享'}</td>
                  <td className="py-4 px-6 text-right space-x-3 text-slate-600 transition-colors">
                    <button className="hover:text-blue-600 transition-colors text-sm font-medium">重命名</button>
                    {resource.size !== '-' && (
                      <button 
                        onClick={() => { setSelectedResource(resource); setShowReuploadModal(true); }}
                        className="hover:text-blue-600 transition-colors text-sm font-medium"
                      >
                        重新上传
                      </button>
                    )}
                    <button 
                      onClick={() => setSharingResource(resource)}
                      className="hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      共享
                    </button>
                    {resource.size !== '-' && (
                      <button className="hover:text-blue-600 transition-colors text-sm font-medium">下载</button>
                    )}
                    <button className="hover:text-red-500 transition-colors text-sm font-medium text-red-500/50 group-hover:text-red-500">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm text-slate-500 shrink-0">
          <div>共 127 条</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-slate-400 disabled:opacity-50">&lt;</button>
            <button className="px-3 py-1 border border-blue-600 rounded-md bg-blue-600 text-white font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium text-slate-700">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium text-slate-700">3</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium text-slate-700">4</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium text-slate-700">5</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium text-slate-700">13</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-slate-600">&gt;</button>
            
            <select className="ml-4 border border-slate-200 rounded-md px-2 py-1 bg-white outline-none focus:border-blue-500 hidden sm:block">
              <option>10条/页</option>
              <option>20条/页</option>
              <option>50条/页</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6">
           <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full bg-slate-800 mb-4 border-2 border-white/20" />
           <h2 className="font-bold text-xl">{user.name}</h2>
           <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 
              {user.role === 'translator' && '翻译员'}
              {user.role === 'user' && '用户'}
              {user.role === 'admin' && '管理员'}
           </p>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <User className="w-5 h-5" /> 个人中心
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'orders' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-5 h-5" /> 我的订单
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'resources' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Database className="w-5 h-5" /> 个人资源
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {activeTab === 'profile' ? renderProfile() : activeTab === 'orders' ? renderOrders() : renderResources()}
      </main>

      <OrderDetailsModal 
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        userRole={user.role}
        currentUser={user}
      />

      {/* Share Resource Modal */}
      <AnimatePresence>
        {sharingResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSharingResource(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <h3 className="text-xl font-bold text-slate-800">资源共享设置</h3>
                <button 
                  onClick={() => setSharingResource(null)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                 {/* Resource Info */}
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                   <div className="p-3 bg-white border border-slate-200 text-blue-600 rounded-lg shrink-0 shadow-sm">
                     <FileText className="w-8 h-8" />
                   </div>
                   <div className="min-w-0">
                     <h4 className="font-bold text-slate-900 truncate" title={sharingResource.name}>{sharingResource.name}</h4>
                     <p className="text-sm text-slate-500 mt-1">大小: {sharingResource.size} • 上传于 {sharingResource.time}</p>
                   </div>
                 </div>

                 {/* Settings */}
                 <div className="space-y-5">
                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-2">资源名称</label>
                     <input 
                       type="text" 
                       value={shareName}
                       onChange={(e) => setShareName(e.target.value)}
                       placeholder="请输入资源名称"
                       className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-2">资源简介</label>
                     <textarea 
                       value={shareSummary}
                       onChange={(e) => setShareSummary(e.target.value)}
                       placeholder="简要描述资源的核心内容、适用场景等..."
                       rows={3}
                       className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-2">资源关键词 <span className="text-slate-400 font-normal">（使用逗号分隔）</span></label>
                     <input 
                       type="text" 
                       value={shareKeywords}
                       onChange={(e) => setShareKeywords(e.target.value)}
                       placeholder="例如：政策解读, 费用标准, 北美"
                       className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                     />
                   </div>

                   {/* Is Foreign Affairs */}
                   <div>
                     <label className="flex items-center gap-3 p-4 rounded-xl border border-blue-100 bg-blue-50/50 cursor-pointer hover:bg-blue-50 transition-colors">
                       <input 
                         type="checkbox" 
                         checked={isForeignAffairs} 
                         onChange={(e) => setIsForeignAffairs(e.target.checked)} 
                         className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500" 
                       />
                       <div>
                         <span className="block text-sm font-semibold text-blue-900">发布到外事服务</span>
                         <span className="block text-xs text-blue-600/80 mt-0.5">如不勾选，该资源将作为普通资源，仅在资源中心展示</span>
                       </div>
                     </label>
                   </div>

                   {/* Category */}
                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-2">资源用途分类</label>
                     <select 
                       value={shareCategory} 
                       onChange={(e) => setShareCategory(e.target.value)}
                       className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                     >
                       {['政策文件', '服务指南', '文书模板', '外事礼仪资料', '科研产教', '标准课程', '考试资料', '培训资料', '学术分享', '其他'].map(cat => (
                         <option key={cat} value={cat}>{cat}</option>
                       ))}
                     </select>
                   </div>

                   <div className="grid grid-cols-2 gap-5">
                     {/* Region */}
                     <div>
                       <label className="block text-sm font-semibold text-slate-700 mb-2">国家 / 地区</label>
                       <select 
                         value={shareRegion} 
                         onChange={(e) => setShareRegion(e.target.value)}
                         className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                       >
                         {['通用', '北美', '欧洲', '东南亚', '日韩', '其它'].map(reg => (
                           <option key={reg} value={reg}>{reg}</option>
                         ))}
                       </select>
                     </div>

                     {/* Domain */}
                     <div>
                       <label className="block text-sm font-semibold text-slate-700 mb-2">专业领域</label>
                       <select 
                         value={shareDomain} 
                         onChange={(e) => setShareDomain(e.target.value)}
                         className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                       >
                         {['通用', '航空航天', '交通运输', '智能制造', '文化教育', '经贸法律', '交叉学科'].map(domain => (
                           <option key={domain} value={domain}>{domain}</option>
                         ))}
                       </select>
                     </div>
                   </div>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                 <button 
                   onClick={() => setSharingResource(null)}
                   className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                 >
                   取消
                 </button>
                 <button 
                   onClick={() => {
                     setSharingResource(null);
                     alert('共享设置成功并已提交审核。');
                   }}
                   className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                 >
                   <Check className="w-4 h-4" /> 确认共享
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reupload Modal */}
      <AnimatePresence>
        {showReuploadModal && selectedResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowReuploadModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  重新上传资源
                </h3>
                <button 
                  onClick={() => setShowReuploadModal(false)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-sm text-amber-800 flex items-start gap-3">
                  <div className="min-w-0">
                    <span className="font-bold block mb-1">提示：</span>
                    您正在为 <span className="font-semibold text-amber-900">{selectedResource.name}</span> 重新上传文件，系统会自动保留历史版本。
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">更新版本说明 (选填)</label>
                  <textarea 
                    placeholder="例如：补充了2026年最新数据、修改了部分错别字..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">选择新文件</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-slate-400 mb-3" />
                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold text-blue-600">点击上传</span> 或拖拽文件至此处</p>
                        <p className="text-xs text-slate-400">PDF, DOCX, XLSX (最大 100MB)</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowReuploadModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    alert('文件已成功重新上传');
                    setShowReuploadModal(false);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" /> 确认上传
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
