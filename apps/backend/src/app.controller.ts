import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { queryMultipleContracts } from './common/mutliContractCall';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    const daoQueries = [
      {
        address:
          'ixo1fzm6gzyccl8jvdv3qq6hp9vs6ylaruervs4m06c7k0ntzn2f8faqsyeahl',
        data: { admin: {} },
      },
      {
        address:
          'ixo1fzm6gzyccl8jvdv3qq6hp9vs6ylaruervs4m06c7k0ntzn2f8faqsyeahl',
        data: { config: {} },
      },
      {
        address:
          'ixo1fzm6gzyccl8jvdv3qq6hp9vs6ylaruervs4m06c7k0ntzn2f8faqsyeahl',
        data: { proposal_modules: {} },
      },
      {
        address:
          'ixo1fzm6gzyccl8jvdv3qq6hp9vs6ylaruervs4m06c7k0ntzn2f8faqsyeahl',
        data: { voting_module: {} },
      },
    ];

    const [admin, config, proposalModules, votingModuleAddress] =
      await queryMultipleContracts(daoQueries);

    return { admin, config, proposalModules, votingModuleAddress };
  }
}
