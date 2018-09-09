import React       from 'react';
import Layout      from '../components/PageLayout';
import pageWrapper from '../lib/pageWrapper';


const readme = require('../../README.md');

const styles = theme => ({});

const Readme = class extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Layout pageData={this.props.pageData} noPageData>
        <div dangerouslySetInnerHTML={{ __html: readme }}/>
      </Layout>
    );
  }
};

const mapStateToProps = state => ({});

export default pageWrapper(Readme, {
  mapStateToProps,
  name: 'readme',
  styles,
  noPageData: true
});
