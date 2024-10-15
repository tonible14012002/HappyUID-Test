import type { ImageData as QuillImageData } from 'quill-image-drop-and-paste'
import { useCallback, useMemo, useRef, lazy, Suspense } from 'react'
import 'react-quill/dist/quill.snow.css'
import type ReactQuillNS from 'react-quill'
import { Quill } from 'react-quill'

import { uploadImage } from '@/libs/uploader'
import { cn, newIdGenerator } from '@/utils/common'
import { preloadImage } from '@/utils/image'

import Typography from '../Typography'

import type { RichTextEditorProps } from './type'
import { calculatePlaceholderInsertLength, URL_REGEX } from './utils'

const ReactQuill = lazy(async () => import('./quill'))

const idGenerator = newIdGenerator()

const DEFAULT_MODULES = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
    handlers: {},
  },
  magicUrl: {
    urlRegularExpression: URL_REGEX,
    globalRegularExpression: URL_REGEX,
  },
}

const DEFAULT_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'link',
  'image',
  'imagePlaceholderBlot',
]

const RichTextEditor = (props: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuillNS>(null)
  const {
    formats = DEFAULT_FORMATS,
    modules = DEFAULT_MODULES,
    value,
    className,
    isError,
    errorMessage,
    ...restProps
  } = props

  const imageDropAndPasteModule = useRef({
    imageDropAndPaste: {
      // add an custom image handler
      handler: (
        _imageDataUrl: string,
        _type: string,
        imageData: QuillImageData,
      ) => {
        const quill = quillRef.current?.getEditor()
        if (!quill) return
        handleInsertPlaceHolderAndUploadImage(quill, imageData.toBlob())
      },
    },
  })

  const imageUploadHandler = useCallback(() => {
    const quill = quillRef.current?.getEditor()
    if (!quill) return

    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async (e) => {
      const image = (e.target as HTMLInputElement).files?.[0]
      if (image) {
        handleInsertPlaceHolderAndUploadImage(quill, image)
      }
    }
  }, [])

  const mergedModules = useMemo(() => {
    const mergedHandlerModules = modules
    mergedHandlerModules.toolbar['handlers'] = {
      ...mergedHandlerModules.toolbar['handlers'],
      image: imageUploadHandler,
    }
    return {
      ...mergedHandlerModules,
      ...imageDropAndPasteModule.current,
    }
  }, [imageUploadHandler, modules])

  return (
    <div
      className={cn('w-full h-fit rich-text-editor rounded-large', {
        '[&_.ql-container]:bg-danger-50 [&_.ql-toolbar]:bg-danger-50': isError,
      })}
    >
      <Suspense>
        <ReactQuill
          formats={formats}
          ref={quillRef}
          modules={mergedModules}
          value={value || ''}
          {...restProps}
        />
        {isError && (
          <Typography level="p6" fontWeight="md" color="danger">
            {errorMessage}
          </Typography>
        )}
      </Suspense>
    </div>
  )
}

export default RichTextEditor
export { RichTextEditor }

const handleInsertPlaceHolderAndUploadImage = (
  quill: NonNullable<ReactQuillNS['editor']>,
  blob: Blob,
) => {
  const insertPosition = quill.getSelection()?.index ?? quill.getLength()

  const url = window.URL.createObjectURL(blob)

  const placeholderId = idGenerator()
  const placeHolderDelta = quill.insertEmbed(
    insertPosition,
    // custom node
    'imagePlaceholderBlot',
    { url, id: placeholderId },
  )

  quill.setSelection(insertPosition + 1, 0, 'user')
  uploadImage(new File([blob], 'image.png'))
    .then(async (data) => {
      const rangeToDelete = calculatePlaceholderInsertLength(placeHolderDelta)
      await preloadImage(data?.secure_url || '')
      const placeHolderImage = document.querySelector(
        `[image-placeholder="${placeholderId}"]`,
      )
      // image removed
      if (!placeHolderImage) return

      const deleteIndex = quill.getIndex(Quill.find(placeHolderImage, true))
      quill.deleteText(deleteIndex, rangeToDelete, 'user')
      quill.insertEmbed(deleteIndex, 'image', data?.secure_url, 'user')
    })
    .catch((e) => {
      console.error(e)
    })
}
