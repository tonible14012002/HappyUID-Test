import type { ReactQuillProps } from 'react-quill'

export interface RichTextEditorProps extends ReactQuillProps {
  hideToolbar?: boolean
  className?: string
}
