import React       from 'react';
import Layout      from '../components/common/PageLayout';
import pageWrapper from '../lib/pageWrapper';


const readme = require('../../README.md');

const styles = theme => ({
  mdContent: {
    fontFamily: theme.typography.fontFamily,
    '&> h1': {
      marginBottom: theme.spacing.unit * 8,
    },
    '&> h2': {
      marginBottom: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 6,
    },
    '&> h3': {
      marginTop: theme.spacing.unit * 4,
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
        padding: theme.spacing.unit / 2,
      },
    },
  },
});

const Readme = class extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { classes, t = e => e } = this.props;
    return (
      <Layout title={t('menu_links.readme')} pageData={this.props.pageData}>
        <div dangerouslySetInnerHTML={{ __html: readme }} className={classes.mdContent}/>
      </Layout>
    );
  }
};

const mapStateToProps = state => ({});

export default pageWrapper(Readme, {
  mapStateToProps,
  styles,
  name: 'readme',
  noPageData: true,
});
