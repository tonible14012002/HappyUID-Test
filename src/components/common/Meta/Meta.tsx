import { useEffect } from 'react'

interface MetaProps {
  title?: string
  tail?: string
}

export const Meta = (props: MetaProps) => {
  const { title, tail } = props
  const baseTitle = 'UID Test'
  useEffect(() => {
    document.title = [title, baseTitle, tail].filter(Boolean).join(' | ')
  })
  return null
}
