import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './pageHeader.less';

const PageHeader = ({ title, btnStyle, btnLink, btnTitle }) => (
  <Row className={styles.pageHeader}>
    <Col xs={7}>
      <h1 className={styles.headerTitle}>{title}</h1>
    </Col>
    {
      btnStyle ?
        <Col xs={5} className={styles.headerRight}>
          <Link to={btnLink} className={btnStyle}>{btnTitle}</Link>
        </Col> :
        ''
    }
  </Row>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  btnStyle: PropTypes.string,
  btnLink: PropTypes.string,
  btnTitle: PropTypes.string
};

PageHeader.defaultProps = {
  btnStyle: null,
  btnLink: null,
  btnTitle: null
};

export default PageHeader;
