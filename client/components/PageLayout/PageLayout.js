import React from 'react';



class PageLayout extends React.Component {


  render() {
    return (
      <div className="page-layout">
        {this.props.children}
      </div>
    );
  }
}



export default PageLayout;