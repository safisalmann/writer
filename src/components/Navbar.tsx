import React from 'react';
import { ViewMode } from '../types';
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
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
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
  savedCount,
  completionPercentage,
  answeredCount,
  totalQuestions,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'chapters', label: '১২টি অধ্যায় (Botany)', icon: <BookOpen className="w-4 h-4" /> },
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
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Atom className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg text-slate-800 tracking-tight">Science Master</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">HSC & Med</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">পদার্থবিজ্ঞান • রসায়ন • উদ্ভিদ • প্রাণিবিজ্ঞান MCQ ব্যাংক</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-white text-[11px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              title="প্রশ্ন খুঁজুন (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">প্রশ্ন খুঁজুন...</span>
            </button>

            {/* Overall Progress Pill */}
            <div 
              onClick={() => onSelectView('analytics')}
              className="hidden lg:flex items-center space-x-2 bg-emerald-50/80 border border-emerald-200/70 px-3 py-1.5 rounded-full cursor-pointer hover:bg-emerald-100/80 transition-colors"
              title="অগ্রগতি দেখুন"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-700 font-semibold leading-tight">
                  {completionPercentage}% সম্পন্ন ({answeredCount}/{totalQuestions})
                </span>
                <div className="w-24 bg-emerald-200 rounded-full h-1.5 mt-0.5 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Progress Bar */}
          <div 
            onClick={() => {
              onSelectView('analytics');
              setMobileMenuOpen(false);
            }}
            className="p-3 bg-emerald-50 rounded-xl mb-3 border border-emerald-200 cursor-pointer"
          >
            <div className="flex justify-between items-center text-xs font-bold text-emerald-800 mb-1">
              <span>সামগ্রিক অগ্রগতি</span>
              <span>{completionPercentage}% ({answeredCount}/{totalQuestions})</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-600 h-2 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white text-emerald-800' : 'bg-amber-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
