import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { classnames } from '../../utils/styles';

function Children({ match, child }) {
  Children.propTypes = {
    match: PropTypes.bool,
    child: PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string,
    }),
  };

  const classes = classnames({
    ddm_element: true,
    active: match,
  });

  return (
    <div className={classes}>
      <Link className="text" to={child.link}>
        {child.title}
      </Link>
    </div>
  );
}

function ItemWithChildren({ match, item }) {
  ItemWithChildren.propTypes = {
    match: PropTypes.bool,
    item: PropTypes.shape({
      children: PropTypes.array,
      title: PropTypes.string,
      icon: PropTypes.string,
    }),
  };

  const classes = classnames({
    'element m_element': true,
    active: match,
  });

  return (
    <div className={classes}>
      {item.icon && <div className={`icon icon_${item.icon}`} />}
      <div className="text">{item.title}</div>
      {item.children && (
        <Fragment>
          <div className="dropdown_button" />
          <div className="dropdown_menu">
            {item.children.map(child => (
              <Route path={child.link} key={child.title} exact>
                <Children child={child} />
              </Route>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}

function ItemWithLink({ match, item }) {
  ItemWithLink.propTypes = {
    match: PropTypes.bool,
    item: PropTypes.shape({
      link: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
    }),
  };

  const classes = classnames({
    'element m_element': true,
    active: match,
  });

  return (
    <Link className={classes} to={item.link}>
      <div className={`icon icon_${item.icon}`} />
      <div className="text">
        {item.title}
      </div>
    </Link>
  );
}

export default function MenuItem({ item }) {
  MenuItem.propTypes = {
    item: PropTypes.shape({
      children: PropTypes.array,
      link: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
    }),
  };

  let currentPath = '-';

  if (item.children) {
    currentPath = `(${item.children.map(child => child.link)
      .join('|')})`;
  }

  if (item.children) {
    return (
      <Route path={currentPath}>
        <ItemWithChildren item={item} />
      </Route>
    );
  }

  if (item.link) {
    return (
      <Route path={item.link}>
        <ItemWithLink item={item} />
      </Route>
    );
  }

  return (
    <div className={classnames({ 'element m_element': true })}>
      <div className={`icon icon_${item.icon}`} />
      <div className="text">
        {item.title}
      </div>
    </div>
  );
}
