import { Button } from '@nextui-org/react'
import type { ComponentRef } from 'react'
import { forwardRef } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import type { Settings } from 'react-slick'
import Slider from 'react-slick'

import { cn } from '@/utils/common'

export interface CarouselProps extends Settings {}
const defaultSettings: CarouselProps = {
  arrows: true,
  nextArrow: <Arrow direction="next" />,
  prevArrow: <Arrow direction="prev" />,
}

export const Carousel = forwardRef<ComponentRef<typeof Slider>, CarouselProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Slider
        ref={ref}
        className={cn(
          '!h-full',
          '[&_.slick-track]:flex [&_.slick-track]:ml-0 [&_.slick-track]:h-full',
          '[&_.slick-list]:overflow-hidden [&_.slick-list]:h-full [&_.slick-list]:flex',
          '[&_.slick-list>div]:w-full',
          '[&_.slick-slide>div]:h-full',
          '[&_.slick-slide>div]:w-full',
          '[&_.slick-slide>div]:relative',
          className,
        )}
        {...defaultSettings}
        {...rest}
      >
        {children}
      </Slider>
    )
  },
)

Carousel.displayName = 'Carousel'

interface ArrowProps {
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  direction?: 'next' | 'prev'
}
function Arrow(props: ArrowProps) {
  const { onClick, direction, className } = props
  const isNext = direction === 'next'
  const Icon = isNext ? RiArrowRightSLine : RiArrowLeftSLine

  return (
    <div
      className={cn(
        'h-full flex-shrink-0 flex items-center justify-center z-10 absolute top-0',
        {
          'opacity-0': className?.includes('slick-disabled'),
          'right-0 translate-x-1/2': isNext,
          'left-0 -translate-x-1/2': !isNext,
        },
      )}
    >
      <Button
        color="default"
        isIconOnly
        variant="flat"
        onClick={onClick}
        radius="full"
      >
        <Icon height={20} width={20} />
      </Button>
    </div>
  )
}
