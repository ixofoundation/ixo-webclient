# IXO Webclient

![Twitter Follow](https://img.shields.io/twitter/follow/ixoworld?style=social)
![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)

This project serves as the Front-end Web platform for the IXO ecosystem.

## Built Using

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Built to work with

Back-end for all API calls and DID management.

- [IXO Module](https://github.com/ixofoundation/ixo-apimodule)
- [IXO Key Extension](https://github.com/ixofoundation/ixo-keysafe) [ Depreciated in favor of upcoming mobile client]

## Setup

```shell
yarn install
```

## Running

### Development

```shell
cp .env-example .env
```

```shell
yarn run dev
```

When changing file names please ensure to have run the following command:

```shell
git config core.ignorecase false
```

### Build & production

```shell
yarn build
yarn start
```

## Deployment

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ixofoundation/ixo-webclient)

### Akash

[![Akash](https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/akash%20button.svg)](https://github.com/ixofoundation/ixo-webclient/blob/impact/akash.deploy.yaml)

### Docker

- Clone the repo, select between dev or impact branches

```shell
git clone https://github.com/ixofoundation/ixo-webclient && cd ixo-webclient && git checkout impact
```

- Rename the .env.example to .env and configure .env
- Configure the nginx config default.conf as needed
- Now build the docker image with

```shell
docker build -t ixo-webclient:latest .
```

Now run the image with either of these two options.

#### Docker run

- -p specifies the port used to the last number must replicate was is seen in default.conf

```shell
docker run -p 3000:3000 ixo-webclient:latest
```

#### Docker-compose

Modify the port value to the value specified in default.conf if it was changed.

```shell
docker-compose up -d
```

### Akash

[![Akash](.infra/akash/akash%20button.svg)](.infra/akash/akash.deploy.yaml)

## Architecture & flow

### Styling

IXO-Web is styled using styled components. all styling information is kept within a component. The main file - App.tsx contains theme information, where you can add variables for use through the Web App.

### Container Components

- **App**  
   Displays state-based views for projects lists (eg. Overivew, Loading, Dashboard).

- **ProjectContainer**  
   Contains logic for all single-project data and views (eg. Overview, Dashboard, List Providers).

- **ProjectsContainer**  
   Contains logic for listing projects and initiation of IXO-Module & IXO-Keysafe Objects.

- **HeaderContainer**  
   Contains logic related to network status.

# License

Apache 2.0 license