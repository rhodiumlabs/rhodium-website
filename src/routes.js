import Root from './containers/Root';
import Contact from './containers/Contact';
import People from './containers/People';
import About from './containers/About';
import App from './containers/App';
import Process from './containers/Process';
import Collaborate from './containers/Collaborate';


const routes = {
  path: '/',
  component: Root,
  indexRoute: { component: App },
  childRoutes: [
    {path:'/about', component: About},
    {path:'/people',  component: People},
/*    {path:'/process', component: Process}, */
    {path:'/contact', component: Contact},
  ]
}
export default routes;
