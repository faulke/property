import React, { Component } from 'react';
import {
  Container,
  Header,
  Content
} from 'rsuite';
import PageHeader from '../components/shared/PageHeader';

class ReportsPage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <PageHeader
            title={"Reports"}
          />
        </Header>
        <Content />
      </Container>
    );
  }
}

export default ReportsPage;
