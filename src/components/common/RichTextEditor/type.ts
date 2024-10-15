import type { ReactQuillProps } from 'react-quill'

export interface RichTextEditorProps extends ReactQuillProps {
  className?: string
  isError?: boolean
  errorMessage?: string
}
