import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRightLeft, FileText, Mic, Video, CheckCircle2, 
  History, Download, Trash2, StopCircle, Upload, Play, Type
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LANGUAGES = ['中文', '英语', '日语', '法语', '德语', '俄语', '西班牙语'];

type TranslationMode = 'text' | 'document' | 'voice' | 'video';

interface HistoryRecord {
  id: string;
  mode: TranslationMode;
  sourceLang: string;
  targetLang: string;
  sourceText: string;
  targetText: string;
  timestamp: number;
}

export default function TranslationStudio() {
  const [mode, setMode] = useState<TranslationMode>('text');
  const [sourceLang, setSourceLang] = useState('中文');
  const [targetLang, setTargetLang] = useState('英语');
  
  // Text Mode State
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  // Voice Mode State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(0);

  // Video/Doc Mode State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // History State
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Voice recording mock effect
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setVoiceVolume(Math.random() * 100);
      }, 100);
    } else {
      setVoiceVolume(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Load history from local storage
  useEffect(() => {
    const saved = localStorage.getItem('translationHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const saveHistory = (record: HistoryRecord) => {
    const newHistory = [record, ...history].slice(0, 50); // Keep last 50
    setHistory(newHistory);
    localStorage.setItem('translationHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('translationHistory');
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    // Mock translation
    setTimeout(() => {
      const translated = `[${targetLang} 翻译] ${sourceText}\n\n(此为系统模拟翻译结果，可直接在此编辑修改。)`;
      setTargetText(translated);
      setIsTranslating(false);
      
      saveHistory({
        id: Date.now().toString(),
        mode,
        sourceLang,
        targetLang,
        sourceText,
        targetText: translated,
        timestamp: Date.now()
      });
    }, 1000);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // Mock finishing voice translation
      setSourceText("好的，这几份文件需要马上进行校对和双语排版。");
      const translated = "Okay, these documents need to be proofread and bilingual typeset immediately.";
      setTargetText(translated);
      saveHistory({
        id: Date.now().toString(),
        mode: 'voice',
        sourceLang,
        targetLang,
        sourceText: "好的，这几份文件需要马上进行校对和双语排版。",
        targetText: translated,
        timestamp: Date.now()
      });
    } else {
      setIsRecording(true);
      setSourceText('');
      setTargetText('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsTranslating(true);
      
      // Mock processing time
      setTimeout(() => {
        setIsTranslating(false);
        setSourceText(`[提取的文件内容]...\n这是一份关于${file.name}的测试内容。`);
        const translated = `[Translated Document Content]...\nThis is test content regarding ${file.name}.`;
        setTargetText(translated);
        
        saveHistory({
          id: Date.now().toString(),
          mode,
          sourceLang,
          targetLang,
          sourceText: `[提取的文件内容]...`,
          targetText: translated,
          timestamp: Date.now()
        });
      }, 2000);
    }
  };

  const exportText = () => {
    if (!targetText) return;
    const blob = new Blob([targetText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[600px]">
      {/* Main Studio Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center border-b border-slate-100 p-2 sm:p-4 bg-slate-50/80 backdrop-blur-sm z-10 shrink-0">
          <div className="flex-1 flex items-center justify-center sm:justify-start gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <select 
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="自动检测">检测语言</option>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            
            <button 
              onClick={() => {
                setSourceLang(targetLang);
                setTargetLang(sourceLang !== '自动检测' ? sourceLang : '英语');
              }}
              className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              title="互换语言"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            <select 
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          
          <div className="mt-3 sm:mt-0 flex bg-slate-200/50 p-1 rounded-lg self-center sm:self-auto overflow-x-auto w-full sm:w-auto max-w-full">
            {[
              { id: 'text', icon: Type, label: '文本' },
              { id: 'document', icon: FileText, label: '文档' },
              { id: 'voice', icon: Mic, label: '语音' },
              { id: 'video', icon: Video, label: '视频' }
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => { setMode(m.id as TranslationMode); setUploadedFile(null); setSourceText(''); setTargetText(''); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                  mode === m.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <m.icon className="w-4 h-4" /> {m.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`ml-2 p-2 rounded-md transition-colors hidden sm:flex ${showHistory ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
            title="历史记录"
          >
            <History className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area Based on Mode */}
        <div className="flex-1 overflow-auto bg-white flex flex-col">
          {mode === 'text' && (
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 h-full">
              <div className="p-4 sm:p-6 flex flex-col h-1/2 md:h-full">
                <textarea 
                  className="flex-1 w-full min-h-[160px] resize-none outline-none text-slate-700 text-lg placeholder:text-slate-300"
                  placeholder="在此输入需要翻译的文本..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
              </div>
              <div className="p-4 sm:p-6 bg-slate-50/50 flex flex-col h-1/2 md:h-full relative group">
                <textarea 
                  className="flex-1 w-full min-h-[160px] resize-none outline-none bg-transparent text-slate-700 text-lg placeholder:text-slate-300 focus:ring-0"
                  placeholder="翻译结果将在此处显示，可直接编辑修改..."
                  value={targetText}
                  onChange={(e) => setTargetText(e.target.value)}
                  readOnly={!targetText}
                />
                {targetText && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button 
                      onClick={exportText}
                      className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all"
                      title="导出结果"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {mode === 'voice' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-12">
                 <AnimatePresence>
                   {isRecording && (
                     <motion.div 
                       initial={{ scale: 1, opacity: 0 }}
                       animate={{ 
                         scale: [1, 1.2 + (voiceVolume / 400), 1], 
                         opacity: [0.5, 0.2, 0.5] 
                       }}
                       transition={{ repeat: Infinity, duration: 0.8 }}
                       className="absolute inset-0 bg-blue-500 rounded-full"
                     />
                   )}
                 </AnimatePresence>
                 <button
                   onClick={handleVoiceToggle}
                   className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
                     isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                   }`}
                 >
                   {isRecording ? <StopCircle className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                 </button>
              </div>

              <div className="w-full max-w-2xl grid md:grid-cols-2 gap-6 text-left">
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[120px]">
                   <p className="text-sm font-medium text-slate-500 mb-2">识别内容 ({sourceLang})</p>
                   {isRecording ? (
                     <p className="text-slate-400 italic">正在聆听中...</p>
                   ) : sourceText ? (
                     <p className="text-slate-800">{sourceText}</p>
                   ) : (
                     <p className="text-slate-400 italic">点击上方按钮开始录音</p>
                   )}
                 </div>
                 <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 min-h-[120px] relative group">
                   <p className="text-sm font-medium text-slate-500 mb-2">翻译结果 ({targetLang})</p>
                   {isRecording ? (
                     <p className="text-slate-400 italic">等待翻译...</p>
                   ) : targetText ? (
                     <>
                      <textarea 
                        className="w-full h-[calc(100%-24px)] bg-transparent resize-none outline-none text-slate-800 focus:ring-0"
                        value={targetText}
                        onChange={(e) => setTargetText(e.target.value)}
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={exportText} className="p-1.5 bg-white rounded-md shadow-sm text-slate-500 hover:text-blue-600">
                           <Download className="w-3 h-3" />
                        </button>
                      </div>
                     </>
                   ) : (
                     <p className="text-slate-400 italic">翻译将在此同步显示</p>
                   )}
                 </div>
              </div>
            </div>
          )}

          {(mode === 'video' || mode === 'document') && (
            <div className="flex-1 flex flex-col p-6">
              {!uploadedFile && !isTranslating ? (
                <div className="flex-1 flex items-center justify-center">
                  <label className="w-full max-w-lg border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group">
                    <input type="file" className="hidden" onChange={handleFileUpload} accept={mode === 'video' ? 'video/*' : '.pdf,.docx,.txt'} />
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                      {mode === 'video' ? <Video className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">点击上传或拖拽{mode === 'video' ? '视频' : '文档'}到此处</h3>
                    <p className="text-slate-500 text-sm">
                      {mode === 'video' ? '支持 MP4, MOV 格式，自动生成双语字幕' : '支持 PDF, Word, TXT 格式，保持原排版翻译'}
                    </p>
                  </label>
                </div>
              ) : isTranslating ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                  <p className="text-lg font-medium animate-pulse">正在处理并翻译 {mode === 'video' ? '视频' : '文档'}...</p>
                  <p className="text-sm opacity-70 mt-2">预计需要几十秒时间，请稍候</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col md:flex-row gap-6">
                  {/* Left Side: Preview */}
                  <div className="w-full md:w-1/2 bg-slate-900 rounded-xl overflow-hidden relative flex flex-col">
                    {mode === 'video' ? (
                      <div className="flex-1 flex items-center justify-center relative">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-slate-900"></div>
                        <Play className="w-16 h-16 text-white/50" />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white px-8">
                           <p className="text-lg drop-shadow-md font-medium">{targetText.split('\n')[1] || "字幕生成中..."}</p>
                           <p className="text-sm text-slate-300 drop-shadow-md">{sourceText.split('\n')[1] || "Subtitles generating..."}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 bg-slate-50 p-6 overflow-y-auto text-slate-700 whitespace-pre-wrap font-serif text-sm border-2 border-slate-200">
                        {sourceText}
                      </div>
                    )}
                  </div>
                  
                  {/* Right Side: Translation Results / Editor */}
                  <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-slate-800">
                        {mode === 'video' ? '双语字幕记录' : '编辑译文'}
                      </h3>
                      <button onClick={exportText} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                        <Download className="w-4 h-4" /> 导出{mode === 'video' ? '字幕(SRT)' : '文档'}
                      </button>
                    </div>
                    <textarea 
                      className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-4 resize-none outline-none text-slate-700 text-sm md:text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={targetText}
                      onChange={(e) => setTargetText(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions for text mode */}
        {mode === 'text' && (
          <div className="p-3 sm:p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-slate-50/80 backdrop-blur-sm shrink-0 gap-3 sm:gap-0">
             <p className="text-xs text-slate-500 flex items-center gap-1">
               <CheckCircle2 className="w-3 h-3 text-green-500" /> 包含专业术语库支持已开启
             </p>
             <button 
               onClick={handleTranslate}
               disabled={isTranslating}
               className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-medium transition-colors shadow-sm"
             >
               {isTranslating ? '正在翻译...' : '立即翻译'}
             </button>
          </div>
        )}
      </div>

      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-slate-200 bg-slate-50 flex flex-col overflow-hidden hidden md:flex shrink-0"
          >
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white whitespace-nowrap w-[320px]">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <History className="w-4 h-4" /> 翻译历史
              </h3>
              <button onClick={clearHistory} className="text-slate-400 hover:text-red-500 hidden sm:block p-1" title="清空历史">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto w-[320px]">
              {history.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  暂无翻译记录
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {history.map(record => (
                    <div key={`desktop-${record.id}`} className="p-4 hover:bg-white cursor-pointer transition-colors group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {record.mode === 'text' ? '文本' : record.mode === 'document' ? '文档' : record.mode === 'voice' ? '语音' : '视频'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 mb-1">{record.sourceLang} → {record.targetLang}</p>
                      <p className="text-sm text-slate-700 line-clamp-1 mb-1 font-medium">{record.sourceText}</p>
                      <p className="text-sm text-slate-500 line-clamp-2">{record.targetText}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSourceText(record.sourceText);
                          setTargetText(record.targetText);
                          setSourceLang(record.sourceLang);
                          setTargetLang(record.targetLang);
                          setMode(record.mode);
                        }}
                        className="text-xs text-blue-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      >
                         <History className="w-3 h-3" /> 加载此记录
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile History View Toggle Button */}
      <div className="md:hidden p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
         <button 
           onClick={() => setShowHistory(!showHistory)}
           className="text-sm text-slate-600 font-medium flex items-center gap-2"
         >
           <History className="w-4 h-4" /> 
           {showHistory ? '收起历史记录' : '显示历史记录'} ({history.length})
         </button>
      </div>

       {/* Mobile History Drawer */}
       <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '50vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-200 bg-slate-50 flex flex-col overflow-hidden"
          >
             <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-slate-100">
                  {history.map(record => (
                    <div key={`mobile-${record.id}`} className="p-4 hover:bg-white cursor-pointer transition-colors group">
                       <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {record.mode === 'text' ? '文本' : record.mode === 'document' ? '文档' : record.mode === 'voice' ? '语音' : '视频'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 line-clamp-1 mb-1 font-medium">{record.sourceText}</p>
                      <button 
                        onClick={() => {
                          setSourceText(record.sourceText);
                          setTargetText(record.targetText);
                          setSourceLang(record.sourceLang);
                          setTargetLang(record.targetLang);
                          setMode(record.mode);
                          setShowHistory(false);
                        }}
                        className="text-xs text-blue-600 mt-2 flex items-center gap-1"
                      >
                         加载记录
                      </button>
                    </div>
                  ))}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
