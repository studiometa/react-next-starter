import React  from 'react';
import Router from 'next/router';



class PageLayout extends React.Component {
  constructor() {
   super();
    this.state = { isLoading: false };
  }



  componentDidMount() {
    Router.onRouteChangeStart    = url => {
      this.setState({ isLoading: true });
    };
    Router.onRouteChangeComplete = url => {
      this.setState({ isLoading: false });
    };
  }


  render() {
    return (
      <div className="page-layout">
        {this.state.isLoading === true && <p>Loading...</p>}
        {this.props.children}
      </div>
    );
  }
}



export default PageLayout;