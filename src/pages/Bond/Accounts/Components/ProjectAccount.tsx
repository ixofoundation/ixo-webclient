import React, { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { displayTokenAmount } from 'utils/currency'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getMarketChart } from 'redux/account/account.actions'
import moment from 'moment'
import QRCode from 'qrcode'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  Container,
  InfoWrapperContainer,
  StyledLabel,
  InfoWrapperProps,
  AddressWrapper,
  Address,
  QrCodeView,
} from './ProjectAccount.styles'

import QRCodeImg from 'assets/images/icon-qrcode.svg'
import CloseImg from 'assets/images/icon-close.svg'
import QRCodeCopyImg from 'assets/images/modal/qrcode-copy.svg'
import Tooltip from 'components/Tooltip/Tooltip'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

export interface ProjectAccountProps {
  children?: React.ReactNode
  count: number
  selected?: boolean
  onSelect: () => void
  balance: Coin
  locked?: boolean
  subLabel?: string
  address?: string
}

const options: any = {
  chart: {
    type: 'line',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#107591'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    width: 2,
  },
  grid: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
}

const InfoWrapper = ({
  // currency,
  amount,
  subLabel,
  size,
}: InfoWrapperProps): JSX.Element => (
  <InfoWrapperContainer size={size}>
    <div className='main'>{`${displayTokenAmount(amount)}`} </div>
    <div className='sub'>{subLabel}</div>
  </InfoWrapperContainer>
)

export default function ProjectAccount({
  count,
  selected,
  onSelect,
  balance: { denom = 'xEUR', amount = '230.75' },
  subLabel = 'USD 1',
  locked = false,
  address = '',
}: ProjectAccountProps): JSX.Element {
  const bigColWidth = count > 2 ? 12 : 6
  const smallColWidth = count > 2 ? 6 : 3

  const dispatch = useAppDispatch()
  const { marketChart } = useAppSelector((state) => state.account)

  const [qrCodeView, setQRCodeView] = useState(false)
  const [copiedClick, setCopiedClick] = useState(false)

  const [series, setSeries] = useState([
    {
      name: 'Price',
      data: [
        {
          x: 'A',
          y: 0,
        },
        {
          x: 'B',
          y: 0,
        },
      ],
    },
  ])

  const isIxoToken = useMemo(() => denom.toLowerCase() === 'ixo', [denom])

  useEffect(() => {
    dispatch(getMarketChart() as any)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (marketChart && marketChart.prices) {
      if (isIxoToken) {
        //  get market chart data when only ixo
        setSeries([
          {
            name: 'Price',
            data: marketChart.prices.map((price) => ({
              x: moment(new Date(price.date)).format('YYYY-MM-DDTHH:mm:ss').toString(),
              y: price.price,
            })),
          },
        ])
      }
    }
    // eslint-disable-next-line
  }, [marketChart])

  useEffect(() => {
    if (qrCodeView) {
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, address, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
    }
  }, [qrCodeView, address])

  function handleCopyClick(): void {
    setCopiedClick(true)
    setTimeout(() => {
      setCopiedClick(false)
    }, 3000)
  }

  return (
    <Container className='container px-1' selected={selected} onClick={(): void => onSelect()}>
      {!qrCodeView ? (
        <>
          <div className='row m-0'>
            <div className={`col-12 align-items-center justify-content-between d-flex mb-2`}>
              <StyledLabel className='px-2'>{denom.toUpperCase()}</StyledLabel>
              <AddressWrapper>
                {address && <Address>{address.substring(0, 11)}...</Address>}
                <div onClick={(): void => setQRCodeView(true)}>
                  <img src={QRCodeImg} alt='qr' width='20px' className='ml-2' />
                </div>
              </AddressWrapper>
            </div>
          </div>
          <div className='row m-0'>
            <div className={`col-${bigColWidth}`}>
              <InfoWrapper currency={denom} amount={amount} subLabel={isIxoToken ? subLabel : ''} size={2} />
            </div>
            {locked && (
              <div className={`col-${smallColWidth} mt-2`}>
                <InfoWrapper currency={denom} amount={amount} subLabel={subLabel} size={1} />
              </div>
            )}
            <div className='col-12 mb-2'>
              <ReactApexChart options={options} series={series} type='line' height='100px' />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='row m-0'>
            <div className={`col-12 d-flex flex-row-reverse`}>
              <div onClick={(): void => setQRCodeView(false)}>
                <img src={CloseImg} alt='X' width='30px' />
              </div>
            </div>
          </div>
          <div className='row m-0'>
            <div className='col-12 text-center'>
              <QrCodeView id='canvas' />
            </div>
            <Address className='col-12 text-center'>{address}</Address>
            <CopyToClipboard text={address}>
              <div className='col-12 d-flex flex-row-reverse' onClick={handleCopyClick}>
                <Tooltip text={'Copied!'} afterClick clicked={copiedClick}>
                  <img src={QRCodeCopyImg} alt='copy' />
                </Tooltip>
              </div>
            </CopyToClipboard>
          </div>
        </>
      )}
    </Container>
  )
}
