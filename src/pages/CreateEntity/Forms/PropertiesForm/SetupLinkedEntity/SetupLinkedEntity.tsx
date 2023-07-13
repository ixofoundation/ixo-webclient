import { Box, FlexBox } from 'components/App/App.styles'
import { AddLinkedEntityModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { Props as PropertyBoxProps } from 'pages/CreateEntity/Components/PropertyBox'
import React, { useEffect, useState } from 'react'
import { EntityLinkedEntityConfig, DAOGroupConfig, TDAOGroupModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { toTitleCase } from 'utils/formatters'
import { BlockSyncService } from 'services/blocksync'
import { LinkedEntity, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { NodeType } from 'types/entities'

const bsService = new BlockSyncService()

const LinkedEntityPropertyBox = (props: PropertyBoxProps & { id: string }) => {
  const [entityName, setEntityName] = useState('')

  useEffect(() => {
    if (props.id) {
      bsService.entity
        .getEntityById(props.id)
        .then((response: any) => {
          const { service, settings } = response
          let url = ''
          const [identifier, key] = settings.Profile.serviceEndpoint.split(':')
          const usedService: Service | undefined = service.find((item: any) => item.id === `{id}#${identifier}`)

          if (usedService && usedService.type === NodeType.Ipfs) {
            url = `https://${key}.ipfs.w3s.link`
          } else if (usedService && usedService.type === NodeType.CellNode) {
            url = `${usedService.serviceEndpoint}${key}`
          }

          if (url) {
            fetch(url)
              .then((response) => response.json())
              .then((profile) => {
                console.log({ profile })
                setEntityName(profile.name)
              })
          }
        })
        .catch(console.error)
    }
  }, [props.id])

  return (
    <FlexBox direction='column' alignItems='center' gap={4}>
      <PropertyBox icon={props.icon} label={props.label} set={true} handleRemove={props.handleRemove} />
      <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
        &nbsp;{entityName}&nbsp;
      </Typography>
    </FlexBox>
  )
}

interface Props {
  hidden: boolean
  linkedEntity: { [key: string]: LinkedEntity }
  daoGroups: { [id: string]: TDAOGroupModel }
  updateLinkedEntity: (linkedEntity: { [id: string]: LinkedEntity }) => void
}

const SetupLinkedEntity: React.FC<Props> = ({ hidden, linkedEntity, daoGroups, updateLinkedEntity }): JSX.Element => {
  const [openAddLinkedEntityModal, setOpenAddLinkedEntityModal] = useState(false)

  // entity linked entities
  const handleAddLinkedEntity = (newData: LinkedEntity): void => {
    updateLinkedEntity({ ...linkedEntity, [newData.id]: newData })
  }
  const handleRemoveLinkedEntity = (id: string): void => {
    updateLinkedEntity(omitKey({ ...linkedEntity }, id))
  }

  return (
    <>
      <FlexBox direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(linkedEntity).map(([key, value]) => {
            const { type } = value

            if (type === 'Group') {
              /**
               * @description case of dao group (smartContract)
               */
              const label = Object.values(daoGroups).find(({ coreAddress }) => coreAddress === key)?.type || ''
              const name = Object.values(daoGroups).find(({ coreAddress }) => coreAddress === key)?.config.name || ''
              const Icon = DAOGroupConfig[label]?.icon
              return (
                <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                  <PropertyBox icon={Icon && <Icon />} label={toTitleCase(label)} set={true} />
                  <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                    &nbsp;{name}&nbsp;
                  </Typography>
                </FlexBox>
              )
            } else {
              const Icon = EntityLinkedEntityConfig[type]?.icon
              const label = EntityLinkedEntityConfig[type]?.text || type

              return (
                <LinkedEntityPropertyBox
                  key={key}
                  id={key}
                  icon={Icon && <Icon />}
                  label={label}
                  handleRemove={() => handleRemoveLinkedEntity(key)}
                />
              )
            }
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddLinkedEntityModal(true)} />
        </Box>
      </FlexBox>
      <AddLinkedEntityModal
        open={openAddLinkedEntityModal}
        onClose={(): void => setOpenAddLinkedEntityModal(false)}
        onAdd={handleAddLinkedEntity}
      />
      {/* <LiquiditySetupModal
        liquidity={entityLinkedEntity?.liquidity?.data}
        open={entityLinkedEntity?.liquidity?.openModal}
        onClose={(): void => handleOpenEntityLinkedEntityModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void =>
          handleUpdateLinkedEntity('liquidity', liquidity)
        }
      /> */}
    </>
  )
}

export default SetupLinkedEntity
