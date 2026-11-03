import React from 'react';
import { ViewMode, Subject } from '../types';
import { 
  Atom, 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Bookmark, 
  BarChart3, 
  Search,
  CheckCircle2, 
  Menu, 
  X,
  Sparkles,
  Dna,
  Sprout
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
  savedCount: number;
  overallAccuracy: number;
  completionPercentage: number;
  answeredCount: number;
  totalQuestions: number;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  currentSubject,
  onSelectSubject,
  savedCount,
  completionPercentage,
  answeredCount,
  totalQuestions,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const subjectNameBangla = currentSubject === 'physics' ? 'পদার্থবিজ্ঞান' : currentSubject === 'zoology' ? 'প্রাণিবিজ্ঞান' : 'উদ্ভিদবিজ্ঞান';
  const chapterCountLabel = currentSubject === 'physics' ? 'অধ্যায়সমূহ (পদার্থবিজ্ঞান)' : `১২টি অধ্যায় (${subjectNameBangla})`;

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'chapters', label: chapterCountLabel, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'sets', label: 'MCQ অনুশীলন সেটস', icon: <Layers className="w-4 h-4" /> },
    { 
      id: 'saved', 
      label: 'সেভ করা প্রশ্ন', 
      icon: <Bookmark className="w-4 h-4" />,
      badge: savedCount
    },
    { id: 'analytics', label: 'অগ্রগতি ট্র্যাকার', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectView('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${
              currentSubject === 'physics'
                ? 'from-violet-600 via-indigo-600 to-purple-700 shadow-violet-500/25'
                : currentSubject === 'zoology'
                ? 'from-cyan-600 via-sky-600 to-blue-700 shadow-sky-500/25'
                : 'from-emerald-600 via-teal-600 to-indigo-700 shadow-emerald-500/25'
            } flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
              {currentSubject === 'physics' ? (
                <Atom className="w-5 h-5 animate-spin-slow" />
              ) : currentSubject === 'zoology' ? (
                <Dna className="w-5 h-5 animate-pulse" />
              ) : (
                <Sprout className="w-5 h-5 animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg text-slate-800 tracking-tight">MCQ Master Pro</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  HSC & Med
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                পদার্থবিজ্ঞান, প্রাণিবিজ্ঞান ও উদ্ভিদবিজ্ঞান ৩,৪০০+ MCQ ব্যাংক
              </p>
            </div>
          </div>

          {/* Center Subject Switcher Tabs */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onSelectSubject('physics')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSubject === 'physics'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>পদার্থ ২য় পত্র (Physics)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                currentSubject === 'physics' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                ৩৩২ MCQ
              </span>
            </button>

            <button
              onClick={() => onSelectSubject('zoology')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSubject === 'zoology'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Dna className="w-3.5 h-3.5" />
              <span>প্রাণিবিজ্ঞান (Zoology)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                currentSubject === 'zoology' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                ১,৩৪৬ MCQ
              </span>
            </button>

            <button
              onClick={() => onSelectSubject('botany')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSubject === 'botany'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>উদ্ভিদবিজ্ঞান (Botany)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                currentSubject === 'botany' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                ১,৭২২ MCQ
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? currentSubject === 'physics'
                        ? 'bg-violet-50 text-violet-800 shadow-xs border border-violet-200/80 font-bold'
                        : currentSubject === 'zoology'
                        ? 'bg-cyan-50 text-cyan-800 shadow-xs border border-cyan-200/80 font-bold'
                        : 'bg-emerald-50 text-emerald-800 shadow-xs border border-emerald-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer border border-slate-200"
              title="প্রশ্ন খুঁজুন"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">সার্চ...</span>
            </button>

            {/* Quick Progress Badge */}
            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-200 text-xs">
              <div className="text-right">
                <div className="font-bold text-slate-800 leading-tight">
                  {answeredCount} / {totalQuestions}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {completionPercentage}% সম্পন্ন
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-slate-700 border border-slate-200">
                {completionPercentage}%
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Subject Switcher Bar */}
        <div className="lg:hidden py-2 border-t border-slate-100 grid grid-cols-3 gap-1.5">
          <button
            onClick={() => onSelectSubject('physics')}
            className={`flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
              currentSubject === 'physics'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Atom className="w-3 h-3 shrink-0" />
            <span className="truncate">পদার্থ (৩৩২)</span>
          </button>
          <button
            onClick={() => onSelectSubject('zoology')}
            className={`flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
              currentSubject === 'zoology'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Dna className="w-3 h-3 shrink-0" />
            <span className="truncate">প্রাণী (১,৩৪৬)</span>
          </button>
          <button
            onClick={() => onSelectSubject('botany')}
            className={`flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
              currentSubject === 'botany'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Sprout className="w-3 h-3 shrink-0" />
            <span className="truncate">উদ্ভিদ (১,৭২২)</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  currentView === item.id
                    ? 'bg-cyan-50 text-cyan-800'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
