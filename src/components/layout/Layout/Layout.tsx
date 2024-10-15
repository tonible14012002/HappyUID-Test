import type { PropsWithChildren } from 'react'

import { AppHeader } from '../AppHeader'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[100vh] flex flex-col w-full overflow-y-auto">
      <AppHeader />
      {children}
    </div>
  )
}
