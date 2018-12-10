import React       from 'react';
import Layout      from '../components/common/PageLayout';
import pageWrapper from '../lib/pageWrapper';


const readme = require('../../README.md');


const Readme = class extends React.Component {

  render() {

    return (
      <Layout title={this.props.t('menu_links.readme')} pageData={this.props.pageData}>
        <div dangerouslySetInnerHTML={{ __html: readme }}/>
      </Layout>
    );
  }
};

const mapStateToProps = state => ({});

export default pageWrapper(Readme, {
  mapStateToProps,
  name: 'readme',
  noPageData: true
});
