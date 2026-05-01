import * as React from 'react'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import Footer from '#/components/Footer'
import { Toaster } from '#/components/ui/toaster'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '#/contexts/auth'
import type { User } from '#/types/user'

interface MyRouterContext {
  queryClient: QueryClient
  auth: {
    isAuthenticated: boolean
    user: User | null
    isPending: boolean
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sciflow' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <AuthProvider>
      <AuthRouterSync />
    </AuthProvider>
  )
}

function AuthRouterSync() {
  const auth = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    router.update({
      context: {
        ...router.options.context,
        auth,
      },
    })
  }, [auth, router])

  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere]">
        <Header />
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}