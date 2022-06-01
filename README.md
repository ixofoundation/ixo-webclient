<h1>IXO Web </h1>
<p>This project serves as the Front-end Web platform for the IXO ecosystem.</p>
<h2>Built Using </h2>
<ul>
	<li><a href="https://github.com/wmonk/create-react-app-typescript">Create React App - TypeScript</a></li>
	<li><a href="https://www.styled-components.com/">Styled Components</a></li>
	<li><a href="https://redux.js.org/">Redux</a></li>
</ul>

<h2>Built to work with </h2>
<p>Back-end for all API calls and DID management</p>

<ul>
	<li><a href="https://github.com/ixofoundation/ixo-apimodule">IXO Module</a></li>
	<li><a href="https://github.com/ixofoundation/ixo-keysafe">IXO Key Extension</a></li>
</ul>

<h2>
Setup
</h2>
<code>
	npm install
</code>

<h2>Running</h2>

<h3>Development</h3>
<code>
	cp .env-example .env
</code>

<code>
	npm run dev
</code>

<h3>Build & production</h3>

<code>npm run build</code>
<br/>
<code>npm start</code>
 

<h2>Architecture & flow</h2>


<h3>Styling </h3>
IXO-Web is styled using styled components. all styling information is kept within a component. The main file - App.tsx contains theme information, where you can add variables for use through the Web App.

<h3>Container Components </h3>

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
    
<h1>License</h1>

Apache 2.0 license
