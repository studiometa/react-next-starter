import Head   from 'next/head';
import React  from 'react';
import config from '../../config';


/**
 * This component generates the <head> tag of the pages
 */
export default (props) => {

  let metaData = props.metaData;

  // Just in case 'metaData' will be an object an not an array (it should always be
  // an array but the API is currently returning an object so...)
  if (typeof metaData === 'object' && !Array.isArray((metaData))) {
    metaData = Object.entries(metaData).map(([name, content]) => {
      return { name, content };
    });
  }

  metaData = [...config.seo.defaultMetaTags, ...(metaData || [])];

  const title = props.title || config.seo.defaultPagesTitle || require('../../package').name;

  return (
    <Head>
      <title>{title}</title>
      {
        metaData.length > 0 &&
        metaData.map((meta, key) =>
          React.createElement(
            'meta',
            {
              key: meta.name || key,
              ...meta,
            },
          ),
        )
      }
    </Head>
  );
};