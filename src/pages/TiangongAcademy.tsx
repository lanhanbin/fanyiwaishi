import { useState } from 'react';
import { 
  Bell, Newspaper, Calendar, Pin, Paperclip, Download, Search, Filter, 
  Image as ImageIcon, FileText, Building2, Tag, ChevronRight, Award, 
  FolderOpen, CalendarDays, BookOpen, X, Eye, Video, Presentation, Mic, PlayCircle,
  User, HardDrive, BarChart2, Activity, Users, GitMerge, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

type ResourceType = 'doc' | 'video' | 'ppt' | 'image' | 'audio';

type NoticeType = '通知' | '新闻' | '活动公告';
interface Notice {
  id: string;
  title: string;
  type: NoticeType;
  date: string;
  isPinned: boolean;
  content: string;
  attachments?: { name: string; url: string; size: string; type?: ResourceType; date?: string; uploader?: string; summary?: string; keywords?: string[] }[];
}

type ProjectType = '产教融合' | '科研合作' | '课程开发' | '标准制定';
interface ProjectOutcome {
  id: string;
  projectName: string;
  type: ProjectType;
  date: string;
  institutions: string[];
  description: string;
  hasImages: boolean;
  resources?: { name: string; url: string; size: string; type: ResourceType; date?: string; uploader?: string; summary?: string; keywords?: string[] }[];
}

const mockNotices: Notice[] = [
  {
    id: '1', title: '2026年中国职业教育与机器翻译融合发展研讨会通知', type: '活动公告', date: '2026-05-10', isPinned: true, 
    content: '为进一步推动翻译专业技术与职业教育融合，促进联盟单位间的学术交流与合作，现定于2026年6月在天津举办融合发展研讨会。本次会议将邀请多位行业专家进行主旨演讲，展示最新AI翻译技术在实训教学中的应用。', 
    attachments: [
      { name: '研讨会议程安排.pdf', url: '#', size: '1.2 MB', type: 'doc', date: '2026-05-10', uploader: '联盟秘书处', summary: '附有研讨会的详细时间表与活动安排。', keywords: ['研讨会', '日程', '通知'] }, 
      { name: '参会回执单.docx', url: '#', size: '45 KB', type: 'doc', date: '2026-05-10', uploader: '联盟秘书处', summary: '用于登记参会人员信息的表格', keywords: ['回执', '参会人员'] }
    ]
  },
  {
    id: '2', title: '天工学院联盟新成员入驻欢迎仪式及培训安排', type: '通知', date: '2026-05-08', isPinned: true, 
    content: '热烈欢迎本月新加入天工学院联盟的5所高职院校。联盟秘书处将为新入驻院校开展系统使用、项目对接与资源共享机制的线上培训。'
  },
  {
    id: '3', title: '2026春季首批优秀外语+职业实训项目表彰名单公布', type: '新闻', date: '2026-05-05', isPinned: false, 
    content: '经联盟专家组多维度的严格评审，以下10个双语实训建设和科研项目获得本季度优秀表彰。感谢各院校在产教融合创新方面的突出贡献。', 
    attachments: [{ name: '表彰名单.pdf', url: '#', size: '800 KB', type: 'doc', date: '2026-05-05', uploader: '项目管理组', summary: '春季双语实训建设和科研项目表彰名单。', keywords: ['表彰', '项目名单'] }]
  },
  {
    id: '4', title: '关于开展第三期天工学院师资联合培训的通知', type: '通知', date: '2026-04-20', isPinned: false, 
    content: '各联盟成员单位：为了提升联盟院校双语教师的数字化教学能力，普及大模型辅助翻译工具，计划下月线上开办第三期师资联合培训，请各单位尽早报名。', 
    attachments: [{ name: '培训方案与大纲.pdf', url: '#', size: '2.5 MB', type: 'doc', date: '2026-04-20', uploader: '培训组', summary: '第三期师资联合培训的课程设计与详细大纲。', keywords: ['师资培训', '培训大纲'] }]
  }
];

const mockOutcomes: ProjectOutcome[] = [
  {
    id: '1', projectName: '航空维修实训多语种语料库建设', type: '科研合作', date: '2026-04', institutions: ['中国民航大学', '广州民航职业技术学院', '天工科技'], 
    description: '本项目旨在构建真实航空维修场景下的中、英、法多语种语料库，共包含了超100万字的标准化术语与维修手册双语对齐语料，支持AI翻译模型的垂直微调。大大提升了专业领域的机翻准确率。', 
    hasImages: true, resources: [
      { name: '航空语料库技术白皮书.pdf', url: '#', size: '4.5 MB', type: 'doc', date: '2026-04-10', uploader: '中国民航大学项目组', summary: '介绍了航空维修实训多语种语料库的构建方法、标注规范及应用场景。', keywords: ['语料库', '航空维修', '技术白皮书'] },
      { name: '语料标注规范讲解.mp4', url: '#', size: '124 MB', type: 'video', date: '2026-04-12', uploader: '天工科技支持团队', summary: '针对多语种语料库建设的视频培训资料，详细演示了标注系统的操作流程。', keywords: ['语料标注', '视频教程', '多语种'] }
    ]
  },
  {
    id: '2', projectName: '跨境电商业务虚拟仿真双语教学平台', type: '产教融合', date: '2026-03', institutions: ['深圳职业技术大学', '义乌工商职业技术学院'], 
    description: '联合开发的虚拟仿真平台，让学生沉浸式体验跨境电商平台的商品上架、客服沟通、物流追踪全流程，系统内置AI实时多语翻译辅助工具，降低实操语言门槛。', 
    hasImages: true, resources: [
      { name: '系统操作演示.mp4', url: '#', size: '56 MB', type: 'video', date: '2026-03-22', uploader: '深圳职业技术大学团队', summary: '虚拟仿真双语平台的实操演示，包括商品管理、客户服务等模块。', keywords: ['跨境电商', '虚拟仿真', '操作演示'] },
      { name: '平台架构设计图.png', url: '#', size: '2.1 MB', type: 'image', date: '2026-03-23', uploader: '系统架构组', summary: '展示了产教融合平台的整体服务架构与数据流向。', keywords: ['架构图', '系统设计'] }
    ]
  },
  {
    id: '3', projectName: '智能制造装备操作与维护多语标准规范', type: '标准制定', date: '2026-01', institutions: ['天津机电职业技术学院', '某工业软件公司'], 
    description: '针对工业4.0智能制造装备出海需求，制定了统一的中德双语操作维护规范术语库，为中国制造企业设备安全运行提供语言基座。', 
    hasImages: false, resources: [
      { name: '智能制造术语标准V1.0.pdf', url: '#', size: '2.1 MB', type: 'doc', date: '2026-01-15', uploader: '天津机电职院项目组', summary: '智能制造设备操作及维护相关的中德、中英双语标准术语表。', keywords: ['智能制造', '术语标准', '多语种'] }, 
      { name: '应用案例集.pptx', url: '#', size: '15 MB', type: 'ppt', date: '2026-01-18', uploader: '教研室', summary: '汇总了该术语标准在多家出海企业的实际应用案例。', keywords: ['案例集', '实际应用'] },
      { name: '专家解读访谈.mp3', url: '#', size: '8.4 MB', type: 'audio', date: '2026-01-20', uploader: '外联宣发组', summary: '参与标准制定的行业专家的专访录音，深入解读了标准的意义。', keywords: ['专家解读', '访谈录音'] }
    ]
  },
  {
    id: '4', projectName: '《旅游专业交替传译》校企联合实训课程', type: '课程开发', date: '2025-11', institutions: ['浙江旅游职业学院', '地区骨干文旅企业'], 
    description: '结合地方文旅特色开发的高阶传译课程，包含12个文旅实景单元及数字化考核方案，打通了企业实际工作流程。', 
    hasImages: true, resources: [{ name: '课程标准与教案.pdf', url: '#', size: '5.6 MB', type: 'doc', date: '2025-11-20', uploader: '浙江旅游职院课研组', summary: '校企联合开发的实训课程教案与标准大纲。', keywords: ['交替传译', '教案', '旅游专业'] }]
  }
];

interface AllianceMember {
  id: string;
  name: string;
  description: string;
  tags: string[];
  joinedDate: string;
}

const mockMembers: AllianceMember[] = [
  {
    id: '1',
    name: '江西外语外贸职业学院',
    description: '具有鲜明外语外贸特色的高职院校，致力于培养具备国际视野的高素质技能型人才。',
    tags: ['外语特色', '外贸专业', '骨干高职'],
    joinedDate: '2024-01'
  },
  {
    id: '2',
    name: '深圳职业技术大学',
    description: '中国高职院校标杆，设有应用外语学院，探索外语与各专业群融合的高层次职业及实训教育。',
    tags: ['综合性标杆', '双高计划A档', '产教融合'],
    joinedDate: '2024-01'
  },
  {
    id: '3',
    name: '浙江旅游职业学院',
    description: '拥有旅游外语学院，在文旅行业跨文化交流、多语种导游及服务领域具备深厚实训实力。',
    tags: ['文旅特色', '多语种导游', '校企合作'],
    joinedDate: '2024-03'
  },
  {
    id: '4',
    name: '天津机电职业技术学院',
    description: '在智能制造领域与国际标准对接，开展中德双语实训，推动工程设备操作维护标准的国际化。',
    tags: ['智能制造', '中德合作', '外语+技能'],
    joinedDate: '2024-05'
  },
  {
    id: '5',
    name: '中国民航大学',
    description: '具备强大的航空专业外语培训实力，在航空维修实训、多语种语料库建设方面成果显著。',
    tags: ['民航特色', '航空外语', '专业语料库'],
    joinedDate: '2024-01'
  },
  {
    id: '6',
    name: '广州民航职业技术学院',
    description: '中国民航局直属的高等职业院校，深度参与民航机务、乘务双语服务规程的研制与实训。',
    tags: ['民航直属', '机务乘务', '双语实训'],
    joinedDate: '2024-06'
  }
];

export default function TiangongAcademy() {
  const [activeMainTab, setActiveMainTab] = useState<'analytics' | 'news' | 'outcomes' | 'members'>('analytics');
  
  // Analytics State
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'quarter'>('month');

  const trendData = {
    day: [
      { name: '08:00', resources: 5, activity: 12 },
      { name: '10:00', resources: 12, activity: 45 },
      { name: '12:00', resources: 15, activity: 52 },
      { name: '14:00', resources: 18, activity: 48 },
      { name: '16:00', resources: 22, activity: 61 },
      { name: '18:00', resources: 14, activity: 55 },
    ],
    week: [
      { name: '周一', resources: 120, activity: 450 },
      { name: '周二', resources: 150, activity: 520 },
      { name: '周三', resources: 180, activity: 480 },
      { name: '周四', resources: 220, activity: 610 },
      { name: '周五', resources: 140, activity: 550 },
      { name: '周六', resources: 90, activity: 300 },
      { name: '周日', resources: 110, activity: 350 },
    ],
    month: [
      { name: '1日', resources: 320, activity: 1450 },
      { name: '5日', resources: 350, activity: 1520 },
      { name: '10日', resources: 380, activity: 1480 },
      { name: '15日', resources: 420, activity: 1610 },
      { name: '20日', resources: 340, activity: 1550 },
      { name: '25日', resources: 290, activity: 1300 },
      { name: '30日', resources: 310, activity: 1350 },
    ],
    quarter: [
      { name: '一月', resources: 1500, activity: 5450 },
      { name: '二月', resources: 1200, activity: 4520 },
      { name: '三月', resources: 1800, activity: 6480 },
    ],
  };

  const projectStatusData = [
    { name: '立项阶段', value: 12 },
    { name: '研发中', value: 25 },
    { name: '测试评估', value: 8 },
    { name: '已落地', value: 15 },
  ];

  const PROJECT_COLORS = ['#fbbf24', '#3b82f6', '#a855f7', '#10b981'];

  const exportReport = () => {
    alert("标准化报表已导出为PDF格式");
  };

  // News State
  const [noticeTypeFilter, setNoticeTypeFilter] = useState<'全部' | NoticeType>('全部');
  
  // Outcomes State
  const [outcomeTypeFilter, setOutcomeTypeFilter] = useState<'全部' | ProjectType>('全部');
  const [outcomeSearchQuery, setOutcomeSearchQuery] = useState('');

  // Modals state
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<ProjectOutcome | null>(null);
  const [previewDoc, setPreviewDoc] = useState<{name: string; size: string; category?: string; type?: ResourceType; date?: string; uploader?: string; summary?: string; keywords?: string[]} | null>(null);

  const filteredNotices = mockNotices.filter(notice => 
    noticeTypeFilter === '全部' || notice.type === noticeTypeFilter
  ).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const filteredOutcomes = mockOutcomes.filter(outcome => 
    (outcomeTypeFilter === '全部' || outcome.type === outcomeTypeFilter) &&
    (outcome.projectName.toLowerCase().includes(outcomeSearchQuery.toLowerCase()) || 
     outcome.institutions.some(inst => inst.toLowerCase().includes(outcomeSearchQuery.toLowerCase())))
  );

  const getNoticeIcon = (type: NoticeType) => {
    switch (type) {
      case '通知': return <Bell className="w-5 h-5 text-blue-500" />;
      case '新闻': return <Newspaper className="w-5 h-5 text-indigo-500" />;
      case '活动公告': return <Calendar className="w-5 h-5 text-orange-500" />;
    }
  };

  const getResourceIcon = (type?: ResourceType) => {
    switch (type) {
      case 'doc': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'video': return <Video className="w-4 h-4 text-purple-500" />;
      case 'ppt': return <Presentation className="w-4 h-4 text-orange-500" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-green-500" />;
      case 'audio': return <Mic className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const getOutcomeTypeColor = (type: ProjectType) => {
    switch (type) {
      case '产教融合': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '科研合作': return 'bg-purple-50 text-purple-700 border-purple-200';
      case '课程开发': return 'bg-green-50 text-green-700 border-green-200';
      case '标准制定': return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 py-16 text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
           <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
             <path fill="#FFFFFF" d="M42.7,-73.4C55.9,-67.6,67.6,-56.3,77.5,-42.6C87.4,-28.9,95.5,-12.9,92.5,1.5C89.5,15.9,75.4,28.8,63.1,39.3C50.8,49.8,40.3,57.9,28,64.6C15.7,71.3,1.6,76.6,-13.2,77.2C-28,77.8,-43.5,73.8,-55.8,65.1C-68.1,56.4,-77.2,43.1,-82.9,28.1C-88.6,13.1,-90.9,-3.6,-85.8,-18.2C-80.7,-32.8,-68.2,-45.3,-53.9,-51.2C-39.6,-57.1,-23.5,-56.4,-7.8,-47.5C7.9,-38.6,29.5,-79.2,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <BookOpen className="w-16 h-16 text-blue-300 mb-4 opacity-80" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">天工学院</h1>
          <p className="text-blue-100/90 text-lg sm:text-xl max-w-2xl leading-relaxed">
            产教融合共享平台，展示联盟最新动态资讯、科研实训合作成果，致力于职业教育与语言科技深度融合。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Main Tabs Segmented Control */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 max-w-2xl mx-auto mb-8 flex transition-all">
           <button 
             onClick={() => setActiveMainTab('analytics')}
             className={`flex-1 flex justify-center items-center gap-2 py-2.5 px-4 text-sm font-bold rounded-xl transition-all ${
               activeMainTab === 'analytics' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
             }`}
           >
             <BarChart2 className="w-4 h-4" /> 联盟看板
           </button>
           <button 
             onClick={() => setActiveMainTab('news')}
             className={`flex-1 flex justify-center items-center gap-2 py-2.5 px-4 text-sm font-bold rounded-xl transition-all ${
               activeMainTab === 'news' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
             }`}
           >
             <Newspaper className="w-4 h-4" /> 联盟资讯
           </button>
           <button 
             onClick={() => setActiveMainTab('outcomes')}
             className={`flex-1 flex justify-center items-center gap-2 py-2.5 px-4 text-sm font-bold rounded-xl transition-all ${
               activeMainTab === 'outcomes' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
             }`}
           >
             <Award className="w-4 h-4" /> 合作成果
           </button>
           <button 
             onClick={() => setActiveMainTab('members')}
             className={`flex-1 flex justify-center items-center gap-2 py-2.5 px-4 text-sm font-bold rounded-xl transition-all ${
               activeMainTab === 'members' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
             }`}
           >
             <Building2 className="w-4 h-4" /> 联盟成员
           </button>
        </div>

        {activeMainTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
               <div>
                 <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <BarChart2 className="w-6 h-6 text-blue-600" />
                   数据看板
                 </h2>
                 <p className="text-sm text-slate-500 mt-1">实时掌握联盟成员发展状况、项目进程与共享资源活跃度</p>
               </div>
               <div className="flex items-center gap-3 w-full sm:w-auto">
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    {[
                      { id: 'day', label: '日' },
                      { id: 'week', label: '周' },
                      { id: 'month', label: '月' },
                      { id: 'quarter', label: '季' }
                    ].map(period => (
                      <button
                        key={period.id}
                        onClick={() => setTimeRange(period.id as any)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          timeRange === period.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                 </div>
                 <button 
                   onClick={exportReport}
                   className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors shadow-sm"
                 >
                   <Download className="w-4 h-4" />
                   导出报表
                 </button>
               </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { label: '联盟成员单位', value: '42', unit: '家', trend: '+3', icon: <Building2 className="w-6 h-6 text-white" />, color: 'bg-emerald-500' },
                 { label: '合作项目数量', value: '60', unit: '个', trend: '+12', icon: <GitMerge className="w-6 h-6 text-white" />, color: 'bg-blue-500' },
                 { label: '共享教学资源', value: '1,280', unit: '项', trend: '+145', icon: <FolderOpen className="w-6 h-6 text-white" />, color: 'bg-indigo-500' },
                 { label: '平台活跃师生', value: '34.5', unit: 'k', trend: '+12%', icon: <Users className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
               ].map((kpi, index) => (
                 <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${kpi.color} shadow-inner`}>
                       {kpi.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</div>
                      <div className="flex items-baseline gap-2">
                         <span className="text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</span>
                         <span className="text-sm text-slate-500">{kpi.unit}</span>
                      </div>
                      <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                         <Activity className="w-3.5 h-3.5" /> 较上期 {kpi.trend}
                      </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 lg:col-span-2">
                 <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <Activity className="w-5 h-5 text-indigo-500" />
                   活跃指标趋势
                 </h3>
                 <div className="h-[350px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={trendData[timeRange]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                       <defs>
                         <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="colorResources" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                       <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} tickLine={false} axisLine={false} dy={10} />
                       <YAxis yAxisId="left" tick={{ fontSize: 13, fill: '#64748b' }} tickLine={false} axisLine={false} dx={-10} />
                       <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 13, fill: '#64748b' }} tickLine={false} axisLine={false} dx={10} />
                       <RechartsTooltip 
                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                       />
                       <Legend wrapperStyle={{ paddingTop: '20px' }} />
                       <Area yAxisId="left" type="monotone" dataKey="activity" name="系统活跃度" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
                       <Area yAxisId="right" type="monotone" dataKey="resources" name="新增资源数" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResources)" />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
               </div>

               <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                 <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <Target className="w-5 h-5 text-orange-500" />
                   合作项目状态分布
                 </h3>
                 <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={projectStatusData}
                         innerRadius={80}
                         outerRadius={110}
                         paddingAngle={5}
                         dataKey="value"
                         stroke="none"
                       >
                         {projectStatusData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={PROJECT_COLORS[index % PROJECT_COLORS.length]} />
                         ))}
                       </Pie>
                       <RechartsTooltip 
                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                         itemStyle={{ color: '#1e293b' }}
                       />
                     </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-3xl font-bold text-slate-800">60</span>
                     <span className="text-sm text-slate-500">总项目数</span>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mt-6">
                   {projectStatusData.map((item, index) => (
                     <div key={item.name} className="flex items-center gap-2">
                       <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PROJECT_COLORS[index] }}></span>
                       <span className="text-sm text-slate-600">{item.name}</span>
                       <span className="text-sm font-semibold text-slate-900 ml-auto">{item.value}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   <FileText className="w-5 h-5 text-blue-500" />
                   近期动态总览
                 </h3>
                 <button className="text-sm font-medium text-blue-600 hover:text-blue-700">查看完整日志</button>
               </div>
               <div className="p-0">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-white border-b border-slate-100 text-sm font-medium text-slate-500">
                       <th className="py-4 px-6 font-semibold">时间</th>
                       <th className="py-4 px-6 font-semibold">动作</th>
                       <th className="py-4 px-6 font-semibold">相关对象</th>
                       <th className="py-4 px-6 font-semibold">操作方</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm divide-y divide-slate-50">
                     {[
                       { time: '10分钟前', action: '提交项目节点', object: '跨境电商业务虚拟仿真双语教学平台', user: '深圳职业技术大学' },
                       { time: '1小时前', action: '上传资源', object: '航空语料库技术白皮书.pdf', user: '中国民航大学' },
                       { time: '3小时前', action: '新成员加入', object: '联盟网络平台', user: '广州民航职业技术学院' },
                       { time: '昨天 15:30', action: '发布通知', object: '2026年中国职业教育与机器...研讨会', user: '联盟秘书处' },
                     ].map((log, i) => (
                       <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="py-3 px-6 text-slate-500">{log.time}</td>
                         <td className="py-3 px-6"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">{log.action}</span></td>
                         <td className="py-3 px-6 font-medium text-slate-700 group-hover:text-blue-600 transition-colors cursor-pointer">{log.object}</td>
                         <td className="py-3 px-6 text-slate-600">{log.user}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

          </div>
        )}

        {activeMainTab === 'news' && (
          <div className="space-y-6">
            {/* News Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
               <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
                  {['全部', '通知', '新闻', '活动公告'].map(type => (
                    <button
                      key={type}
                      onClick={() => setNoticeTypeFilter(type as '全部' | NoticeType)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        noticeTypeFilter === type
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
               </div>
            </div>

            {/* News List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
               {filteredNotices.length > 0 ? (
                 <div className="flex flex-col">
                   {filteredNotices.map((notice) => (
                     <div 
                       key={notice.id} 
                       className="p-6 hover:bg-slate-50/80 transition-colors group cursor-pointer"
                       onClick={() => setSelectedNotice(notice)}
                     >
                       <div className="flex items-start gap-4">
                         <div className="shrink-0 pt-1">
                           <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                             {getNoticeIcon(notice.type)}
                           </div>
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex items-center flex-wrap gap-2 mb-2">
                             {notice.isPinned && (
                               <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                                 <Pin className="w-3 h-3 fill-current" /> 置顶
                               </span>
                             )}
                             <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                               {notice.type}
                             </span>
                             <span className="text-sm text-slate-400 font-medium">
                               {notice.date}
                             </span>
                           </div>
                           
                           <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                             {notice.title}
                           </h3>
                           <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                             {notice.content}
                           </p>

                           {/* Attachments */}
                           {notice.attachments && notice.attachments.length > 0 && (
                             <div className="flex flex-wrap gap-3 mt-4">
                               {notice.attachments.map((file, idx) => (
                                 <button 
                                   key={idx} 
                                   className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors self-start group/file"
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     setPreviewDoc({ name: file.name, size: file.size, category: '附件', type: 'doc' });
                                   }}
                                 >
                                   <Paperclip className="w-4 h-4 text-slate-400 group-hover/file:text-blue-500" />
                                   <span className="max-w-[200px] truncate">{file.name}</span>
                                   <span className="text-xs text-slate-400">({file.size})</span>
                                   <Eye className="w-4 h-4 ml-1 opacity-60 hover:opacity-100" />
                                 </button>
                               ))}
                             </div>
                           )}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="p-16 text-center text-slate-500">
                   <div className="inline-block p-4 rounded-full bg-slate-50 mb-3 text-slate-400">
                     <Filter className="w-8 h-8" />
                   </div>
                   <p>没有找到相关资讯公告</p>
                 </div>
               )}
            </div>
          </div>
        )}

        {activeMainTab === 'outcomes' && (
          <div className="space-y-6">
            {/* Outcomes Filters */}
            <div className="flex flex-col lg:flex-row justify-between gap-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    项目类型筛选
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['全部', '产教融合', '科研合作', '课程开发', '标准制定'].map(type => (
                      <button
                        key={type}
                        onClick={() => setOutcomeTypeFilter(type as '全部' | ProjectType)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          outcomeTypeFilter === type 
                            ? 'bg-slate-800 text-white shadow-sm' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-80 shrink-0">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">关键词检索院校/项目</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="搜索项目名称或合作院校..." 
                    value={outcomeSearchQuery}
                    onChange={(e) => setOutcomeSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-sm bg-slate-50 transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Outcomes Grid */}
            {filteredOutcomes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                 {filteredOutcomes.map(outcome => (
                   <div 
                     key={outcome.id} 
                     className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col cursor-pointer"
                     onClick={() => setSelectedOutcome(outcome)}
                   >
                     {/* Card Header image simulation */}
                     {outcome.hasImages ? (
                       <div className="h-40 bg-slate-100 border-b border-slate-100 relative overflow-hidden group">
                         {/* Placeholder decorative graphic based on id */}
                         <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply flex items-center justify-center p-6">
                            <div className="w-full h-full border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center bg-white/50 backdrop-blur-sm">
                              <ImageIcon className="w-8 h-8 text-blue-300" />
                            </div>
                         </div>
                       </div>
                     ) : (
                       <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                     )}
                     
                     <div className="p-6 flex-1 flex flex-col">
                       <div className="flex justify-between items-start mb-3 gap-2">
                         <span className={`inline-flex px-2.5 py-1 rounded text-xs font-bold border ${getOutcomeTypeColor(outcome.type)}`}>
                           {outcome.type}
                         </span>
                         <span className="text-xs text-slate-400 font-medium whitespace-nowrap bg-slate-50 px-2 py-1 rounded-full border border-slate-100 flex items-center gap-1">
                           <CalendarDays className="w-3 h-3" />
                           {outcome.date}
                         </span>
                       </div>
                       
                       <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{outcome.projectName}</h3>
                       
                       <div className="flex items-start gap-2 mb-4 text-sm">
                         <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                         <div className="text-slate-600 font-medium">
                           {outcome.institutions.join(' · ')}
                         </div>
                       </div>
                       
                       <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                         {outcome.description}
                       </p>
                       
                       {outcome.resources && outcome.resources.length > 0 && (
                         <div className="pt-4 border-t border-slate-100 space-y-2 mt-auto">
                           <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><FolderOpen className="w-3.5 h-3.5" />相关成果资源</div>
                           {outcome.resources.map((res, idx) => (
                             <button 
                               key={idx} 
                               className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all group/doc"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setPreviewDoc({ name: res.name, size: res.size, category: '成果资源', type: res.type, date: res.date, uploader: res.uploader, summary: res.summary, keywords: res.keywords });
                               }}
                             >
                               <div className="flex items-center gap-2 min-w-0">
                                 {getResourceIcon(res.type)}
                                 <span className="text-sm text-slate-700 font-medium truncate">{res.name}</span>
                               </div>
                               <div className="flex items-center gap-3 shrink-0 pl-2">
                                 <span className="text-xs text-slate-400">{res.size}</span>
                                 <Eye className="w-4 h-4 text-slate-400 group-hover/doc:text-blue-600 transition-colors" />
                               </div>
                             </button>
                           ))}
                         </div>
                       )}
                     </div>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-500 shadow-sm">
                 <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-lg font-medium text-slate-700 mb-2">无匹配结果</h3>
                 <p className="text-sm">尝试更换此分类下的搜索关键词</p>
              </div>
            )}
          </div>
        )}

        {activeMainTab === 'members' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
               <h2 className="text-xl font-bold text-slate-800 mb-2">天工学院联盟成员单位</h2>
               <p className="text-slate-600">联盟汇聚了全国顶尖的外语类和职业技术类高校，共同推动特色专业协同发展。</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMembers.map(member => (
                <div key={member.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">{member.name}</h3>
                      <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" /> 加入时间: {member.joinedDate}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                    {member.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
            onClick={() => setSelectedNotice(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="p-4 sm:p-6 border-b border-slate-200 flex justify-between items-start gap-4">
                 <div>
                    <div className="flex items-center gap-2 mb-3">
                       <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                         {selectedNotice.type}
                       </span>
                       <span className="text-sm text-slate-400 font-medium">
                         {selectedNotice.date}
                       </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-snug">{selectedNotice.title}</h2>
                 </div>
                 <button 
                   onClick={() => setSelectedNotice(null)}
                   className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>
               
               <div className="p-4 sm:p-6 overflow-y-auto">
                 <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">{selectedNotice.content}</p>
                 </div>
                 
                 {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-slate-400" /> 附件下载
                      </h4>
                      <div className="flex flex-col gap-3">
                        {selectedNotice.attachments.map((file, idx) => (
                           <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4">
                             <div className="flex items-center gap-3">
                               <div className="p-2 bg-white rounded-lg shadow-sm">
                                 <FileText className="w-5 h-5 text-blue-500" />
                               </div>
                               <div>
                                 <div className="font-medium text-slate-900 text-sm">{file.name}</div>
                                 <div className="text-xs text-slate-500 mt-0.5">{file.size}</div>
                               </div>
                             </div>
                             <div className="flex items-center gap-2">
                               <button 
                                 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                 onClick={() => setPreviewDoc({ name: file.name, size: file.size, category: '附件', type: file.type || 'doc', date: file.date, uploader: file.uploader, summary: file.summary, keywords: file.keywords })}
                               >
                                 <Eye className="w-4 h-4" /> 预览
                               </button>
                               <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                 <Download className="w-4 h-4" /> 下载
                               </button>
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                 )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outcome Detail Modal */}
      <AnimatePresence>
        {selectedOutcome && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
            onClick={() => setSelectedOutcome(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="p-4 sm:p-6 border-b border-slate-200 flex justify-between items-start gap-4">
                 <div>
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <span className={`inline-flex px-2.5 py-1 rounded text-xs font-bold border ${getOutcomeTypeColor(selectedOutcome.type)}`}>
                        {selectedOutcome.type}
                      </span>
                      <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-full border border-slate-100 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {selectedOutcome.date}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-3">{selectedOutcome.projectName}</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="text-slate-600 font-medium">
                        {selectedOutcome.institutions.join(' · ')}
                      </div>
                    </div>
                 </div>
                 <button 
                   onClick={() => setSelectedOutcome(null)}
                   className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>
               
               <div className="p-4 sm:p-6 overflow-y-auto">
                 {selectedOutcome.hasImages && (
                   <div className="w-full h-48 sm:h-64 bg-slate-100 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-200">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-indigo-900/5 mix-blend-multiply"></div>
                     <ImageIcon className="w-12 h-12 text-blue-300 opacity-80" />
                   </div>
                 )}
                 <div className="prose prose-slate max-w-none">
                    <h4 className="text-lg font-semibold text-slate-800 mb-3">项目简介</h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedOutcome.description}</p>
                 </div>
                 
                 {selectedOutcome.resources && selectedOutcome.resources.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-slate-400" /> 相关成果资源
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedOutcome.resources.map((res, idx) => (
                           <div key={idx} className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4">
                             <div className="flex items-start gap-3">
                               <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                                 {getResourceIcon(res.type)}
                               </div>
                               <div className="min-w-0 flex-1">
                                 <div className="font-medium text-slate-900 text-sm truncate" title={res.name}>{res.name}</div>
                                 <div className="text-xs text-slate-500 mt-1">{res.size}</div>
                               </div>
                             </div>
                             <div className="flex items-center gap-2 mt-auto pt-2">
                               <button 
                                 className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                 onClick={() => setPreviewDoc({ name: res.name, size: res.size, category: '成果资源', type: res.type, date: res.date, uploader: res.uploader, summary: res.summary, keywords: res.keywords })}
                               >
                                 <Eye className="w-4 h-4" /> 预览
                               </button>
                               <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                 <Download className="w-4 h-4" /> 下载
                               </button>
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                 )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    {getResourceIcon(previewDoc.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{previewDoc.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>{previewDoc.category}</span>
                      <span>·</span>
                      <span>{previewDoc.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium shadow-sm">
                    <Download className="w-4 h-4" /> 
                    <span className="hidden sm:inline">下载资源</span>
                  </button>
                  <button 
                    onClick={() => setPreviewDoc(null)}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-[400px]">
                <div className="flex-1 bg-slate-100 p-8 overflow-y-auto flex items-center justify-center relative min-h-[300px]">
                  {previewDoc.type === 'video' && (
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

                  {previewDoc.type === 'image' && (
                    <div className="max-w-full max-h-full rounded-lg overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                       <img src={`https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`} alt="Preview" className="w-auto h-auto max-w-full max-h-[60vh] object-contain rounded" />
                    </div>
                  )}

                  {previewDoc.type === 'audio' && (
                     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200 flex flex-col items-center text-center">
                       <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-red-100 relative">
                         <Mic className="w-10 h-10 text-red-500 absolute z-10" />
                         <div className="absolute inset-0 rounded-full border-4 border-red-200 border-t-red-500 animate-spin"></div>
                       </div>
                       <h4 className="font-bold text-slate-800 mb-8">{previewDoc.name}</h4>
                       
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

                  {(!previewDoc.type || previewDoc.type === 'doc' || previewDoc.type === 'ppt') && (
                   <div className="bg-white w-full max-w-3xl shadow-sm border border-slate-200 min-h-full p-12 text-slate-800 font-serif self-start">
                     <h1 className="text-2xl font-bold text-center mb-10 pb-6 border-b border-slate-200">{previewDoc.name.replace(/\.[^/.]+$/, "")}</h1>
                     <div className="space-y-6 text-slate-600 leading-loose">
                       <p>这是一份预览文档摘要。实际的内容将在下载后查看完整版本。</p>
                       {previewDoc.summary && <p>内容摘要：{previewDoc.summary}</p>}
                       <div className="p-4 bg-slate-50 border-l-4 border-slate-300 italic text-sm">
                          This is a simulated document preview. Please download the original file to view the full details, embedded images, and exact formatting.
                       </div>
                       {[1, 2, 3, 4].map(i => (
                          <div key={i} className="space-y-3 opacity-40 pointer-events-none select-none">
                            <div className="h-3.5 bg-slate-300 rounded w-full"></div>
                            <div className="h-3.5 bg-slate-300 rounded w-11/12"></div>
                            <div className="h-3.5 bg-slate-300 rounded w-full"></div>
                            <div className="h-3.5 bg-slate-300 rounded w-4/5"></div>
                          </div>
                        ))}
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
                       <span className="text-sm text-slate-700 font-medium">{previewDoc.uploader || '系统共享'}</span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 上传时间</span>
                       <span className="text-sm text-slate-700 font-medium">{previewDoc.date || '未知时间'}</span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FolderOpen className="w-3.5 h-3.5" /> 所属分类</span>
                       <span className="text-sm text-slate-700 font-medium">
                         {previewDoc.category || '未分类'}
                       </span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> 资源大小</span>
                       <span className="font-mono text-sm text-slate-700 font-medium">{previewDoc.size}</span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 资源格式</span>
                       <span className="text-sm text-slate-700 font-medium uppercase">{previewDoc.type || '未指定'}</span>
                     </div>
                     {previewDoc.keywords && previewDoc.keywords.length > 0 && (
                       <div className="flex flex-col gap-2">
                         <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> 关键词</span>
                         <div className="flex flex-wrap gap-1.5 mt-1">
                           {previewDoc.keywords.map(kw => (
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
