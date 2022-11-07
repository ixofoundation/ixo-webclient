import React from 'react'
import { FormCardProps } from '../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { convertArrayToObject } from 'common/utils/transformationUtils'
import { useSelector } from 'react-redux'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { ObjectFieldEntitySettingsFilterColumn } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  filters: { [name: string]: string[] }
  entityType: string
}

const Filter: React.FunctionComponent<Props> = React.forwardRef(
  (
    { filters, entityType, handleUpdateContent, handleSubmitted, handleError },
    ref,
  ) => {
    const entityTypeMap = useSelector(selectEntityConfig)
    // const impactCategoryEnums = [
    //   'Agriculture',
    //   'Air',
    //   'Biodiversity & Ecosystems',
    //   'Climate',
    //   'Diversity & Inclusion',
    //   'Education',
    //   'Employment',
    //   'Energy',
    //   'Financial Services',
    //   'Health',
    //   'Real Estate',
    //   'Land',
    //   'Oceans & Coastal Zones',
    //   'Pollution',
    //   'Waste',
    //   'Water',
    //   'Cross Category',
    //   'Infrastructure',
    // ]
    // const targetAudienceEnums = [
    //   'Recipient',
    //   'Youth',
    //   'Low-income',
    //   'Caregivers',
    //   'Child',
    //   'Parent',
    //   'Bereaved person',
    //   'Individiuals in post-separation or post-divorce families',
    //   'Member',
    //   'Patient',
    //   'Rehab',
    //   'People with disability',
    //   'Worker',
    //   'Resident',
    //   'Eider',
    //   'Adult children',
    //   'Adult',
    //   'Offenders',
    //   'Woman',
    //   'Ethnic minorities',
    //   'Officer',
    //   'Community residents',
    //   'Teacher',
    //   'General',
    // ]
    // const impactThemeEnums = [
    //   'Poverty Social Disadvantage and Social Protection',
    //   'Family and Child Welfare Services',
    //   'Medical Social Services',
    //   'Services for People with Disabilities',
    //   'Services for Elders',
    //   'Services for Young People',
    //   'Services for Offenders & Drug Abusers',
    //   'Community Development',
    // ]
    // const metricLevelEnums = [
    //   'individual',
    //   'interpersonal',
    //   'community',
    //   'international',
    //   'organization',
    // ]
    // const librarySourceEnums = ['111', '222']

    const propertiesArray: any[] = entityTypeMap[
      entityType
    ].filterSchema.ddoTags.map((category) => ({
      type: 'array',
      title: category.name,
      key: category.name,
      items: {
        type: 'string',
        enum: category.tags.map((tag) => tag.name),
      },
      uniqueItems: true,
      maxItems: category.multiSelect ? undefined : 1,
    }))

    // Add sector filter
    propertiesArray.push({
      type: 'array',
      title: entityTypeMap[entityType].filterSchema.sector.name,
      key: entityTypeMap[entityType].filterSchema.sector.name,
      items: {
        type: 'string',
        enum: entityTypeMap[entityType].filterSchema.sector.tags.map(
          (tag) => tag.name,
        ),
      },
      uniqueItems: true,
      maxItems: 1,
    })

    // Add additional filters
    // propertiesArray.push({
    //   type: 'array',
    //   title: 'Impact Category',
    //   key: 'impactCategory',
    //   items: {
    //     type: 'string',
    //     enum: impactCategoryEnums,
    //   },
    // })
    // propertiesArray.push({
    //   type: 'array',
    //   title: 'Target Audience',
    //   key: 'targetAudience',
    //   items: {
    //     type: 'string',
    //     enum: targetAudienceEnums,
    //   },
    // })
    // propertiesArray.push({
    //   type: 'array',
    //   title: 'Impact Theme',
    //   key: 'impactTheme',
    //   items: {
    //     type: 'string',
    //     enum: impactThemeEnums,
    //   },
    // })
    // propertiesArray.push({
    //   type: 'array',
    //   title: 'Metric Level',
    //   key: 'metricLevel',
    //   items: {
    //     type: 'string',
    //     enum: metricLevelEnums,
    //   },
    // })
    // propertiesArray.push({
    //   type: 'array',
    //   title: 'Library / Source',
    //   key: 'librarySource',
    //   items: {
    //     type: 'string',
    //     enum: librarySourceEnums,
    //   },
    // })

    const schema = {
      type: 'object',
      required: [],
      properties: convertArrayToObject(propertiesArray, 'key'),
    } as any

    const uiSchema = {}

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={filters}
        schema={schema}
        uiSchema={uiSchema}
        customObjectFieldTemplate={ObjectFieldEntitySettingsFilterColumn}
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default Filter
