import { AuthProvider } from '@/context/AuthProvider'

import './globals.css'
import { Poppins } from 'next/font/google'
import NextAuthProvider from '@/context/NextAuthProvider'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
})
export const metadata = {

  title: 'InfotecSourz',
  description: 'Virtual photo retouching app',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <AuthProvider>
            <main className='max-w-screen-2xl mx-auto'>
              {children}

            </main>

          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
