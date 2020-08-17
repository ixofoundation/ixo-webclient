import { StepNameStrategyMap, Step } from './types';

export const stepNameMap: StepNameStrategyMap = {
  [Step.PageContent]: { name: 'Page' },
  // [Step.Attestation]: { name: 'Page' },
  // [Step.Evaluation]: { name: 'Evaluation' },
  [Step.Settings]: { name: 'Settings' },
  [Step.Advanced]: { name: 'Advanced' },
};
