import React, { Component } from 'react';
import {
  Container,
  Header,
  Content
} from 'rsuite';
import PageHeader from '../components/shared/PageHeader';

class ListingsPage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <PageHeader
            title={"Rental Listings"}
          />
        </Header>
        <Content />
      </Container>
    );
  }
}

export default ListingsPage;
