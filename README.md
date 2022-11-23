# IXO Web

This project serves as the Front-end Web platform for the IXO ecosystem.

## Built Using

- [Create react app - TypeScript](https://github.com/wmonk/create-react-app-typescript)
- [Styled Components](https://www.styled-components.com)
- [Redux](https://redux.js.org)

## Built to work with

Back-end for all API calls and DID management

- [IXO Module](https://github.com/ixofoundation/ixo-apimodule)
- [IXO Key Extension](https://github.com/ixofoundation/ixo-keysafe)

## Setup

```shell
npm install
```

## Running

### Development

```shell
cp .env-example .env
```

```shell
npm run dev
```

### Build & production

```shell
npm run build
npm start
```

## Deployment

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ixofoundation/ixo-webclient)

### Docker

- Clone the repo, select between dev or impact

```shell
git clone https://github.com/ixofoundation/ixo-webclient && cd ixo-webclient && git checkout impact
```

- Rename the .env.example to .env and configure .env
- Configure the nginx config default.conf as needed
- Now build the docker image with

```shell
docker build -t ixo-webclient:latest .
```

Now run the image with either of these two options

#### Docker run

- -p specifies the port used to the last number must replicate was is seen in default.conf

```shell
docker run -p 3000:3000 ixo-webclient:latest
```

#### Docker-compose

Modify the port value to the value specified in default.conf if it was changed

```shell
docker-compose up -d
```
### Akash

[![Akash](https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/akash%20button.svg)](https://github.com/ixofoundation/ixo-webclient/blob/impact/akash.deploy.yaml) 


## Architecture & flow

### Styling

IXO-Web is styled using styled components. all styling information is kept within a component. The main file - App.tsx contains theme information, where you can add variables for use through the Web App.

### Container Components

- **App**  
   Displays state-based views for projects lists (eg. Overivew, Loading, Dashboard)

- **ProjectContainer**  
   Contains logic for all single-project data and views (eg. Overview, Dashboard, List Providers)

- **ProjectsContainer**  
   Contains logic for listing projects and initiation of IXO-Module & IXO-Keysafe Objects.

- **HeaderContainer**  
   Contains logic related to network status.

# License

Apache 2.0 license
