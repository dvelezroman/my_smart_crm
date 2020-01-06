import Login from './app/Login/LoginScreen';
import PeopleTable from 'app/People/PeopleTable';
import ClientTable from 'app/Client/ClientTable';
import CompanyTable from 'app/Company/CompanyTable';
import TypeTable from 'app/Type/TypeTable';
import MailConfigForm from 'app/Config/MailConfigForm';
import NewClientForm from 'app/Client/NewClientForm';
import NewCompanyForm from 'app/Company/NewCompanyForm';
import NewPersonForm from 'app/People/NewPersonForm';
import NewTypeForm from 'app/Type/NewTypeForm';
import InsuranceTable from 'app/Insurance/InsuranceTable';
import NewInsuranceForm from 'app/Insurance/NewInsuranceForm';
import ReactTables from 'views/tables/ReactTables';

const routes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: 'nc-icon nc-bank',
		component: InsuranceTable,
		layout: '/admin'
	},
	{
		collapse: true,
		name: 'Sesión',
		icon: 'nc-icon nc-book-bookmark',
		state: 'pagesCollapse',
		views: [
			{
				path: '/login',
				name: 'Cerrar sesión',
				mini: 'CS',
				component: Login,
				layout: '/auth'
			}
		]
	},
	{
		collapse: true,
		name: 'Nuevo',
		icon: 'nc-icon nc-ruler-pencil',
		state: 'formsCollapse',
		views: [
			{
				path: '/new-insurance-form',
				name: 'Nueva Cuenta Seguro',
				mini: 'NSF',
				component: NewInsuranceForm,
				layout: '/admin'
			},
			{
				path: '/new-client-form',
				name: 'Nuevo Cliente',
				mini: 'NCF',
				component: NewClientForm,
				layout: '/admin'
			},
			{
				path: '/new-company-form',
				name: 'Nueva Compañía',
				mini: 'NCF',
				component: NewCompanyForm,
				layout: '/admin'
			},
			{
				path: '/new-person-form',
				name: 'Nueva Persona',
				mini: 'NPF',
				component: NewPersonForm,
				layout: '/admin'
			},
			{
				path: '/new-type-form',
				name: 'Nuevo Tipo de Seguro',
				mini: 'NTF',
				component: NewTypeForm,
				layout: '/admin'
			},
			{
				path: '/mail-config-form',
				name: 'Envío de correos',
				mini: 'EC',
				component: MailConfigForm,
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Información',
		icon: 'nc-icon nc-single-copy-04',
		state: 'tablesCollapse',
		views: [
			{
				path: '/insurance-table',
				name: 'Seguros',
				mini: 'ST',
				component: InsuranceTable,
				layout: '/admin'
			},
			{
				path: '/company-table',
				name: 'Compañías',
				mini: 'CoT',
				component: CompanyTable,
				layout: '/admin'
			},
			{
				path: '/client-table',
				name: 'Clientes',
				mini: 'CT',
				component: ClientTable,
				layout: '/admin'
			},
			{
				path: '/people-table',
				name: 'Personas',
				mini: 'PT',
				component: PeopleTable,
				layout: '/admin'
			},
			{
				path: '/type-table',
				name: 'Tipos de Seguro',
				mini: 'TT',
				component: TypeTable,
				layout: '/admin'
			},
			{
				path: '/react-table',
				name: 'React Tables',
				mini: 'ET',
				component: ReactTables,
				layout: '/admin'
			}
		]
	}
];

export default routes;
