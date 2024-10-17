import { Button, Card, CardBody, Image } from '@nextui-org/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'
import type Slider from 'react-slick'

import type { CarouselProps } from '@/components/common/Carousel/Carousel'
import { Carousel } from '@/components/common/Carousel/Carousel'
import Typography from '@/components/common/Typography'
import { uploadImage } from '@/libs/uploader'
import { cn, newIdGenerator } from '@/utils/common'
import { preloadImage } from '@/utils/image'

export interface ProductMediaPickerProps {
  value?: Record<string, MediaMeta>
  onChange?: (value: Record<string, MediaMeta>) => void
  disabled?: boolean
  isError?: boolean
  errorMessage?: string
}

const generatorId = newIdGenerator()

type MediaMeta = {
  name: string
  url: string
  id: string
  uploaded?: boolean
}

const settings: CarouselProps = {
  slidesToShow: 1,
  swipeToSlide: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  lazyLoad: 'ondemand',
}

export const ProductMediaPicker = (props: ProductMediaPickerProps) => {
  const { value = {}, onChange, disabled, isError, errorMessage } = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  const images = value
  const setImages = onChange

  const sliderRef = useRef<Slider | null>(null)
  const [uploadedImages, setUploadedImages] = useState<
    Record<string, MediaMeta>
  >({})

  const handleUploadImage = async (image: MediaMeta, file: File) => {
    const uploadedImg = await uploadImage(file)
    if (!uploadedImg) return
    await preloadImage(uploadedImg.secure_url)
    setUploadedImages?.({
      ...uploadedImages,
      [image.id]: {
        ...image,
        url: uploadedImg?.secure_url ?? '',
        uploaded: true,
      },
    })
  }

  useEffect(() => {
    if (!Object.keys(uploadedImages).length) return
    setImages?.({
      ...value,
      ...uploadedImages,
    })
    setUploadedImages({})
  }, [uploadedImages, value, setImages])

  const onDrop = (acceptedFiles: File[]) => {
    const files = acceptedFiles.reduce(
      (acc, file) => {
        const id = `${file.name}-${generatorId()}`
        acc[id] = {
          name: file.name,
          url: URL.createObjectURL(file),
          id,
          uploaded: false,
          file: file,
        } as MediaMeta & { file: File }

        return acc
      },
      {} as Record<string, MediaMeta & { file: File }>,
    )

    Object.values(files).forEach((image) => {
      handleUploadImage(image, image.file)
    })

    setImages?.({
      ...value,
      ...files,
    })
  }

  const { isDragActive, getInputProps, getRootProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 10,
    accept: {
      'image/*': ['.png', '.gif', '.jpg', '.jpeg', '.webp', '.svg'],
    },
  })

  const inputProps = getInputProps()

  const showImages = useMemo(() => {
    return Object.values(images)
  }, [images])

  return (
    <div className="space-y-6">
      <Card shadow="none" className="bg-content2 overflow-visible">
        <CardBody {...getRootProps()} className="overflow-visible">
          <input {...inputProps} ref={inputRef} />
          <div className="w-full pb-[100%] relative">
            {!!showImages.length && (
              <div className="absolute inset-0 z-10">
                {showImages.length > 1 ? (
                  <Carousel ref={sliderRef} {...settings}>
                    {showImages.map((image) => (
                      <div
                        className={cn('absolute inset-0 bg-content2')}
                        key={image.id}
                      >
                        <Image
                          radius="sm"
                          loading="lazy"
                          src={image.url}
                          alt="cover image"
                          classNames={{
                            wrapper: 'h-full w-full !max-w-full',
                            img: '!my-0',
                          }}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <Image
                    radius="sm"
                    loading="lazy"
                    src={showImages[0].url}
                    alt="cover image"
                    classNames={{
                      wrapper: 'h-full w-full !max-w-full',
                      img: '!my-0',
                    }}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            )}

            <button
              className={cn('absolute inset-0 transition-all', {
                'z-30 backdrop-blur-sm bg-content2': isDragActive,
              })}
              type="button"
              disabled={disabled}
              onClick={() => {
                inputRef.current?.click()
              }}
            >
              <div className="flex items-center justify-center">
                {isDragActive ? (
                  <Typography color="textPrimary">
                    Click here to upload images
                  </Typography>
                ) : (
                  <Typography color="textTertiary">Drop image here</Typography>
                )}
              </div>
            </button>
          </div>
        </CardBody>
      </Card>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        <Button
          className="w-[80px] h-[80px] flex-shrink-0 p-0"
          isDisabled={disabled}
          type="button"
          size="sm"
          variant="flat"
          onClick={() => {
            inputRef.current?.click()
          }}
        >
          <div className="w-[28px] h-[28px] justify-center items-center flex bg-primary rounded-full">
            <RiAddLine size={20} color="white" />
          </div>
        </Button>
        {Object.values(images).map((image, index) => (
          <div
            key={image.id}
            className="relative flex-shrink-0 w-[80px] h-[80px] rounded-large overflow-hidden"
          >
            <Button
              radius="full"
              size="sm"
              variant="solid"
              isIconOnly
              color="default"
              className="absolute -right-1.5 -top-1.5 z-50"
              onClick={() => {
                const { [image.id]: _, ...rest } = value
                setImages?.({ ...rest })
              }}
            >
              <RiCloseLine size={14} />
            </Button>
            <Button
              className={cn('!w-[80px] !h-[80px] flex-shrink-0 p-0', {
                'animate-pulse opacity-75': !image.uploaded,
              })}
              type="button"
              onClick={() => {
                sliderRef.current?.slickGoTo(index)
              }}
              disableRipple
            >
              <Image
                radius="sm"
                loading="lazy"
                src={image.url}
                alt="cover image"
                classNames={{
                  wrapper: 'h-full w-full !max-w-full',
                  img: '!my-0',
                }}
                className="h-full w-full object-cover"
              />
            </Button>
          </div>
        ))}
      </div>
      {isError && (
        <div className="!mt-1">
          <Typography level="p6" color="danger">
            {errorMessage}
          </Typography>
        </div>
      )}
    </div>
  )
}
