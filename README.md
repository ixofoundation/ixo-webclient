# IXO Web 
This project serves as the Front-end Web platform for the IXO ecosystem.
## Built Using 
<ul>
	<li><a href="https://github.com/wmonk/create-react-app-typescript">Create React App - TypeScript</a></li>
	<li><a href="https://www.styled-components.com/">Styled Components</a></li>
	<li><a href="https://redux.js.org/">Redux</a></li>
</ul>

## Built to work with
Back-end for all API calls and DID management

<ul>
	<li><a href="https://github.com/ixofoundation/ixo-apimodule">IXO Module</a></li>
	<li><a href="https://github.com/ixofoundation/ixo-keysafe">IXO Key Extension</a></li>
</ul>

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
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)]()
 
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

<ul>
 <li>
	<strong>App</strong> <br/>
	Displays state-based views for projects lists (eg. Overivew, Loading, Dashboard)
</li>
 <li>
	<strong>ProjectContainer</strong><br/></li>
	Contains logic for all single-project data and views (eg. Overview, Dashboard, List Providers)
 <li>
	 <strong>ProjectsContainer</strong><br/>
	 Contains logic for listing projects and initiation of IXO-Module & IXO-Keysafe Objects.
</li>
 <li>
	 <strong>HeaderContainer</strong><br/>
	 Contains logic related to network status
</li>
    
# License

Apache 2.0 license