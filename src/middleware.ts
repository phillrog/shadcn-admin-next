import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  // Se o usuário tentar acessar o dashboard sem token, redireciona para sign-in
  if (!token && !pathname.startsWith('/sign-in') && !pathname.startsWith('/sign-up') && !pathname.startsWith('/forgot-password') && !pathname.startsWith('/otp')) {
    if (pathname !== '/') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  // Se o usuário já estiver logado e tentar acessar o sign-in, redireciona para o dashboard
  if (token && pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
