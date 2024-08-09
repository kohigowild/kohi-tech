'use client'

import { usePathname } from 'next/navigation'

export default function PathnameDisplay() {
  const pathname = usePathname()

  return (
    <div>
      <p>Current Pathname: {pathname}</p>
    </div>
  )
}
