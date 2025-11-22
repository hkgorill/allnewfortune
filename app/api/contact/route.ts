import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, category, message } = body;

    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      throw new Error("NOTION_DATABASE_ID is not defined");
    }

    // 현재 날짜 (ISO 8601 포맷)
    const today = new Date().toISOString();

    // Notion DB에 페이지 생성
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        // 1. 이름 (Title 속성) - 필수
        "이름": {
          title: [
            {
              text: {
                content: `[${category}] ${email} 님의 문의`,
              },
            },
          ],
        },
        // 2. 이메일
        "이메일": {
          email: email,
        },
        // 3. 유형 (Select)
        "유형": {
          select: {
            name: category,
          },
        },
        // 4. 내용 (Rich Text)
        "내용": {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        // 5. 작성일자 (Date)
        "작성일자": {
          date: {
            start: today,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notion API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit to Notion" },
      { status: 500 }
    );
  }
}
