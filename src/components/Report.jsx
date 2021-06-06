import React from "react";
import {
  Container,
  Header,
  Message,
  Segment,
  Image,
  List,
  Table,
  TableBody,
} from "semantic-ui-react";

function Report(props) {
  const report = JSON.parse(localStorage.report);
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
        <p>All technologies that tool collected:</p>
        <TechnologiesSegments
          list={[
            report.wapp.technologies,
            report.netcraft.technologies,
            report.largeio.technologies,
            report.whatweb.technologies,
            report.webtech.technologies,
          ]}
        />
      </Segment>
      <Segment>
        <Header as="h2" content="Domain" />
        <DomainWhoisSegment whois={report.whois} />
      </Segment>
      <Segment>
        <Header as="h2" content="Directories" />
        <Header as="h3" content="Wappalyzer tree" />
        <p>This information extract from wappalyzer result analyze.</p>
        <DirectoriesDicSegment dic={report.dic} />
        <hr />
        <Header as="h3" content="Gobuster tree" />
        <DirectoriesGobusterSegment gobuster={report.gobuster} />
      </Segment>
      <Segment>
        <Header as="h2" content="DNS" />
        <DnsDigSegment dig={report.dig} />
      </Segment>
      <Segment>
        <Header as="h2" content="Detect website application firewall" />
        <DetectWafSegment wafs={report.wafw00f} />
      </Segment>

      <Segment>
        <Header as="h2" content="Vulnerabilities" />
        <VulnerabiltiesSegment vulns={report.vulns} />
      </Segment>
    </Container>
  );
}

export default Report;

function TechnologiesSegments(props) {
  const list = props.list ? props.list : [];

  function CreateRow([wapp, netcraft, largeio, whatweb, webtech], key) {
    return (
      <Table.Row key={key}>
        <Table.Cell>{wapp}</Table.Cell>
        <Table.Cell>{netcraft}</Table.Cell>
        <Table.Cell>{largeio}</Table.Cell>
        <Table.Cell>{whatweb}</Table.Cell>
        <Table.Cell>{webtech}</Table.Cell>
      </Table.Row>
    );
  }

  function compareFunc(objA, objB) {
    return objA.name.charCodeAt(0) - objB.name.charCodeAt(0);
  }

  function CreateTableContent(props) {
    let list = props.list ? props.list : [];
    list = list.map((element) => {
      return element.sort(compareFunc);
    });

    let listLongest = list.reduce((total, element) => {
      return total.length > element.length ? total : element;
    });

    return listLongest.map((element, index) => {
      return CreateRow(
        [
          list[0][index] ? list[0][index].name : null,
          list[1][index] ? list[1][index].name : null,
          list[2][index] ? list[2][index].name : null,
          list[3][index] ? list[3][index].name : null,
          list[4][index] ? list[4][index].name : null,
        ],
        index
      );
    });
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Wappalyzer</Table.HeaderCell>
          <Table.HeaderCell>Netcraft</Table.HeaderCell>
          <Table.HeaderCell>Largeio</Table.HeaderCell>
          <Table.HeaderCell>Whatweb</Table.HeaderCell>
          <Table.HeaderCell>Webtech</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <CreateTableContent list={list} />
      </Table.Body>
    </Table>
  );
}

function DomainWhoisSegment(props) {
  const whois = props.whois ? props.whois : {};
  const domains = whois.domains ? whois.domains : {};
  return (
    <div>
      <b>Domain name</b>:
      {domains.domain_name ? (
        domains.domain_name.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Creation date</b>:
      {domains.creation_date ? (
        domains.creation_date.map((ele, index) => {
          return <p key={index}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Dnssec</b>:
      {domains.dnssec ? (
        domains.dnssec.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Email</b>:{" "}
      {domains.email ? (
        domains.email.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Expiration date</b>:
      {domains.expiration_date ? (
        domains.expiration_date.map((ele, index) => {
          return <p key={index}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Name server</b>:
      {domains.name_server ? (
        domains.name_server.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Org</b>:
      {domains.org ? (
        domains.org.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Referral url</b>:
      {domains.referral_url ? (
        domains.referral_url.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Registrar</b>:
      {domains.registrar ? (
        domains.registrar.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>State</b>:
      {domains.state ? (
        domains.state.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Status</b>:{" "}
      {domains.status ? (
        domains.status.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Updated date</b>:{" "}
      {domains.updated_date ? (
        domains.updated_date.map((ele, index) => {
          return <p key={index}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Whois server</b>:
      {domains.whois_server ? (
        domains.whois_server.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Address</b>:
      {domains.address ? (
        domains.address.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>City</b>:
      {domains.city ? (
        domains.city.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Country</b>:
      {domains.country ? (
        domains.country.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
      <b>Zipcode</b>:
      {domains.zipcode ? (
        domains.zipcode.map((ele) => {
          return <p key={ele}>{ele}</p>;
        })
      ) : (
        <p>unknown</p>
      )}
    </div>
  );
}

function DirectoriesDicSegment(props) {
  const dic = props.dic ? props.dic : {};
  const tree = dic.trees ? dic.trees : JSON.stringify({});
  function createTree(dic) {
    let keys = Object.keys(dic);

    return keys.map((key) => {
      if (dic[key] === "{}") {
        return (
          <li key={key}>
            <Image
              alt="file"
              src="/icons/website/sticky-note-regular.svg"
              wrapped
              className="img"
            />
            {" " + key}
          </li>
        );
      } else {
        return (
          <li id={key} key={key}>
            <Image
              alt="file"
              src="/icons/website/folder-solid.svg"
              wrapped
              className="img"
            />
            {" " + key}
            <ul>{createTree(dic[key])}</ul>
          </li>
        );
      }
    });
  }

  return <div>{createTree(JSON.parse(tree))}</div>;
}

function DirectoriesGobusterSegment(props) {
  const _gobuster = props.gobuster ? props.gobuster : {};
  const gobuster = _gobuster.gobuster ? _gobuster.gobuster : {};
  return (
    <div>
      <ul>
        {!Array.isArray(gobuster.directories) ? (
          <p></p>
        ) : (
          gobuster.directories.map((ele, index) => {
            return (
              <li key={index}>
                <Image
                  alt="folder"
                  src="/icons/website/folder-solid.svg"
                  wrapped
                  className="img"
                />
                {" " + ele}
              </li>
            );
          })
        )}
      </ul>
      <ul>
        {!Array.isArray(gobuster.files) ? (
          <p></p>
        ) : (
          gobuster.files.map((ele, index) => {
            return (
              <li key={index}>
                <Image
                  alt="file"
                  src="/icons/website/sticky-note-regular.svg"
                  wrapped
                  className="img"
                />
                {" " + ele}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

function DnsDigSegment(props) {
  const dig = props.dig ? props.dig : {};
  const dns = dig.dns ? JSON.parse(dig.dns) : {};
  return (
    <div>
      <Table basic="very" celled collapsing>
        <TableBody>
          {(() => {
            let keys = Object.keys(dns);

            return keys.map((key, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>Type {key}</Table.Cell>
                  <Table.Cell>
                    {dns[key]
                      .split("\n")
                      .filter((element) => element !== "")
                      .map((element, index) => (
                        <code key={index}>
                          {element === "\n" || !element ? null : element}
                          <br />
                        </code>
                      ))}
                  </Table.Cell>
                </Table.Row>
              );
            });
          })()}
        </TableBody>
      </Table>
    </div>
  );
}

function DetectWafSegment(props) {
  const wafw00f = props.wafw00f ? props.wafw00f : {};
  const wafs = wafw00f.waf ? wafw00f.waf : [];
  return (
    <div>
      {wafs.map((ele, index) => {
        return (
          <div key={index}>
            <b>Firewall:</b>
            <p>{ele.firewall}</p>
            <b>Manufacturer:</b>
            <p>{ele.manufacturer}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

function VulnerabiltiesSegment(props) {
  const vulns = props.vulns ? props.vulns : [];
  return (
    <Table fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>EDB-ID</Table.HeaderCell>
          <Table.HeaderCell>Path</Table.HeaderCell>
          <Table.HeaderCell>Platform</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {vulns.map((vuln, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{vuln["Author"]}</Table.Cell>
              <Table.Cell>{vuln["Date"]}</Table.Cell>
              <Table.Cell>{vuln["EDB-ID"]}</Table.Cell>
              <Table.Cell>
                <a href={vuln["Path"]} target="_blank">
                  {vuln["Path"]}
                </a>
              </Table.Cell>
              <Table.Cell>{vuln["Platform"]}</Table.Cell>
              <Table.Cell>{vuln["Title"]}</Table.Cell>
              <Table.Cell>{vuln["Type"]}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
