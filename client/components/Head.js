import React  from 'react';
import Head   from 'next/head';
import config from '../../config';


/**
 * This component generates the <head> tag of the pages
 */
export default (props) => {
  const metaData = [...config.seo.defaultMetaTags, ...props.metaData];
  const title    = props.title || config.seo.defaultPagesTitle || require('../../package').name;
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