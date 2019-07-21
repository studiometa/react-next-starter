import React from 'react';


const Skeleton = (props) => {
  const elements = [];

  for (let i = 0; i < props.count; i++) {
    let style = {
      animation: 'sk-screen-progress ' + String(props.duration) + 's ease-in-out infinite',
    };
    if (props.width !== null) {
      style.width = props.width;
    }
    if (props.height !== null) {
      style.height = props.height;
    }
    if (props.isCover === true) {
      style.lineHeight = 'normal';
    }
    elements.push(
      <span key={i} className="react-loading-skeleton" style={style}>&zwnj;</span>,
    );
  }

  const Wrapper = props.wrapper;
  return (
    <span className={props.className} style={props.style}>
    {
      Wrapper
        ? elements.map((element, i) =>
          <Wrapper key={i}>{element}&zwnj;</Wrapper>,
        )
        : elements
    }
    </span>
  );
};

Skeleton.defaultProps = {
  count: 1,
  duration: 1.2,
  width: null,
  wrapper: null,
};

export default React.memo(Skeleton);