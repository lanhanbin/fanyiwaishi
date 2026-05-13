import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, User, Clock, FileText, CheckCircle2, ShieldCheck, Download, MessageSquare, AlertTriangle, Check, Upload, Star } from 'lucide-react';

interface OrderDetails {
  id: string;
  sourceLang: string;
  targetLang: string;
  domain: string;
  status: string;
  publishTime: string;
  publisher: string;
  deadline?: string;
  requirements?: string;
  level?: string;
  price?: string;
  fileName?: string;
  translatedText?: string;
  translatedFileName?: string;
  rating?: {
    accuracy: number;
    timeliness: number;
    attitude: number;
    comment: string;
  };
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetails | null;
  userRole: string | null;
  currentUser?: any;
}

const statusMap: Record<string, { label: string, color: string }> = {
  matching: { label: '智能匹配中', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  manual_taking: { label: '待接单', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  translating: { label: '翻译执行中', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  reviewing: { label: '待验收', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  completed: { label: '已完成/已验收', color: 'text-green-700 bg-green-50 border-green-200' },
};

export default function OrderDetailsModal({ isOpen, onClose, order: initialOrder, userRole, currentUser }: OrderDetailsModalProps) {
  const [order, setOrder] = useState<OrderDetails | null>(initialOrder);
  const [showSubmitTranslate, setShowSubmitTranslate] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [previewDoc, setPreviewDoc] = useState<{title: string, content: string, isReviewing?: boolean} | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [ratingInput, setRatingInput] = useState({ accuracy: 5, timeliness: 5, attitude: 5, comment: '' });

  useEffect(() => {
    setOrder(initialOrder);
    setTranslatedText(initialOrder?.translatedText || '');
    setShowSubmitTranslate(false);
    setShowRejectForm(false);
    setPreviewDoc(null);
    setUploadedFile(null);
    setShowRatingForm(false);
    setRatingInput({ accuracy: 5, timeliness: 5, attitude: 5, comment: '' });
  }, [initialOrder]);

  if (!isOpen || !order) return null;

  const currentStatus = statusMap[order.status] || { label: order.status, color: 'text-slate-700 bg-slate-50 border-slate-200' };

  const handleSubmitTranslate = () => {
    if (!translatedText) return;
    setOrder({ ...order, status: 'reviewing', translatedText });
    setShowSubmitTranslate(false);
  };

  const handleAccept = () => {
    setOrder({ ...order, status: 'completed' });
  };

  const handleReject = () => {
    if (!rejectReason) return;
    setOrder({ ...order, status: 'translating', translatedText: '' });
    setShowRejectForm(false);
    setRejectReason('');
    alert('已退回给译员修改。');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto w-full h-full">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">订单详情</h2>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${currentStatus.color}`}>
                  {currentStatus.label}
                </span>
              </div>
              <p className="text-slate-500 font-mono">订单号：{order.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto w-full flex-1">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <Globe className="w-5 h-5 text-blue-500 mb-2" />
                <div className="text-sm text-slate-500 mb-1">翻译语种</div>
                <div className="font-semibold text-slate-900 flex items-center gap-1.5 flex-wrap">
                  {order.sourceLang} <span className="text-slate-400 text-xs">→</span> {order.targetLang}
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <ShieldCheck className="w-5 h-5 text-slate-500 mb-2" />
                <div className="text-sm text-slate-500 mb-1">专业领域</div>
                <div className="font-semibold text-slate-900">{order.domain}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-slate-500 mb-2" />
                <div className="text-sm text-slate-500 mb-1">译员等级</div>
                <div className="font-semibold text-slate-900">{order.level || '中级'}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <Clock className="w-5 h-5 text-slate-500 mb-2" />
                <div className="text-sm text-slate-500 mb-1">交付时限</div>
                <div className="font-semibold text-slate-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={order.deadline || '以平台分派为准'}>{order.deadline || '以平台分派为准'}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                {/* File Info */}
                <section>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" /> 翻译文件
                  </h3>
                  <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-white hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate" title={order.fileName || '文档附件'}>{order.fileName || 'translation_source_document.pdf'}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{(Math.random() * 5 + 1).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       {(currentUser?.name === order.publisher || (userRole === 'translator' && order.status !== 'matching' && order.status !== 'manual_taking')) ? (
                          <button 
                            onClick={() => setPreviewDoc({
                              title: order.fileName || 'translation_source_document.pdf',
                              content: '这里是原文件内容。因为这是原文件，你拥有查看权限。',
                              isReviewing: false
                            })}
                            className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors shrink-0"
                          >
                            预览文档
                          </button>
                       ) : (
                          <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">仅发布者或接单人可预览</span>
                       )}
                    </div>
                  </div>
                </section>

                {/* Requirements */}
                <section>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">翻译要求</h3>
                  <div className="bg-slate-50 rounded-xl p-5 text-sm text-slate-700 leading-relaxed border border-slate-100">
                    {order.requirements || '未提供具体说明，请遵循基本的信达雅翻译规范以及领域专业术语要求。'}
                  </div>
                </section>

                {/* Publisher Info */}
                <section className="border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{order.publisher}</h4>
                      <p className="text-sm text-slate-500 mt-0.5">发布于 {order.publishTime || '近期发布'}</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Translation Delivery & Preview Section */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 flex flex-col overflow-hidden h-[500px]">
                <div className="p-4 border-b border-slate-200 bg-white shadow-sm shrink-0 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> 
                    {order.status === 'translating' ? '交付译文' : '交付的译文文档'}
                  </h3>
                  
                  {userRole !== 'translator' && order.status === 'reviewing' && (
                    <div className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> 禁止复制下载，验收后解锁
                    </div>
                  )}
                </div>

                {order.status === 'translating' && userRole === 'translator' ? (
                  showSubmitTranslate ? (
                    <div className="p-6 flex flex-col h-full bg-white">
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-slate-800 mb-2">上传译文文档</h4>
                        {!uploadedFile ? (
                          <button 
                            onClick={() => setUploadedFile(new File(["mock content"], "translated_document.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }))}
                            className="w-full py-8 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 flex flex-col justify-center items-center gap-3 transition-colors"
                          >
                            <Upload className="w-8 h-8" /> 
                            <span className="font-medium">点击上传或拖拽文件到此处</span>
                            <span className="text-xs text-slate-400">支持 .doc, .docx, .pdf 格式</span>
                          </button>
                        ) : (
                          <div className="border border-green-200 bg-green-50 rounded-xl p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <FileText className="w-8 h-8 text-green-600" />
                              <div>
                                <p className="font-medium text-green-800">{uploadedFile.name}</p>
                                <p className="text-xs text-green-600/70">{(uploadedFile.size / 1024 || 0.5).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => setUploadedFile(null)}
                              className="text-slate-400 hover:text-red-500 p-2 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mt-auto flex gap-3 shrink-0">
                        <button 
                          onClick={() => setShowSubmitTranslate(false)}
                          className="flex-1 py-2.5 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium"
                        >取消</button>
                        <button 
                          onClick={() => {
                            if (!uploadedFile) return;
                            setOrder({ ...order, status: 'reviewing', translatedText: 'mock content from file', translatedFileName: uploadedFile.name });
                            setShowSubmitTranslate(false);
                          }}
                          disabled={!uploadedFile}
                          className="flex-1 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition-colors text-sm font-medium shadow-sm"
                        >确认提交文件</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500">
                      <FileText className="w-12 h-12 text-slate-300 mb-4" />
                      <p className="mb-6">翻译完成后，点击下方按钮上传译稿文档给用户预览。</p>
                      <button 
                        onClick={() => setShowSubmitTranslate(true)}
                        className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                      >
                         上传并交付译文
                      </button>
                    </div>
                  )
                ) : (order.status === 'reviewing' || order.status === 'completed') ? (
                  <div className="flex flex-col h-full relative">
                     {/* List of translated documents */}
                     <div className="flex-1 p-6 overflow-y-auto">
                       <h4 className="text-sm font-medium text-slate-700 mb-4">译稿附件</h4>
                       <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-white hover:shadow-sm transition-all group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate" title={order.translatedFileName || 'translated_document.docx'}>
                                {order.translatedFileName || 'translated_document.docx'}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">{(Math.random() * 2 + 0.5).toFixed(2)} MB • 刚刚上传</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setPreviewDoc({
                                title: order.translatedFileName || 'translated_document.docx',
                                content: order.translatedText || '此为翻译结果文档内容。\n\n项目需求分析与概要设计文档的译文部分...',
                                isReviewing: order.status === 'reviewing' && userRole !== 'translator'
                              })}
                              className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                            >
                              预览文档
                            </button>
                          </div>
                       </div>
                     </div>
                     
                     {/* Review Actions for user */}
                     {order.status === 'reviewing' && userRole !== 'translator' && (
                       <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0">
                         {showRatingForm ? (
                           <div className="w-full">
                             <h4 className="font-medium text-slate-800 mb-3 text-sm">请对本次翻译服务进行评价</h4>
                             <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-xl mb-3">
                               <div className="flex items-center justify-between">
                                 <span className="text-sm text-slate-600">译稿准确性</span>
                                 <div className="flex items-center gap-1">
                                   {[1, 2, 3, 4, 5].map((star) => (
                                     <button
                                       key={`accuracy-${star}`}
                                       onClick={() => setRatingInput(prev => ({ ...prev, accuracy: star }))}
                                       className={`focus:outline-none transition-colors ${ratingInput.accuracy >= star ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}
                                     >
                                       <Star className={`w-5 h-5 ${ratingInput.accuracy >= star ? 'fill-current' : ''}`} />
                                     </button>
                                   ))}
                                 </div>
                               </div>
                               <div className="flex items-center justify-between">
                                 <span className="text-sm text-slate-600">交付时效</span>
                                 <div className="flex items-center gap-1">
                                   {[1, 2, 3, 4, 5].map((star) => (
                                     <button
                                       key={`timeliness-${star}`}
                                       onClick={() => setRatingInput(prev => ({ ...prev, timeliness: star }))}
                                       className={`focus:outline-none transition-colors ${ratingInput.timeliness >= star ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}
                                     >
                                       <Star className={`w-5 h-5 ${ratingInput.timeliness >= star ? 'fill-current' : ''}`} />
                                     </button>
                                   ))}
                                 </div>
                               </div>
                               <div className="flex items-center justify-between">
                                 <span className="text-sm text-slate-600">服务态度</span>
                                 <div className="flex items-center gap-1">
                                   {[1, 2, 3, 4, 5].map((star) => (
                                     <button
                                       key={`attitude-${star}`}
                                       onClick={() => setRatingInput(prev => ({ ...prev, attitude: star }))}
                                       className={`focus:outline-none transition-colors ${ratingInput.attitude >= star ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}
                                     >
                                       <Star className={`w-5 h-5 ${ratingInput.attitude >= star ? 'fill-current' : ''}`} />
                                     </button>
                                   ))}
                                 </div>
                               </div>
                             </div>
                             <textarea
                               className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none mb-3"
                               placeholder="留下您的评价与建议（选填）..."
                               rows={2}
                               value={ratingInput.comment}
                               onChange={(e) => setRatingInput({ ...ratingInput, comment: e.target.value })}
                             />
                             <div className="flex justify-end gap-2">
                               <button 
                                 onClick={() => setShowRatingForm(false)}
                                 className="px-4 py-1.5 rounded-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium"
                               >取消</button>
                               <button 
                                 onClick={() => {
                                   setOrder({ ...order!, status: 'completed', rating: ratingInput });
                                   setShowRatingForm(false);
                                 }}
                                 className="px-4 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
                               >提交评价并完成验收</button>
                             </div>
                           </div>
                         ) : showRejectForm ? (
                           <div>
                             <textarea 
                               className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none mb-2"
                               placeholder="请输入退回修改的具体原因及建议..."
                               value={rejectReason}
                               onChange={(e) => setRejectReason(e.target.value)}
                             />
                             <div className="flex justify-end gap-2">
                               <button 
                                 onClick={() => setShowRejectForm(false)}
                                 className="px-4 py-1.5 rounded-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium"
                               >取消</button>
                               <button 
                                 onClick={handleReject}
                                 disabled={!rejectReason}
                                 className="px-4 py-1.5 rounded-lg text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300 transition-colors text-sm font-medium flex items-center gap-1"
                               ><AlertTriangle className="w-3 h-3" /> 确认退回</button>
                             </div>
                           </div>
                         ) : (
                           <div className="flex justify-end gap-3">
                              <button 
                                onClick={() => setShowRejectForm(true)}
                                className="px-5 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
                              >申请退回修改</button>
                              <button 
                                onClick={() => setShowRatingForm(true)}
                                className="px-6 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm flex items-center gap-1"
                              ><Check className="w-4 h-4" /> 确认验收订单</button>
                           </div>
                         )}
                       </div>
                     )}

                     {order.status === 'completed' && (
                       <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 flex flex-col gap-4">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> 订单已完成验收</p>
                            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                              <Download className="w-4 h-4" /> 下载全部文件
                            </button>
                          </div>
                          {order.rating && (
                            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                               <div className="flex items-center justify-between mb-3">
                                 <h4 className="text-sm font-semibold text-slate-800">用户评价</h4>
                               </div>
                               <div className="grid grid-cols-3 gap-2 mb-4">
                                  <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 mb-1">译稿准确性</span>
                                    <div className="flex items-center text-yellow-500">
                                      {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={`accuracy-view-${i}`} className={`w-3 h-3 ${((order.rating?.accuracy || 5) >= i) ? 'fill-current text-yellow-400' : 'text-slate-200'}`} />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 mb-1">交付时效</span>
                                    <div className="flex items-center text-yellow-500">
                                      {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={`timeliness-view-${i}`} className={`w-3 h-3 ${((order.rating?.timeliness || 5) >= i) ? 'fill-current text-yellow-400' : 'text-slate-200'}`} />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 mb-1">服务态度</span>
                                    <div className="flex items-center text-yellow-500">
                                      {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={`attitude-view-${i}`} className={`w-3 h-3 ${((order.rating?.attitude || 5) >= i) ? 'fill-current text-yellow-400' : 'text-slate-200'}`} />
                                      ))}
                                    </div>
                                  </div>
                               </div>
                               {order.rating.comment && (
                                 <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">{order.rating.comment}</div>
                               )}
                            </div>
                          )}
                       </div>
                     )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500 bg-slate-50/50">
                    <Clock className="w-12 h-12 text-slate-300 mb-4" />
                    <p>等待译员翻译中，交付后可在此处预览附件并验收。</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
             <button 
               type="button"
               onClick={onClose}
               className="px-5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
             >
               关闭
             </button>
             
             {userRole === 'translator' && order.status === 'manual_taking' && (
               <button className="px-6 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm">
                 确认接单
               </button>
             )}
             
             {userRole === 'translator' && order.status === 'translating' && !showSubmitTranslate && (
               <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                 <MessageSquare className="w-4 h-4" /> 留言沟通
               </button>
             )}

             {userRole !== 'translator' && order.status === 'matching' && (
               <button className="px-5 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                 取消订单
               </button>
             )}
          </div>
        </motion.div>
      </div>

      {/* Document Preview Overlay */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex justify-center p-4 sm:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" /> 
                  {previewDoc.title}
                </h3>
                <div className="flex items-center gap-2">
                   {!previewDoc.isReviewing && (
                      <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-200 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                   )}
                  <button 
                    onClick={() => setPreviewDoc(null)}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div 
                className={`flex-1 p-8 overflow-y-auto bg-slate-200/50 flex justify-center ${previewDoc.isReviewing ? 'select-none relative' : ''}`}
                onContextMenu={(e) => { if (previewDoc.isReviewing) e.preventDefault(); }}
              >
                {previewDoc.isReviewing && (
                   <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden z-10" aria-hidden="true">
                     <div className="transform -rotate-45 text-4xl whitespace-nowrap font-bold repeat-x text-slate-900">
                       仅供预览 仅供预览 仅供预览 仅供预览 仅供预览
                     </div>
                   </div>
                )}
                <div className="bg-white shadow-sm max-w-3xl w-full p-10 min-h-max text-slate-700 leading-relaxed text-sm format font-serif border border-slate-200 whitespace-pre-wrap">
                  {previewDoc.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
