import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle2, User, Globe, Tag, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import OrderDetailsModal from './OrderDetailsModal';

type OrderStatus = 'matching' | 'manual_taking' | 'translating' | 'reviewing' | 'completed';

interface Order {
  id: string;
  sourceLang: string;
  targetLang: string;
  domain: string;
  publishTime: string;
  publisher: string;
  status: OrderStatus;
  deadline?: string;
  requirements?: string;
  level?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'TR-20260512-001',
    sourceLang: '中文',
    targetLang: '英语',
    domain: '教育/学术',
    publishTime: '2026-05-12 10:30',
    publisher: '张教授',
    status: 'matching',
    deadline: '2026-05-15',
    level: '中级',
  },
  {
    id: 'TR-20260512-002',
    sourceLang: '中文',
    targetLang: '法语',
    domain: '法律合规',
    publishTime: '2026-05-11 14:20',
    publisher: '李校办',
    status: 'manual_taking', // 匹配不成功，其他人可手动接单
    deadline: '2026-05-18',
    level: '高级',
  },
  {
    id: 'TR-20260510-008',
    sourceLang: '俄语',
    targetLang: '中文',
    domain: '科研/论文',
    publishTime: '2026-05-10 09:15',
    publisher: '王研究员',
    status: 'translating',
    deadline: '2026-05-20',
    level: '中级',
  },
  {
    id: 'TR-20260508-015',
    sourceLang: '中文',
    targetLang: '日语',
    domain: '外事礼仪',
    publishTime: '2026-05-08 16:45',
    publisher: '周秘书',
    status: 'completed',
    level: '初级',
  }
];

const statusConfig = {
  matching: { label: '智能匹配中', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  manual_taking: { label: '待手动接单', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  translating: { label: '翻译执行中', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  reviewing: { label: '待验收', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  completed: { label: '已完成/已验收', color: 'text-green-700 bg-green-50 border-green-200' },
};

export default function HumanTranslationOrders() {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock taking an order
  const handleTakeOrder = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!user) {
       alert('请先登录以接取订单');
       return;
    }
    alert(`接单成功：${id} \n请尽快与雇主线下沟通翻译细节。`);
  };

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.includes(searchTerm) || order.publisher.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      {/* Header and Toolbar */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">订单大厅</h3>
          <p className="text-sm text-slate-500 mt-1">查看和管理所有人工翻译需求订单</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索订单号或发布人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
          >
            <option value="all">全部状态</option>
            <option value="matching">智能匹配中</option>
            <option value="manual_taking">待手动接单</option>
            <option value="translating">翻译执行中</option>
            <option value="completed">已完成</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">订单编号 / 语种</th>
              <th className="px-6 py-4">专业领域</th>
              <th className="px-6 py-4">发布信息</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  没有找到相关订单
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr 
                  key={order.id} 
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800 mb-1">{order.id}</div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-flex">
                      <Globe className="w-3 h-3" />
                      {order.sourceLang} → {order.targetLang}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Tag className="w-4 h-4 text-slate-400" />
                      {order.domain}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{order.publisher}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {order.publishTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[order.status].color}`}>
                      {statusConfig[order.status].label}
                    </span>
                    {order.status === 'manual_taking' && (
                       <div className="text-xs text-orange-500 mt-1.5 flex items-center gap-1">
                         <AlertCircle className="w-3 h-3" /> 匹配超时，可手动接单
                       </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'manual_taking' && user?.role === 'translator' ? (
                      <button 
                        onClick={(e) => handleTakeOrder(e, order.id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
                      >
                        手动接单
                      </button>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                        查看详情
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OrderDetailsModal 
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        userRole={user?.role || null}
        currentUser={user}
      />
    </div>
  );
}
