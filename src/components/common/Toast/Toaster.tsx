'use client'

import { Fragment } from 'react'

import { useToast } from '@/hooks/useToast'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        size,
        position,
        ...props
      }) {
        return (
          <Fragment key={id}>
            <Toast size={size} slideIn={position} {...props}>
              {icon && <ToastIcon icon={icon} />}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
            <ToastViewport size={size} position={position} />
          </Fragment>
        )
      })}
    </ToastProvider>
  )
}
