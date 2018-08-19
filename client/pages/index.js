import React                       from 'react';
import Layout                      from '../components/PageLayout';
import pageWrapper                 from '../lib/pageWrapper';


const styles = theme => ({});

const Home = class extends React.Component {

  render() {

    const pageData    = this.props.pageData || { content: {} };
    const { classes } = this.props;

    return (
      <Layout pageData={this.props.pageData}>
        Sweet home
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
