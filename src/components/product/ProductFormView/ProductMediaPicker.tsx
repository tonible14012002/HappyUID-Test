import { Card, CardBody } from '@nextui-org/react'

import Typography from '@/components/common/Typography'

export const ProductMediaPicker = () => {
  return (
    <div>
      <Card shadow="none" className="bg-content2">
        <CardBody>
          <button>
            <div className="min-h-[300px] flex items-center justify-center">
              <Typography color="textTertiary">Drop image here</Typography>
            </div>
          </button>
        </CardBody>
      </Card>
    </div>
  )
}
