import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'rsuite';
import { Link } from 'react-router';
import styles from './pageHeader.less';

const ButtonLink = props => <Button componentClass={Link} {...props} />;

const PageHeader = ({ title, btnStyle, btnLink, btnTitle }) => (
  <Grid fluid>
    <Row className={styles.pageHeader}>
      <Col md={20} sm={24}>
        <h1 className={styles.headerTitle}>{title}</h1>
      </Col>
      {
        btnTitle ?
          <Col md={4} sm={24} className={styles.headerRight}>
            <ButtonLink
              appearance={btnStyle}
              to={btnLink}
            >{btnTitle}</ButtonLink>
          </Col> :
          ''
      }
    </Row>
  </Grid>

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
