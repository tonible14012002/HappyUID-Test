import { Card, CardBody, CardHeader } from '@nextui-org/react'
import type { PropsWithChildren } from 'react'

import Typography from '@/components/common/Typography'
import { cn } from '@/utils/common'

interface ProductFormSectionProps extends PropsWithChildren {
  title: string
  className?: string
}

export const ProductFormSection = (props: ProductFormSectionProps) => {
  const { children, title, className } = props
  return (
    <Card shadow="none" className={cn('bg-content1 p-2.5', className)}>
      <CardHeader>
        <Typography level="h6">{title}</Typography>
      </CardHeader>
      <CardBody className="space-y-6">{children}</CardBody>
    </Card>
  )
}
