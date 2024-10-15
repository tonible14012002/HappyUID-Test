import { RichTextEditor } from '@/components/common/RichTextEditor'
import { cn } from '@/utils/common'

import type { RichTextEditorProps } from '../RichTextEditor/type'
import Typography from '../Typography'

import { withForm } from './withForm'

type RichTextEditorWithLabelProps = RichTextEditorProps & {
  wrapperClassName?: string
  label?: string
}
export const RichTextWithLabel = (props: RichTextEditorWithLabelProps) => {
  const { label, wrapperClassName, ...rest } = props
  if (!label) return <RichTextEditor {...rest} />
  return (
    <label className={cn('space-y-3 block !pb-8', wrapperClassName)}>
      <Typography level="p5" color="textSecondary">
        {label}
      </Typography>
      <RichTextEditor {...rest} />
    </label>
  )
}

export const FormRichTextEditor = withForm<
  string,
  RichTextEditorWithLabelProps
>(RichTextWithLabel, {
  getValue: (value) => ({
    value: value || '',
  }),
})
