import React       from 'react';
import Link        from '../components/Link';
import Layout      from '../components/PageLayout';
import withRedux   from 'next-redux-wrapper';
import createStore from '../../store/createStore';



class Home extends React.Component {
  static getInitialProps({ store, isServer, pathname, query }) {

    // If it's a server, then all async actions must be done before return or return a promise
    if (isServer) {

      return new Promise((res) => {
        setTimeout(() => {
          store.dispatch({ type: 'TICK', payload: 'server' });
          res({ custom: 'custom server' });
        }, 200);
      });
    }

    // If it's a client, then it does not matter because client can be progressively rendered
    store.dispatch({ type: 'TICK', payload: 'client' });

    return { custom: 'custom client' };

  }


  render() {
    return (
      <Layout>
        <div>
          <h2>Home</h2>
          <div>Redux tick: {this.props.tick} (this page)</div>
          <div>Custom: {this.props.custom}</div>
          <Link to={`/products`}>Products</Link>
        </div>
      </Layout>
    );
  }
}



withRedux.setDebug(true);

export default withRedux(createStore, state => state)(Home);