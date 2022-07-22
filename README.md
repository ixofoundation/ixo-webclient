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

##	Running

###	Development
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

## Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://github.com/ixofoundation/ixo-webclient)
 
### Docker run
Back-end for all API calls and DID management
```shell
docker run --env-file .env 
```

### Docker-compose
Copy or download the docker-compose.yaml and .env.example
```shell
docker-compose up -d
```

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
	Contains logic related to network status

    
# License

Apache 2.0 license
