import React from "react";
import { host } from '../lib_front'
import {
  Container,
  Header,
  Message,
  Segment,
  Image,
  List,
} from "semantic-ui-react";
import {
  TabScanDroope,
  TabScanWp,
  TabScanJoom,
  TabServerNikto,
  TabServerNmap,
  VulnerabiltiesSegment,
  DetectWafSegment,
  DnsDigSegment,
  DnsFierceSegment,
  DirectoriesDicSegment,
  DirectoriesGobusterSegment,
  DomainWhoisSegment,
  DomainSublist3rSegment,
  TechnologiesSegments
} from './result'

function Report(props) {
  const report = JSON.parse(localStorage.report);
  const linkImg = `${host}/analyze_result/screenshot?pic=${report.pic}`;

  function handleError(e) {
    e.target.style.display = 'none'
  }
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
          rel="noreferrer"
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
          alt={report.pic}
          size="big"
          centered
          bordered
          onError={handleError}
        />
      </Segment>
      <Segment>
        <Header as="h2" content="Technologies" />
        <h3>Runtime:</h3>
        <ul style={{ listStyleType: "circle", paddingLeft: "30px" }}>
          <li>Wappalyzer: {report.wapp ? report.wapp.runtime : "unknown"}</li>
          <li>Netcraft: {report.netcraft ? report.netcraft.runtime : "unknown"}</li>
          <li>Largeio: {report.largeio ? report.largeio.runtime : "unknown"}</li>
          <li>Webtech: {report.webtech ? report.webtech.runtime : "unknown"}</li>
          <li>Whatweb: {report.whatweb ? report.whatweb.runtime : "unknown"}</li>
        </ul>
        <h3>All technologies that tool collected:</h3>
        <TechnologiesSegments
          list={[
            report.wapp ? report.wapp.technologies : [],
            report.netcraft ? report.netcraft.technologies : [],
            report.largeio ? report.largeio.technologies : [],
            report.whatweb ? report.whatweb.technologies : [],
            report.webtech ? report.webtech.technologies : [],
          ]}
        />
      </Segment>
      <Segment>
        <Header as="h2" content="Domain" />
        <h3>Runtime:</h3>
        <ul style={{ listStyleType: "circle", paddingLeft: "30px" }}>
          <li>Whois: {report.whois ? report.whois.runtime : "unknown"}</li>
          <li>Sublist3r: {report.sublist3r ? report.sublist3r.runtime : "unknown"}</li>
        </ul>
        <hr />
        <DomainWhoisSegment whois={report.whois} />
        <hr />
        <DomainSublist3rSegment sublist3r={report.sublist3r} />
      </Segment>
      <Segment>
        <Header as="h2" content="Directories" />
        <h3>Runtime:</h3>
        <ul style={{ listStyleType: "circle", paddingLeft: "30px" }}>
          <li>Gobuster: {report.gobuster ? report.gobuster.runtime : "unknown"}</li>
        </ul>
        <hr />
        <DirectoriesDicSegment dic={report.dic} />
        <hr />
        <DirectoriesGobusterSegment gobuster={report.gobuster} />
      </Segment>
      <Segment>
        <Header as="h2" content="DNS" />
        <h3>Runtime:</h3>
        <ul style={{ listStyleType: "circle", paddingLeft: "30px" }}>
          <li>Dig: {report.dig ? report.dig.runtime : "unknown"}</li>
          <li>Fierce: {report.fierce ? report.fierce.runtime : "unknown"}</li>
        </ul>
        <hr />
        <DnsDigSegment dig={report.dig} />
        <hr />
        <DnsFierceSegment fierce={report.fierce} />
      </Segment>
      <Segment>
        <Header as="h2" content="Detect website application firewall" />
        <h3>Runtime:</h3>
        <ul style={{ listStyleType: "circle", paddingLeft: "30px" }}>
          <li>Wafw00f: {report.wafw00f ? report.wafw00f.runtime : "unknown"}</li>
        </ul>
        <hr />
        <DetectWafSegment wafs={report.wafw00f} />
      </Segment>

      <Segment>
        <Header as="h2" content="Server information" />
        <h3>Runtime:</h3>
        <ul style={{ listStyleType: "circle", paddingLeft: "30px" }}>
          <li>Nmap: {report.nmap ? report.nmap.runtime : "unknown"}</li>
          <li>Nikto: {report.nikto ? report.nikto.runtime : "unknown"}</li>
        </ul>
        <hr />
        <TabServerNmap nmap={report.nmap} />
        <hr />
        <TabServerNikto nikto={report.nikto} />
      </Segment>

      <Segment>
        <Header as="h2" content="CMS scan" />
        <h3>Runtime:</h3>
        <ul style={{ listStyleType: "circle", paddingLeft: "30px" }}>
          <li>Wpscan: {report.wpscan ? report.wpscan.runtime : "unknown"}</li>
          <li>Droopescan: {report.droopescan ? report.droopescan.runtime : "unknown"}</li>
          <li>Joomscan: {report.joomscan ? report.joomscan.runtime : "unknown"}</li>
        </ul>
        <hr />
        <TabScanWp wpscan={report.wpscan} />
        <hr />
        <TabScanDroope droopescan={report.droopescan} />
        <hr />
        <TabScanJoom joomscan={report.joomscan} />
      </Segment>

      <Segment>
        <Header as="h2" content="Vulnerabilities" />
        <hr />
        <VulnerabiltiesSegment vulns={report.vulns} />
      </Segment>
    </Container>
  );
}

export default Report;

