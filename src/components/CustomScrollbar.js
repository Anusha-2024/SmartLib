import React, { useRef } from 'react';

const arrowStyle = {
  cursor: 'pointer',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  backgroundColor: 'rgba(0,0,0,0.1)',
  borderRadius: '12px',
  margin: '4px 0',
};

const scrollContainerStyle = {
  position: 'relative',
  height: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: '#888 #f1f1f1',
};

const scrollbarWrapperStyle = {
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '32px', // enough width for scrollbar + arrows
};

const CustomScrollbar = ({ children, scrollStep = 50, style }) => {
  const scrollRef = useRef(null);

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -scrollStep, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: scrollStep, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ ...scrollbarWrapperStyle, ...style }}>
      <div style={arrowStyle} onClick={scrollUp} aria-label="Scroll Up" role="button" tabIndex={0}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
      <div
        ref={scrollRef}
        style={{ ...scrollContainerStyle, flex: 1, width: '100%' }}
      >
        {children}
      </div>
      <div style={arrowStyle} onClick={scrollDown} aria-label="Scroll Down" role="button" tabIndex={0}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
};

export default CustomScrollbar;
