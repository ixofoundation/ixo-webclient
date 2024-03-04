export const config = {
  UI: {
    explorer: {
      defaultView: 'project',
    },
    topMenu: [
      {
        item: 'create',
        visible: true,
      },
    ],
    head: {
      title: 'Test Zone',
    },
    footer: {
      mailTo: {
        text: 'Email',
        email: 'info@ixo.world',
      },
      address: 'ixo.world Herrengasse 30, 9490 Vaduz, Liechtenstein',
      privacyPolicy: {
        text: 'Privacy policy',
        href: 'https://www.ixo.world/privacy-policy',
      },
      socials: {
        twitter: {
          title: 'Twitter',
          href: 'https://twitter.com/ixoworld?lang=en',
          iconClassName: 'icon-twitter',
        },
        github: {
          title: 'Github',
          href: 'https://github.com/ixofoundation',
          iconClassName: 'icon-github',
        },
        medium: {
          title: 'Medium',
          href: 'https://medium.com/ixo-blog',
          iconClassName: 'icon-medium',
        },
        telegram: {
          title: 'Telegram',
          href: 'https://t.me/joinchat/Ejz5exAfFUzcBMRlaYLecQ',
          iconClassName: 'icon-telegram',
        },
      },
    },
  },
  route: {
    splashIsRootRoute: true,
  },
  project: {
    title: 'Project',
    plural: 'Projects',
    themeColor: '#49BFE0',
    headerSchema: {
      '@context': 'https://schema.ixo.foundation/project',
      '@type': 'Header',
      color: 'transparent',
      image:
        'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
      title: 'Test Zone',
      subTitle: 'Projects Explorer',
      indicators: [
        {
          '@type': 'Indicator',
          indicatorLabel: 'My DAOs',
          indicatorSource: '0',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Nodes',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Projects',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Agents',
          indicatorSource: '234',
        },
      ],
      overrides: [
        {
          '@context': 'https://schema.ixo.foundation/cell',
          id: 'https://schema.ixo.foundation/cell/impactRelayer',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'Test Launchpad',
          color: '#FFF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
          title: 'Test Launchpad',
          subTitle: 'Internet of Impact',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'UBS Zone',
          color: '#fff',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ubs_zone.png',
          title: 'Alphabonds',
          subTitle: 'Projects Explorer',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'IDCC',
          color: '#FF00A8',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/idcc_hero.png',
          title: 'IDCC',
          subTitle: 'Hong Kong',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'EdHeroes',
          color: '#FF00FF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/edheroes.png',
          title: 'Global Future Talent',
          subTitle: 'Innovation Hub',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
      ],
    },
    filterSchema: {
      '@context': 'https://schema.ixo.foundation/project',
      '@type': 'project',
      dateCreated: {
        '@type': 'Date',
        name: 'Dates',
      },
      view: {
        '@type': 'Category',
        hidden: false,
        name: 'View',
        multiSelect: false,
        selectedTags: ['Global'],
        tags: [
          {
            '@type': 'Tag',
            name: 'My Portfolio',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'Tag',
            name: 'Global',
            icon: 'global.svg',
          },
          {
            '@type': 'Tag',
            name: 'Featured',
            icon: 'featured.svg',
          },
          {
            '@type': 'Tag',
            name: 'Popular',
            icon: 'popular.svg',
          },
        ],
      },
      ddoTags: [
        {
          '@type': 'Category',
          hidden: false,
          name: 'Project Type',
          multiSelect: true,
          selectedTags: [],
          tags: [
            {
              '@type': 'Tag',
              name: 'Index',
              icon: 'index.svg',
            },
            {
              '@type': 'Tag',
              name: 'Candidate',
              icon: 'voting.svg',
            },
            {
              '@type': 'Tag',
              name: 'Accreditation',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Accountability',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Behaviour Change',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Biodiversity',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Circular Economy',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Civic Action',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Climate Mitigation',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Climate Adaptation',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Clinical Trial',
              icon: 'tag.svg',
            },
            {
              '@type': 'CommunityCurrencyProject',
              name: 'Community Currency',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Community Development',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Commons',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Conservation',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Covid-19',
              icon: 'covid.svg',
            },
            {
              '@type': 'Tag',
              name: 'Decarbonisation',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Disaster Response',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Ecological Regeneration',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Education & Awareness',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Enterprise Development',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Environmental Protection',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Epidemic Response',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'ESG',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Governance',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Green Bond',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Identity',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Impact Investment',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Insurance Bond',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Intelligence-gathering',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Microfinance',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Immune Cell',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Needs Assessment',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Opinion Survey',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Oracle Development',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Pollution Control',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Recycling',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Reforestation',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Refugee Support',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Renewable Energy',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Research & Development',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Skills Development',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Social Finance',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Social Innovation',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Sustainable Capital',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Sustainable Consumption',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Sustainable Infrastructure',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Sustainable Supply Chain',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Universal Basic Income',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Waste Reduction',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Water & Marine',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Relayer',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Oracle',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Airdrop Mission',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'SDG',
          multiSelect: true,
          tags: [
            {
              '@type': 'Tag',
              name: 'SDG1 – No Poverty',
              icon: 'sdg1.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG2 – Zero Hunger',
              icon: 'sdg2.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG3 – Good Health and Well-being',
              icon: 'sdg3.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG4 – Quality Education',
              icon: 'sdg4.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG5 – Gender Equality',
              icon: 'sdg5.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG6 – Clean Water and Sanitation',
              icon: 'sdg6.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG7 – Affordable and Clean Energy',
              icon: 'sdg7.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG8 – Decent Work and Economic Growth',
              icon: 'sdg8.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG9 – Industry, Innovation and Infrastructure',
              icon: 'sdg9.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG10 – Reduced Inequalities',
              icon: 'sdg10.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG11 – Sustainable Cities and Coummunities',
              icon: 'sdg11.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG12 – Responsible Consumption and Production',
              icon: 'sdg12.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG13 – Climate Action',
              icon: 'sdg13.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG14 – Life Below Water',
              icon: 'sdg14.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG15 – Life on Land',
              icon: 'sdg15.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG16 – Peace, Justice and Strong Institutions',
              icon: 'sdg16.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG17 – Partnerships for Goals',
              icon: 'sdg17.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: true,
          name: 'Stage',
          multiSelect: true,
          tags: [
            {
              '@type': 'Tag',
              name: 'Proposal',
              icon: 'proposal.svg',
            },
            {
              '@type': 'Tag',
              name: 'Planning',
              icon: 'planning.svg',
            },
            {
              '@type': 'Tag',
              name: 'Delivery',
              icon: 'delivery.svg',
            },
            {
              '@type': 'Tag',
              name: 'Paused',
              icon: 'paused.svg',
            },
            {
              '@type': 'Tag',
              name: 'Closing',
              icon: 'closing.svg',
            },
            {
              '@type': 'Tag',
              name: 'Ended',
              icon: 'ended.svg',
            },
            {
              '@type': 'Tag',
              name: 'Archived',
              icon: 'archived.svg',
            },
            {
              '@type': 'Tag',
              name: 'Selection',
              icon: 'archived.svg',
            },
          ],
        },
      ],
      sector: {
        '@type': 'Category',
        name: 'Sector',
        hidden: true,
        multiSelect: false,
        tags: [
          {
            '@type': 'sector',
            name: 'Test Launchpad',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'IDCC',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'UBS Zone',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'Campaign',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'EdHeroes',
            icon: 'portfolio.svg',
          },
        ],
      },
    },
    controlPanelSchema: {
      '@context': 'https://schema.ixo.foundation/controls',
      '@type': 'Widget',
      dashboard: {
        '@type': 'Performance',
        title: 'Performance',
        controls: [
          {
            '@type': 'Shield',
            '@id': 'statusShield',
            title: 'Status',
            tooltip: null,
            icon: null,
            iconColor: 'F89D28',
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'field',
                value: 'status',
              },
            ],
          },
        ],
      },
      actions: {
        '@type': 'Actions',
        title: 'Actions',
        controls: [
          {
            '@type': 'Join',
            '@id': 'actionAgentJoin',
            title: 'Apply',
            tooltip: 'Help to deliver this project',
            icon: 'AddPerson',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'join',
              },
            ],
          },
          {
            '@type': 'Fuel',
            '@id': 'actionFuelThisProject',
            title: 'Add Credit',
            tooltip: 'Send IXO Credits from my Account',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'fuel_my_entity',
              },
            ],
          },
          {
            '@type': 'Status',
            '@id': 'actionUpdateThisProject',
            title: 'Update Status',
            tooltip: 'Change the Status of this Entity',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/update_status',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'update_status',
              },
            ],
          },
          {
            '@type': 'Vote',
            '@id': 'actionVote',
            title: 'Vote',
            tooltip: 'Stake or Unstake',
            icon: 'Vote',
            iconColor: '#49BFE0',
            endpoint: '/vote',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'relayer_vote',
              },
            ],
          },
          {
            '@type': 'Buy',
            '@id': 'actionBuy',
            title: 'Buy',
            tooltip: 'Buy Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'buy',
              },
            ],
          },
          {
            '@type': 'Sell',
            '@id': 'actionSell',
            title: 'Sell',
            tooltip: 'Sell Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'sell',
              },
            ],
          },
          {
            '@type': 'Withdraw',
            '@id': 'actionWithdraw',
            title: 'Withdraw',
            tooltip: 'Withdraw Project Funds',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'withdraw',
              },
            ],
          },
          {
            '@type': 'ModifyWithdrawAddress',
            '@id': 'actionModifyWithdrawAddress',
            title: 'Withdraw To',
            tooltip: 'Modify Withdrawal Address',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'modifywithdrawaddress',
              },
            ],
          },
          {
            '@type': 'Proposal',
            '@id': 'actionSubmitProposal',
            title: 'New Proposal',
            tooltip: 'Submit Proposal',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'proposal',
              },
            ],
          },
          {
            '@type': 'Deposit',
            '@id': 'actionDeposit',
            title: 'Fund a Proposal Deposit',
            tooltip: 'Deposit',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'deposit',
              },
            ],
          },
          {
            '@type': 'Send',
            '@id': 'actionSend',
            title: 'Send',
            tooltip: 'Fund Account',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'send',
              },
            ],
          },
          {
            '@type': 'EditValidator',
            '@id': 'actionEditValidator',
            title: 'Edit Validator',
            tooltip: 'Edit Validator',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'edit',
              },
            ],
          },
          {
            '@type': 'MultiSend',
            '@id': 'actionMultiSend',
            title: 'Multi-Send',
            tooltip: 'Send Tokens To Multiple Address',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'multi_send',
              },
            ],
          },
          {
            '@type': 'StakeToVote',
            '@id': 'stakedToVote',
            title: 'Vote',
            tooltip: 'Stake to Vote',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'stake_to_vote',
              },
            ],
          },
          {
            '@type': 'CreatePaymentTemplate',
            '@id': 'createPaymentTemplate',
            title: 'Create Payment Template',
            tooltip: 'Create Payment Template',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_template',
              },
            ],
          },
          {
            '@type': 'CreatePaymentContract',
            '@id': 'createPaymentContract',
            title: 'Create Payment Contract',
            tooltip: 'Create Payment Contract',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_contract',
              },
            ],
          },
          {
            '@type': 'MakePayment',
            '@id': 'makePayment',
            title: 'Make Payment',
            tooltip: 'Make Payment',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'make_payment',
              },
            ],
          },
        ],
      },
      apps: {
        '@type': 'Apps',
        title: 'Plugins',
        controls: [
          {
            '@type': 'RiotChat',
            '@id': 'appRiotchat',
            title: 'Riot Chat',
            tooltip: 'Encrypted chat-room',
            icon: 'RiotChat',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'Gitcoin',
            '@id': 'appGitcoin',
            title: 'Gitcoin',
            tooltip: 'Coming soon',
            icon: 'GitCoin',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'DaoStack',
            '@id': 'appDaoStack',
            title: 'DAOStack',
            tooltip: 'Coming soon',
            icon: 'DaoStack',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
      connections: {
        '@type': 'Connections',
        title: 'Connections',
        controls: [
          {
            '@type': 'External',
            '@id': 'twitter',
            title: 'Twitter',
            tooltip: 'Share on Twitter',
            icon: 'assets/images/icon-twitter.svg',
            iconColor: '#000000',
            endpoint: 'https://twitter.com/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'discord',
            title: 'Discord',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-discord.svg',
            iconColor: '#000000',
            endpoint: 'https://discord.gg/ixo',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'telegram',
            title: 'Telegram',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-telegram.svg',
            iconColor: '#000000',
            endpoint: 'https://t.me/ixonetwork',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'slack',
            title: 'Slack',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-slack.svg',
            iconColor: '#000000',
            endpoint: 'https://ixofoundation.slack.com/signup#/domain-signup',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'linkedin',
            title: 'Linkedin',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-linkedin.svg',
            iconColor: '#000000',
            endpoint: 'https://www.linkedin.com/company/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
    },
    createNewTitle: 'Create a Project',
    urlPart: 'project',
  },
  oracle: {
    title: 'Oracle',
    plural: 'Oracles',
    themeColor: '#AD245C',
    headerSchema: {
      '@context': 'https://schema.ixo.foundation/oracle',
      '@type': 'Header',
      color: 'transparent',
      image:
        'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
      title: 'Test Zone',
      subTitle: 'Oracles Explorer',
      indicators: [
        {
          '@type': 'Indicator',
          indicatorLabel: 'My Cells',
          indicatorSource: '0',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Nodes',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Projects',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Agents',
          indicatorSource: '234',
        },
      ],
      overrides: [
        {
          '@context': 'https://schema.ixo.foundation/cell',
          id: 'https://schema.ixo.foundation/cell/impactRelayer',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'Test Launchpad',
          color: '#FFF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
          title: 'Test Launchpad',
          subTitle: 'Internet of Impact',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'UBS Zone',
          color: '#fff',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ubs_zone.png',
          title: 'Alphabonds',
          subTitle: 'Oracles Explorer',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'IDCC',
          color: '#FF00A8',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/idcc_hero.png',
          title: 'IDCC',
          subTitle: 'Hong Kong',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'EdHeroes',
          color: '#FF00FF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/edheroes.png',
          title: 'Global Future Talent',
          subTitle: 'Innovation Hub',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
      ],
    },
    filterSchema: {
      '@context': 'https://schema.ixo.foundation/oracles',
      '@type': 'oracles',
      dateCreated: {
        '@type': 'Date',
        name: 'Dates',
      },
      view: {
        '@type': 'Category',
        hidden: false,
        name: 'View',
        multiSelect: false,
        tags: [
          {
            '@type': 'Tag',
            name: 'My Portfolio',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'Tag',
            name: 'Global',
            icon: 'global.svg',
          },
          {
            '@type': 'Tag',
            name: 'Featured',
            icon: 'featured.svg',
          },
          {
            '@type': 'Tag',
            name: 'Popular',
            icon: 'popular.svg',
          },
        ],
      },
      ddoTags: [
        {
          '@type': 'category',
          hidden: false,
          name: 'Function',
          multiSelect: true,
          tags: [
            {
              '@type': 'proofing',
              name: 'Proofing',
              icon: 'tag.svg',
            },
            {
              '@type': 'prediction',
              name: 'Prediction',
              icon: 'tag.svg',
            },
            {
              '@type': 'personalisation',
              name: 'Personalisation',
              icon: 'tag.svg',
            },
            {
              '@type': 'prescription',
              name: 'Prescription',
              icon: 'tag.svg',
            },
            {
              '@type': 'protection',
              name: 'Protection',
              icon: 'tag.svg',
            },
            {
              '@type': 'planning',
              name: 'Planning',
              icon: 'planning.svg',
            },
            {
              '@type': 'prevention',
              name: 'Prevention',
              icon: 'tag.svg',
            },
            {
              '@type': 'participation',
              name: 'Participation',
              icon: 'tag.svg',
            },
            {
              '@type': 'profiling',
              name: 'Profiling',
              icon: 'tag.svg',
            },
          ],
        },
      ],
      sector: {
        '@type': 'Category',
        name: 'Sector',
        hidden: true,
        multiSelect: false,
        tags: [
          {
            '@type': 'sector',
            name: 'Test Launchpad',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'IDCC',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'UBS Zone',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'Campaign',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'EdHeroes',
            icon: 'portfolio.svg',
          },
        ],
      },
    },
    controlPanelSchema: {
      '@context': 'https://schema.ixo.foundation/controls',
      '@type': 'Widget',
      dashboard: {
        '@type': 'Performance',
        title: 'Performance',
        controls: [
          {
            '@type': 'Shield',
            '@id': 'statusShield',
            title: 'Status',
            tooltip: null,
            icon: null,
            iconColor: 'F89D28',
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'field',
                value: 'status',
              },
            ],
          },
        ],
      },
      actions: {
        '@type': 'Actions',
        title: 'Actions',
        controls: [
          {
            '@type': 'Join',
            '@id': 'actionAgentJoin',
            title: 'Offer Oracle Services',
            tooltip: 'Help to deliver this project',
            icon: 'AddPerson',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'join',
              },
            ],
          },
          {
            '@type': 'Fuel',
            '@id': 'actionFuelThisProject',
            title: 'Add Credit',
            tooltip: 'Send IXO Credits from my Account',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'fuel_my_entity',
              },
            ],
          },
          {
            '@type': 'Status',
            '@id': 'actionUpdateThisProject',
            title: 'Update Status',
            tooltip: 'Change the Status of this Entity',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/update_status',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'update_status',
              },
            ],
          },
          {
            '@type': 'Buy',
            '@id': 'actionBuy',
            title: 'Buy',
            tooltip: 'Buy Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'buy',
              },
            ],
          },
          {
            '@type': 'Sell',
            '@id': 'actionSell',
            title: 'Sell',
            tooltip: 'Sell Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'sell',
              },
            ],
          },
          {
            '@type': 'Withdraw',
            '@id': 'actionWithdraw',
            title: 'Withdraw',
            tooltip: 'Withdraw Deposited Funds',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'withdraw',
              },
            ],
          },
          {
            '@type': 'Proposal',
            '@id': 'actionSubmitProposal',
            title: 'New Proposal',
            tooltip: 'Submit Proposal',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'proposal',
              },
            ],
          },
          {
            '@type': 'Deposit',
            '@id': 'actionDeposit',
            title: 'Deposit',
            tooltip: 'Fund a Proposal Deposit',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'deposit',
              },
            ],
          },
          {
            '@type': 'Send',
            '@id': 'actionSend',
            title: 'Send',
            tooltip: 'Fund Account',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'send',
              },
            ],
          },
          {
            '@type': 'EditValidator',
            '@id': 'actionEditValidator',
            title: 'Edit Validator',
            tooltip: 'Edit Validator',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'edit',
              },
            ],
          },
          {
            '@type': 'CreatePaymentTemplate',
            '@id': 'createPaymentTemplate',
            title: 'Create Payment Template',
            tooltip: 'Create Payment Template',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_template',
              },
            ],
          },
          {
            '@type': 'CreatePaymentContract',
            '@id': 'createPaymentContract',
            title: 'Create Payment Contract',
            tooltip: 'Create Payment Contract',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_contract',
              },
            ],
          },
          {
            '@type': 'MakePayment',
            '@id': 'makePayment',
            title: 'Make Payment',
            tooltip: 'Make Payment',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'make_payment',
              },
            ],
          },
        ],
      },
      apps: {
        '@type': 'Apps',
        title: 'Plugins',
        controls: [
          {
            '@type': 'RiotChat',
            '@id': 'appRiotchat',
            title: 'Riot Chat',
            tooltip: 'Encrypted chat-room',
            icon: 'RiotChat',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'Gitcoin',
            '@id': 'appGitcoin',
            title: 'Gitcoin',
            tooltip: 'Coming soon',
            icon: 'GitCoin',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'DaoStack',
            '@id': 'appDaoStack',
            title: 'DAOStack',
            tooltip: 'Coming soon',
            icon: 'DaoStack',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
      connections: {
        '@type': 'Connections',
        title: 'Connections',
        controls: [
          {
            '@type': 'External',
            '@id': 'twitter',
            title: 'Twitter',
            tooltip: 'Share on Twitter',
            icon: 'assets/images/icon-twitter.svg',
            iconColor: '#000000',
            endpoint: 'https://twitter.com/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'discord',
            title: 'Discord',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-discord.svg',
            iconColor: '#000000',
            endpoint: 'https://discord.gg/ixo',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'telegram',
            title: 'Telegram',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-telegram.svg',
            iconColor: '#000000',
            endpoint: 'https://t.me/ixonetwork',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'slack',
            title: 'Slack',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-slack.svg',
            iconColor: '#000000',
            endpoint: 'https://ixofoundation.slack.com/signup#/domain-signup',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'linkedin',
            title: 'Linkedin',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-linkedin.svg',
            iconColor: '#000000',
            endpoint: 'https://www.linkedin.com/company/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
    },
    createNewTitle: 'Create an Oracle',
    urlPart: 'oracle',
  },
  investment: {
    title: 'Investment',
    plural: 'Investments',
    themeColor: '#E4BC3D',
    headerSchema: {
      '@context': 'https://schema.ixo.foundation/investment',
      '@type': 'Header',
      color: 'transparent',
      image:
        'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
      title: 'Test Zone',
      subTitle: 'Investments Explorer',
      indicators: [
        {
          '@type': 'Indicator',
          indicatorLabel: 'My Cells',
          indicatorSource: '0',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Nodes',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Projects',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Agents',
          indicatorSource: '234',
        },
      ],
      overrides: [
        {
          '@context': 'https://schema.ixo.foundation/cell',
          id: 'https://schema.ixo.foundation/cell/impactRelayer',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'Test Launchpad',
          color: '#FFF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
          title: 'Test Launchpad',
          subTitle: 'Internet of Impact',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'UBS Zone',
          color: '#fff',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ubs_zone.png',
          title: 'Alphabonds',
          subTitle: 'Investment Explorer',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'IDCC',
          color: '#FF00A8',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/idcc_hero.png',
          title: 'IDCC',
          subTitle: 'Hong Kong',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'EdHeroes',
          color: '#FF00FF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/edheroes.png',
          title: 'Global Future Talent',
          subTitle: 'Innovation Hub',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
      ],
    },
    filterSchema: {
      '@context': 'https://schema.ixo.foundation/investment',
      '@type': 'Investment',
      dateCreated: {
        '@type': 'Date',
        name: 'Dates',
      },
      view: {
        '@type': 'Category',
        hidden: false,
        name: 'View',
        multiSelect: false,
        tags: [
          {
            '@type': 'Tag',
            name: 'My Portfolio',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'Tag',
            name: 'Global',
            icon: 'global.svg',
          },
          {
            '@type': 'Tag',
            name: 'Featured',
            icon: 'featured.svg',
          },
          {
            '@type': 'Tag',
            name: 'Popular',
            icon: 'popular.svg',
          },
        ],
      },
      sector: {
        '@type': 'Category',
        name: 'Sector',
        hidden: true,
        multiSelect: false,
        tags: [
          {
            '@type': 'sector',
            name: 'Test Launchpad',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'IDCC',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'UBS Zone',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'Campaign',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'EdHeroes',
            icon: 'portfolio.svg',
          },
        ],
      },
      ddoTags: [
        {
          '@type': 'Category',
          hidden: false,
          name: 'Instrument',
          multiSelect: true,
          tags: [
            {
              '@type': 'alphabond',
              name: 'Alphabond',
              icon: 'alphabond.svg',
            },
            {
              '@type': 'grant',
              name: 'Grant',
              icon: 'tag.svg',
            },
            {
              '@type': 'donation',
              name: 'Donation',
              icon: 'tag.svg',
            },
            {
              '@type': 'prize',
              name: 'Prize/Bounty',
              icon: 'tag.svg',
            },
            {
              '@type': 'equity',
              name: 'Equity',
              icon: 'tag.svg',
            },
            {
              '@type': 'outcomeContract',
              name: 'Outcome Contract',
              icon: 'tag.svg',
            },
            {
              '@type': 'iprights',
              name: 'IP Rights',
              icon: 'tag.svg',
            },
            {
              '@type': 'cso',
              name: 'Continuous (CSO)',
              icon: 'tag.svg',
            },
            {
              '@type': 'convertibleLoan',
              name: 'Convertible Loan',
              icon: 'tag.svg',
            },
            {
              '@type': 'indexFund',
              name: 'Index Fund',
              icon: 'tag.svg',
            },
            {
              '@type': 'mutualFund',
              name: 'Mutual Fund',
              icon: 'tag.svg',
            },
            {
              '@type': 'warrant',
              name: 'Warrant',
              icon: 'tag.svg',
            },
            {
              '@type': 'sto',
              name: 'Security Token',
              icon: 'tag.svg',
            },
            {
              '@type': 'derivative',
              name: 'Derivative',
              icon: 'tag.svg',
            },
            {
              '@type': 'governance',
              name: 'Governance',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'Target',
          multiSelect: true,
          tags: [
            {
              '@type': 'crowdfunding',
              name: 'Crowd Funding',
              icon: 'tag.svg',
            },
            {
              '@type': 'accreditedInvestors',
              name: 'Accredited Investors',
              icon: 'tag.svg',
            },
            {
              '@type': 'institutions',
              name: 'Institutions',
              icon: 'tag.svg',
            },
            {
              '@type': 'p2p',
              name: 'Peer-to-Peer',
              icon: 'tag.svg',
            },
            {
              '@type': 'charitableTrusts',
              name: 'Charitable Trusts',
              icon: 'tag.svg',
            },
            {
              '@type': 'publicFunds',
              name: 'Public Funds',
              icon: 'tag.svg',
            },
            {
              '@type': 'blendedFinance',
              name: 'Blended Finance',
              icon: 'tag.svg',
            },
            {
              '@type': 'carbonFinance',
              name: 'Carbon Finance',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: true,
          name: 'Stage',
          multiSelect: true,
          tags: [
            {
              '@type': 'proposal',
              name: 'Proposal',
              icon: 'proposal.svg',
            },
            {
              '@type': 'feasibility',
              name: 'Feasibility',
              icon: 'feasibility.svg',
            },
            {
              '@type': 'angel',
              name: 'Angel',
              icon: 'angel.svg',
            },
            {
              '@type': 'seed',
              name: 'Seed',
              icon: 'seed.svg',
            },
            {
              '@type': 'hatch',
              name: 'Hatch',
              icon: 'hatch.svg',
            },
            {
              '@type': 'p2p',
              name: 'Private/P2P',
              icon: 'p2p.svg',
            },
            {
              '@type': 'continuous',
              name: 'Continuous',
              icon: 'continuous.svg',
            },
            {
              '@type': 'growth',
              name: 'Growth',
              icon: 'growth.svg',
            },
            {
              '@type': 'fullyFunded',
              name: 'Fully Funded',
              icon: 'funded.svg',
            },
            {
              '@type': 'closed',
              name: 'Closed',
              icon: 'closed.svg',
            },
          ],
        },
      ],
    },
    controlPanelSchema: {
      '@context': 'https://schema.ixo.foundation/controls',
      '@type': 'Widget',
      dashboard: {
        '@type': 'Performance',
        title: 'Performance',
        controls: [
          {
            '@type': 'Shield',
            '@id': 'statusShield',
            title: 'Status',
            tooltip: null,
            icon: null,
            iconColor: 'F89D28',
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'field',
                value: 'status',
              },
            ],
          },
        ],
      },
      actions: {
        '@type': 'Actions',
        title: 'Actions',
        controls: [
          {
            '@type': 'Join',
            '@id': 'actionAgentJoin',
            title: 'Join',
            tooltip: 'Apply to Invest',
            icon: 'AddPerson',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'join',
              },
            ],
          },
          {
            '@type': 'Fuel',
            '@id': 'actionFuelThisProject',
            title: 'Add Credit',
            tooltip: 'Send IXO Credits from my Account',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'fuel_my_entity',
              },
            ],
          },
          {
            '@type': 'Status',
            '@id': 'actionUpdateThisProject',
            title: 'Update Status',
            tooltip: 'Change the Status of this Entity',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/update_status',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'update_status',
              },
            ],
          },
          {
            '@type': 'Buy',
            '@id': 'actionBuy',
            title: 'Buy',
            tooltip: 'Buy Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'buy',
              },
            ],
          },
          {
            '@type': 'Sell',
            '@id': 'actionSell',
            title: 'Sell',
            tooltip: 'Sell Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'sell',
              },
            ],
          },
          {
            '@type': 'Withdraw',
            '@id': 'actionWithdraw',
            title: 'Withdraw',
            tooltip: 'Withdraw Credit',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'withdraw',
              },
            ],
          },
          {
            '@type': 'Proposal',
            '@id': 'actionSubmitProposal',
            title: 'Submit Proposal',
            tooltip: 'New Proposal',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'proposal',
              },
            ],
          },
          {
            '@type': 'Deposit',
            '@id': 'actionDeposit',
            title: 'Deposit',
            tooltip: 'Deposit',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'deposit',
              },
            ],
          },
          {
            '@type': 'Send',
            '@id': 'actionSend',
            title: 'Send',
            tooltip: 'Send tokens to another account',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'send',
              },
            ],
          },
          {
            '@type': 'EditValidator',
            '@id': 'actionEditValidator',
            title: 'Edit Validator',
            tooltip: 'Edit Validator',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'edit',
              },
            ],
          },
          {
            '@type': 'CreatePaymentTemplate',
            '@id': 'createPaymentTemplate',
            title: 'Create Payment Template',
            tooltip: 'Create Payment Template',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_template',
              },
            ],
          },
          {
            '@type': 'CreatePaymentContract',
            '@id': 'createPaymentContract',
            title: 'Create Payment Contract',
            tooltip: 'Create Payment Contract',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_contract',
              },
            ],
          },
          {
            '@type': 'MakePayment',
            '@id': 'makePayment',
            title: 'Make Payment',
            tooltip: 'Make Payment',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'make_payment',
              },
            ],
          },
        ],
      },
      apps: {
        '@type': 'Apps',
        title: 'Plugins',
        controls: [
          {
            '@type': 'RiotChat',
            '@id': 'appRiotchat',
            title: 'Riot Chat',
            tooltip: 'Encrypted chat-room',
            icon: 'RiotChat',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'Gitcoin',
            '@id': 'appGitcoin',
            title: 'Gitcoin',
            tooltip: 'Coming soon',
            icon: 'GitCoin',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'DaoStack',
            '@id': 'appDaoStack',
            title: 'DAOStack',
            tooltip: 'Coming soon',
            icon: 'DaoStack',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
      connections: {
        '@type': 'Connections',
        title: 'Connections',
        controls: [
          {
            '@type': 'External',
            '@id': 'twitter',
            title: 'Twitter',
            tooltip: 'Share on Twitter',
            icon: 'assets/images/icon-twitter.svg',
            iconColor: '#000000',
            endpoint: 'https://twitter.com/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'discord',
            title: 'Discord',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-discord.svg',
            iconColor: '#000000',
            endpoint: 'https://discord.gg/ixo',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'telegram',
            title: 'Telegram',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-telegram.svg',
            iconColor: '#000000',
            endpoint: 'https://t.me/ixonetwork',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'slack',
            title: 'Slack',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-slack.svg',
            iconColor: '#000000',
            endpoint: 'https://ixofoundation.slack.com/signup#/domain-signup',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'linkedin',
            title: 'Linkedin',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-linkedin.svg',
            iconColor: '#000000',
            endpoint: 'https://www.linkedin.com/company/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
    },
    createNewTitle: 'Create an Investment',
    urlPart: 'investment',
  },
  dao: {
    title: 'DAO',
    plural: 'DAOs',
    themeColor: '#85AD5C',
    headerSchema: {
      '@context': 'https://schema.ixo.foundation/cell',
      '@type': 'Header',
      color: 'transparent',
      image:
        'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
      title: 'Test Zone',
      subTitle: 'DAOs Explorer',
      indicators: [
        {
          '@type': 'Indicator',
          indicatorLabel: 'My DAOs',
          indicatorSource: '0',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Nodes',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Projects',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Agents',
          indicatorSource: '234',
        },
      ],
      overrides: [
        {
          '@context': 'https://schema.ixo.foundation/cell',
          id: 'https://schema.ixo.foundation/cell/impactRelayer',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'Test Launchpad',
          color: '#FFF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
          title: 'Test Launchpad',
          subTitle: 'Internet of Impact',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'UBS Zone',
          color: '#fff',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ubs_zone.png',
          title: 'Alphabonds',
          subTitle: 'Cell Explorer',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'IDCC',
          color: '#FF00A8',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/idcc_hero.png',
          title: 'IDCC',
          subTitle: 'Hong Kong',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'EdHeroes',
          color: '#FF00FF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/edheroes.png',
          title: 'Global Future Talent',
          subTitle: 'Innovation Hub',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
      ],
    },
    filterSchema: {
      '@context': 'https://schema.ixo.foundation/cell',
      '@type': 'Cell',
      dateCreated: {
        '@type': 'Date',
        name: 'Dates',
      },
      view: {
        '@type': 'Category',
        hidden: false,
        name: 'View',
        multiSelect: false,
        tags: [
          {
            '@type': 'Tag',
            name: 'My Portfolio',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'Tag',
            name: 'Global',
            icon: 'global.svg',
          },
          {
            '@type': 'Tag',
            name: 'Featured',
            icon: 'featured.svg',
          },
          {
            '@type': 'Tag',
            name: 'Popular',
            icon: 'popular.svg',
          },
        ],
      },
      ddoTags: [
        {
          '@type': 'Category',
          hidden: false,
          name: 'DAO Type',
          multiSelect: false,
          selectedTags: [],
          tags: [
            {
              '@type': 'Tag',
              name: 'Candidate',
              icon: 'voting.svg',
            },
            {
              '@type': 'Tag',
              name: 'Cooperative',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Marketplace',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Developer',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Hackathon',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Investment',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Funding',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Validator',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Enterprise',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'SDG',
          multiSelect: true,
          tags: [
            {
              '@type': 'Tag',
              name: 'SDG1 – No Poverty',
              icon: 'sdg1.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG2 – Zero Hunger',
              icon: 'sdg2.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG3 – Good Health and Well-being',
              icon: 'sdg3.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG4 – Quality Education',
              icon: 'sdg4.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG5 – Gender Equality',
              icon: 'sdg5.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG6 – Clean Water and Sanitation',
              icon: 'sdg6.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG7 – Affordable and Clean Energy',
              icon: 'sdg7.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG8 – Decent Work and Economic Growth',
              icon: 'sdg8.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG9 – Industry, Innovation and Infrastructure',
              icon: 'sdg9.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG10 – Reduced Inequalities',
              icon: 'sdg10.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG11 – Sustainable Cities and Coummunities',
              icon: 'sdg11.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG12 – Responsible Consumption and Production',
              icon: 'sdg12.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG13 – Climate Action',
              icon: 'sdg13.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG14 – Life Below Water',
              icon: 'sdg14.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG15 – Life on Land',
              icon: 'sdg15.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG16 – Peace, Justice and Strong Institutions',
              icon: 'sdg16.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG17 – Partnerships for Goals',
              icon: 'sdg17.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: true,
          name: 'Stage',
          multiSelect: false,
          tags: [
            {
              '@type': 'Tag',
              name: 'Forming',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Selection',
              icon: 'archived.svg',
            },
            {
              '@type': 'Tag',
              name: 'Mobilising',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Performing',
              icon: 'tag.svg',
            },
            {
              '@type': 'Tag',
              name: 'Paused',
              icon: 'paused.svg',
            },
            {
              '@type': 'Tag',
              name: 'Closing',
              icon: 'closing.svg',
            },
            {
              '@type': 'Tag',
              name: 'Ended',
              icon: 'ended.svg',
            },
            {
              '@type': 'Tag',
              name: 'Archived',
              icon: 'archived.svg',
            },
          ],
        },
      ],
      sector: {
        '@type': 'Category',
        name: 'Sector',
        hidden: true,
        multiSelect: false,
        tags: [
          {
            '@type': 'sector',
            name: 'Test Launchpad',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'IDCC',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'UBS Zone',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'Campaign',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'EdHeroes',
            icon: 'portfolio.svg',
          },
        ],
      },
    },
    controlPanelSchema: {
      '@context': 'https://schema.ixo.foundation/controls',
      '@type': 'Widget',
      dashboard: {
        '@type': 'Performance',
        title: 'Performance',
        controls: [
          {
            '@type': 'Shield',
            '@id': 'statusShield',
            title: 'Status',
            tooltip: null,
            icon: null,
            iconColor: '#F89D28',
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'field',
                value: 'status',
              },
            ],
          },
        ],
      },
      actions: {
        '@type': 'Actions',
        title: 'Actions',
        controls: [
          {
            '@type': 'Fuel',
            '@id': 'actionFuelThisProject',
            title: 'Add Credit',
            tooltip: 'Fund this Entity from my Account',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'fuel_my_entity',
              },
            ],
          },
          {
            '@type': 'Status',
            '@id': 'actionUpdateThisProject',
            title: 'Update Status',
            tooltip: 'Change the Status of this Entity',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/update_status',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'update_status',
              },
            ],
          },
          {
            '@type': 'StakeToVote',
            '@id': 'stakedToVote',
            title: 'Vote',
            tooltip: 'Stake to Vote',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'stake_to_vote',
              },
            ],
          },
          {
            '@type': 'Send',
            '@id': 'actionSend',
            title: 'Send',
            tooltip: 'Fund Account',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'send',
              },
            ],
          },
        ],
      },
      apps: {
        '@type': 'Apps',
        title: 'Plugins',
        controls: [
          {
            '@type': 'RiotChat',
            '@id': 'appRiotchat',
            title: 'Riot Chat',
            tooltip: 'Encrypted chat-room',
            icon: null,
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'Gitcoin',
            '@id': 'appGitcoin',
            title: 'Gitcoin',
            tooltip: 'Coming soon',
            icon: 'GitCoin',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'DaoStack',
            '@id': 'appDaoStack',
            title: 'DAOStack',
            tooltip: 'Coming soon',
            icon: 'DaoStack',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
      connections: {
        '@type': 'Connections',
        title: 'Connections',
        controls: [
          {
            '@type': 'External',
            '@id': 'twitter',
            title: 'Twitter',
            tooltip: 'Share on Twitter',
            icon: 'assets/images/icon-twitter.svg',
            iconColor: '#000000',
            endpoint: 'https://twitter.com/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'discord',
            title: 'Discord',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-discord.svg',
            iconColor: '#000000',
            endpoint: 'https://discord.gg/ixo',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'telegram',
            title: 'Telegram',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-telegram.svg',
            iconColor: '#000000',
            endpoint: 'https://t.me/ixonetwork',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'slack',
            title: 'Slack',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-slack.svg',
            iconColor: '#000000',
            endpoint: 'https://ixofoundation.slack.com/signup#/domain-signup',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'linkedin',
            title: 'Linkedin',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-linkedin.svg',
            iconColor: '#000000',
            endpoint: 'https://www.linkedin.com/company/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
    },
    createNewTitle: 'Create a DAO',
    urlPart: 'cell',
  },
  protocol: {
    title: 'Protocol',
    plural: 'Protocols',
    themeColor: '#7c2740',
    headerSchema: {
      '@context': 'https://schema.ixo.foundation/protocol',
      '@type': 'Header',
      color: 'transparent',
      image:
        'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
      title: 'Test Zone',
      subTitle: 'Protocol Explorer',
      indicators: [
        {
          '@type': 'Indicator',
          indicatorLabel: 'My DAOs',
          indicatorSource: '0',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Nodes',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Projects',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Agents',
          indicatorSource: '234',
        },
      ],
      overrides: [
        {
          '@context': 'https://schema.ixo.foundation/cell',
          id: 'https://schema.ixo.foundation/cell/impactRelayer',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'Test Launchpad',
          color: '#FFF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
          title: 'Test Launchpad',
          subTitle: 'Internet of Impact',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'UBS Zone',
          color: '#fff',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ubs_zone.png',
          title: 'Alphabonds',
          subTitle: 'Protocols Explorer',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'IDCC',
          color: '#FF00A8',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/idcc_hero.png',
          title: 'IDCC',
          subTitle: 'Hong Kong',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'EdHeroes',
          color: '#FF00FF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/edheroes.png',
          title: 'Global Future Talent',
          subTitle: 'Innovation Hub',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
      ],
    },
    filterSchema: {
      '@context': 'https://schema.ixo.foundation/protocol',
      '@type': 'Protocol',
      dateCreated: {
        '@type': 'Date',
        name: 'Dates',
      },
      view: {
        '@type': 'Category',
        hidden: false,
        name: 'View',
        multiSelect: false,
        tags: [
          {
            '@type': 'Tag',
            name: 'My Portfolio',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'Tag',
            name: 'Global',
            icon: 'global.svg',
          },
          {
            '@type': 'Tag',
            name: 'Featured',
            icon: 'featured.svg',
          },
          {
            '@type': 'Tag',
            name: 'Popular',
            icon: 'popular.svg',
          },
        ],
      },
      ddoTags: [
        {
          '@type': 'Category',
          hidden: false,
          name: 'Entity',
          multiSelect: false,
          tags: [
            {
              '@type': 'Tag',
              name: 'Claim',
              icon: 'claim.svg',
            },
            {
              '@type': 'Tag',
              name: 'Project',
              icon: 'Project.svg',
            },
            {
              '@type': 'Tag',
              name: 'DAO',
              icon: 'cell.svg',
            },
            {
              '@type': 'Tag',
              name: 'Alphabond',
              icon: 'alphabond.svg',
            },
            {
              '@type': 'Tag',
              name: 'Investment',
              icon: 'investment.svg',
            },
            {
              '@type': 'Tag',
              name: 'Asset',
              icon: 'asset.svg',
            },
            {
              '@type': 'Tag',
              name: 'Token',
              icon: 'token.svg',
            },
            {
              '@type': 'Tag',
              name: 'Payment',
              icon: 'payment.svg',
            },
            {
              '@type': 'Tag',
              name: 'Credential',
              icon: 'credential.svg',
            },
            {
              '@type': 'Tag',
              name: 'Evaluation',
              icon: 'evaluation.svg',
            },
            {
              '@type': 'Tag',
              name: 'Oracle',
              icon: 'oracle.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'Claim Type',
          multiSelect: true,
          "tags": [
            {
              "@type": "Tag",
              "name": "Service",
              "icon": "service.svg"
            },
            {
              "@type": "Tag",
              "name": "Outcome",
              "icon": "outcome.svg"
            },
            {
              "@type": "Tag",
              "name": "Credential",
              "icon": "credential.svg"
            },
            {
              "@type": "Tag",
              "name": "Use of Funds",
              "icon": "useoffunds.svg"
            },
            {
              "@type": "Tag",
              "name": "Payment",
              "icon": "payment.svg"
            },
            {
              "@type": "Tag",
              "name": "Investment",
              "icon": "investment.svg"
            },
            {
              "@type": "Tag",
              "name": "Banking",
              "icon": "banking.svg"
            },
            {
              "@type": "Tag",
              "name": "Invoice",
              "icon": "invoice.svg"
            },
            {
              "@type": "Tag",
              "name": "Procurement",
              "icon": "procurement.svg"
            },
            {
              "@type": "Tag",
              "name": "Provenance",
              "icon": "provenance.svg"
            },
            {
              "@type": "Tag",
              "name": "Ownership",
              "icon": "ownership.svg"
            },
            {
              "@type": "Tag",
              "name": "Custody",
              "icon": "custody.svg"
            },
            {
              "@type": "Tag",
              "name": "Dispute",
              "icon": "dispute.svg"
            },
            {
              "@type": "Tag",
              "name": "Impact",
              "icon": "impact.svg"
            },
            {
              "@type": "Tag",
              "name": "Offset",
              "icon": "offset.svg"
            },
            {
              "@type": "Tag",
              "name": "Contribution",
              "icon": "contribution.svg"
            },
            {
              "@type": "Tag",
              "name": "Grant",
              "icon": "grant.svg"
            },
            {
              "@type": "Tag",
              "name": "Compensation",
              "icon": "compensation.svg"
            }
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'Token Class',
          multiSelect: true,
          tags: [
            {
              '@type': 'nft',
              name: 'Non-Fungible Token',
              icon: 'tag.svg',
            },
            {
              '@type': 'bearerCertificate',
              name: 'Bearer Certificate',
              icon: 'tag.svg',
            },
            {
              '@type': 'option',
              name: 'Option',
              icon: 'tag.svg',
            },
            {
              '@type': 'contract',
              name: 'Contract',
              icon: 'tag.svg',
            },
            {
              '@type': 'certificate',
              name: 'Ownership Certificate',
              icon: 'tag.svg',
            },
            {
              '@type': 'listing',
              name: 'Exchange Listing',
              icon: 'tag.svg',
            },
            {
              '@type': 'digitalGoods',
              name: 'Digital Goods',
              icon: 'tag.svg',
            },
            {
              '@type': 'wallet',
              name: 'Crypto Wallet',
              icon: 'tag.svg',
            },
            {
              '@type': 'unspecified',
              name: 'Unspecified',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'SDG',
          multiSelect: true,
          tags: [
            {
              '@type': 'Tag',
              name: 'SDG1 – No Poverty',
              icon: 'sdg1.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG2 – Zero Hunger',
              icon: 'sdg2.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG3 – Good Health and Well-being',
              icon: 'sdg3.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG4 – Quality Education',
              icon: 'sdg4.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG5 – Gender Equality',
              icon: 'sdg5.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG6 – Clean Water and Sanitation',
              icon: 'sdg6.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG7 – Affordable and Clean Energy',
              icon: 'sdg7.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG8 – Decent Work and Economic Growth',
              icon: 'sdg8.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG9 – Industry, Innovation and Infrastructure',
              icon: 'sdg9.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG10 – Reduced Inequalities',
              icon: 'sdg10.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG11 – Sustainable Cities and Coummunities',
              icon: 'sdg11.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG12 – Responsible Consumption and Production',
              icon: 'sdg12.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG13 – Climate Action',
              icon: 'sdg13.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG14 – Life Below Water',
              icon: 'sdg14.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG15 – Life on Land',
              icon: 'sdg15.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG16 – Peace, Justice and Strong Institutions',
              icon: 'sdg16.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG17 – Partnerships for Goals',
              icon: 'sdg17.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: true,
          name: 'Stage',
          multiSelect: true,
          tags: [
            {
              '@type': 'Tag',
              name: 'Proposal',
              icon: 'proposal.svg',
            },
            {
              '@type': 'Tag',
              name: 'Planning',
              icon: 'planning.svg',
            },
            {
              '@type': 'Tag',
              name: 'Delivery',
              icon: 'delivery.svg',
            },
            {
              '@type': 'Tag',
              name: 'Paused',
              icon: 'paused.svg',
            },
            {
              '@type': 'Tag',
              name: 'Closing',
              icon: 'closing.svg',
            },
            {
              '@type': 'Tag',
              name: 'Ended',
              icon: 'ended.svg',
            },
            {
              '@type': 'Tag',
              name: 'Archived',
              icon: 'archived.svg',
            },
          ],
        },
      ],
      sector: {
        '@type': 'Category',
        name: 'Sector',
        hidden: true,
        multiSelect: false,
        tags: [
          {
            '@type': 'sector',
            name: 'Test Launchpad',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'IDCC',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'UBS Zone',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'Campaign',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'EdHeroes',
            icon: 'portfolio.svg',
          },
        ],
      },
    },
    controlPanelSchema: {
      '@context': 'https://schema.ixo.foundation/controls',
      '@type': 'Widget',
      dashboard: {
        '@type': 'Performance',
        title: 'Performance',
        controls: [
          {
            '@type': 'Shield',
            '@id': 'statusShield',
            title: 'Status',
            tooltip: null,
            icon: null,
            iconColor: 'F89D28',
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'field',
                value: 'status',
              },
            ],
          },
        ],
      },
      actions: {
        '@type': 'Actions',
        title: 'Actions',
        controls: [
          {
            '@type': 'Join',
            '@id': 'actionAgentJoin',
            title: 'Join',
            tooltip: 'Apply to be an Agent',
            icon: 'AddPerson',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'join',
              },
            ],
          },
          {
            '@type': 'Fuel',
            '@id': 'actionFuelThisProject',
            title: 'Add Credit',
            tooltip: 'Send IXO Credits from my Account',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'fuel_my_entity',
              },
            ],
          },
          {
            '@type': 'Status',
            '@id': 'actionUpdateThisProject',
            title: 'Update Status',
            tooltip: 'Change the Status of this Entity',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/update_status',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'update_status',
              },
            ],
          },
          {
            '@type': 'Buy',
            '@id': 'actionBuy',
            title: 'Buy',
            tooltip: 'Buy Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'buy',
              },
            ],
          },
          {
            '@type': 'Sell',
            '@id': 'actionSell',
            title: 'Sell',
            tooltip: 'Sell Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'sell',
              },
            ],
          },
          {
            '@type': 'Withdraw',
            '@id': 'actionWithdraw',
            title: 'Withdraw',
            tooltip: 'Withdraw Project Funds',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'withdraw',
              },
            ],
          },
          {
            '@type': 'Proposal',
            '@id': 'actionSubmitProposal',
            title: 'Submit Proposal',
            tooltip: 'New Proposal',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'proposal',
              },
            ],
          },
          {
            '@type': 'Deposit',
            '@id': 'actionDeposit',
            title: 'Deposit',
            tooltip: 'Fund the Proposal Deposit',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'deposit',
              },
            ],
          },
          {
            '@type': 'Send',
            '@id': 'actionSend',
            title: 'Send',
            tooltip: 'Send tokens to another account',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'send',
              },
            ],
          },
          {
            '@type': 'EditValidator',
            '@id': 'actionEditValidator',
            title: 'Edit Validator',
            tooltip: 'Edit Validator',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'edit',
              },
            ],
          },
          {
            '@type': 'CreatePaymentTemplate',
            '@id': 'createPaymentTemplate',
            title: 'Create Payment Template',
            tooltip: 'Create Payment Template',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_template',
              },
            ],
          },
          {
            '@type': 'CreatePaymentContract',
            '@id': 'createPaymentContract',
            title: 'Create Payment Contract',
            tooltip: 'Create Payment Contract',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_contract',
              },
            ],
          },
          {
            '@type': 'MakePayment',
            '@id': 'makePayment',
            title: 'Make Payment',
            tooltip: 'Make Payment',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'make_payment',
              },
            ],
          },
        ],
      },
      apps: {
        '@type': 'Apps',
        title: 'Plugins',
        controls: [
          {
            '@type': 'RiotChat',
            '@id': 'appRiotchat',
            title: 'Riot Chat',
            tooltip: 'Encrypted chat-room',
            icon: 'RiotChat',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'Gitcoin',
            '@id': 'appGitcoin',
            title: 'Gitcoin',
            tooltip: 'Coming soon',
            icon: 'GitCoin',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'DaoStack',
            '@id': 'appDaoStack',
            title: 'DAOStack',
            tooltip: 'Coming soon',
            icon: 'DaoStack',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
      connections: {
        '@type': 'Connections',
        title: 'Connections',
        controls: [
          {
            '@type': 'External',
            '@id': 'twitter',
            title: 'Twitter',
            tooltip: 'Share on Twitter',
            icon: 'assets/images/icon-twitter.svg',
            iconColor: '#000000',
            endpoint: 'https://twitter.com/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'discord',
            title: 'Discord',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-discord.svg',
            iconColor: '#000000',
            endpoint: 'https://discord.gg/ixo',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'telegram',
            title: 'Telegram',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-telegram.svg',
            iconColor: '#000000',
            endpoint: 'https://t.me/ixonetwork',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'slack',
            title: 'Slack',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-slack.svg',
            iconColor: '#000000',
            endpoint: 'https://ixofoundation.slack.com/signup#/domain-signup',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'linkedin',
            title: 'Linkedin',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-linkedin.svg',
            iconColor: '#000000',
            endpoint: 'https://www.linkedin.com/company/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
    },
    createNewTitle: 'Create a Claim Protocol',
    urlPart: 'protocol',
  },
  asset: {
    title: 'Asset',
    plural: 'Assets',
    themeColor: '#ED9526',
    headerSchema: {
      '@context': 'https://schema.ixo.foundation/data-asset',
      '@type': 'Header',
      color: 'transparent',
      image:
        'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
      title: 'Test Zone',
      subTitle: 'Assets Explorer',
      indicators: [
        {
          '@type': 'Indicator',
          indicatorLabel: 'My DAOs',
          indicatorSource: '0',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Nodes',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Projects',
          indicatorSource: '234',
        },
        {
          '@type': 'Indicator',
          indicatorLabel: 'Agents',
          indicatorSource: '234',
        },
      ],
      overrides: [
        {
          '@context': 'https://schema.ixo.foundation/cell',
          id: 'https://schema.ixo.foundation/cell/impactRelayer',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'Test Launchpad',
          color: '#FFF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ixoworld_hero.png',
          title: 'Test Launchpad',
          subTitle: 'Internet of Impact',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'UBS Zone',
          color: '#fff',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/ubs_zone.png',
          title: 'Alphabonds',
          subTitle: 'Asset Explorer',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'IDCC',
          color: '#FF00A8',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/idcc_hero.png',
          title: 'IDCC',
          subTitle: 'Hong Kong',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
        {
          '@context': 'https://schema.idcc.hk/sector',
          id: 'https://schema.idcc.hk/sector',
          '@type': 'HeaderOverride',
          ddoSector: 'Sector',
          ddoTag: 'EdHeroes',
          color: '#FF00FF',
          image:
            'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/src/assets/images/header-overrides/edheroes.png',
          title: 'Global Future Talent',
          subTitle: 'Innovation Hub',
          indicators: [
            {
              '@type': 'Indicator',
              indicatorLabel: 'Candidates',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_candidates',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Launched',
              indicatorSource: 'https://metrics.ixo.foundation/relayers_launched',
            },
            {
              '@type': 'Indicator',
              indicatorLabel: 'Total Votes',
              indicatorSource: 'https://metrics.ixo.foundation/relayer_launchpad_votes',
            },
          ],
        },
      ],
    },
    filterSchema: {
      '@context': 'https://schema.ixo.foundation/data',
      '@type': 'Data',
      dateCreated: {
        '@type': 'Date',
        name: 'Dates',
      },
      view: {
        '@type': 'Category',
        hidden: false,
        name: 'View',
        multiSelect: false,
        tags: [
          {
            '@type': 'Tag',
            name: 'My Portfolio',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'Tag',
            name: 'Global',
            icon: 'global.svg',
          },
          {
            '@type': 'Tag',
            name: 'Featured',
            icon: 'featured.svg',
          },
          {
            '@type': 'Tag',
            name: 'Popular',
            icon: 'popular.svg',
          },
        ],
      },
      sector: {
        '@type': 'Category',
        name: 'Sector',
        hidden: true,
        multiSelect: false,
        tags: [
          {
            '@type': 'sector',
            name: 'Test Launchpad',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'IDCC',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'UBS Zone',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'Campaign',
            icon: 'portfolio.svg',
          },
          {
            '@type': 'sector',
            name: 'EdHeroes',
            icon: 'portfolio.svg',
          },
        ],
      },
      ddoTags: [
        {
          '@type': 'Category',
          hidden: false,
          name: 'Asset Type',
          multiSelect: true,
          tags: [
            {
              '@type': 'impactToken',
              name: 'Impact Token',
              icon: 'tag.svg',
            },
            {
              '@type': 'data',
              name: 'Data Asset',
              icon: 'tag.svg',
            },
            {
              '@type': 'carbonCredit',
              name: 'Carbon Credit',
              icon: 'tag.svg',
            },
            {
              '@type': 'outcomeContract',
              name: 'Outcome Contract',
              icon: 'outcomecontract.svg',
            },
            {
              '@type': 'equity',
              name: 'Equity',
              icon: 'equity.svg',
            },
            {
              '@type': 'cryptocurrency',
              name: 'Crypto Wallet',
              icon: 'tag.svg',
            },
            {
              '@type': 'commodity',
              name: 'Commodity',
              icon: 'tag.svg',
            },
            {
              '@type': 'equipment',
              name: 'Equipment',
              icon: 'tag.svg',
            },
            {
              '@type': 'realEstate',
              name: 'Real Estate',
              icon: 'tag.svg',
            },
            {
              '@type': 'intellectualProperty',
              name: 'Intellectual Property',
              icon: 'tag.svg',
            },
            {
              '@type': 'incomeSecurity',
              name: 'Income Security',
              icon: 'tag.svg',
            },
            {
              '@type': 'commercialRights',
              name: 'Commercial Rights',
              icon: 'tag.svg',
            },
            {
              '@type': 'inventory',
              name: 'Inventory',
              icon: 'tag.svg',
            },
            {
              '@type': 'digital',
              name: 'Digital Asset',
              icon: 'tag.svg',
            },
            {
              '@type': 'bond',
              name: 'Bond',
              icon: 'tag.svg',
            },
            {
              '@type': 'brand',
              name: 'Brand',
              icon: 'tag.svg',
            },
            {
              '@type': 'other',
              name: 'Other',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'Token Class',
          multiSelect: true,
          tags: [
            {
              '@type': 'nft',
              name: 'Non-Fungible Token',
              icon: 'tag.svg',
            },
            {
              '@type': 'bearerCertificate',
              name: 'Bearer Certificate',
              icon: 'tag.svg',
            },
            {
              '@type': 'option',
              name: 'Option',
              icon: 'tag.svg',
            },
            {
              '@type': 'contract',
              name: 'Contract',
              icon: 'tag.svg',
            },
            {
              '@type': 'certificate',
              name: 'Ownership Certificate',
              icon: 'tag.svg',
            },
            {
              '@type': 'listing',
              name: 'Exchange Listing',
              icon: 'tag.svg',
            },
            {
              '@type': 'digitalGoods',
              name: 'Digital Goods',
              icon: 'tag.svg',
            },
            {
              '@type': 'wallet',
              name: 'Crypto Wallet',
              icon: 'tag.svg',
            },
            {
              '@type': 'unspecified',
              name: 'Unspecified',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: false,
          name: 'Market',
          multiSelect: true,
          tags: [
            {
              '@type': 'commodities',
              name: 'Commodities',
              icon: 'tag.svg',
            },
            {
              '@type': 'securities',
              name: 'Securities',
              icon: 'tag.svg',
            },
            {
              '@type': 'private',
              name: 'Private',
              icon: 'tag.svg',
            },
            {
              '@type': 'impactdex',
              name: 'Impacts Exchange',
              icon: 'tag.svg',
            },
            {
              '@type': 'auction',
              name: 'Auction',
              icon: 'tag.svg',
            },
            {
              '@type': 'registry',
              name: 'Asset Registry',
              icon: 'tag.svg',
            },
            {
              '@type': 'archive',
              name: 'Asset Archive',
              icon: 'tag.svg',
            },
            {
              '@type': 'unspecified',
              name: 'Not Specified',
              icon: 'tag.svg',
            },
          ],
        },
        {
          '@type': 'Category',
          hidden: true,
          name: 'Stage',
          multiSelect: true,
          tags: [
            {
              '@type': 'Tag',
              name: 'Proposal',
              icon: 'proposal.svg',
            },
            {
              '@type': 'Tag',
              name: 'Planning',
              icon: 'planning.svg',
            },
            {
              '@type': 'Tag',
              name: 'Delivery',
              icon: 'delivery.svg',
            },
            {
              '@type': 'Tag',
              name: 'Paused',
              icon: 'paused.svg',
            },
            {
              '@type': 'Tag',
              name: 'Closing',
              icon: 'closing.svg',
            },
            {
              '@type': 'Tag',
              name: 'Ended',
              icon: 'ended.svg',
            },
            {
              '@type': 'Tag',
              name: 'Archived',
              icon: 'archived.svg',
            },
            {
              '@type': 'Tag',
              name: 'Selection',
              icon: 'archived.svg',
            },
          ],
        },
        {
          '@type': 'SDG',
          hidden: false,
          name: 'SDG',
          multiSelect: true,
          tags: [
            {
              '@type': 'Tag',
              name: 'SDG1 – No Poverty',
              icon: 'sdg1.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG2 – Zero Hunger',
              icon: 'sdg2.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG3 – Good Health and Well-being',
              icon: 'sdg3.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG4 – Quality Education',
              icon: 'sdg4.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG5 – Gender Equality',
              icon: 'sdg5.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG6 – Clean Water and Sanitation',
              icon: 'sdg6.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG7 – Affordable and Clean Energy',
              icon: 'sdg7.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG8 – Decent Work and Economic Growth',
              icon: 'sdg8.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG9 – Industry, Innovation and Infrastructure',
              icon: 'sdg9.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG10 – Reduced Inequalities',
              icon: 'sdg10.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG11 – Sustainable Cities and Coummunities',
              icon: 'sdg11.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG12 – Responsible Consumption and Production',
              icon: 'sdg12.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG13 – Climate Action',
              icon: 'sdg13.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG14 – Life Below Water',
              icon: 'sdg14.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG15 – Life on Land',
              icon: 'sdg15.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG16 – Peace, Justice and Strong Institutions',
              icon: 'sdg16.svg',
            },
            {
              '@type': 'Tag',
              name: 'SDG17 – Partnerships for Goals',
              icon: 'sdg17.svg',
            },
          ],
        },
      ],
    },
    controlPanelSchema: {
      '@context': 'https://schema.ixo.foundation/controls',
      '@type': 'Widget',
      dashboard: {
        '@type': 'Performance',
        title: 'Performance',
        controls: [
          {
            '@type': 'Shield',
            '@id': 'statusShield',
            title: 'Status',
            tooltip: null,
            icon: null,
            iconColor: 'F89D28',
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'field',
                value: 'status',
              },
            ],
          },
        ],
      },
      actions: {
        '@type': 'Actions',
        title: 'Actions',
        controls: [
          {
            '@type': 'Join',
            '@id': 'actionAgentJoin',
            title: 'Apply',
            tooltip: 'Apply to be an Agent',
            icon: 'AddPerson',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'join',
              },
            ],
          },
          {
            '@type': 'Fuel',
            '@id': 'actionFuelThisProject',
            title: 'Add Credit',
            tooltip: 'Send IXO Credits from my Account',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/assistant',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'fuel_my_entity',
              },
            ],
          },
          {
            '@type': 'Status',
            '@id': 'actionUpdateThisProject',
            title: 'Update Status',
            tooltip: 'Change the Status of this Entity',
            icon: 'Fuel',
            iconColor: '#49BFE0',
            endpoint: '/update_status',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'update_status',
              },
            ],
          },
          {
            '@type': 'Buy',
            '@id': 'actionBuy',
            title: 'Buy',
            tooltip: 'Buy Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'buy',
              },
            ],
          },
          {
            '@type': 'Sell',
            '@id': 'actionSell',
            title: 'Sell',
            tooltip: 'Sell Bond Shares',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'sell',
              },
            ],
          },
          {
            '@type': 'Withdraw',
            '@id': 'actionWithdraw',
            title: 'Withdraw',
            tooltip: 'Withdraw Credit',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'withdraw',
              },
            ],
          },
          {
            '@type': 'Proposal',
            '@id': 'actionSubmitProposal',
            title: 'Submit Proposal',
            tooltip: 'New Proposal',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'proposal',
              },
            ],
          },
          {
            '@type': 'Deposit',
            '@id': 'actionDeposit',
            title: 'Deposit',
            tooltip: 'Fund a Proposal Deposit',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'deposit',
              },
            ],
          },
          {
            '@type': 'Send',
            '@id': 'actionSend',
            title: 'Send',
            tooltip: 'Send tokens to another account',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'send',
              },
            ],
          },
          {
            '@type': 'EditValidator',
            '@id': 'actionEditValidator',
            title: 'Edit Validator',
            tooltip: 'Edit Validator',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'edit',
              },
            ],
          },
          {
            '@type': 'CreatePaymentTemplate',
            '@id': 'createPaymentTemplate',
            title: 'Create Payment Template',
            tooltip: 'Create Payment Template',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_template',
              },
            ],
          },
          {
            '@type': 'CreatePaymentContract',
            '@id': 'createPaymentContract',
            title: 'Create Payment Contract',
            tooltip: 'Create Payment Contract',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'create_payment_contract',
              },
            ],
          },
          {
            '@type': 'MakePayment',
            '@id': 'makePayment',
            title: 'Make Payment',
            tooltip: 'Make Payment',
            icon: 'Triangle',
            iconColor: '#49BFE0',
            endpoint: '#',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: 'user',
              },
            ],
            data: null,
            parameters: [
              {
                name: 'intent',
                value: 'make_payment',
              },
            ],
          },
        ],
      },
      apps: {
        '@type': 'Apps',
        title: 'Plugins',
        controls: [
          {
            '@type': 'RiotChat',
            '@id': 'appRiotchat',
            title: 'Riot Chat',
            tooltip: 'Encrypted chat-room',
            icon: 'RiotChat',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'Gitcoin',
            '@id': 'appGitcoin',
            title: 'Gitcoin',
            tooltip: 'Coming soon',
            icon: 'GitCoin',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'DaoStack',
            '@id': 'appDaoStack',
            title: 'DAOStack',
            tooltip: 'Coming soon',
            icon: 'DaoStack',
            iconColor: null,
            endpoint: null,
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
      connections: {
        '@type': 'Connections',
        title: 'Connections',
        controls: [
          {
            '@type': 'External',
            '@id': 'twitter',
            title: 'Twitter',
            tooltip: 'Share on Twitter',
            icon: 'assets/images/icon-twitter.svg',
            iconColor: '#000000',
            endpoint: 'https://twitter.com/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'discord',
            title: 'Discord',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-discord.svg',
            iconColor: '#000000',
            endpoint: 'https://discord.gg/ixo',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'telegram',
            title: 'Telegram',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-telegram.svg',
            iconColor: '#000000',
            endpoint: 'https://t.me/ixonetwork',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'slack',
            title: 'Slack',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-slack.svg',
            iconColor: '#000000',
            endpoint: 'https://ixofoundation.slack.com/signup#/domain-signup',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
          {
            '@type': 'External',
            '@id': 'linkedin',
            title: 'Linkedin',
            tooltip: 'Join the Community',
            icon: 'assets/images/icon-linkedin.svg',
            iconColor: '#000000',
            endpoint: 'https://www.linkedin.com/company/ixoworld',
            accessToken: null,
            permissions: [
              {
                credential: null,
                role: null,
              },
            ],
            data: null,
            parameters: null,
          },
        ],
      },
    },
    createNewTitle: 'Create Assets',
    urlPart: 'asset',
  },
}
