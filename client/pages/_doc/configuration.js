import React         from 'react';
import DocPageLayout from '../../components/_doc/DocPageLayout';
import Layout        from '../../components/common/PageLayout';
import pageWrapper   from '../../lib/pageWrapper';


const DOC_NAME = 'configuration';

const DocConfiguration = class extends React.Component {
  render() {
    const { pageData } = this.props;

    return (
      <Layout pageData={pageData}>
        <DocPageLayout name={DOC_NAME}/>
      </Layout>
    );
  }
};


export default pageWrapper(DocConfiguration, {
  name: '_doc',
});
