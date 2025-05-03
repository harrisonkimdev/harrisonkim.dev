import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend API 키로 초기화 (환경 변수에서 가져옴)
const resend = new Resend(process.env.RESEND_API_KEY);

// API 사용 예시: https://resend.com/docs/send-with-nextjs
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 유효성 검사
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // API 키가 없으면 에러 반환
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'API 구성 오류입니다. 관리자에게 문의해주세요.' },
        { status: 500 }
      );
    }

    // 이메일 전송
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Resend 제공 기본 이메일
      to: process.env.CONTACT_RECIPIENT_EMAIL || 'harrisonkimdev@gmail.com',
      replyTo: email, // 답장 시 사용자 이메일로 전송
      subject: `[harrisonkim.dev] 새로운 문의 - ${name}`,
      html: `
        <h2>새로운 문의가 도착했습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend 오류:', error);
      return NextResponse.json(
        { error: '메시지 전송 중 오류가 발생했습니다. 오류 내용: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 상세 내용: ' + (error.message || '알 수 없는 오류') },
      { status: 500 }
    );
  }
} 