import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Users, Globe, CheckCircle2, TrendingUp, Activity, BarChart2, Download } from 'lucide-react';

export default function TranslationAnalytics() {
  const KpiCards = [
    { label: '订单总数', value: '12,543', unit: '单', trend: '+12%', icon: <FileText className="w-6 h-6 text-white" />, color: 'bg-blue-500' },
    { label: '活跃用户', value: '3,210', unit: '人', trend: '+8%', icon: <Users className="w-6 h-6 text-white" />, color: 'bg-indigo-500' },
    { label: '注册翻译员', value: '1,845', unit: '名', trend: '+5%', icon: <Globe className="w-6 h-6 text-white" />, color: 'bg-emerald-500' },
    { label: '平均完成率', value: '98.2', unit: '%', trend: '+1.2%', icon: <CheckCircle2 className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
  ];

  const exportReport = () => {
    alert("标准化报表已导出为PDF格式");
  };

  const monthlyOrderTrend = [
    { name: '1月', orders: 1200 },
    { name: '2月', orders: 1100 },
    { name: '3月', orders: 1400 },
    { name: '4月', orders: 1650 },
    { name: '5月', orders: 1550 },
    { name: '6月', orders: 1800 },
  ];

  const activityData = [
    { name: '周一', userActivity: 400, translatorActivity: 240 },
    { name: '周二', userActivity: 300, translatorActivity: 139 },
    { name: '周三', userActivity: 200, translatorActivity: 980 },
    { name: '周四', userActivity: 278, translatorActivity: 390 },
    { name: '周五', userActivity: 189, translatorActivity: 480 },
    { name: '周六', userActivity: 239, translatorActivity: 380 },
    { name: '周日', userActivity: 349, translatorActivity: 430 },
  ];

  const domainData = [
    { name: '公文/公函', value: 35 },
    { name: '项目资料/申请书', value: 25 },
    { name: '宣传资料', value: 20 },
    { name: '合同/协议', value: 15 },
    { name: '其他', value: 5 },
  ];

  const languageData = [
    { name: '英语', value: 45 },
    { name: '日语', value: 20 },
    { name: '韩语', value: 15 },
    { name: '法语', value: 10 },
    { name: '德语', value: 10 },
  ];

  const PIE_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
  const PIE_COLORS_ALT = ['#6366f1', '#14b8a6', '#a855f7', '#f43f5e', '#f97316'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex justify-end items-center mb-6">
          <button 
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            导出报表
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {KpiCards.map((kpi, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.color} shadow-inner`}>
                {kpi.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</span>
                  <span className="text-sm text-slate-500">{kpi.unit}</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> 较上期 {kpi.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h3 className="text-[15px] font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" />
              用户与译员活跃度趋势
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTranslator" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                  <Tooltip wrapperClassName="text-sm rounded-lg shadow-lg border-none" />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
                  <Area type="monotone" dataKey="userActivity" name="发单活跃度" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorUser)" />
                  <Area type="monotone" dataKey="translatorActivity" name="接单活跃度" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorTranslator)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h3 className="text-[15px] font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              月度订单趋势
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyOrderTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                  <Tooltip wrapperClassName="text-sm rounded-lg shadow-lg border-none" />
                  <Line type="monotone" dataKey="orders" name="订单量" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col">
            <h3 className="text-[15px] font-bold text-slate-800 mb-2">专业领域占比分布</h3>
            <div className="flex-1 min-h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={domainData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {domainData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip wrapperClassName="text-sm rounded-lg shadow-lg border-none" />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col">
            <h3 className="text-[15px] font-bold text-slate-800 mb-2">语种需求占比统计</h3>
            <div className="flex-1 min-h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS_ALT[index % PIE_COLORS_ALT.length]} />
                    ))}
                  </Pie>
                  <Tooltip wrapperClassName="text-sm rounded-lg shadow-lg border-none" />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
