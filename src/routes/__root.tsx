import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { MarketingLayout } from '@/components/Layout/AppLayout'
import { NotFound } from '@/components/NotFound'

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  component: () => (
    <>
      <MarketingLayout>
      <Outlet />
      </MarketingLayout>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})
