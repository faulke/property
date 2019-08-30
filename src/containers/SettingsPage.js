import React, { Component } from 'react';
import {
  Container,
  Header,
  Content
} from 'rsuite';
import PageHeader from '../components/shared/PageHeader';

class SettingsPage extends Component {
  render() {
    return (
      <Container>
        <Header>
          <PageHeader
            title={"Settings"}
          />
        </Header>
        <Content />
      </Container>
    );
  }
}

export default SettingsPage;
