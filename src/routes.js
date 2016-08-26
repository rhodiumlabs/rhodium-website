import Root from './containers/Root';
import Contact from './containers/Contact';
import People from './containers/People';
import About from './containers/About';
import App from './containers/App';
import Collaborate from './containers/Collaborate';


const routes = {
  path: '/',
  component: Root,
  indexRoute: { component: App },
  childRoutes: [
    {path:'/contact', component: Contact},
    {path:'/people',  component: People},
    {path:'/collaborate', component: Collaborate},
    {path:'/about', component: About}
  ]
}
export default routes;