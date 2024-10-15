import { RichTextEditor } from '@/components/common/RichTextEditor'
import { cn } from '@/utils/common'

import type { RichTextEditorProps } from '../RichTextEditor/type'
import Typography from '../Typography'

import { withForm } from './withForm'

type RichTextEditorWithLabelProps = RichTextEditorProps & {
  wrapperClassName?: string
  label?: string
  isRequired?: boolean
  isReadOnly?: boolean
}
export const RichTextWithLabel = (props: RichTextEditorWithLabelProps) => {
  const { label, wrapperClassName, isReadOnly, isRequired, ...rest } = props
  if (!label) return <RichTextEditor {...rest} />
  return (
    <div className={cn('space-y-3', wrapperClassName)}>
      <Typography component="label" level="p5" color="textSecondary">
        {label} {isRequired ? '*' : ''}
      </Typography>
      <RichTextEditor {...rest} readOnly={isReadOnly} />
    </div>
  )
}

export const FormRichTextEditor = withForm<
  string,
  RichTextEditorWithLabelProps
>(RichTextWithLabel, {
  getOnValueChange(onChange) {
    return {
      onChange,
    }
  },
  getIsInvalid(isError) {
    return { isError }
  },
})
