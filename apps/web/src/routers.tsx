import { Spinner } from 'components/Spinner/Spinner'

export const routes = [
    {
      path: "/",
      element: <></>,
      loader: <Spinner info={'Connecting to the Internet of Impacts...'} />,
      children: [
        {
          path: "team",
          element: <></>,
        },
      ],
    },
  ]