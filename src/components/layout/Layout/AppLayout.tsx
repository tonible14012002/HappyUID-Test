import type { PropsWithChildren } from 'react'

import { AppHeader } from '../AppHeader'

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[100vh] flex flex-col w-full">
      <AppHeader />
      <main className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="md:px-6 py-4 container">{children}</div>
      </main>
    </div>
  )
}
