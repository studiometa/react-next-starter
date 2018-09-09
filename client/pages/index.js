import React       from 'react';
import Layout      from '../components/PageLayout';
import pageWrapper from '../lib/pageWrapper';



const styles = theme => ({});

const Home = class extends React.Component {

  render() {
    return (
      <Layout pageData={this.props.pageData}>
        home
      </Layout>
    );
  }
};

const mapStateToProps = state => ({});

export default pageWrapper(Home, {
  mapStateToProps,
  name: 'home',
  styles,
});
