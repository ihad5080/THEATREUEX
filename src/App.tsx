/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Play, Info, Calendar, ClipboardList, Settings, 
  BarChart3, Plus, Edit2, Trash2, Github, Instagram, Youtube,
  LayoutDashboard, FileText, Palette, LogOut, ChevronRight,
  Users, MessageSquare, Heart, Star
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

// --- Types ---
interface Post {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
}

// --- Mock Data ---
const INITIAL_POSTS: Post[] = [
  { id: 1, title: '2024 상반기 독립영화 정기 상영회 안내', date: '2024-03-15', category: '공지사항', content: '뜻밖의 극장에서 2024년 상반기 정기 상영회를 개최합니다...' },
  { id: 2, title: '[대관] 4월 주말 대관 예약 마감 임박', date: '2024-03-10', category: '대관안내', content: '많은 성원에 힘입어 4월 주말 대관 예약이 거의 마감되었습니다.' },
  { id: 3, title: '시네마 토크: 감독과의 대화 (김철수 감독)', date: '2024-03-05', category: '이벤트', content: '이번 주 금요일, 김철수 감독님을 모시고 특별한 대화의 시간을 갖습니다.' },
];

// --- Components ---

const Navbar = ({ isAdmin, setIsAdmin, activeTab, setActiveTab }: { 
  isAdmin: boolean, 
  setIsAdmin: (v: boolean) => void,
  activeTab: string,
  setActiveTab: (v: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = isAdmin 
    ? [
        { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
        { id: 'posts', label: '게시글 관리', icon: FileText },
        { id: 'settings', label: '설정', icon: Settings },
      ]
    : [
        { id: 'home', label: '홈' },
        { id: 'about', label: '소개' },
        { id: 'rental', label: '대관안내' },
        { id: 'board', label: '공지사항' },
      ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(isAdmin ? 'dashboard' : 'home')}>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Play className="text-white fill-current w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">뜻밖의 극장</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === item.id ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setIsAdmin(!isAdmin);
                setActiveTab(!isAdmin ? 'dashboard' : 'home');
              }}
              className="px-4 py-2 rounded-full border border-primary/50 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all"
            >
              {isAdmin ? '사용자 모드' : '관리자 모드'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-zinc-900 border-b border-white/10 px-4 py-6 space-y-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left text-lg font-medium text-gray-300 hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setIsAdmin(!isAdmin);
                setActiveTab(!isAdmin ? 'dashboard' : 'home');
                setIsOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold"
            >
              {isAdmin ? '사용자 모드로 전환' : '관리자 모드로 전환'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- User Pages ---

const Home = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  return (
    <div className="pt-20" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ x, y, scale: 1.1 }}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=2000" 
            alt="Theater Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/20 text-primary text-sm font-bold border border-primary/30">
            Independent & Art Cinema
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
            뜻밖의 순간, <br />
            <span className="text-primary italic">예술</span>이 되는 공간
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            뜻밖의 극장은 독립 영화의 가치를 공유하고, <br className="hidden md:block" />
            창작자들을 위한 자유로운 예술 공간을 제공합니다.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-full md:w-auto px-8 py-4 bg-primary rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              상영 일정 확인하기
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white/10 backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/10">
              공간 대관 문의
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="py-24 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-8 tracking-tight">
            우리는 영화 그 이상의 <br />
            <span className="text-primary">경험</span>을 지향합니다.
          </h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              '뜻밖의 극장'은 단순히 영화를 상영하는 곳이 아닙니다. 
              숨겨진 보석 같은 독립 영화를 발굴하고, 관객과 창작자가 
              직접 소통하며 새로운 영감을 나누는 커뮤니티 공간입니다.
            </p>
            <p>
              우리는 상업적인 논리에서 벗어나, 예술적 가치와 
              다양성을 존중하는 모든 이들에게 열려 있습니다. 
              당신의 일상에 뜻밖의 감동을 선사할 준비가 되어 있습니다.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">상영작</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">12k</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">누적 관객</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">대관 가능</div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1000" 
            alt="Theater Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>

    {/* Rental Section */}
    <section id="rental" className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">공간 대관 안내</h2>
        <p className="text-gray-400">당신의 창의적인 프로젝트를 위한 최적의 공간</p>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          { title: '영화 상영회', desc: '독립영화, 단편영화, 졸업작품 등 개인 상영회를 위한 최적의 시스템', icon: Play },
          { title: '세미나 & 워크숍', desc: '예술 관련 강연, 북토크, 워크숍을 위한 아늑하고 집중도 높은 공간', icon: Info },
          { title: '촬영 스튜디오', desc: '극장 특유의 분위기를 활용한 뮤직비디오, 광고, 프로필 촬영 지원', icon: Calendar },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-primary/30 transition-all"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <item.icon className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            <button className="mt-8 text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              자세히 보기 <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Board Preview */}
    <section id="board" className="py-24 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">공지사항</h2>
          <button className="text-gray-400 hover:text-primary transition-colors">전체보기</button>
        </div>
        <div className="space-y-4">
          {INITIAL_POSTS.map((post) => (
            <div key={post.id} className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-black border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-2 md:mb-0">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-bold text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                  {post.category}
                </span>
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{post.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
};

// --- Admin Pages ---

const AdminDashboard = () => (
  <div className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
    <div className="mb-10">
      <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
      <p className="text-gray-400">극장 운영 현황 및 통계를 한눈에 확인하세요.</p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {[
        { label: '오늘 방문자', value: '1,284', change: '+12%', icon: Users },
        { label: '이번 달 대관', value: '24건', change: '+5%', icon: Calendar },
        { label: '새 문의사항', value: '8건', change: 'New', icon: MessageSquare },
        { label: '평균 만족도', value: '4.9', change: 'Excellent', icon: Star },
      ].map((stat, idx) => (
        <div key={idx} className="p-6 rounded-3xl bg-zinc-900 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <stat.icon className="text-primary w-5 h-5" />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Recent Activity */}
      <div className="md:col-span-2 p-8 rounded-3xl bg-zinc-900 border border-white/5">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" /> 최근 대관 문의 현황
        </h3>
        <div className="space-y-6">
          {[
            { name: '김민수', type: '단편영화 상영', date: '2024-03-25', status: '대기중' },
            { name: '이영희', type: '워크숍', date: '2024-04-02', status: '승인됨' },
            { name: '박지성', type: '뮤직비디오 촬영', date: '2024-03-28', status: '승인됨' },
            { name: '최유진', type: '졸업작품 상영', date: '2024-04-10', status: '대기중' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
              <div>
                <div className="font-bold">{item.name}</div>
                <div className="text-sm text-gray-500">{item.type}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium mb-1">{item.date}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === '승인됨' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20">
          <h3 className="text-lg font-bold mb-4">빠른 작업</h3>
          <div className="space-y-3">
            <button className="w-full py-3 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors">
              <Plus className="w-4 h-4" /> 새 공지사항 작성
            </button>
            <button className="w-full py-3 rounded-xl bg-white/5 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors border border-white/10">
              <Calendar className="w-4 h-4" /> 일정 캘린더 확인
            </button>
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
          <h3 className="text-lg font-bold mb-4">시스템 상태</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">서버 용량</span>
                <span className="text-primary">45%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[45%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">트래픽</span>
                <span className="text-emerald-500">정상</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[20%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminPosts = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  
  return (
    <div className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">게시글 관리</h1>
          <p className="text-gray-400">공지사항 및 이벤트를 관리합니다.</p>
        </div>
        <button className="px-6 py-3 bg-primary rounded-xl font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> 새 글 작성
        </button>
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">카테고리</th>
              <th className="px-8 py-4">제목</th>
              <th className="px-8 py-4">작성일</th>
              <th className="px-8 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors">
                <td className="px-8 py-6">
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-bold text-gray-400">
                    {post.category}
                  </span>
                </td>
                <td className="px-8 py-6 font-medium">{post.title}</td>
                <td className="px-8 py-6 text-sm text-gray-500">{post.date}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminSettings = () => (
  <div className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
    <div className="mb-10">
      <h1 className="text-3xl font-bold mb-2">사이트 설정</h1>
      <p className="text-gray-400">웹사이트의 테마, 폰트, 기본 정보를 설정합니다.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" /> 테마 및 디자인
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">포인트 색상 (Primary Color)</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary border-2 border-white/20" />
                <input type="text" value="#8B5CF6" className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">기본 폰트 (Typography)</label>
              <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm">
                <option>Pretendard (권장)</option>
                <option>Noto Sans KR</option>
                <option>Inter</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" /> 기본 정보 관리
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">사이트 이름</label>
              <input type="text" value="뜻밖의 극장" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">사이트 설명 (SEO)</label>
              <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm h-24">독립/예술 극장 소개 및 공간 대관 서비스를 제공하는 프리미엄 극장 플랫폼입니다.</textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" /> 히어로 섹션 이미지
          </h3>
          <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10">
            <img src="https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=800" alt="Hero Preview" className="w-full h-full object-cover" />
          </div>
          <button className="w-full py-3 rounded-xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all">
            이미지 변경하기
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <LogOut className="w-5 h-5 text-red-500" /> 위험 구역
          </h3>
          <p className="text-sm text-gray-500 mb-6">데이터 초기화 및 계정 관리 설정을 변경할 수 있습니다.</p>
          <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 font-bold hover:bg-red-500/10 transition-all">
            사이트 데이터 초기화
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Footer ---

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-white/5 py-16 px-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Play className="text-white fill-current w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tighter">뜻밖의 극장</span>
        </div>
        <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
          독립 영화의 가치를 발견하고 예술가들의 꿈을 응원합니다. 
          일상 속에서 만나는 뜻밖의 감동, 지금 바로 경험해 보세요.
        </p>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <Instagram className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <Youtube className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <Github className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6">바로가기</h4>
        <ul className="space-y-4 text-gray-500 text-sm">
          <li><a href="#" className="hover:text-primary transition-colors">극장 소개</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">상영 일정</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">대관 안내</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">공지사항</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">고객지원</h4>
        <ul className="space-y-4 text-gray-500 text-sm">
          <li><a href="#" className="hover:text-primary transition-colors">자주 묻는 질문</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">1:1 문의</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">오시는 길</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
      © 2024 Unexpected Theater. All rights reserved.
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, isAdmin]);

  return (
    <div className="min-h-screen bg-black selection:bg-primary selection:text-white">
      <Navbar 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main>
        <AnimatePresence mode="wait">
          {!isAdmin ? (
            <motion.div
              key="user-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'home' && <Home />}
              {activeTab === 'about' && <div className="pt-20"><Home /></div>} {/* Simplified for demo */}
              {activeTab === 'rental' && <div className="pt-20"><Home /></div>} {/* Simplified for demo */}
              {activeTab === 'board' && <div className="pt-20"><Home /></div>} {/* Simplified for demo */}
              <Footer />
            </motion.div>
          ) : (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && <AdminDashboard />}
              {activeTab === 'posts' && <AdminPosts />}
              {activeTab === 'settings' && <AdminSettings />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Admin Toggle for easy access */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => {
            setIsAdmin(!isAdmin);
            setActiveTab(!isAdmin ? 'dashboard' : 'home');
          }}
          className="group flex items-center gap-2 px-6 py-3 bg-primary rounded-full font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-all"
        >
          {isAdmin ? <LayoutDashboard className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
            {isAdmin ? '사용자 화면 보기' : '관리자 대시보드'}
          </span>
        </button>
      </div>
    </div>
  );
}
