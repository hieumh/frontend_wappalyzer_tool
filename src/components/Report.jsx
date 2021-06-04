import React from "react";
import {
  Container,
  Header,
  Message,
  Segment,
  Image,
  List,
  Table
} from "semantic-ui-react";

function Report(props) {
  const report = JSON.parse(localStorage.report);
  console.log(report);
  const linkImg = `http://localhost:3000/analyze_result/screenshot?pic=${report.pic}`;
  // return <div>{json2htmlver2(JSON.parse(localStorage.report))}</div>
  return (
    <Container style={{ margin: 20 }}>
      <Header as="h1" dividing>
        Enumeration information report
      </Header>
      <Message info>
        Semantic UI React does not provide any carousel component. In this
        prototype we want to show how you can implement your own carousel with
        SUIR and{" "}
        <a
          href="https://www.npmjs.com/package/pure-react-carousel"
          target="_blank"
        >
          <code>pure-react-carousel</code>
        </a>
      </Message>

      <Segment>
        <Header as="h2" content="About website" />
        <List as="ul">
          <List.Item as="li">Url: {report.url}</List.Item>
          <List.Item as="li">Time create: {report.time_create}</List.Item>
        </List>
        <Image
          src={linkImg}
          alt="screenshot image"
          alt={report.pic}
          size="big"
          centered
          bordered
        />
      </Segment>
      <Segment>
        <Header as="h2" content="Technologies" />
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Arguments</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>reset rating</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>Resets rating to default value</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>set rating</Table.Cell>
              <Table.Cell>rating (integer)</Table.Cell>
              <Table.Cell>
                Sets the current star rating to specified value
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Segment>
        <Header as="h2" content="Domain" />
        <p>
          This prototype features how to create a carousel with the{" "}
          <code>Card</code> component, take a look into{" "}
          <code>examples/CardCarousel</code> to get more details.
        </p>
      </Segment>
      <Segment>
        <Header as="h2" content="Directories" />
        <p>
          This prototype features how to create a carousel with the{" "}
          <code>Card</code> component, take a look into{" "}
          <code>examples/CardCarousel</code> to get more details.
        </p>
      </Segment>
      <Segment>
        <Header as="h2" content="DNS" />
        <p>
          This prototype features how to create a carousel with the{" "}
          <code>Card</code> component, take a look into{" "}
          <code>examples/CardCarousel</code> to get more details.
        </p>
      </Segment>
      <Segment>
        <Header as="h2" content="Detect website application firewall" />
        <p>
          This prototype features how to create a carousel with the{" "}
          <code>Card</code> component, take a look into{" "}
          <code>examples/CardCarousel</code> to get more details.
        </p>
      </Segment>

      <Segment>
        <Header as="h2" content="Vulnerabilities" />
        <p>
          This prototype features how to create a carousel with the{" "}
          <code>Card</code> component, take a look into{" "}
          <code>examples/CardCarousel</code> to get more details.
        </p>
      </Segment>

      <Segment>
        List tool use
        <List as="ul">
          <List.Item as="li">Wappalyzer: </List.Item>
          <List.Item as="li">Netcraft: </List.Item>
          <List.Item as="li">Largeio: </List.Item>
          <List.Item as="li">Whatweb: </List.Item>
          <List.Item as="li">Webtech: </List.Item>
        </List>
      </Segment>
    </Container>
  );
}

export default Report;

function TechnologiesSegments(props) {
  return <div></div>;
}

function DomainSegment(props) {
  return <div></div>;
}

function DirectoriesSegment(props) {
  return <div></div>;
}

function DnsSegment(props) {
  return <div></div>;
}

function DetectWafSegment(props) {
  return <div></div>;
}

function VulnerabiltiesSegment(props) {
  return <div></div>;
}
