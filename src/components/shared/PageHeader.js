import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'rsuite';
import { Link } from 'react-router';
import styles from './pageHeader.less';

const ButtonLink = props => <Button componentClass={Link} {...props} />;

const PageHeader = ({ title, btnStyle, btnLink, btnTitle }) => (
  <Row className={styles.pageHeader}>
    <Col sm={1} xsHidden />
    <Col sm={6} xs={12}>
      <h1 className={styles.headerTitle}>{title}</h1>
    </Col>
    {
      btnStyle ?
        <Col sm={5} smPull={1} className={styles.headerRight}>
          <ButtonLink
            appearance={btnStyle}
            to={btnLink}
          >{btnTitle}</ButtonLink>
        </Col> :
        ''
    }
  </Row>
);

PageHeader.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  btnStyle: PropTypes.string,
  btnLink: PropTypes.string,
  btnTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

PageHeader.defaultProps = {
  btnStyle: 'default',
  btnLink: null,
  btnTitle: null
};

export default PageHeader;
