import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    const response = await fetch('http://103.148.17.99:3030/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apollo-require-preflight': 'true',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: "mutation CreateAttendanceQrToken { createAttendanceQrToken { token instansi_id } }"
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}