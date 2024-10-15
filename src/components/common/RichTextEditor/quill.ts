import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import MagicUrl from 'quill-magic-url'
import ReactQuill, { Quill } from 'react-quill'

// Allow display image with data url
const Image = Quill.import('formats/image')
Image.sanitize = (url: string) => url

// const InlineEmbedBlot = Quill.import('blots/embed')
class ImagePlaceholderBlot extends Image {
  static create(data: { url: string; id: string }) {
    const node = super.create(data.url)
    node.setAttribute('src', data.url)
    node.setAttribute('image-placeholder', data.id)
    return node
  }
}

ImagePlaceholderBlot.blotName = 'imagePlaceholderBlot'
ImagePlaceholderBlot.className = 'image-placeholder-blot'
ImagePlaceholderBlot.tagName = 'img'

// Additional Customs
Quill.register({ 'formats/imagePlaceholderBlot': ImagePlaceholderBlot })
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
Quill.register('modules/magicUrl', MagicUrl)

export default ReactQuill
