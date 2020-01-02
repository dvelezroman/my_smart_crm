import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import AuthLayout from 'layouts/Auth.jsx';
import AdminLayout from 'layouts/Admin.jsx';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/paper-dashboard.scss?v=1.1.0';
import 'assets/demo/demo.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import LocalStorage from 'business/storage/LocalStorage';
import envs from './envs';

const hist = createBrowserHistory();
const cache = new InMemoryCache();

const httpLink = new HttpLink({
	uri: envs.SERVERURL
});

const authLink = setContext((_, { headers }) => {
	const token = LocalStorage.getToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache
	// credentials: 'same-origin',
});

ReactDOM.render(
	<Router history={hist}>
		<ApolloProvider client={client}>
			<Switch>
				<Route path='/auth' render={props => <AuthLayout {...props} />} />
				<Route path='/admin' render={props => <AdminLayout {...props} />} />
				<Redirect to='/admin/dashboard' />
			</Switch>
		</ApolloProvider>
	</Router>,
	document.getElementById('root')
);
