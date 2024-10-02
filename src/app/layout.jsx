import '../styles/global.css'

export const metadata = {
  title: 'Chat App',
  description: 'Real Time Chat App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}