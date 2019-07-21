import React       from 'react';
import Layout      from '../components/common/PageLayout';
import pageWrapper from '../lib/pageWrapper';


const readme = require('../../README.md');

const styles = theme => ({
  mdContent: {
    fontFamily: theme.typography.fontFamily,
    '&> h1': {
      marginBottom: theme.spacing(8),
    },
    '&> h2': {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(6),
    },
    '&> h3': {
      marginTop: theme.spacing(4),
    },
    '& * code, & pre': {
      background: '#fff',
      padding: 2,
    },
    '& p, & * p, & * li': {
      'line-height': '1.5em',
    },
    '& table, & * table': {
      borderCollapse: 'collapse',
      border: `1px solid ${theme.palette.grey[200]}`,
      '& td, & tr, & th': {
        border: `1px solid ${theme.palette.grey[200]}`,
        padding: theme.spacing(0.5),
      },
    },
  },
});

const Readme = React.memo(function ({ classes, t = e => e, pageData }) {
  return (
    <Layout title={t('menu_links.readme')} pageData={pageData}>
      <div dangerouslySetInnerHTML={{ __html: readme }} className={classes.mdContent}/>
    </Layout>
  );
});

export default pageWrapper(Readme, {
  styles,
  name: 'readme',
  noPageData: true,
});
