import React from 'react';
import { EntityType } from '../../../Entities/types';
import { entityTypeMap } from '../../../Entities/strategy-map';
import { FormCardProps } from '../../../CreateEntity/types';
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm';

interface Props extends FormCardProps {
  filters: { [name: string]: string[] }
  entityType: EntityType
}

const convertArrayToObject = (array, key): {} => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const Filter: React.FunctionComponent<Props> = React.forwardRef(
  (
    { filters, entityType, handleUpdateContent, handleSubmitted, handleError },
    ref,
  ) => {
    const propertiesArray = entityTypeMap[entityType].filterSchema.ddoTags.map(
      category => ({
        type: 'array',
        title: category.name,
        items: {
          type: 'string',
          enum: category.tags.map(tag => tag.name),
        },
        uniqueItems: true,
      }),
    );

    const schema = {
      type: 'object',
      required: [],
      properties: convertArrayToObject(propertiesArray, 'title'),
    } as any;

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={filters}
        schema={schema}
        uiSchema={{}}
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
    );
  },
);

export default Filter;
