import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Database, FileCheck, Search, Filter, CheckCircle, XCircle, MoreVertical, Ban, PlayCircle, Eye, Trash2, Edit, ChevronDown, ChevronRight, History, Upload, RotateCcw, FileDiff, GitCommit, UploadCloud, Plus, FileText, X, Newspaper, ArrowUp, ArrowDown, Pin, ImageIcon, Paperclip, GraduationCap, Award, Power, PowerOff, Settings, Network, Users, Key, FileUp, Shield } from 'lucide-react';

type AdminTab = 'resources' | 'approvals' | 'upload' | 'news' | 'achievements' | 'organization' | 'users' | 'roles';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('resources');
  const [isResourceMenuOpen, setIsResourceMenuOpen] = useState(true);
  const [isTiangongMenuOpen, setIsTiangongMenuOpen] = useState(true);
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(true);
  
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [currentActionId, setCurrentActionId] = useState<string | null>(null);

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showReuploadModal, setShowReuploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any | null>(null);

  // States for sharing options
  const [shareName, setShareName] = useState<string>('');
  const [shareSummary, setShareSummary] = useState<string>('');
  const [shareKeywords, setShareKeywords] = useState<string>('');
  const [shareUsage, setShareUsage] = useState<string>('');
  const [shareDomain, setShareDomain] = useState<string>('');
  const [shareRegion, setShareRegion] = useState<string>('');
  const [isForeignAffairs, setIsForeignAffairs] = useState<boolean>(true);

  // States for news
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsType, setNewsType] = useState('news');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [newsOrder, setNewsOrder] = useState(0);

  // States for achievements
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [achievementName, setAchievementName] = useState('');
  const [achievementInstitutions, setAchievementInstitutions] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [achievementContent, setAchievementContent] = useState('');
  const [editingAchievementId, setEditingAchievementId] = useState<number | null>(null);

  // States for organizations
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [editingOrgId, setEditingOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState('');
  const [orgLevel, setOrgLevel] = useState<number>(1);
  const [orgParentId, setOrgParentId] = useState<string>('');

  // States for users
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userOrgFilter, setUserOrgFilter] = useState<string>('');
  const [userForm, setUserForm] = useState({
    account: '',
    name: '',
    organizationId: '',
    phone: '',
    email: '',
    major: '',
    isTranslator: false,
    specialty: ''
  });

  // States for roles
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleForm, setRoleForm] = useState({ name: '', description: '' });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const renderResources = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          资源列表
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="搜索资源..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> 筛选
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
              <th className="py-4 px-6 font-semibold min-w-[250px]">资源名称</th>
              <th className="py-4 px-6 font-semibold">上传者</th>
              <th className="py-4 px-6 font-semibold">模块</th>
              <th className="py-4 px-6 font-semibold">更新时间</th>
              <th className="py-4 px-6 font-semibold">状态</th>
              <th className="py-4 px-6 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-800 flex items-center">
                    示例外事培训资料 {i}
                    <button 
                      onClick={() => { setSelectedResource(i); setShowHistoryModal(true); }}
                      className="ml-2 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-mono text-slate-600 hover:bg-slate-200 transition-colors flex items-center gap-1"
                      title="查看历史版本"
                    >
                      <History className="w-3 h-3" /> v1.{i}.0
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">文件大小: 2.4MB • DOC文档</div>
                </td>
                <td className="py-4 px-6 font-medium text-slate-700">张教授</td>
                <td className="py-4 px-6 text-slate-500">外事服务</td>
                <td className="py-4 px-6 text-slate-500">2026-05-13</td>
                <td className="py-4 px-6">
                  {i % 2 === 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle className="w-3.5 h-3.5" /> 已启用
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      <Ban className="w-3.5 h-3.5" /> 已禁用
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 transition-opacity">
                    <button 
                      onClick={() => alert('更改资源状态')}
                      className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${i % 2 === 0 ? 'text-orange-600 hover:text-orange-700' : 'text-emerald-600 hover:text-emerald-700'}`}
                      title={i % 2 === 0 ? "禁用资源" : "启用资源"}
                    >
                      {i % 2 === 0 ? <Ban className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => { setSelectedResource(i); setShowReuploadModal(true); }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="重新上传(更新版本)"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { setSelectedResource(i); setShowEditModal(true); }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="编辑资源"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('确定要删除该资源吗？此操作不可回复。')) {
                          alert('资源已删除');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="删除资源"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApprovals = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-600" />
          资源审核
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
              <th className="py-4 px-6 font-semibold min-w-[250px]">资源名称</th>
              <th className="py-4 px-6 font-semibold">申请人</th>
              <th className="py-4 px-6 font-semibold">分享板块</th>
              <th className="py-4 px-6 font-semibold">申请时间</th>
              <th className="py-4 px-6 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-800 flex items-center">
                    出入境安全须知汇总 {i}
                    <button 
                      onClick={() => { setSelectedResource(i); setShowCompareModal(true); }}
                      className="ml-2 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded text-xs font-mono text-amber-700 hover:bg-amber-100 transition-colors flex items-center gap-1"
                      title="版本对比"
                    >
                      <FileDiff className="w-3 h-3" /> v{i}.1.0 (待审)
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">申请用途: 共享到资源中心及天工学院</div>
                </td>
                <td className="py-4 px-6 font-medium text-slate-700">李老师</td>
                <td className="py-4 px-6 text-slate-500">
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium">天工学院</span>
                </td>
                <td className="py-4 px-6 text-slate-500">2026-05-13 14:30</td>
                <td className="py-4 px-6 text-right space-x-2">
                  <button 
                    onClick={() => {
                      setCurrentActionId(`item-${i}`);
                      setShowRejectModal(true);
                      setRejectReason('');
                    }}
                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-colors font-medium text-sm"
                  >
                    驳回
                  </button>
                  <button 
                    onClick={() => alert('资源已通过审核')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm"
                  >
                    通过
                  </button>
                </td>
              </tr>
            ))}
            {/* Empty state when no approvals */}
            {false && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  暂无需要审核的资源分享申请
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-blue-600" />
          联盟资讯管理
        </h2>
        <button 
          onClick={() => setShowNewsModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> 发布新资讯
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
              <th className="py-4 px-6 font-semibold w-16">排序</th>
              <th className="py-4 px-6 font-semibold min-w-[250px]">标题</th>
              <th className="py-4 px-6 font-semibold">类型</th>
              <th className="py-4 px-6 font-semibold relative z-10">状态</th>
              <th className="py-4 px-6 font-semibold">发布时间</th>
              <th className="py-4 px-6 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-1 items-center w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-300 hover:text-blue-600"><ArrowUp className="w-3 h-3" /></button>
                    <span className="font-mono text-slate-500 text-xs">{i}</span>
                    <button className="text-slate-300 hover:text-blue-600"><ArrowDown className="w-3 h-3" /></button>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-12 rounded bg-slate-200 shrink-0 overflow-hidden border border-slate-200">
                      <img src={`https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=100&h=80`} alt="cover" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 flex items-center gap-2">
                        {i === 1 && <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-xs">置顶</span>}
                        2026年全国外语外贸职业教育联盟发展规划落实会 {i}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1 w-64">这是一段关于会议的简短引语或摘要，用于在卡片或列表中展示...</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  {i === 1 ? '活动公告' : i === 2 ? '新闻' : '通知'}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                    已发布
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-500">2026-05-1{i} 09:00</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="编辑">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className={`p-1.5 rounded transition-colors ${i === 1 ? 'text-rose-600 hover:bg-rose-50' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'}`} title={i === 1 ? "取消置顶" : "置顶"}>
                      <Pin className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          项目成果管理
        </h2>
        <button 
          onClick={() => {
            setEditingAchievementId(null);
            setAchievementName('');
            setAchievementInstitutions('');
            setAchievementDescription('');
            setAchievementContent('');
            setShowAchievementModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> 新增项目成果
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
              <th className="py-4 px-6 font-semibold">项目名称</th>
              <th className="py-4 px-6 font-semibold">参与院校</th>
              <th className="py-4 px-6 font-semibold">状态</th>
              <th className="py-4 px-6 font-semibold">更新时间</th>
              <th className="py-4 px-6 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {[1, 2].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-800">
                    天工{i}号联合研究项目成果
                  </div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-1 w-64">这是关于该项目成果的简要描述...</div>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  江西外语外贸职业学院, 广东外语外贸大学{i === 1 ? ', 浙江外语学院' : ''}
                </td>
                <td className="py-4 px-6">
                  {i === 1 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                      已启用
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      已禁用
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-slate-500">2026-05-1{i} 14:30</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setShowAchievementModal(true)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                      title="编辑"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className={`p-1.5 rounded transition-colors ${i === 1 ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`} 
                      title={i === 1 ? "禁用" : "启用"}
                    >
                      {i === 1 ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                    </button>
                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrganization = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Network className="w-5 h-5 text-blue-600" />
          组织管理
        </h2>
        <button 
          onClick={() => {
            setEditingOrgId(null);
            setOrgName('');
            setOrgLevel(1);
            setOrgParentId('');
            setShowOrgModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> 新增组织
        </button>
      </div>

      <div className="overflow-x-auto flex-1 p-6">
        <div className="border border-slate-200 rounded-xl overflow-hidden text-sm">
          {/* Level 1 */}
          <div className="group">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <ChevronDown className="w-4 h-4 text-slate-400" />
                全国外语外贸职业教育联盟
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 border border-blue-200 ml-2">一级</span>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {
                    setEditingOrgId('1');
                    setOrgName('全国外语外贸职业教育联盟');
                    setOrgLevel(1);
                    setOrgParentId('');
                    setShowOrgModal(true);
                  }}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="编辑"
                ><Edit className="w-4 h-4" /></button>
                <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="删除"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            {/* Level 2 */}
            <div className="pl-6 bg-white">
              <div className="group border-l-2 border-slate-200 ml-2">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                    华东分盟
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 border border-emerald-200 ml-2">二级</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="编辑"><Edit className="w-4 h-4" /></button>
                    <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="删除"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                
                {/* Level 3 */}
                <div className="pl-6 border-l-2 border-slate-100 ml-6">
                  <div className="group flex items-center justify-between px-4 py-2 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-4 h-px bg-slate-300"></div>
                      江西外语外贸职业学院
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-700 border border-purple-200 ml-2">三级</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="编辑"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="删除"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="group flex items-center justify-between px-4 py-2 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-4 h-px bg-slate-300"></div>
                      广东外语外贸大学
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-700 border border-purple-200 ml-2">三级</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="编辑"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="删除"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group border-l-2 border-slate-200 ml-2">
                <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    华南分盟
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 border border-emerald-200 ml-2">二级</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="编辑"><Edit className="w-4 h-4" /></button>
                    <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="删除"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          角色管理
        </h2>
        <button 
          onClick={() => {
            setEditingRoleId(null);
            setRoleForm({ name: '', description: '' });
            setShowRoleModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> 新增角色
        </button>
      </div>

      <div className="overflow-x-auto flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: '1', name: '平台管理员', desc: '拥有系统所有最高权限，负责平台基础配置与整个系统的维护。', count: 2, defaultUser: 'admin' },
            { id: '2', name: '联盟管理员', desc: '管理联盟相关事务，如新闻公告、组织架构以及联盟活动。', count: 5, defaultUser: '张大山' },
            { id: '3', name: '院校管理员', desc: '管理本校内的资源分享、审核、活动发布以及师生用户管理。', count: 12, defaultUser: '李老师, 王教授' },
          ].map((role) => (
            <div key={role.id} className="border border-slate-200 rounded-xl bg-white hover:shadow-md transition-shadow flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-slate-400" />
                    {role.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => {
                        setEditingRoleId(role.id);
                        setRoleForm({ name: role.name, description: role.desc });
                        setShowRoleModal(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                      title="编辑角色"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors" title="删除角色">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4 h-10 line-clamp-2">{role.desc}</p>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="font-medium text-slate-700 mb-1">示例用户：</div>
                  {role.defaultUser}
                </div>
              </div>
              <div className="bg-slate-50 px-5 py-3 flex items-center justify-between text-sm shrink-0 border-t border-slate-100">
                <span className="text-slate-500 font-medium">当前关联 <span className="text-blue-600">{role.count}</span> 位用户</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">管理成员</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          用户管理
        </h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              // Trigger import
              alert('导入用户功能');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200"
          >
            <FileUp className="w-4 h-4" /> 导入用户
          </button>
          <button 
            onClick={() => {
              setEditingUserId(null);
              setUserForm({
                account: '',
                name: '',
                organizationId: '',
                phone: '',
                email: '',
                major: '',
                isTranslator: false,
                specialty: ''
              });
              setShowUserModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> 新增用户
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">组织筛选:</span>
          <div className="relative">
            <select 
              value={userOrgFilter}
              onChange={(e) => setUserOrgFilter(e.target.value)}
              className="pl-4 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none min-w-[200px]"
            >
              <option value="">全部组织</option>
              <option value="1">全国外语外贸职业教育联盟</option>
              <option value="2">华东分盟</option>
              <option value="3">江西外语外贸职业学院</option>
              <option value="4">广东外语外贸大学</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
              <th className="py-4 px-6 font-semibold">账号/姓名</th>
              <th className="py-4 px-6 font-semibold">所属组织</th>
              <th className="py-4 px-6 font-semibold">身份信息</th>
              <th className="py-4 px-6 font-semibold">状态</th>
              <th className="py-4 px-6 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-800">
                    user{i}_test
                  </div>
                  <div className="text-xs text-slate-500 mt-1">张大山 {i}</div>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  全国外语外贸职业教育联盟
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600">专业：商务英语</span>
                    {i === 1 && <span className="text-blue-600 font-medium">翻译员 (擅长：文献翻译)</span>}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {i !== 3 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                      正常
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      已禁用
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="重置密码">
                      <Key className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setShowUserModal(true)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                      title="编辑"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className={`p-1.5 rounded transition-colors ${i !== 3 ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`} 
                      title={i !== 3 ? "禁用" : "启用"}
                    >
                      {i !== 3 ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-blue-600" />
          资源上传
        </h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors relative">
            <Plus className="w-4 h-4" /> 
            <span>添加资源</span>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                 alert('资源已添加到上传列表');
              }
            }} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
              <th className="py-4 px-6 font-semibold min-w-[250px]">资源名称</th>
              <th className="py-4 px-6 font-semibold">大小</th>
              <th className="py-4 px-6 font-semibold">状态</th>
              <th className="py-4 px-6 font-semibold">上传时间</th>
              <th className="py-4 px-6 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {[1, 2].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-800">最新内部财务规范 {i}.pdf</div>
                </td>
                <td className="py-4 px-6 text-slate-500">1.2MB</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                     未发布
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-500">2026-05-13 15:40</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 transition-opacity">
                    <button 
                      onClick={() => { setSelectedResource(i); setShowShareModal(true); }}
                      className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 border border-transparent rounded-lg transition-colors font-medium text-sm"
                    >
                      发布
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('确定要删除尚未发布的资源吗？')) {
                           alert('资源已删除');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="删除资源"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-50 flex z-[100]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-6">
          <div className="text-white text-xl font-bold tracking-tight">平合管理后台</div>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Admin Panel</p>
        </div>
        
        <nav className="flex-1 space-y-1 mt-4">
          <div className="px-2">
            <button 
              onClick={() => setIsResourceMenuOpen(!isResourceMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5" />
                资源管理
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isResourceMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isResourceMenuOpen && (
              <div className="ml-8 mt-1 space-y-1 pr-2">
                <button 
                  onClick={() => setActiveTab('resources')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'resources' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  资源列表
                </button>
                
                <button 
                  onClick={() => setActiveTab('upload')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'upload' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <UploadCloud className="w-4 h-4" />
                  资源上传
                </button>
                
                <button 
                  onClick={() => setActiveTab('approvals')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex justify-between ${
                    activeTab === 'approvals' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-4 h-4" />
                    资源审核
                  </div>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                </button>
              </div>
            )}
          </div>

          <div className="px-2 mt-4">
            <button 
              onClick={() => setIsTiangongMenuOpen(!isTiangongMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5" />
                天工学院
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isTiangongMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isTiangongMenuOpen && (
              <div className="ml-8 mt-1 space-y-1 pr-2">
                <button 
                  onClick={() => setActiveTab('news')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'news' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Newspaper className="w-4 h-4" />
                  联盟资讯内容
                </button>
                <button 
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'achievements' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  项目成果管理
                </button>
              </div>
            )}
          </div>

          <div className="px-2 mt-4">
            <button 
              onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                系统管理
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isSystemMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSystemMenuOpen && (
              <div className="ml-8 mt-1 space-y-1 pr-2">
                <button 
                  onClick={() => setActiveTab('organization')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'organization' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Network className="w-4 h-4" />
                  组织管理
                </button>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'users' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  用户管理
                </button>
                <button 
                  onClick={() => setActiveTab('roles')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'roles' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  角色管理
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-800 rounded-xl p-4 mb-4 flex items-center gap-3">
            <img src={user.avatar} alt="Admin" className="w-10 h-10 rounded-full border border-slate-600" />
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">{user.name}</div>
              <div className="text-xs text-slate-400">超级管理员</div>
            </div>
          </div>
          <Link 
            to="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
          >
            <Home className="w-4 h-4" /> 返回门户网站
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-hidden flex flex-col min-w-0">
        <header className="mb-8 shrink-0">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {activeTab === 'resources' ? '共享资源管理' : activeTab === 'upload' ? '资源上传' : activeTab === 'news' ? '联盟资讯发布管理' : activeTab === 'achievements' ? '项目成果管理' : activeTab === 'organization' ? '组织管理' : activeTab === 'users' ? '用户管理' : activeTab === 'roles' ? '角色管理' : '分享审核申请'}
          </h1>
          <p className="text-slate-500 mt-2">
            {activeTab === 'resources' 
              ? '管理各模块已共享的资料，进行启停、编辑或删除操作。' 
              : activeTab === 'upload'
              ? '上传新资源并发布到资源中心或天工学院。'
              : activeTab === 'news'
              ? '发布并管理联盟新闻、通知和活动公告等内容。'
              : activeTab === 'achievements'
              ? '管理和发布天工学院的各项联合研究项目成果。'
              : activeTab === 'organization'
              ? '管理平台组织架构，支持多级组织的新增、修改与删除。'
              : activeTab === 'users'
              ? '管理平台用户，配置用户组织归属及身份类型。'
              : activeTab === 'roles'
              ? '管理联盟管理员、平台管理员及其他角色的权限及用户成员配置。'
              : '处理用户的资源共享申请，审核资料内容合规性。'}
          </p>
        </header>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'resources' ? renderResources() : activeTab === 'upload' ? renderUpload() : activeTab === 'news' ? renderNews() : activeTab === 'achievements' ? renderAchievements() : activeTab === 'organization' ? renderOrganization() : activeTab === 'users' ? renderUsers() : activeTab === 'roles' ? renderRoles() : renderApprovals()}
        </div>
      </main>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowRejectModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden transform scale-100 transition-transform">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-red-50/30">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                驳回申请
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">驳回理由 <span className="text-red-500">*</span></label>
                <textarea 
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="请说明驳回的具体原因，例如：内容不合规、缺乏关键信息等..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none min-h-[120px]"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  if (!rejectReason.trim()) {
                    alert('请填写驳回理由');
                    return;
                  }
                  alert(`已驳回，理由：${rejectReason}`);
                  setShowRejectModal(false);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
              >
                确认驳回
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowHistoryModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" />
                历史版本记录
              </h3>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-0 overflow-y-auto">
              <ul className="divide-y divide-slate-100">
                {[
                  { v: `v1.${selectedResource}.0`, current: true, date: '2026-05-13 10:30', author: '张教授', desc: '更新了第三章数据统计的内容' },
                  { v: `v1.${selectedResource - 1 > 0 ? selectedResource - 1 : 0}.2`, current: false, date: '2026-04-22 14:15', author: '张教授', desc: '修复部分错别字，补充附件' },
                  { v: `v1.${selectedResource - 1 > 0 ? selectedResource - 1 : 0}.0`, current: false, date: '2026-01-10 09:00', author: '系统管理员', desc: '初始版本上传' },
                ].map((ver, idx) => (
                  <li key={idx} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono font-bold text-slate-800">{ver.v}</span>
                          {ver.current ? (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">当前版本</span>
                          ) : null}
                        </div>
                        <div className="text-sm text-slate-600 mb-2">{ver.desc}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-3">
                          <span>{ver.date}</span>
                          <span>上传: {ver.author}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button 
                          onClick={() => setShowCompareModal(true)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FileDiff className="w-4 h-4" /> 对比
                        </button>
                        {!ver.current && (
                          <button 
                            onClick={() => {
                              if(window.confirm(`确定要回滚到 ${ver.v} 吗？`)) {
                                alert(`已成功回滚到 ${ver.v}`);
                              }
                            }}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                          >
                            <RotateCcw className="w-4 h-4" /> 回滚
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Version Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCompareModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl z-10 flex flex-col h-[85vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileDiff className="w-5 h-5 text-indigo-600" />
                版本变更对比
              </h3>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex gap-6 flex-1 overflow-hidden bg-slate-50/50">
              <div className="flex-1 border border-slate-200 rounded-xl bg-white flex flex-col overflow-hidden">
                <div className="p-3 border-b border-slate-100 bg-slate-50 font-mono text-sm text-slate-500 font-semibold text-center">
                  v1.0.0 (上一版本)
                </div>
                <div className="p-5 overflow-y-auto text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
                  // 第四章：海外差旅报销规定
                  
                  1. 员工在海外出差期间的住宿标准为每天不超过150美元。
                  <span className="bg-red-100 text-red-800 line-through">2. 餐饮补贴为每天50美元，无需提供发票。</span>
                  3. 交通费用需凭正规票据实报实销。
                  
                  <span className="bg-red-100 text-red-800 line-through">注：所有报销需在回国后2周内完成提交。</span>
                </div>
              </div>
              
              <div className="flex flex-col justify-center text-slate-400">
                <GitCommit className="w-6 h-6 rotate-90" />
              </div>
              
              <div className="flex-1 border border-slate-200 rounded-xl bg-white flex flex-col overflow-hidden shadow-sm shadow-blue-100 border-blue-100">
                <div className="p-3 border-b border-blue-100 bg-blue-50 font-mono text-sm text-blue-700 font-bold text-center">
                  v1.1.0 (当前变更版本)
                </div>
                <div className="p-5 overflow-y-auto text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
                  // 第四章：海外差旅报销规定
                  
                  1. 员工在海外出差期间的住宿标准为每天不超过150美元。
                  <span className="bg-green-100 text-green-800 font-bold">2. 餐饮补贴调整为每天80美元，其中50美元以内无需提供发票，超出部分需发票报销。</span>
                  3. 交通费用需凭正规票据实报实销。
                  <span className="bg-green-100 text-green-800 font-bold">4. 新增打车补贴：每日限额30美元。</span>
                  
                  <span className="bg-green-100 text-green-800 font-bold">注：所有报销需在回国后30天内完成提交，逾期不予受理。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                编辑资源信息
              </h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">资源名称</label>
                <input 
                  type="text" 
                  defaultValue={`示例外事培训资料 ${selectedResource}`}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">所属模块</label>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="foreign">外事服务</option>
                  <option value="academy">天工学院</option>
                </select>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert('编辑已保存');
                  setShowEditModal(false);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> 保存更改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reupload Modal */}
      {showReuploadModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowReuploadModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden flex flex-col">
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
                  <span className="font-bold block mb-1">注意：</span>
                  重新上传的文件将作为新版本（例：<span className="font-mono bg-white px-1 py-0.5 rounded text-amber-900">v1.{selectedResource}.1</span>），历史版本将被保留并可查看。
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">版本变更说明 (选填)</label>
                <textarea 
                  placeholder="简要描述此版本的更新内容或修复的问题..."
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
                  alert('新版本已成功上传');
                  setShowReuploadModal(false);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> 确认上传
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Share Modal */}
      {showShareModal && selectedResource && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowShareModal(false)} />
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">资源发布设置</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 bg-white border border-slate-200 text-blue-600 rounded-lg shrink-0 shadow-sm">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">最新内部财务规范 {selectedResource}.pdf</h4>
                  <p className="text-sm text-slate-500 mt-1">大小: 1.2MB • 上传于 2026-05-13 15:40</p>
                </div>
              </div>

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

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">用途</label>
                    <div className="relative">
                      <select 
                        value={shareUsage}
                        onChange={(e) => setShareUsage(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                      >
                        <option value="">请选择用途</option>
                        <option value="training">内部培训</option>
                        <option value="reference">参考资料</option>
                        <option value="policy">政策文件</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">专业领域</label>
                    <div className="relative">
                      <select 
                        value={shareDomain}
                        onChange={(e) => setShareDomain(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                      >
                        <option value="">请选择专业领域</option>
                        <option value="finance">财务规范</option>
                        <option value="legal">法律合规</option>
                        <option value="tech">技术研发</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">国家地区</label>
                  <div className="relative">
                    <select 
                      value={shareRegion}
                      onChange={(e) => setShareRegion(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    >
                      <option value="">请选择国家地区</option>
                      <option value="global">全国适用</option>
                      <option value="na">华北地区</option>
                      <option value="eu">华南地区</option>
                      <option value="apac">华东地区</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
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
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowShareModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert('资源发布成功');
                  setShowShareModal(false);
                  setActiveTab('resources');
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                确认发布
              </button>
            </div>
          </div>
        </div>
      )}
      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNewsModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl z-10 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-600" />
                发布资讯
              </h3>
              <button 
                onClick={() => setShowNewsModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">资讯标题</label>
                    <input 
                      type="text" 
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="请输入吸引人的标题..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">简介/摘要</label>
                    <textarea 
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      placeholder="资讯的简要内容，在列表页展示..."
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">资讯正文 <span className="font-normal text-slate-400">(富媒体编辑)</span></label>
                    <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col h-64">
                      {/* fake rich text toolbar */}
                      <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><span className="font-bold">B</span></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><span className="italic">I</span></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 underline">U</button>
                        <div className="w-px h-6 bg-slate-300 my-auto mx-1"></div>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><ImageIcon className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Paperclip className="w-4 h-4" /></button>
                      </div>
                      <textarea 
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        className="flex-1 w-full p-4 resize-none outline-none text-sm text-slate-700" 
                        placeholder="在此输入正文..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">资讯封面</label>
                    <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-blue-400 transition-colors overflow-hidden group">
                      <ImageIcon className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs text-slate-500 font-medium">点击或拖拽上传封面</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">资讯类型</label>
                    <div className="relative">
                      <select 
                        value={newsType}
                        onChange={(e) => setNewsType(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                      >
                        <option value="notice">通知</option>
                        <option value="news">新闻</option>
                        <option value="event">活动公告</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">展示设置</label>
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        checked={isPinned}
                        onChange={(e) => setIsPinned(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                      />
                      <span className="text-sm text-slate-700">将本条资讯置顶</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">排序优先级</label>
                    <input 
                      type="number" 
                      value={newsOrder}
                      onChange={(e) => setNewsOrder(parseInt(e.target.value))}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                    <p className="text-xs text-slate-400 mt-1">数值越大越靠前</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">上传附件</label>
                    <label className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-slate-200 dashed">
                      <Paperclip className="w-4 h-4" /> 选择附件
                      <input type="file" className="hidden" multiple />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowNewsModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert('资讯发布成功');
                  setShowNewsModal(false);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                确认发布
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Achievement Modal */}
      {showAchievementModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAchievementModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl z-10 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                {editingAchievementId ? '编辑项目成果' : '新增项目成果'}
              </h3>
              <button 
                onClick={() => setShowAchievementModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">项目名称</label>
                    <input 
                      type="text" 
                      value={achievementName}
                      onChange={(e) => setAchievementName(e.target.value)}
                      placeholder="请输入完整的项目名称..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">参与院校</label>
                    <input 
                      type="text" 
                      value={achievementInstitutions}
                      onChange={(e) => setAchievementInstitutions(e.target.value)}
                      placeholder="如：江西外语外贸职业学院, 广东外语外贸大学 (逗号分隔)"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">成果描述</label>
                    <textarea 
                      value={achievementDescription}
                      onChange={(e) => setAchievementDescription(e.target.value)}
                      placeholder="请简要描述项目成果的核心价值和意义..."
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">成果内容 <span className="font-normal text-slate-400">(富媒体编辑)</span></label>
                    <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col h-64">
                      {/* fake rich text toolbar */}
                      <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><span className="font-bold">B</span></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><span className="italic">I</span></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 underline">U</button>
                        <div className="w-px h-6 bg-slate-300 my-auto mx-1"></div>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><ImageIcon className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Paperclip className="w-4 h-4" /></button>
                      </div>
                      <textarea 
                        value={achievementContent}
                        onChange={(e) => setAchievementContent(e.target.value)}
                        className="flex-1 w-full p-4 resize-none outline-none text-sm text-slate-700" 
                        placeholder="详细介绍项项目的研究过程、突破性发现、应用前景等..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">项目封面</label>
                    <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-blue-400 transition-colors overflow-hidden group">
                      <ImageIcon className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs text-slate-500 font-medium">点击或拖拽上传封面</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">相关附件上传</label>
                    <label className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-slate-200 dashed">
                      <UploadCloud className="w-4 h-4" /> 选择文件
                      <input type="file" className="hidden" multiple />
                    </label>
                    <p className="text-xs text-slate-400 mt-2">支持 PDF, DOCX, ZIP 格式。单个文件不超过 50MB。</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowAchievementModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert(editingAchievementId ? '项目成果更新成功' : '项目成果发布成功');
                  setShowAchievementModal(false);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                {editingAchievementId ? '保存更改' : '提交发布'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Organization Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowOrgModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-600" />
                {editingOrgId ? '编辑组织' : '新增组织'}
              </h3>
              <button 
                onClick={() => setShowOrgModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">组织层级</label>
                <div className="flex gap-4">
                  {[1, 2, 3].map((level) => (
                    <label key={level} className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg border cursor-pointer transition-colors ${orgLevel === level ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <input 
                        type="radio" 
                        name="orgLevel"
                        value={level} 
                        checked={orgLevel === level} 
                        onChange={() => setOrgLevel(level)}
                        className="sr-only"
                      />
                      {level}级组织
                    </label>
                  ))}
                </div>
              </div>

              {orgLevel > 1 && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">上级组织</label>
                  <div className="relative">
                    <select 
                      value={orgParentId}
                      onChange={(e) => setOrgParentId(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    >
                      <option value="">请选择上级组织</option>
                      <option value="1">全国外语外贸职业教育联盟 - 1级</option>
                      {orgLevel === 3 && <option value="2">华东分盟 - 2级</option>}
                      {orgLevel === 3 && <option value="3">华南分盟 - 2级</option>}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">组织名称</label>
                <input 
                  type="text" 
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="请输入组织名称..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 hover:bg-slate-50/80">
              <button 
                onClick={() => setShowOrgModal(false)}
                className="px-5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert(editingOrgId ? '组织修改成功' : '组织新增成功');
                  setShowOrgModal(false);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-200 transition-all active:scale-95"
              >
                {editingOrgId ? '确认修改' : '确认新增'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRoleModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                {editingRoleId ? '编辑角色' : '新增角色'}
              </h3>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">角色名称 <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={roleForm.name}
                  onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                  placeholder="请输入角色名称..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">角色描述</label>
                <textarea 
                  value={roleForm.description}
                  onChange={(e) => setRoleForm({...roleForm, description: e.target.value})}
                  placeholder="请简要描述该角色的主要指责和权限..."
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 hover:bg-slate-50/80">
              <button 
                onClick={() => setShowRoleModal(false)}
                className="px-5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert(editingRoleId ? '角色修改成功' : '角色新增成功');
                  setShowRoleModal(false);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-200 transition-all active:scale-95"
              >
                {editingRoleId ? '确认修改' : '确认新增'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowUserModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {editingUserId ? '编辑用户' : '新增用户'}
              </h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">账号 <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    value={userForm.account}
                    onChange={(e) => setUserForm({...userForm, account: e.target.value})}
                    placeholder="请输入登录账号"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">姓名 <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                    placeholder="请输入真实姓名"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">手机号</label>
                  <input 
                    type="tel" 
                    value={userForm.phone}
                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                    placeholder="请输入手机号"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">邮箱</label>
                  <input 
                    type="email" 
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    placeholder="请输入邮箱地址"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">所属组织 <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <select 
                      value={userForm.organizationId}
                      onChange={(e) => setUserForm({...userForm, organizationId: e.target.value})}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    >
                      <option value="">请选择所属组织</option>
                      <option value="1">全国外语外贸职业教育联盟</option>
                      <option value="2">&nbsp;&nbsp;华东分盟</option>
                      <option value="3">&nbsp;&nbsp;&nbsp;&nbsp;江西外语外贸职业学院</option>
                      <option value="4">&nbsp;&nbsp;&nbsp;&nbsp;广东外语外贸大学</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">专业</label>
                  <input 
                    type="text" 
                    value={userForm.major}
                    onChange={(e) => setUserForm({...userForm, major: e.target.value})}
                    placeholder="请输入所学/所在专业"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                <div className="col-span-2 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">翻译员身份</h4>
                      <p className="text-xs text-slate-500 mt-1">开启后该用户将能参与平台文献、视频的翻译与审核工作</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={userForm.isTranslator}
                        onChange={(e) => setUserForm({...userForm, isTranslator: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {userForm.isTranslator && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">擅长领域 <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        value={userForm.specialty}
                        onChange={(e) => setUserForm({...userForm, specialty: e.target.value})}
                        placeholder="如：医学外语、计算机科学、法律文书等（多个用逗号隔开）"
                        className="w-full border border-blue-200 rounded-xl px-4 py-3 bg-blue-50/30 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowUserModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  alert(editingUserId ? '用户信息修改成功' : '用户新增成功');
                  setShowUserModal(false);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-200 transition-all active:scale-95"
              >
                {editingUserId ? '确认修改' : '确认新增'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
