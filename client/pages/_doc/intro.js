import React         from 'react';
import DocPageLayout from '../../components/_doc/DocPageLayout';
import Layout        from '../../components/common/PageLayout';
import pageWrapper   from '../../lib/pageWrapper';
import PageBuilder from '../../components/utils/PageBuilder'

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit * 4,
  },
});

const DocIntro = class extends React.Component {
  render() {
    const { pageData, classes } = this.props;

    return (
      <Layout pageData={pageData}>
        <DocPageLayout>
          <PageBuilder structure={pageData.pageBuilder}/>
        </DocPageLayout>
      </Layout>
    );
  }
};


export default pageWrapper(DocIntro, {
  name: '_doc',
  styles,
});
