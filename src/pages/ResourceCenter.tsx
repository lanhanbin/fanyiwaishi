import { useState } from 'react';
import { 
  FileText, Video, Image as ImageIcon, Presentation, Mic, Download, Eye, 
  Search, Filter, X, PlayCircle, FolderOpen, Globe, BookOpen, User, BookOpenCheck,
  Calendar, Tag, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ResourceType = 'doc' | 'video' | 'ppt' | 'image' | 'audio';
type ResourceSource = '外事服务' | '天工学院' | '其它';
type UsageCategory = '政策文件' | '服务指南' | '文书模板' | '外事礼仪资料' | '科研产教' | '标准课程' | '考试资料' | '培训资料' | '学术分享' | '其他';
type RegionCategory = '通用' | '北美' | '欧洲' | '东南亚' | '日韩' | '其它';
type DomainCategory = '通用' | '航空航天' | '交通运输' | '智能制造' | '文化教育' | '经贸法律' | '交叉学科';

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  source: ResourceSource;
  category: UsageCategory;
  region: RegionCategory;
  domain: DomainCategory;
  size: string;
  downloads: number;
  date: string;
  uploader?: string;
  summary: string;
  keywords?: string[];
}

const mockResources: Resource[] = [
  // Foreign Affairs Resources
  { id: 'f1', title: '《因公出国（境）管理规定》2025修订版解读', type: 'doc', source: '外事服务', category: '政策文件', region: '通用', domain: '经贸法律', size: '2.4 MB', downloads: 1250, date: '2026-04-15', uploader: '国际交流处', summary: '关于最新因公出国的审批流程、经费管理、纪律要求的详细解读与执行指南。', keywords: ['出国管理', '政策解读', '经费审批'] },
  { id: 'f2', title: '北美地区外语交流礼仪与文化禁忌实操视频', type: 'video', source: '外事服务', category: '外事礼仪资料', region: '北美', domain: '文化教育', size: '128 MB', downloads: 840, date: '2026-03-20', uploader: '王教授', summary: '结合北美校园场景，演示学术交流、晚宴等场合的商务礼仪规范。', keywords: ['北美', '外事礼仪', '文化禁忌'] },
  { id: 'f3', title: '欧洲多国联合签证申请指导PPT', type: 'ppt', source: '外事服务', category: '服务指南', region: '欧洲', domain: '通用', size: '15.6 MB', downloads: 2100, date: '2026-02-10', uploader: '签证服务中心', summary: '涵盖申根签证申请要点、材料清单、拒签应对策略的全流程指南。', keywords: ['申根签证', '欧洲', '申请指南'] },
  { id: 'f4', title: '官方邀请函及往来信函标准中英双语模板', type: 'doc', source: '外事服务', category: '文书模板', region: '通用', domain: '通用', size: '540 KB', downloads: 3560, date: '2026-01-05', uploader: '国际交流处', summary: '包含学术访问邀请函、会议邀请函、感谢信等十余种标准格式模板。', keywords: ['邀请函', '中英双语', '模板'] },
  { id: 'f5', title: '日韩高校访问交流常见口语会话指南', type: 'audio', source: '外事服务', category: '外事礼仪资料', region: '日韩', domain: '文化教育', size: '45 MB', downloads: 920, date: '2025-11-18', uploader: '外语学院', summary: '由资深翻译录制的日韩高频交流对话录音，适合行前突击学习。', keywords: ['口语会话', '日韩', '学术访问'] },
  { id: 'f6', title: '东南亚国家入境申报与海关注意事项图解', type: 'image', source: '外事服务', category: '服务指南', region: '东南亚', domain: '通用', size: '4.2 MB', downloads: 670, date: '2025-10-30', uploader: '国际交流处', summary: '一图看懂新马泰等多国最新入境海关申报流程与违禁品清单。', keywords: ['海关申报', '东南亚', '入境要求'] },
  
  // Tiangong Academy Resources
  { id: 't1', title: '航空维修实训多语种语料库技术白皮书', type: 'doc', source: '天工学院', category: '科研产教', region: '通用', domain: '航空航天', size: '4.5 MB', downloads: 410, date: '2026-04-10', uploader: '中国民航大学联合项目组', summary: '介绍了航空维修实训多语种语料库的构建方法、标注规范及应用场景。', keywords: ['语料库', '航空维修', '技术白皮书'] },
  { id: 't2', title: '语料标注规范讲解', type: 'video', source: '天工学院', category: '科研产教', region: '通用', domain: '交叉学科', size: '124 MB', downloads: 320, date: '2026-04-12', uploader: '中国民航大学联合项目组', summary: '针对多语种语料库建设的视频培训资料，详细演示了标注系统的操作流程。', keywords: ['语料标注', '视频教程', '多语种'] },
  { id: 't3', title: '跨境电商业务虚拟仿真双语平台系统操作演示', type: 'video', source: '天工学院', category: '科研产教', region: '通用', domain: '经贸法律', size: '56 MB', downloads: 580, date: '2026-03-22', uploader: '深圳职业技术大学项目组', summary: '虚拟仿真双语平台的实操演示，包括商品管理、客户服务等模块。', keywords: ['跨境电商', '虚拟仿真', '系统操作'] },
  { id: 't4', title: '智能制造术语标准V1.0', type: 'doc', source: '天工学院', category: '标准课程', region: '欧洲', domain: '智能制造', size: '2.1 MB', downloads: 890, date: '2026-01-15', uploader: '天津机电职业技术学院项目组', summary: '智能制造设备操作及维护相关的中德、中英双语标准术语表。', keywords: ['智能制造', '术语标准', '中英双语'] },
  { id: 't5', title: '《旅游专业交替传译》课程标准与教案', type: 'doc', source: '天工学院', category: '标准课程', region: '其它', domain: '文化教育', size: '5.6 MB', downloads: 650, date: '2025-11-20', uploader: '浙江旅游职业学院项目组', summary: '校企联合开发的实训课程教案与标准大纲。', keywords: ['交替传译', '教案', '旅游专业'] },

  // Other Resources
  { id: 'o1', title: '2026年翻译资格考试(CATTI)备考指南', type: 'doc', source: '其它', category: '考试资料', region: '通用', domain: '文化教育', size: '14 MB', downloads: 1450, date: '2026-05-01', uploader: '张老师', summary: '汇总了CATTI笔译、口译的考试大纲变化及历年真题解析。', keywords: ['CATTI', '考试指南', '历年真题'] },
  { id: 'o2', title: '高校学术会议同传设备使用培训', type: 'video', source: '其它', category: '培训资料', region: '通用', domain: '通用', size: '210 MB', downloads: 230, date: '2026-04-25', uploader: '设备管理处', summary: '关于会议中心同传设备的操作、维护与故障排查视频教程。', keywords: ['同传设备', '会议培训', '操作指南'] },
  { id: 'o3', title: '跨文化交际中的非语言沟通案例集', type: 'ppt', source: '其它', category: '学术分享', region: '通用', domain: '文化教育', size: '22 MB', downloads: 670, date: '2026-03-15', uploader: '李博', summary: '分享了在不同文化背景中肢体语言、面部表情可能带来的误解与正确应对方式。', keywords: ['跨文化', '非语言沟通', '案例'] },
];

export default function ResourceCenter() {
  const [activeSource, setActiveSource] = useState<'全部' | ResourceSource>('全部');
  
  // Specific filters
  const [activeCategory, setActiveCategory] = useState<'全部' | UsageCategory>('全部');
  const [activeRegion, setActiveRegion] = useState<'全部' | RegionCategory>('全部');
  const [activeDomain, setActiveDomain] = useState<'全部' | DomainCategory>('全部');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = mockResources.filter(res => {
    // 1. Source filter
    if (activeSource !== '全部' && res.source !== activeSource) return false;
    
    // 2. Specific filters
    if (activeCategory !== '全部' && res.category !== activeCategory) return false;
    if (activeRegion !== '全部' && res.region !== activeRegion) return false;
    if (activeDomain !== '全部' && res.domain !== activeDomain) return false;

    // 3. Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!res.title.toLowerCase().includes(q) && 
          !(res.summary && res.summary.toLowerCase().includes(q))) {
        return false;
      }
    }
    
    return true;
  });

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'doc': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-purple-500" />;
      case 'ppt': return <Presentation className="w-5 h-5 text-orange-500" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-green-500" />;
      case 'audio': return <Mic className="w-5 h-5 text-red-500" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const getSourceIcon = (source: ResourceSource) => {
    switch(source) {
      case '外事服务': return <Globe className="w-3.5 h-3.5" />;
      case '天工学院': return <BookOpenCheck className="w-3.5 h-3.5" />;
      case '其它': return <User className="w-3.5 h-3.5" />;
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <FolderOpen className="w-12 h-12 text-blue-200" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">资源中心</h1>
          <p className="text-blue-100/90 text-lg sm:text-xl max-w-2xl leading-relaxed">
            汇聚外事服务文档、天工学院实训成果及用户共享资源，支持在线预览与下载，打造全面的语言与文化资源库。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          {/* Top Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            
            <div className="w-full lg:w-auto">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">资源来源</h3>
              <div className="flex flex-wrap gap-2">
                {['全部', '外事服务', '天工学院', '其它'].map((source) => (
                  <button
                    key={source}
                    onClick={() => setActiveSource(source as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      activeSource === source 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-96 shrink-0 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="搜索资源名称、内容摘要..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50 transition-shadow"
               />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <h3 className="text-sm font-semibold text-slate-700 w-24 shrink-0 flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" /> 用途分类
              </h3>
              <div className="flex flex-wrap gap-2">
                {['全部', '政策文件', '服务指南', '文书模板', '外事礼仪资料', '科研产教', '标准课程', '考试资料', '培训资料', '学术分享', '其他'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeCategory === cat 
                        ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <h3 className="text-sm font-semibold text-slate-700 w-24 shrink-0 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" /> 国家地区
              </h3>
              <div className="flex flex-wrap gap-2">
                {['全部', '通用', '北美', '欧洲', '东南亚', '日韩', '其它'].map(reg => (
                  <button
                    key={reg}
                    onClick={() => setActiveRegion(reg as any)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeRegion === reg 
                        ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <h3 className="text-sm font-semibold text-slate-700 w-24 shrink-0 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" /> 专业领域
              </h3>
              <div className="flex flex-wrap gap-2">
                {['全部', '通用', '航空航天', '交通运输', '智能制造', '文化教育', '经贸法律', '交叉学科'].map(domain => (
                  <button
                    key={domain}
                    onClick={() => setActiveDomain(domain as any)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeDomain === domain 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">全部资源 <span className="text-sm font-normal text-slate-500 ml-2">共 {filteredResources.length} 项</span></h2>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col h-full cursor-pointer relative"
                  onClick={() => setSelectedResource(resource)}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-slate-50 border border-slate-100 shadow-inner rounded-xl group-hover:scale-110 transition-transform">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex flex-col items-end gap-2 text-xs">
                        {resource.type === 'doc' && <span className="text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded">DOCX/PDF</span>}
                        {resource.type === 'video' && <span className="text-purple-500 font-semibold bg-purple-50 px-2 py-0.5 rounded">MP4</span>}
                        {resource.type === 'ppt' && <span className="text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded">PPTX</span>}
                        {resource.type === 'image' && <span className="text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded">JPG/PNG</span>}
                        {resource.type === 'audio' && <span className="text-red-500 font-semibold bg-red-50 px-2 py-0.5 rounded">MP3</span>}
                        
                        <span className="flex items-center gap-1 text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {getSourceIcon(resource.source)}
                          {resource.source}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                       {resource.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {resource.summary}
                    </p>
                    
                    {resource.category && (
                       <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                         <span className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded whitespace-nowrap">{resource.category}</span>
                         {resource.region && <span className="text-xs text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded whitespace-nowrap">{resource.region}</span>}
                         {resource.domain && <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded whitespace-nowrap">{resource.domain}</span>}
                       </div>
                    )}
                  </div>
                  
                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                      <span>{resource.size}</span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        {resource.downloads}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded bg-white border border-slate-200 transition-colors shadow-sm" 
                        title="预览"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded bg-white border border-slate-200 transition-colors shadow-sm" 
                        title="下载"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-500 shadow-sm">
               <FolderOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-slate-700 mb-2">未找到匹配资源</h3>
               <p className="text-sm">尝试调整来源、筛选条件或更换搜索关键词</p>
            </div>
          )}
        </div>
      </div>

      {/* Resource Modal Preview */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    {getResourceIcon(selectedResource.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg line-clamp-1 flex items-center gap-2">
                       {selectedResource.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="bg-slate-200 px-2 py-0.5 rounded">{selectedResource.date}</span>
                      <span>·</span>
                      <span>{selectedResource.size}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">{getSourceIcon(selectedResource.source)} {selectedResource.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium shadow-sm">
                    <Download className="w-4 h-4" /> 
                    <span className="hidden sm:inline">下载资源</span>
                  </button>
                  <button 
                    onClick={() => setSelectedResource(null)}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Preview Area & Metadata */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-[400px]">
                <div className="flex-1 overflow-auto bg-slate-200/50 p-6 flex justify-center items-center relative min-h-[300px]">
                  {/* Simulated Preview based on type */}
                  {selectedResource.type === 'video' && (
                    <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center group cursor-pointer">
                       <img src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80`} alt="Video Cover" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                       <div className="z-10 group-hover:scale-110 transition-transform">
                         <PlayCircle className="w-20 h-20 text-white opacity-90 shadow-2xl" />
                       </div>
                       <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                         <div className="h-1 bg-white/30 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-blue-500 w-1/3"></div>
                         </div>
                         <div className="flex justify-between text-white text-xs font-mono">
                           <span>02:15</span>
                           <span>45:30</span>
                         </div>
                       </div>
                    </div>
                  )}

                  {selectedResource.type === 'image' && (
                    <div className="max-w-full max-h-full rounded-lg overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                       <img src={`https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`} alt="Preview" className="w-auto h-auto max-w-full max-h-[60vh] object-contain rounded" />
                    </div>
                  )}

                  {(selectedResource.type === 'doc' || selectedResource.type === 'ppt') && (
                    <div className="w-full max-w-2xl bg-white shadow-xl min-h-[60vh] p-8 md:p-10 font-serif text-slate-700 leading-relaxed border border-slate-200 overflow-y-auto">
                      <h1 className="text-xl md:text-2xl font-bold text-center mb-8 text-slate-900 border-b border-slate-200 pb-6">{selectedResource.title}</h1>
                      <div className="space-y-6">
                        <p>这是一份预览文档。实际的 {selectedResource.type.toUpperCase()} 文件将在下载后查看完整内容。</p>
                        <p>内容摘要：{selectedResource.summary}</p>
                        
                        <div className="p-4 bg-slate-50 border-l-4 border-slate-300 italic text-sm">
                          The content of this preview is simulated. Please download the original file to view the full details of this document, including formatting, images, and other embedded materials.
                        </div>
                        
                        {[1, 2, 3].map(i => (
                          <div key={`doc-preview-${i}`} className="space-y-2 opacity-30 pointer-events-none select-none">
                            <div className="h-4 bg-slate-400 rounded w-full"></div>
                            <div className="h-4 bg-slate-400 rounded w-11/12"></div>
                            <div className="h-4 bg-slate-400 rounded w-4/5"></div>
                            <div className="h-4 bg-slate-400 rounded w-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedResource.type === 'audio' && (
                     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200 flex flex-col items-center text-center">
                       <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-red-100 relative">
                         <Mic className="w-10 h-10 text-red-500 absolute z-10" />
                         <div className="absolute inset-0 rounded-full border-4 border-red-200 border-t-red-500 animate-spin"></div>
                       </div>
                       <h4 className="font-bold text-slate-800 mb-2">{selectedResource.title}</h4>
                       <p className="text-sm text-slate-500 mb-8">{selectedResource.summary}</p>
                       
                       <div className="w-full space-y-4">
                         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-1/4 rounded-full relative">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border border-slate-200 translate-x-1/2"></div>
                            </div>
                         </div>
                         <div className="flex justify-between text-slate-400 text-xs font-mono">
                           <span>00:45</span>
                           <span>05:30</span>
                         </div>
                         <div className="flex justify-center gap-6 pt-4">
                           <button className="text-slate-400 hover:text-slate-600 transition-colors">
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4v-4zm-6 0a1 1 0 000 1.6l5.334 4A1 1 0 0013 16V8a1 1 0 00-1.6-.8l-5.333 4v-4z" /></svg>
                           </button>
                           <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors hover:scale-105 transform">
                             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                           </button>
                           <button className="text-slate-400 hover:text-slate-600 transition-colors">
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4v4zm6 0a1 1 0 000-1.6l-5.333-4A1 1 0 0011 8v8a1 1 0 001.6.8l5.333-4v4z" /></svg>
                           </button>
                         </div>
                       </div>
                     </div>
                  )}
                </div>

                {/* Right Metadata Panel */}
                <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-200 bg-slate-50 p-6 overflow-y-auto shrink-0 flex flex-col gap-6">
                   <h4 className="font-bold text-slate-800 text-base">资源详情</h4>
                   
                   <div className="space-y-4">
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> 上传作者</span>
                       <span className="text-sm text-slate-700 font-medium">{selectedResource.uploader || '系统共享'}</span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 上传时间</span>
                       <span className="text-sm text-slate-700 font-medium">{selectedResource.date}</span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FolderOpen className="w-3.5 h-3.5" /> 所属分类</span>
                       <span className="text-sm text-slate-700 font-medium">
                         {selectedResource.source} {selectedResource.category ? ` / ${selectedResource.category}` : ''}
                       </span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> 资源大小</span>
                       <span className="font-mono text-sm text-slate-700 font-medium">{selectedResource.size}</span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 资源格式</span>
                       <span className="text-sm text-slate-700 font-medium uppercase">{selectedResource.type}</span>
                     </div>
                     {selectedResource.keywords && selectedResource.keywords.length > 0 && (
                       <div className="flex flex-col gap-2">
                         <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> 关键词</span>
                         <div className="flex flex-wrap gap-1.5 mt-1">
                           {selectedResource.keywords.map(kw => (
                             <span key={kw} className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-xs font-medium shadow-sm">
                               {kw}
                             </span>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
