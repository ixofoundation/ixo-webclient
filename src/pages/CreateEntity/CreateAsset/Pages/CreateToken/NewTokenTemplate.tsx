import cx from 'classnames'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'

const Wrapper = styled.div`
  background: ${(props): string => props.theme.ixoWhite};
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;
  min-width: 290px;
  min-height: 420px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
`

const SubmitButton = styled.div<{ disabled?: boolean }>`
  background: ${(props): string => (props.disabled ? props.theme.ixoLightGrey2 : props.theme.ixoNewBlue)};
  border-radius: 12px;
  width: 74px;
  height: 74px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props): string => props.theme.ixoWhite};
  font-size: 70px;
`

interface Props {
  maxSupply: number | undefined
  handleSubmit: (numberOfTokens: number) => void
}

const NewTokenTemplate: React.FC<Props> = ({ maxSupply, handleSubmit }): JSX.Element => {
  const [numberOfTokens, setNumberOfTokens] = useState<number | undefined>(undefined)
  const handleClick = (): void => {
    if (numberOfTokens && (numberOfTokens <= maxSupply! || !maxSupply)) {
      handleSubmit(numberOfTokens)
      setNumberOfTokens(undefined)
    }
  }
  return (
    <Wrapper>
      <SubmitButton disabled={!numberOfTokens} onClick={handleClick}>
        +
      </SubmitButton>
      <Typography variant='secondary' size='xl'>
        Add more Assets
      </Typography>
      <Input
        width='80%'
        className='text-center'
        placeholder='Enter an Amount'
        inputValue={numberOfTokens}
        handleChange={setNumberOfTokens}
      />
      <Typography className={cx({ 'd-none': !maxSupply })} variant='secondary' color='grey700'>
        max {parseFloat(String(maxSupply)).toLocaleString()}
      </Typography>
    </Wrapper>
  )
}

export default NewTokenTemplate
