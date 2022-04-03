import React from 'react';
import { Container } from 'reactstrap';
import Navi from '../navi/Navi'
import DashBoard from '../root/DashBoard';
import { Switch, Route } from "react-router-dom"
import CartDetail from '../cart/CartDetail';
import AddOrUpdateProduct from '../products/AddOrUpdateProduct';

function App() {
  return (
    <Container>
      <Navi />

      <Switch>

        <Route path="/" exact component={DashBoard} />
        <Route path="/product" exact component={DashBoard} />

        <Route path="/saveproduct/:productId" component={AddOrUpdateProduct} />
        <Route path="/cart" exact component={CartDetail} />

      </Switch>
    </Container>
  );
}

export default App;
