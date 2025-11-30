import { BLOG_POSTS } from "@/app/data/blogPosts";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Tag } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// generateMetadata 함수는 서버 컴포넌트에서 메타데이터를 동적으로 생성합니다.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  return {
    title: `${post.title} | ALL NEW FORTUNE 블로그`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// 정적 경로 생성 (Static Site Generation)
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-20">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> 목록으로 돌아가기
          </Link>

          <div className="flex flex-wrap gap-3 text-sm text-white/60 mb-4">
            <span className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {post.author}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <div 
            className="blog-content space-y-6 text-white/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

        <hr className="my-12 border-white/10" />

        <div className="bg-white/5 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">2026년 당신의 운세가 궁금하다면?</h3>
          <p className="text-white/60 mb-6">AI가 분석하는 정밀 신년운세를 무료로 확인해보세요.</p>
          <Link 
            href="/fortune"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            무료 신년운세 보러가기
          </Link>
        </div>
      </article>
    </main>
  );
}

