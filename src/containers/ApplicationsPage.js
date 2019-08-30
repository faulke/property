import React, { Component } from 'react';
import {
  Container,
  Header,
  Content
} from 'rsuite';
import PageHeader from '../components/shared/PageHeader';

class ApplicationsPage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <PageHeader
            title={"Applications"}
          />
        </Header>
        <Content />
      </Container>
    );
  }
}

export default ApplicationsPage;
