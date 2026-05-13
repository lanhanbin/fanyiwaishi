import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, File as FileIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  '中文', '英语', '韩语', '日语', '阿拉伯语', '波斯语', 
  '西班牙语', '葡萄牙语', '俄语', '德语', '法语', '意大利语'
];

const DOMAINS = [
  '通用/日常', '教育/学术', '法律合规', '医疗健康', 
  'IT/互联网', '金融财经', '机械制造', '文学艺术'
];

interface PublishOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (orderId: string) => void;
}

export default function PublishOrderModal({ isOpen, onClose, onSubmitSuccess }: PublishOrderModalProps) {
  const [sourceLang, setSourceLang] = useState('中文');
  const [targetLang, setTargetLang] = useState('英语');
  const [file, setFile] = useState<File | null>(null);
  const [domain, setDomain] = useState('');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [translatorLevel, setTranslatorLevel] = useState('中级');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (sourceLang === targetLang) {
      newErrors.lang = '源语言与目标语言不能相同';
    }
    if (!file) {
      newErrors.file = '请上传需要翻译的文件';
    } else {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['doc', 'docx', 'pdf', 'txt'].includes(ext || '')) {
        newErrors.file = '文件格式不符，仅支持 word、pdf、txt 格式';
      }
    }
    if (!domain) {
      newErrors.domain = '请选择专业领域';
    }
    if (!deadline) {
      newErrors.deadline = '请选择交付时限';
    } else {
      const selectedTime = new Date(deadline).getTime();
      if (selectedTime <= Date.now()) {
        newErrors.deadline = '交付时限必须晚于当前时间';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (errors.file) {
        setErrors({ ...errors, file: '' });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomStr = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const mockOrderId = `TR-${dateStr}-${randomStr}`;
      
      onSubmitSuccess(mockOrderId);
      
      // Reset form
      setSourceLang('中文');
      setTargetLang('英语');
      setFile(null);
      setDomain('');
      setRequirements('');
      setDeadline('');
      setTranslatorLevel('中级');
      setErrors({});
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto w-full h-full">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-50 overflow-hidden flex flex-col max-h-full"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
            <div>
              <h2 className="text-xl font-bold text-slate-900">发布人工翻译订单</h2>
              <p className="text-sm text-slate-500 mt-1">请详细填写您的翻译需求，方便我们为您匹配最合适的译员</p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Language Pair */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">翻译语种 <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <select 
                      value={sourceLang}
                      onChange={(e) => {
                        setSourceLang(e.target.value);
                        setErrors({...errors, lang: ''});
                      }}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                    >
                      {SUPPORTED_LANGUAGES.map(lang => <option key={`source-${lang}`} value={lang}>{lang}</option>)}
                    </select>
                  </div>
                  <span className="text-slate-400 font-medium text-sm">至</span>
                  <div className="flex-1">
                    <select 
                      value={targetLang}
                      onChange={(e) => {
                        setTargetLang(e.target.value);
                        setErrors({...errors, lang: ''});
                      }}
                      className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white ${errors.lang ? 'border-red-300 focus:border-red-500 ring-1 ring-red-100' : 'border-slate-200 focus:border-blue-500'}`}
                    >
                      {SUPPORTED_LANGUAGES.map(lang => <option key={`target-${lang}`} value={lang}>{lang}</option>)}
                    </select>
                  </div>
                </div>
                {errors.lang && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.lang}</p>}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">上传翻译资料 <span className="text-red-500">*</span></label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${errors.file ? 'border-red-300 bg-red-50 hover:bg-red-50/80' : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50/50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".doc,.docx,.pdf,.txt"
                  />
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                       <FileIcon className={`w-8 h-8 ${errors.file ? 'text-red-500' : 'text-blue-500'}`} />
                       <p className={`text-sm font-medium ${errors.file ? 'text-red-600' : 'text-slate-700'}`}>{file.name}</p>
                       <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-slate-400" />
                      <p className="text-sm font-medium text-slate-700">点击或拖拽文件至此处上传</p>
                      <p className="text-xs text-slate-500">支持 word (.doc/.docx), pdf, txt 格式</p>
                    </div>
                  )}
                </div>
                {errors.file && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.file}</p>}
              </div>

              {/* Domain & Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">专业领域 <span className="text-red-500">*</span></label>
                  <select 
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value);
                      setErrors({...errors, domain: ''});
                    }}
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white ${errors.domain ? 'border-red-300 focus:border-red-500 ring-1 ring-red-100' : 'border-slate-200 focus:border-blue-500'}`}
                  >
                    <option value="" disabled>请选择领域</option>
                    {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.domain && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.domain}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">译员等级要求 <span className="text-red-500">*</span></label>
                  <select 
                    value={translatorLevel}
                    onChange={(e) => setTranslatorLevel(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="初级">初级译员 (适合日常/通用内容)</option>
                    <option value="中级">中级译员 (适合专业/企业级要求)</option>
                    <option value="高级">高级译员 (适合关键/出版级内容)</option>
                  </select>
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">交付时限 <span className="text-red-500">*</span></label>
                <input 
                  type="datetime-local" 
                  value={deadline}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                    setErrors({...errors, deadline: ''});
                  }}
                  className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white ${errors.deadline ? 'border-red-300 focus:border-red-500 ring-1 ring-red-100' : 'border-slate-200 focus:border-blue-500'}`}
                />
                {errors.deadline ? (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.deadline}</p>
                ) : (
                    <p className="text-slate-500 text-xs mt-1.5">请考虑文本量合理设置期望交付时间</p>
                )}
              </div>

              {/* Requirements */}
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">翻译要求 (选填)</label>
                 <textarea 
                   value={requirements}
                   onChange={(e) => setRequirements(e.target.value)}
                   className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 min-h-[80px] resize-none"
                   placeholder="请输入特殊排版要求、专业词汇参考说明等..."
                 />
              </div>
            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
             <button 
               type="button"
               onClick={onClose}
               className="px-5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
               disabled={isSubmitting}
             >
               取消
             </button>
             <button 
               onClick={handleSubmit}
               disabled={isSubmitting}
               className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
             >
               {isSubmitting ? (
                 <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  正在发布...
                 </>
               ) : (
                 '确认发布订单'
               )}
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
