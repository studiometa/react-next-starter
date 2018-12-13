import PropTypes from 'prop-types';
import React     from 'react';



/**
 * The purpose of this component is to generate blocks
 */
class PageBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.makeBlock = this.makeBlock.bind(this);
  }


  static propTypes = {
    structure: PropTypes.object.isRequired,
  };


  makeBlock(block, key) {
    if (!block.type) {
      return process.env.NODE_ENV === 'development'
        ? `PageBuilder: no block found for type ${block.type}`
        : null;
    }
    try {
      const capitalize = require('../../../../helpers/capitalize');
      const Component  = require(`./blocks/${capitalize(block.type)}`).default;
      return React.createElement(Component, { key, ...block });
    } catch (err) {
      return process.env.NODE_ENV === 'development'
        ? `PageBuilder: no block found for type ${block.type}`
        : null;
    }
  }


  render() {
    const { structure } = this.props;

    if (!structure || !Array.isArray(structure.blocks)) {
      return process.env === 'development'
        ? 'PageBuilder error: the provided structure is invalid'
        : null;
    }
    return (
      <div>
        {structure.blocks.map(this.makeBlock)}
      </div>
    );
  }
}



export default PageBuilder;