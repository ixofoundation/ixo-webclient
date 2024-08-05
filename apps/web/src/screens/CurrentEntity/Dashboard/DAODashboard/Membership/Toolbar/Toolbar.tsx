import { FlexBox, SvgBox } from 'components/App/App.styles'
import React, { ChangeEvent, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import PanelsIcon from '/public/assets/images/icon-panels.svg'
import ListIcon from '/public/assets/images/icon-list.svg'
import { ReactComponent as ProfileIcon } from '/public/assets/images/icon-profile.svg'
import { ReactComponent as SearchIcon } from '/public/assets/images/icon-search.svg'

const Button = styled(FlexBox)`
  border-radius: 8px;
  height: 40px;
  padding: 8px;
  color: white;
  text-align: center;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.003em;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;

  svg > path {
    fill: white;
  }
`

const StyledInput = styled.input`
  width: 330px;
  background: none;
  border: none;
  color: white;

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    opacity: 0.5;
    color: white;
  }
`

interface Props {
  status: 'approved' | 'pending' | 'rejected' | undefined
  view: 'panel' | 'list'
  keyword: string
  numOfMembers: number
  onStatusChange: (status: 'approved' | 'pending' | 'rejected' | undefined) => void
  onViewChange: (view: 'panel' | 'list') => void
  onKeywordChange: (keyword: string) => void
}

const Toolbar: React.FC<Props> = ({
  status,
  view,
  keyword,
  numOfMembers,
  onStatusChange,
  onViewChange,
  onKeywordChange,
}): JSX.Element => {
  const theme: any = useTheme()
  const STATUSES = {
    approved: {
      status: 'approved',
      text: 'Members',
      color: theme.ixoGreen,
    },
    pending: {
      status: 'pending',
      text: 'Awaiting approval',
      color: theme.ixoDarkOrange,
    },
    rejected: {
      status: 'rejected',
      text: 'Restricted',
      color: theme.ixoRed,
    },
    all: {
      status: undefined,
      text: 'All',
      color: theme.ixoNewBlue,
    },
  }
  const [chooseStatus, setChooseStatus] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  return (
    <FlexBox $gap={3}>
      {chooseStatus ? (
        <>
          <Button background={STATUSES[status ?? 'all'].color} onClick={() => setChooseStatus(false)}>
            {STATUSES[status ?? 'all'].text}
          </Button>
          {Object.values(STATUSES)
            .filter((item) => item.status !== status)
            .map((item) => (
              <Button
                key={item.status ?? 'all'}
                background={theme.ixoDarkBlue}
                onClick={() => {
                  setChooseStatus(false)
                  onStatusChange(item.status as 'approved' | 'pending' | 'rejected' | undefined)
                }}
              >
                {STATUSES[item.status ?? 'all'].text}
              </Button>
            ))}
        </>
      ) : (
        <>
          <Button
            background={STATUSES[status ?? 'all'].color}
            onClick={() => setChooseStatus(true)}
            style={{ pointerEvents: 'none' }} // TODO:
          >
            {STATUSES[status ?? 'all'].text}
          </Button>

          <Button
            width={'40px'}
            background={view === 'panel' ? theme.ixoNewBlue : theme.ixoDarkBlue}
            onClick={() => onViewChange('panel')}
          >
            <img src={PanelsIcon} alt='panel-view' />
          </Button>

          <Button
            width={'40px'}
            background={view === 'list' ? theme.ixoNewBlue : theme.ixoDarkBlue}
            onClick={() => onViewChange('list')}
          >
            <img src={ListIcon} alt='list-view' />
          </Button>

          <Button background={theme.ixoDarkBlue} $alignItems='center' $gap={1}>
            <SvgBox onClick={() => setIsSearching(!isSearching)}>
              <SearchIcon />
            </SvgBox>
            {(isSearching || keyword) && (
              <StyledInput
                placeholder='Enter member address here'
                value={keyword}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onKeywordChange(event.target.value)}
              />
            )}
          </Button>

          <Button $alignItems='center' background={theme.ixoDarkBlue} opacity={0.3} $gap={1}>
            {numOfMembers.toLocaleString()}
            <ProfileIcon />
          </Button>
        </>
      )}
    </FlexBox>
  )
}

export default Toolbar
