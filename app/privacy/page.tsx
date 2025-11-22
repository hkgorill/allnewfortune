import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto flex flex-col">
      <header className="flex items-center mb-8">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold ml-2">개인정보 처리방침</h1>
      </header>

      <div className="space-y-8">
        <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/10">
          <ShieldCheck className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">안심하세요!</h2>
          <p className="text-white/70">
            ALL NEW FORTUNE은 귀하의 개인정보를<br/>
            <span className="text-green-400 font-bold">절대 서버에 저장하지 않습니다.</span>
          </p>
        </div>

        <section className="space-y-4 text-sm text-white/80 leading-relaxed">
          <h3 className="text-lg font-bold text-white mt-6 border-b border-white/10 pb-2">1. 개인정보의 수집 및 이용 목적</h3>
          <p>
            본 서비스는 별도의 회원가입 절차가 없으며, 사용자의 이름, 전화번호, 주민등록번호 등 민감한 개인정보를 서버에 수집하거나 저장하지 않습니다.
          </p>
          <p>
            운세 풀이를 위해 입력하시는 '생년월일', '태어난 시간', '성별' 정보는 결과 산출을 위한 일회성 데이터로만 사용되며, 결과 페이지를 벗어나는 즉시 휘발됩니다.
          </p>

          <h3 className="text-lg font-bold text-white mt-6 border-b border-white/10 pb-2">2. 쿠키(Cookie) 및 데이터 저장</h3>
          <p>
            서비스 이용 편의를 위해 사용자의 브라우저(로컬 스토리지 등)에 일부 설정값이 저장될 수 있으나, 이는 전적으로 사용자 기기 내에만 존재하며 서버로 전송되지 않습니다.
          </p>
          
          <h3 className="text-lg font-bold text-white mt-6 border-b border-white/10 pb-2">3. 제3자 제공 및 위탁</h3>
          <p>
            수집하는 개인정보가 없으므로, 제3자에게 제공하거나 위탁하는 정보 또한 존재하지 않습니다.
          </p>

          <h3 className="text-lg font-bold text-white mt-6 border-b border-white/10 pb-2">4. 문의처</h3>
          <p>
            서비스 이용과 관련된 문의사항은 Contact 메뉴를 통해 보내주시면 신속하게 답변 드리겠습니다.
          </p>
        </section>
      </div>
    </main>
  );
}


