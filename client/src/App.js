import { Switch, Route } from 'react-router-dom' //import these two from react-router-dom

//Components
import Landing from './components/Landing'
import Home from './components/Home'
import UploadPost from './components/Form/UploadPost'

//HOC which wraps around other components
import Layout from './components/common/Layout'
import Login from './components/Form/Login'
import SignUp from './components/Form/SignUp'
import Profile from './components/Profile'

// CSS imports
import "./css/App.css";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={"/"} component={Landing} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/profile/upload"} component={UploadPost} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/signup"} component={SignUp} />
        <Route exact path={"/profile"} component={Profile} />
      </Switch>
    </Layout>
  );
};

export default App;
