import Lottie from 'react-lottie'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { toast, ToastContent, ToastOptions } from 'react-toastify'
import SuccessAnimation from '/public/assets/lottie/sign_success.json'
import FailAnimation from '/public/assets/lottie/sign_fail.json'

const successToast = (title?: ToastContent, content?: ToastContent, options?: ToastOptions): void => {
  toast.success(
    <FlexBox $direction='column' width='100%' $gap={2}>
      {title && (
        <Typography size='xl'>
          <>{title}</>
        </Typography>
      )}
      {content && (
        <Typography>
          <>{content}</>
        </Typography>
      )}
    </FlexBox>,
    {
      icon: (
        <Lottie
          height={48}
          width={48}
          options={{
            loop: false,
            autoplay: true,
            animationData: SuccessAnimation,
          }}
        />
      ),
      ...options,
    },
  )
}

const errorToast = (title?: ToastContent, content?: ToastContent, options?: ToastOptions): void => {
  toast.error(
    <FlexBox $direction='column' width='100%' $gap={2}>
      {title && (
        <Typography size='xl'>
          <>{title}</>
        </Typography>
      )}
      {content && (
        <Typography>
          <>{content}</>
        </Typography>
      )}
    </FlexBox>,
    {
      icon: (
        <Lottie
          height={48}
          width={48}
          options={{
            loop: false,
            autoplay: true,
            animationData: FailAnimation,
          }}
        />
      ),
      autoClose: false,
      ...options,
    },
  )
}

export { successToast, errorToast }
