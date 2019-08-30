import React, { Component } from 'react';
import {
  Container,
  Header,
  Content
} from 'rsuite';
import PageHeader from '../components/shared/PageHeader';

class MaintenancePage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <PageHeader
            title={"Maintenance"}
          />
        </Header>
        <Content />
      </Container>
    );
  }
}

export default MaintenancePage;
