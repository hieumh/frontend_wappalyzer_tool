import React, { useState } from "react";
import {
  Container,
  Header,
  Message,
  Segment,
  Image,
  List,
  Table,
  TableBody,
  Accordion,
  Icon
} from "semantic-ui-react";

function Report(props) {
  const report = JSON.parse(localStorage.report);
  const linkImg = `http://localhost:3000/analyze_result/screenshot?pic=${report.pic}`;
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
          <li>whois: {report.whois ? report.whois.runtime : "unknown"}</li>
          <li>sublist3r: {report.sublist3r ? report.sublist3r.runtime : "unknown"}</li>
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
          <li>gobuster: {report.gobuster ? report.gobuster.runtime : "unknown"}</li>
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
    let list = Array.isArray(props.list) ? props.list : [];
    list = list.map((element) => {
      if (Array.isArray(element)) {
        return element.sort(compareFunc);
      }
      return []
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

function DomainSublist3rSegment(props) {
  const sublist3r = props.sublist3r ? props.sublist3r : {}
  const domains = Array.isArray(sublist3r.domains) ? sublist3r.domains : []
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }
  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}><Icon name='dropdown' />Sublist3r</Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
        <div style={{ height: "30vh", overflow: "auto" }}>{
          domains.map((element, index) => {
            return <p key={index}>{element}</p>
          })
        }
        </div>
      </Accordion.Content>
    </Accordion>)
}

function DomainWhoisSegment(props) {
  const whois = props.whois ? props.whois : {};
  const domain = whois.domains ? whois.domains : {};
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }

  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Whois
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }} id="whois">
        <Table basic="very" celled collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Domain name</Table.Cell>
              <Table.Cell>{domain.domain_name != null ? (
                domain.domain_name.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Creation date</Table.Cell>
              <Table.Cell>{domain.creation_date != null ? (
                domain.creation_date.map((ele, index) => {
                  return <p key={index}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Dnssec</Table.Cell>
              <Table.Cell>{domain.dnssec != null ? (
                domain.dnssec.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell> {domain.email != null ? (
                domain.email.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Expiration date</Table.Cell>
              <Table.Cell>{domain.expiration_date != null ? (
                domain.expiration_date.map((ele, index) => {
                  return <p key={index}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Name server</Table.Cell>
              <Table.Cell>{domain.name_server != null ? (
                domain.name_server.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Org</Table.Cell>
              <Table.Cell>{domain.org != null ? (
                domain.org.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Referral url</Table.Cell>
              <Table.Cell>{domain.referral_url != null ? (
                domain.referral_url.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Registrar</Table.Cell>
              <Table.Cell>{domain.registrar != null ? (
                domain.registrar.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>State</Table.Cell>
              <Table.Cell>{domain.state != null ? (
                domain.state.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>{domain.status != null ? (
                domain.status.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Updated date</Table.Cell>
              <Table.Cell> {domain.updated_date != null ? (
                domain.updated_date.map((ele, index) => {
                  return <p key={index}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Whois server</Table.Cell>
              <Table.Cell>{domain.whois_server != null ? (
                domain.whois_server.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Address</Table.Cell>
              <Table.Cell>{domain.address != null ? (
                domain.address.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>City</Table.Cell>
              <Table.Cell>{domain.city != null ? (
                domain.city.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Country</Table.Cell>
              <Table.Cell>{domain.country != null ? (
                domain.country.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Zipcode</Table.Cell>
              <Table.Cell>{domain.zipcode != null ? (
                domain.zipcode.map((ele) => {
                  return <p key={ele}>{ele}</p>;
                })
              ) : (
                <p>unknown</p>
              )}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Accordion.Content>
    </Accordion>
  );
}

function DirectoriesDicSegment(props) {
  const dic = props.dic ? props.dic : {};
  const tree = dic.trees ? dic.trees : JSON.stringify({});
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }

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

  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Wappalyzer tree
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
        {createTree(JSON.parse(tree))}
      </Accordion.Content>
    </Accordion>
  );
}

function DirectoriesGobusterSegment(props) {
  const _gobuster = props.gobuster ? props.gobuster : {};
  const gobuster = _gobuster.gobuster ? _gobuster.gobuster : {};
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }

  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Gobuster
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
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
      </Accordion.Content>
    </Accordion>
  );
}

function DnsDigSegment(props) {
  const dig = props.dig ? props.dig : {};
  const dns = dig.dns ? JSON.parse(dig.dns) : {};
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }

  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Dig
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
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
      </Accordion.Content>
    </Accordion>
  );
}

function DnsFierceSegment(props) {
  const temp = props.fierce ? props.fierce : {}
  let fierce = temp.dns ? temp.dns : ""
  let output = fierce.replaceAll('"', "").replace(/\\n|\\t/g, "|");
  output = output.split("|");
  output = output.filter((element) => element.length);
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }

  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Fierce
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
        {output.map((element, index) => (
          <code key={index}>
            {element === "\n" || !element ? null : element}
            <br />
          </code>
        ))}
      </Accordion.Content>
    </Accordion>)
}

function DetectWafSegment(props) {
  const wafw00f = props.wafs ? props.wafs : {};
  const wafs = wafw00f.waf ? wafw00f.waf : [];
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }

  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Wafw00f
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
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
      </Accordion.Content>
    </Accordion>)
}

function VulnerabiltiesSegment(props) {
  const vulns = props.vulns ? props.vulns : [];
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
  }

  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Vulnerabilties
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
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
                    <a href={vuln["Path"]} target="_blank" rel="noreferrer">
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
      </Accordion.Content>
    </Accordion>
  );
}

function TabServerNmap(props) {
  const temp1 = props.nmap ? props.nmap : {};
  const nmap = temp1.nmap ? temp1.nmap : "";

  const [active, setActive] = useState(false)

  function handleClick(e) {
    setActive(!active)
  }

  return (<>
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick} >
        <Icon name='dropdown' />
        Nmap
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
        {nmap.split("\n").map((element, index) => (
          <code key={index}>
            {element === "\n" || !element ? null : element}
            <br />
          </code>
        ))}
      </Accordion.Content>
    </Accordion>
  </>);
}

function TabServerNikto(props) {
  const temp2 = props.nikto ? props.nikto : {};
  const nikto = temp2.nikto ? JSON.parse(temp2.nikto) : {};
  const [active, setActive] = useState(false)

  function handleClick(e) {
    setActive(!active)
  }
  if (nikto.empty) {
    return <div></div>
  }
  return (
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Nikto
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
        <h3>Server basic information:</h3>
        <Table striped celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Host</Table.Cell>
              <Table.Cell>{nikto.host}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>IP</Table.Cell>
              <Table.Cell>{nikto.ip}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Port</Table.Cell>
              <Table.Cell>{nikto.port}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Banner</Table.Cell>
              <Table.Cell>{nikto.banner}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <h3>Vulnerabilities:</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>OSVDB</Table.HeaderCell>
              <Table.HeaderCell>Method</Table.HeaderCell>
              <Table.HeaderCell>Message</Table.HeaderCell>
              <Table.HeaderCell>Url</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              Array.isArray(nikto.vulnerabilities) ? nikto.vulnerabilities.map((vuln, index) => {
                return (<Table.Row key={index}>
                  <Table.Cell>{vuln.id}</Table.Cell>
                  <Table.Cell>{vuln.OSVDB}</Table.Cell>
                  <Table.Cell>{vuln.method}</Table.Cell>
                  <Table.Cell>{vuln.msg}</Table.Cell>
                  <Table.Cell>{vuln.url}</Table.Cell>
                </Table.Row>)
              }) : null
            }

          </Table.Body>
        </Table>
      </Accordion.Content>
    </Accordion>
  );
}

function TabScanJoom(props) {
  const result = props.joomscan ? props.joomscan : {}
  const joomscan = result.joomscan ? result.joomscan.joomscan : { empty: true }
  const [active, setActive] = useState(false)
  console.log(joomscan)

  function handleClick(e) {
    setActive(!active)
  }

  return (<>
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Joomscan
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
        {!joomscan.empty ? joomscan.split('\n').map((element, index) => {
          return (<>
            <code key={index}>
              {element}
            </code><br />
          </>)
        }) : ""}
      </Accordion.Content>
    </Accordion>
  </>)
}

function TabScanWp(props) {
  const result = props.wpscan ? props.wpscan : {}
  const wpscan = result.wp ? result.wp : {}
  const themeClassic = wpscan.themes ? wpscan.themes.classic : null
  const themeDef = wpscan.themes ? wpscan.themes.default : null
  const [active, setActive] = useState(false)

  function handleClick(e) {
    setActive(!active)
  }

  const keyPlug = Object.keys(wpscan.plugins ? wpscan.plugins : {})

  return (<>
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Wpscan
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>
        <h3>Target information:</h3>
        <div style={{ overflow: "auto" }}>
          <Table striped celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>IP</Table.Cell>
                <Table.Cell>{wpscan.target_ip ? wpscan.target_ip : "unknown"}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Url</Table.Cell>
                <Table.Cell>{wpscan.target_url ? wpscan.target_url : "unknown"}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Effective url</Table.Cell>
                <Table.Cell>{wpscan.effective_url ? wpscan.effective_url : "unknown"}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Interesting finding</Table.Cell>
                <Table.Cell>{Array.isArray(wpscan.interesting_findings) ? wpscan.interesting_findings.map((element, index) => {
                  return <div key={index}>
                    <p>Confindence: {element.confidence}</p>
                    <p>Found by: {element.found_by}</p>
                    <p>Type: {element.type}</p>
                    <p>Url: {element.url}</p>
                    <pre>Interesting entry:{Array.isArray(element.interesting_entries) ? "\n" + element.interesting_entries.join("\n") : element.interesting_entries}</pre>
                    <hr />
                  </div>
                }) : "unknown"}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Main theme</Table.Cell>
                <Table.Cell>{wpscan.main_theme ? (
                  <ul>
                    <li>Author: {wpscan.main_theme.author}</li>
                    <li>Description: {wpscan.main_theme.description}</li>
                    <li>Latest version: {wpscan.main_theme.latest_version}</li>
                    <li>location: {wpscan.main_theme.location}</li>
                  </ul>
                ) : "unknown"}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <h3>Theme information:</h3>
        <div style={{ overflow: "auto" }}>
          {!themeClassic && !themeDef ? null : (
            <Table celled >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Author</Table.HeaderCell>
                  <Table.HeaderCell>Link</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Latest version</Table.HeaderCell>
                  <Table.HeaderCell>Found by</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Style name</Table.HeaderCell>
                  <Table.HeaderCell>Style url</Table.HeaderCell>
                  <Table.HeaderCell>Version</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {!themeClassic ? null : (
                  <Table.Row>
                    <Table.Cell>{themeClassic.author}</Table.Cell>
                    <Table.Cell>{themeClassic.author_uri}</Table.Cell>
                    <Table.Cell>{themeClassic.description}</Table.Cell>
                    <Table.Cell>{themeClassic.latest_version}</Table.Cell>
                    <Table.Cell>{themeClassic.found_by}</Table.Cell>
                    <Table.Cell>{themeClassic.location}</Table.Cell>
                    <Table.Cell>{themeClassic.style_name}</Table.Cell>
                    <Table.Cell>{themeClassic.style_url}</Table.Cell>
                    <Table.Cell>{themeClassic.version ? themeClassic.version.number : ""}</Table.Cell>
                  </Table.Row>
                )}
                {
                  !themeDef ? null : (
                    <Table.Row>
                      <Table.Cell>{themeDef.author}</Table.Cell>
                      <Table.Cell>{themeDef.author_uri}</Table.Cell>
                      <Table.Cell>{themeDef.description}</Table.Cell>
                      <Table.Cell>{themeDef.latest_version}</Table.Cell>
                      <Table.Cell>{themeDef.found_by}</Table.Cell>
                      <Table.Cell>{themeDef.location}</Table.Cell>
                      <Table.Cell>{themeDef.style_name}</Table.Cell>
                      <Table.Cell>{themeDef.style_url}</Table.Cell>
                      <Table.Cell>{themeDef.version ? themeDef.version.number : ""}</Table.Cell>
                    </Table.Row>
                  )
                }
              </Table.Body>
            </Table>
          )
          }
        </div>

        <h3>Plugins information:</h3>
        {
          !wpscan.plugins ? null : (<Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Confidence</Table.HeaderCell>
                <Table.HeaderCell>Version</Table.HeaderCell>
                <Table.HeaderCell>Last updated</Table.HeaderCell>
                <Table.HeaderCell>Latest version</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Found by</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                Array.isArray(keyPlug) ? keyPlug.map((key, index) => {

                  let plugInfor = wpscan.plugins[key]
                  return (<Table.Row key={index}>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{plugInfor.confidence}</Table.Cell>
                    <Table.Cell>{plugInfor.version}</Table.Cell>
                    <Table.Cell>{plugInfor.last_updated}</Table.Cell>
                    <Table.Cell>{plugInfor.latest_version}</Table.Cell>
                    <Table.Cell>{plugInfor.location}</Table.Cell>
                    <Table.Cell>{plugInfor.found_by}</Table.Cell>
                  </Table.Row>)
                }) : null
              }
            </Table.Body>
          </Table>)
        }
      </Accordion.Content>
    </Accordion>
  </>)
}

function TabScanDroope(props) {
  const result = props.droopescan ? props.droopescan : {}
  let droope = result.droope ? result.droope.droopescan : {}
  droope = {
    "interesting urls": { is_empty: true },
    "version": { is_empty: true },
    "theme": { is_empty: true },
    ...droope
  }
  const [active, setActive] = useState(false)

  function handleClick(e) {
    setActive(!active)
  }

  if (droope.empty) {
    return null
  }
  return (<>
    <Accordion fluid styled>
      <Accordion.Title active={active} onClick={handleClick}>
        <Icon name='dropdown' />
        Droopescan
      </Accordion.Title>
      <Accordion.Content active={active} style={{ backgroundColor: 'white' }}>

        <h3>CMS information:</h3>
        <Table striped celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{droope.cms_name ? droope.cms_name : "unknown"}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Host</Table.Cell>
              <Table.Cell>{droope.host ? droope.host : "unknown"}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Interesting url</Table.Cell>
              <Table.Cell>{!droope["interesting urls"].is_empty ? droope["interesting urls"].finds.map((element, index) => {
                return <div key={index}><p>{element.url}</p><p>{element.description}</p><hr /></div>
              }) : "unknown"}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Version</Table.Cell>
              <Table.Cell>{!droope["version"].is_empty ? droope["version"].finds.map((element, index) => {
                return <div key={index}><p>{element}</p><hr /></div>
              }) : "unknown"}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Theme</Table.Cell>
              <Table.Cell>{!droope["theme"].is_empty ? droope["theme"].finds.map((element, index) => {
                return <div key={index}><p>{element}</p><hr /></div>
              }) : "unknown"}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <h3>Theme information:</h3>
        {!droope.theme ? null : (<Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Url</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              Array.isArray(droope.theme.finds) ? droope.theme.finds.map((theme, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{theme.name}</Table.Cell>
                    <Table.Cell>{theme.url}</Table.Cell>
                  </Table.Row>
                )
              }) : null
            }
          </Table.Body>
        </Table>)}
        <h3>Plugins information:</h3>
        {!droope.plugins ? null : (<Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Url</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              Array.isArray(droope.plugins.finds) ? droope.plugins.finds.map((plugin, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{plugin.name}</Table.Cell>
                    <Table.Cell>{plugin.url}</Table.Cell>
                  </Table.Row>
                )
              }) : null
            }
          </Table.Body>
        </Table>)}
      </Accordion.Content>
    </Accordion>
  </>)
}