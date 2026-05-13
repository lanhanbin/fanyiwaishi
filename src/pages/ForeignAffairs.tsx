import { useState } from 'react';
import { FileText, Video, Image as ImageIcon, Presentation, Mic, Download, Eye, Search, Filter, X, PlayCircle, User, Calendar, FolderOpen, HardDrive, Tag, BookOpen, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ResourceType = 'doc' | 'video' | 'ppt' | 'image' | 'audio';
type ResourceCategory = '政策文件' | '服务指南' | '文书模板' | '外事礼仪资料' | '其他';
type ResourceRegion = '通用' | '北美' | '欧洲' | '亚洲' | '非洲' | '其它';
type ResourceDomain = '通用' | '航空航天' | '交通运输' | '智能制造' | '文化教育' | '经贸法律' | '交叉学科';

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  category: ResourceCategory;
  region: ResourceRegion;
  domain: ResourceDomain;
  size: string;
  date: string;
  summary?: string;
  uploader?: string;
  keywords?: string[];
}

const mockResources: Resource[] = [
  { id: '1', title: '2026年最新因公出国（境）管理规定', type: 'doc', category: '政策文件', region: '通用', domain: '经贸法律', size: '2.4 MB', date: '2026-04-15', uploader: '国际交流处', summary: '详细说明了最新的因公出国境审批流程及注意事项。', keywords: ['出国管理', '政策解读', '经费审批'] },
  { id: '2', title: '赴欧洲地区签证办理服务指南', type: 'doc', category: '服务指南', region: '欧洲', domain: '通用', size: '1.2 MB', date: '2026-03-20', uploader: '签证服务中心', summary: '包含申根国家签证办理的全套要求及材料清单。', keywords: ['申根签证', '欧洲', '申请指南'] },
  { id: '3', title: '国际商务礼仪与跨文化交流培训', type: 'video', category: '外事礼仪资料', region: '通用', domain: '文化教育', size: '156 MB', date: '2026-02-10', uploader: '王教授', summary: '外教录制的国际商务场合礼仪实操视频教程。', keywords: ['商务礼仪', '跨文化', '外事礼仪'] },
  { id: '4', title: '标准中英双语邀请函模板', type: 'ppt', category: '文书模板', region: '通用', domain: '通用', size: '3.5 MB', date: '2026-01-05', uploader: '国际交流处', summary: '含多种商务会议及学术研讨会的邀请函格式模板。', keywords: ['邀请函', '中英双语', '模板'] },
  { id: '5', title: '亚洲多国文化禁忌速览图解', type: 'image', category: '外事礼仪资料', region: '亚洲', domain: '文化教育', size: '4.8 MB', date: '2025-11-12', uploader: '国际交流处', summary: '以图片形式生动展示东南亚周边国家的文化禁忌。', keywords: ['文化禁忌', '亚洲', '礼仪'] },
  { id: '6', title: '北美出入境海关问询英语常用口语', type: 'audio', category: '服务指南', region: '北美', domain: '经贸法律', size: '28 MB', date: '2025-10-30', uploader: '外语学院', summary: '北美海关高频问答语音资料，附带中英文本。', keywords: ['口语', '海关', '北美'] },
  { id: '7', title: '外籍专家工作许可申请表及填报说明', type: 'doc', category: '文书模板', region: '通用', domain: '通用', size: '850 KB', date: '2026-05-01', uploader: '国际交流处', summary: '外聘专家来华工作许可的官方表格与详尽说明。', keywords: ['外籍专家', '工作许可', '申请表'] },
  { id: '8', title: '非洲重点国家概况与投资环境分析', type: 'ppt', category: '政策文件', region: '非洲', domain: '经贸法律', size: '12.6 MB', date: '2025-12-18', uploader: '国际交流处', summary: '由外交专家总结的非洲地区总体投资及安全分析报告。', keywords: ['非洲', '投资环境', '报告'] },
];

const categories: ('全部' | ResourceCategory)[] = ['全部', '政策文件', '服务指南', '文书模板', '外事礼仪资料', '其他'];
const regions: ('全部' | ResourceRegion)[] = ['全部', '通用', '北美', '欧洲', '亚洲', '非洲', '其它'];
const domains: ('全部' | ResourceDomain)[] = ['全部', '通用', '航空航天', '交通运输', '智能制造', '文化教育', '经贸法律', '交叉学科'];

export default function ForeignAffairs() {
  const [activeCategory, setActiveCategory] = useState<'全部' | ResourceCategory>('全部');
  const [activeRegion, setActiveRegion] = useState<'全部' | ResourceRegion>('全部');
  const [activeDomain, setActiveDomain] = useState<'全部' | ResourceDomain>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = mockResources.filter(res => {
    const matchCategory = activeCategory === '全部' || res.category === activeCategory;
    const matchRegion = activeRegion === '全部' || res.region === activeRegion;
    const matchDomain = activeDomain === '全部' || res.domain === activeDomain;
    const matchSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        res.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchRegion && matchDomain && matchSearch;
  });

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'doc': return <FileText className="w-6 h-6 text-blue-500" />;
      case 'video': return <Video className="w-6 h-6 text-purple-500" />;
      case 'ppt': return <Presentation className="w-6 h-6 text-orange-500" />;
      case 'image': return <ImageIcon className="w-6 h-6 text-cyan-500" />;
      case 'audio': return <Mic className="w-6 h-6 text-green-500" />;
    }
  };

  const getResourceTypeLabel = (type: ResourceType) => {
    switch (type) {
      case 'doc': return '文档';
      case 'video': return '视频';
      case 'ppt': return '幻灯片';
      case 'image': return '图片';
      case 'audio': return '音频';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">外事服务资源中心</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              汇聚权威的政策文件、详尽的办事指南、标准文书模板及丰富的多国文化外事礼仪资料，为您提供一站式涉外服务支持。
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="space-y-6 flex-1">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                   用途分类
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === cat 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Filter */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                   国家地区
                </h3>
                <div className="flex flex-wrap gap-2">
                  {regions.map(reg => (
                    <button
                      key={reg}
                      onClick={() => setActiveRegion(reg)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeRegion === reg 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Domain Filter */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                   专业领域
                </h3>
                <div className="flex flex-wrap gap-2">
                  {domains.map(domain => (
                    <button
                      key={domain}
                      onClick={() => setActiveDomain(domain)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeDomain === domain 
                          ? 'bg-emerald-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="lg:w-80 shrink-0">
               <h3 className="text-sm font-semibold text-slate-700 mb-3">关键词检索</h3>
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="搜索资源名称或描述..." 
                   className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            全部资源 <span className="text-base font-normal text-slate-500 ml-2">({filteredResources.length})</span>
          </h2>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                      {getResourceIcon(resource.type)}
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {getResourceTypeLabel(resource.type)}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 space-y-2">
                    <div className="flex flex-wrap gap-2 pb-3">
                      <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                        {resource.category}
                      </span>
                      <span className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                        {resource.region}
                      </span>
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                        {resource.domain}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {resource.summary}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
                  <div className="flex items-center gap-3">
                    <span>{resource.size}</span>
                    <span>{resource.date}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded bg-white border border-slate-200 transition-colors" 
                      title="预览"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded bg-white border border-slate-200 transition-colors" 
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
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
             <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-slate-700 mb-2">未找到匹配的资源</h3>
             <p className="text-slate-500">尝试调整分类或更换搜索关键词</p>
             <button 
               onClick={() => {
                 setActiveCategory('全部');
                 setActiveRegion('全部');
                 setActiveDomain('全部');
                 setSearchQuery('');
               }}
               className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg transition-colors"
             >
               清空过滤条件
             </button>
          </div>
        )}
      </div>

      {/* Resource Modal */}
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
                      <span>{selectedResource.category}</span>
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
                          <div key={i} className="space-y-2 opacity-30 pointer-events-none select-none">
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
                       <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-green-100 relative">
                         <Mic className="w-10 h-10 text-green-500 absolute z-10" />
                         <div className="absolute inset-0 rounded-full border-4 border-green-200 border-t-green-500 animate-spin"></div>
                       </div>
                       <h4 className="font-bold text-slate-800 mb-2">{selectedResource.title}</h4>
                       <p className="text-sm text-slate-500 mb-8">{selectedResource.summary}</p>
                       
                       <div className="w-full space-y-4">
                         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-1/4 rounded-full relative">
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
                           <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors hover:scale-105 transform">
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
                         {selectedResource.category} {selectedResource.region ? ` / ${selectedResource.region}` : ''} {selectedResource.domain ? ` / ${selectedResource.domain}` : ''}
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
