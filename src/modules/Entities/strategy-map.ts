import { EntityType, StrategyMap } from './types'
import ProjectFilterSchema from './components/EntitiesFilter/schema/ProjectFilter.schema.json'
import CellFilterSchema from './components/EntitiesFilter/schema/CellFilter.schema.json'
import DataFilterSchema from './components/EntitiesFilter/schema/DataFilter.schema.json'
import InvestmentFilterSchema from './components/EntitiesFilter/schema/InvestmentFilter.schema.json'
import OracleFilterSchema from './components/EntitiesFilter/schema/OracleFilter.schema.json'
import TemplateFilterSchema from './components/EntitiesFilter/schema/TemplateFilter.schema.json'
import ProjectHeaderSchema from './components/EntitiesHero/schema/ProjectHeader.schema.json'
import CellHeaderSchema from './components/EntitiesHero/schema/CellHeader.schema.json'
import InvestmentHeaderSchema from './components/EntitiesHero/schema/InvestmentHeader.schema.json'
import OracleHeaderSchema from './components/EntitiesHero/schema/OracleHeader.schema.json'
import TemplateHeaderSchema from './components/EntitiesHero/schema/TemplateHeader.schema.json'
import DataHeaderSchema from './components/EntitiesHero/schema/DataHeader.schema.json'

export const strategyMap: StrategyMap = {
  [EntityType.Project]: {
    title: 'Project',
    plural: 'Projects',
    themeColor: '#2f80ed',
    headerSchema: ProjectHeaderSchema,
    filterSchema: ProjectFilterSchema,
  },
  [EntityType.Oracle]: {
    title: 'Oracle',
    plural: 'Oracles',
    themeColor: '#ad245c',
    headerSchema: OracleHeaderSchema,
    filterSchema: OracleFilterSchema,
  },
  [EntityType.Investment]: {
    title: 'Investment',
    plural: 'Investments',
    themeColor: '#e4bc3d',
    headerSchema: InvestmentHeaderSchema,
    filterSchema: InvestmentFilterSchema,
  },
  [EntityType.Cell]: {
    title: 'Cell',
    plural: 'Cells',
    themeColor: '#79af50',
    headerSchema: CellHeaderSchema,
    filterSchema: CellFilterSchema,
  },
  [EntityType.Template]: {
    title: 'Template',
    plural: 'Templates',
    themeColor: '#7c2740',
    headerSchema: TemplateHeaderSchema,
    filterSchema: TemplateFilterSchema,
  },
  [EntityType.Data]: {
    title: 'Data Asset',
    plural: 'Data Assets',
    themeColor: '#f89d28',
    headerSchema: DataHeaderSchema,
    filterSchema: DataFilterSchema,
  },
}
