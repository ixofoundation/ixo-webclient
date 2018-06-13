# IXO Web
This project serves as the Front-end Web platform for the IXO ecosystem. 

## Built Using
- [x] [Create React App - TypeScript](https://github.com/wmonk/create-react-app-typescript) 
- [x] [Styled Components](https://github.com/wmonk/create-react-app-typescript) 
- [x] [Create React App - TypeScript](https://github.com/wmonk/create-react-app-typescript) 

## Built to work with
- [x] [IXO Module](https://github.com/wmonk/create-react-app-typescript) 
- [x] [IXO Key Extension](https://github.com/wmonk/create-react-app-typescript) 

## Setup
```
$ npm install
```

## Running

## Development
```
$ npm run dev
```

## Build & production
```
$ npm run build
$ npm start
```

## Architecture & flow

### Styling
IXO-Web is styled using styled components. all styling information is kept within a component. The amin App.tsx file contains theme information, where you can add variables for use through the Web App.

### Container Components
  * **App
    Contains logic for listing projects and initiation of IXO-Module & IXO-Keysafe Objects.
  * **ProjectContainer
    Displays state-based views for projects lists (eg. Overivew, Loading, Dashboard)
  * **ProjectContainer 
    Contains logic for all single-project data and views (eg. Overview, Dashboard, List Providers)
  * **HeaderContainer
    Contains logic related to network status
    
# License

MIT
