import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { toast, ToastContent, ToastOptions } from 'react-toastify'

const successToast = (title?: ToastContent, content?: ToastContent, options?: ToastOptions): void => {
  toast.success(
    <FlexBox direction='column' width='100%' gap={2}>
      {title && <Typography size='xl'>{title}</Typography>}
      {content && <Typography>{content}</Typography>}
    </FlexBox>,
    {
      icon: <SvgBox width='48px' height='48px' borderRadius='100%' border='1px solid #ffffff' />,
      ...options,
    },
  )
}

const errorToast = (title?: ToastContent, content?: ToastContent, options?: ToastOptions): void => {
  toast.error(
    <FlexBox direction='column' width='100%' gap={2}>
      {title && <Typography size='xl'>{title}</Typography>}
      {content && <Typography>{content}</Typography>}
    </FlexBox>,
    {
      icon: <SvgBox width='48px' height='48px' borderRadius='100%' border='1px solid #ffffff' />,
      ...options,
    },
  )
}

export { successToast, errorToast }
