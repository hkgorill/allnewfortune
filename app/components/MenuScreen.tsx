import { motion } from "framer-motion";
import { 
  CalendarDays, 
  BrainCircuit, 
  HeartHandshake, 
  ScrollText, 
  LibraryBig, 
  Star,
  ArrowRight
} from "lucide-react";

interface MenuScreenProps {
  onSelectMenu: (menuId: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function MenuScreen({ onSelectMenu }: MenuScreenProps) {
  return (
    <div className="w-full max-w-md px-4 py-6 pb-20">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">탐색하기</h2>
          <p className="text-white/60 text-sm">당신에게 필요한 조언을 선택하세요</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
          <span className="text-lg">🔮</span>
        </div>
      </motion.header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 auto-rows-[160px]"
      >
        {/* 1. Featured: 신년운세 (Large Card, Spans 2 Columns) */}
        <motion.div 
          variants={itemVariant}
          onClick={() => onSelectMenu("new_year")}
          className="col-span-2 row-span-1 relative overflow-hidden rounded-3xl cursor-pointer group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 opacity-90 transition-opacity group-hover:opacity-100" />
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          
          <div className="relative h-full p-6 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <CalendarDays className="w-8 h-8 text-white" />
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-white/20 rounded-full border border-white/10 backdrop-blur-md">BEST</span>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">2026 신년운세</h3>
              <p className="text-white/70 text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                미리보는 병오년의 흐름 <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </p>
            </div>
          </div>
        </motion.div>

        {/* 2. MBTI (Square) */}
        <motion.div 
          variants={itemVariant}
          onClick={() => onSelectMenu("mbti")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-lg">MBTI</h4>
            <p className="text-xs text-white/50">성격 분석</p>
          </div>
        </motion.div>

        {/* 3. Egogram (Square) */}
        <motion.div 
          variants={itemVariant}
          onClick={() => onSelectMenu("egogram")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-lg">심리테스트</h4>
            <p className="text-xs text-white/50">에고그램</p>
          </div>
        </motion.div>

        {/* 4. Saju (Tall or Wide? - Let's make it wide at bottom or just another square) -> Square grid continues */}
        <motion.div 
          variants={itemVariant}
          onClick={() => onSelectMenu("saju")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer group"
        >
           <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <ScrollText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-lg">사주팔자</h4>
            <p className="text-xs text-white/50">정통 명리</p>
          </div>
        </motion.div>

        {/* 5. Tarot */}
        <motion.div 
          variants={itemVariant}
          onClick={() => onSelectMenu("tarot")}
          className="col-span-1 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer group"
        >
           <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <LibraryBig className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-lg">타로</h4>
            <p className="text-xs text-white/50">카드의 조언</p>
          </div>
        </motion.div>

        {/* 6. Horoscope (Full Width Bottom) */}
        <motion.div 
          variants={itemVariant}
          onClick={() => onSelectMenu("horoscope")}
          className="col-span-2 row-span-1 h-[120px] bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:border-white/30 transition-colors cursor-pointer relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
           
           <div className="z-10">
             <h4 className="font-bold text-xl mb-1">별자리 운세</h4>
             <p className="text-sm text-white/60">오늘 밤 별들은 무엇을 말할까요?</p>
           </div>
           
           <div className="z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
             <Star className="w-6 h-6 text-yellow-300" />
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
