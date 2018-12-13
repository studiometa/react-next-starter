import React, { Component } from 'react';
import wrapper from '../../../../lib/componentWrapper'
import Typography from '@material-ui/core/Typography'

class Text extends Component {
  render() {

    return (
      <Typography {...this.props.options}>
        {this.props.value}
      </Typography>
    );
  }
}



export default wrapper(Text, {hasStyles: false, isTranslatable: false});