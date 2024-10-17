import { Spacer, Button, Link as NextUILink } from '@nextui-org/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import Typography from '@/components/common/Typography'

import { ROUTES } from '../routes'

export const HomePage = () => {
  return (
    <div className="background-landing h-full flex flex-col">
      <div className="flex-1 backdrop-blur-md">
        <Spacer y={48} />
        <div className="space-y-6">
          <div className="mx-auto max-w-[900px]">
            <Typography className="w-full text-center" level="h1">
              Junior Software Engineer
            </Typography>
            <Typography className="w-full text-center" level="h1">
              Web lover and system design enthusiast
            </Typography>
          </div>
          <div className="mx-auto max-w-[600px]">
            <Typography
              className="w-full text-center font-light"
              level="p3"
              color="textTertiary"
            >
              Bui Ngoc Nam Anh, 1.5 years Software Engineer in web development
            </Typography>
            <Typography
              className="w-full text-center font-light"
              level="p3"
              color="textTertiary"
            >
              love building things and solving problems
            </Typography>
          </div>
          <div className="mx-auto w-fit space-x-4">
            <Button
              variant="solid"
              color="primary"
              size="lg"
              as={Link}
              to={ROUTES.PRODUCT_LIST}
            >
              Continue
              <AiOutlineArrowRight size={18} />
            </Button>
            <Button
              variant="flat"
              color="default"
              size="lg"
              type="button"
              as={NextUILink}
              target="_blank"
              href="https://github.com/tonible14012002"
            >
              About me
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
