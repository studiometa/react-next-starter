import React         from 'react';
import Socket        from '../../../lib/socket';
import DocPageLayout from '../../components/_doc/DocPageLayout';
import Layout        from '../../components/common/PageLayout';
import pageWrapper   from '../../lib/pageWrapper';
import Error         from '../../pages/_error';


const API_SEGMENT = 'intro';

const DocIntro = class extends React.Component {
  static async getInitialProps({ lang }) {
    const socket = new Socket();
    socket.setLang(lang);
    try {
      const docData = await socket.get(socket.resolveUrl('/{{lang}}', '/_doc', API_SEGMENT));
      return { docData };
    } catch (error) {
      return { error };
    }
  }


  render() {
    const { pageData, docData } = this.props;

    if (typeof docData !== 'object' || this.props.error) {
      return <Error statusCode={this.props.error ? this.props.error.statusCode : 500}/>;
    }

    return (
      <Layout pageData={pageData}>
        <DocPageLayout data={docData}/>
      </Layout>
    );
  }
};


export default pageWrapper(DocIntro, {
  name: '_doc',
});
