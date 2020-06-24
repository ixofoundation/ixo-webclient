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
import ProjectControlPanelSchema from '../../common/components/ControlPanel/schema/Project.schema.json'
import CellControlPanelSchema from '../../common/components/ControlPanel/schema/Cell.schema.json'
import InvestmentControlPanelSchema from '../../common/components/ControlPanel/schema/Investment.schema.json'
import OracleControlPanelSchema from '../../common/components/ControlPanel/schema/Oracle.schema.json'
import TemplateControlPanelSchema from '../../common/components/ControlPanel/schema/Template.schema.json'
import DataControlPanelSchema from '../../common/components/ControlPanel/schema/Data.schema.json'

export const strategyMap: StrategyMap = {
  [EntityType.Project]: {
    title: 'Project',
    plural: 'Projects',
    themeColor: '#2f80ed',
    headerSchema: ProjectHeaderSchema,
    filterSchema: ProjectFilterSchema,
    controlPanelSchema: ProjectControlPanelSchema,
  },
  [EntityType.Oracle]: {
    title: 'Oracle',
    plural: 'Oracles',
    themeColor: '#ad245c',
    headerSchema: OracleHeaderSchema,
    filterSchema: OracleFilterSchema,
    controlPanelSchema: OracleControlPanelSchema,
  },
  [EntityType.Investment]: {
    title: 'Investment',
    plural: 'Investments',
    themeColor: '#e4bc3d',
    headerSchema: InvestmentHeaderSchema,
    filterSchema: InvestmentFilterSchema,
    controlPanelSchema: InvestmentControlPanelSchema,
  },
  [EntityType.Cell]: {
    title: 'Cell',
    plural: 'Cells',
    themeColor: '#79af50',
    headerSchema: CellHeaderSchema,
    filterSchema: CellFilterSchema,
    controlPanelSchema: CellControlPanelSchema,
  },
  [EntityType.Template]: {
    title: 'Template',
    plural: 'Templates',
    themeColor: '#7c2740',
    headerSchema: TemplateHeaderSchema,
    filterSchema: TemplateFilterSchema,
    controlPanelSchema: TemplateControlPanelSchema,
  },
  [EntityType.Data]: {
    title: 'Data Asset',
    plural: 'Data Assets',
    themeColor: '#f89d28',
    headerSchema: DataHeaderSchema,
    filterSchema: DataFilterSchema,
    controlPanelSchema: DataControlPanelSchema,
  },
}
