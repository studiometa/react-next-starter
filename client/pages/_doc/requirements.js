import Typography  from '@material-ui/core/Typography';
import React       from 'react';
import LazyImage   from '../../components/utils/LazyImage';
import Layout      from '../../components/common/PageLayout';
import pageWrapper from '../../lib/pageWrapper';
import Grid from '@material-ui/core/Grid'
import DocPageLayout from '../../components/_doc/DocPageLayout'


const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit * 4,
  },
});

const DocRequirements = class extends React.Component {
  render() {
    const { pageData, classes } = this.props;

    return (
      <Layout pageData={pageData}>
        <DocPageLayout>
          DocRequirements
        </DocPageLayout>
      </Layout>
    );
  }
};


export default pageWrapper(DocRequirements, {
  name: '_doc',
  noPageData: true,
  styles,
});
