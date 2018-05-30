import React from 'react';
import Head  from '../Head';


/**
 *  This component is a simple page layout that must be added to every pages of the app.
 *  Note that in order to work properly, this component needs a 'pageData' prop that contains
 *  all the information about the page (those information has generally been fetched from an API but it can also
 *  be a simple config file !). This prop will principally be used for SEO purpose, like generating the page <head>
 *  children like metas, title, etc.
 *
 *  Note that all other props passed to this component (except 'children' of course) will be passed
 *  to the Head component. It means that you can easily override some pageData properties like title for example.
 * @param props
 * @returns {*}
 */
export default (props) => {

  let { pageData = {}, children, ...rest } = props;

  // Here we are merging all other props to the pageData object
  // that will next be sent to the Head component

  Object.assign(pageData, rest);

  return (
    <div className={`page-layout page-${pageData.title}`}>
      <Head {...pageData} />
      {children}
    </div>
  );
}


