import React, { Component } from 'react';
import {
  Container,
  Header,
  Content
} from 'rsuite';
import PageHeader from '../components/shared/PageHeader';

class PaymentsPage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <PageHeader
            title={"Payments"}
          />
        </Header>
        <Content />
      </Container>
    );
  }
}

export default PaymentsPage;
