import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, BookOpen, Calendar, User } from "lucide-react";
import { BLOG_POSTS } from "@/app/data/blogPosts";

export const metadata: Metadata = {
  title: "운세 지식 블로그 | ALL NEW FORTUNE",
  description: "운세, 사주, 타로, MBTI 등 다양한 운명학적 지식과 정보를 제공하는 블로그입니다.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-4 transition-colors">
            <ChevronLeft className="w-5 h-5" /> 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-purple-400" />
            운세 지식 블로그
          </h1>
          <p className="text-white/60">
            운명과 심리에 관한 깊이 있는 이야기를 전해드립니다.
          </p>
        </header>

        <div className="grid gap-6">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {post.author}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-white/70 leading-relaxed mb-4 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                
                <span className="text-purple-400 text-sm font-bold group-hover:underline">
                  더 읽기 →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
