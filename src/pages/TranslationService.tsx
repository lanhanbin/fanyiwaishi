import { useState } from 'react';
import TranslationStudio from '../components/TranslationStudio';
import HumanTranslationOrders from '../components/HumanTranslationOrders';
import PublishOrderModal from '../components/PublishOrderModal';
import TranslationAnalytics from '../components/TranslationAnalytics';
import { ShieldCheck, Clock, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function TranslationService() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleOrderSuccess = (orderId: string) => {
    setSuccessMessage(`订单发布成功！单号：${orderId}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      {/* Success Notification */}
      {successMessage && (
        <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">综合翻译服务大厅</h1>
          <p className="text-slate-600 max-w-2xl">
            提供从即时自动翻译、多媒体翻译到专家级人工翻译的一站式语言解决方案。满足教育、科研、外事等不同场景的差异化需求。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 w-full">
        {/* Auto Translation Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">智能机器翻译</h2>
            <p className="text-slate-500 mt-2">支持文本、文档、语音和视频识别翻译，自带专业术语库，适用于紧急及常规翻译。</p>
          </div>
          <TranslationStudio />
        </section>

        {/* Human Translation Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">专家级人工翻译</h2>
              <p className="text-slate-500 mt-2">支持超11个语种。严格把控译员质量与翻译流程，为您提供出版级高品质译文。</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap shadow-sm"
            >
              发布人工翻译订单
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
               <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
               <h3 className="font-bold text-lg mb-2">多级质量控制</h3>
               <p className="text-sm text-slate-600">经初筛、机器辅助校验、专家校对环节。每个订单最多支持2次退回修改，保障质量。</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
               <Clock className="w-8 h-8 text-blue-600 mb-4" />
               <h3 className="font-bold text-lg mb-2">全可视流程</h3>
               <p className="text-sm text-slate-600">从智能派单、接单确认到翻译执行，全程进度实时可追溯。保证时效性。</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
               <Users className="w-8 h-8 text-blue-600 mb-4" />
               <h3 className="font-bold text-lg mb-2">海量译员池</h3>
               <p className="text-sm text-slate-600">基于大数据标签智能匹配译员，评级机制优胜劣汰，确保专业对口。</p>
            </div>
          </div>
          
          <div className="mt-12 mb-8">
            <TranslationAnalytics />
          </div>
          
          <HumanTranslationOrders />
        </section>
      </div>

      <PublishOrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleOrderSuccess}
      />
    </div>
  );
}
