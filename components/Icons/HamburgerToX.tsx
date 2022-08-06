import React from 'react';

export const HamburgerToX = (props: any) => {
  return (
    <svg width="23" height="18" viewBox="0 0 23 18" onClick={() => props.setOpen(!props.isOpen)}>
      <path
        fill="transparent"
        strokeWidth={2}
        stroke={props.color}
        strokeLinecap="round"
        style={{ transition: '0.5s' }}
        d={props.isOpen ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5'}
        color={props.color}
      />
      <path
        fill="transparent"
        strokeWidth={2}
        stroke={props.color}
        strokeLinecap="round"
        style={{ transition: '0.5s' }}
        color={props.color}
        d="M 2 9.423 L 20 9.423"
        opacity={props.isOpen ? 0 : 1}
      />
      <path
        fill="transparent"
        strokeWidth={2}
        stroke={props.color}
        strokeLinecap="round"
        style={{ transition: '0.5s' }}
        d={props.isOpen ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346'}
        color={props.color}
      />
    </svg>
  );
};
