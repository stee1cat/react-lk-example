import React, { Fragment } from 'react';

export default function Unit({ value }) {
  const exp = /^м([23])$/i.exec(value);

  if (exp) {
    return (
      <Fragment>
        м<sup>{exp[1]}</sup>
      </Fragment>
    );
  }

  return value;
}
