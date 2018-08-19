import React       from 'react';
import Layout      from '../components/PageLayout';
import pageWrapper from '../lib/pageWrapper';


const readme = require('../../README.md');

const styles = theme => ({});

const Home = class extends React.Component {

  render() {
    console.log(readme);
    const pageData    = this.props.pageData || { content: {} };
    const { classes } = this.props;

    return (
      <Layout pageData={this.props.pageData}>

        <div dangerouslySetInnerHTML={{ __html: readme }}/>
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
