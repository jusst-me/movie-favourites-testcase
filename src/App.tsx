import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './main.scss';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './pages/home/home';
import MovieDetail from './pages/movie/movie';
import AddMovie from './pages/add-movie/add-movie';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/add-movie'>
            <AddMovie />
          </Route>
          <Route path='/movie/:id'>
            <MovieDetail />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
