import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) =>{
  const token  = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname !== '/' && pathname !== '/register') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && (pathname === '/' || pathname === '/register')){
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/register', '/receita', '/despesas'],
};