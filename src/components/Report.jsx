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
import { json2htmlver2 } from "../lib_front";

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
        <ul style={{listStyleType:"circle", paddingLeft:"30px"}}>
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
        <ul style={{listStyleType:"circle", paddingLeft:"30px"}}>
          <li>whois: {report.whois ? report.whois.runtime : "unknown"}</li>
          <li>sublist3r: {report.sublist3r ? report.sublist3r.runtime : "unknown"}</li>
        </ul>
        <DomainWhoisSegment whois={report.whois} />
        <hr />
        <DomainSublist3rSegment sublist3r={report.sublist3r} />
      </Segment>
      <Segment>
        <Header as="h2" content="Directories" />
        <h3>Runtime:</h3>
        <ul style={{listStyleType:"circle", paddingLeft:"30px"}}>
          <li>gobuster: {report.gobuster ? report.gobuster.runtime : "unknown"}</li>
        </ul>
        <Header as="h3" content="Wappalyzer tree" />
        <p>This information extract from wappalyzer result analyze.</p>
        <DirectoriesDicSegment dic={report.dic} />
        <hr />
        <Header as="h3" content="Gobuster tree" />
        <DirectoriesGobusterSegment gobuster={report.gobuster} />
      </Segment>
      <Segment>
      <Header as="h2" content="DNS" />
      <h3>Runtime:</h3>
        <ul style={{listStyleType:"circle", paddingLeft:"30px"}}>
          <li>Dig: {report.dig ? report.dig.runtime : "unknown"}</li>
          <li>Fierce: {report.fierce ? report.fierce.runtime : "unknown"}</li>
        </ul>
        <DnsDigSegment dig={report.dig} />
        <hr />
        <DnsFierceSegment fierce={report.fierce} />
      </Segment>
      <Segment>
      <Header as="h2" content="Detect website application firewall" />
      <h3>Runtime:</h3>
        <ul style={{listStyleType:"circle", paddingLeft:"30px"}}>
          <li>Wafw00f: {report.wafw00f ? report.wafw00f.runtime : "unknown"}</li>
        </ul>
        <DetectWafSegment wafs={report.wafw00f} />
      </Segment>

      <Segment>
        <Header as="h2" content="Server information" />
        <h3>Runtime:</h3>
        <ul style={{listStyleType:"circle", paddingLeft:"30px"}}>
          <li>Nmap: {report.nmap ? report.nmap.runtime : "unknown"}</li>
          <li>Nikto: {report.nikto ? report.nikto.runtime : "unknown"}</li>
        </ul>
        <ServerInformationSegment nmap={report.nmap} nikto={report.nikto} />
      </Segment>

      <Segment>
        <Header as="h2" content="CMS scan" />
        <h3>Runtime:</h3>
        <ul style={{listStyleType:"circle", paddingLeft:"30px"}}>
          <li>Wpscan: {report.wpscan ? report.wpscan.runtime : "unknown"}</li>
          <li>Droopescan: {report.droopescan ? report.droopescan.runtime : "unknown"}</li>
          <li>Joomscan: {report.joomscan ? report.joomscan.runtime : "unknown"}</li>
        </ul>
        <CMSScanSegment wpscan={report.wpscan} droopescan={report.droopescan} joomscan={report.joomscan} />
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
    let list = Array.isArray(props.list) ? props.list : [];
    list = list.map((element) => {
      if(Array.isArray(element)){
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

function DomainSublist3rSegment(props){
  const sublist3r = props.sublist3r ? props.sublist3r : {}
  const domains = Array.isArray(sublist3r.domains) ? sublist3r.domains : []
  return(<>
    <h3>Sublist3r</h3>
    <div style={{height:"30vh",overflow:"auto"}}>{
      domains.map((element,index)=>{
        return <p key={index}>{element}</p>
      })
    }
    </div>
    
  </>)
}

function DomainWhoisSegment(props) {
  const whois = props.whois ? props.whois : {};
  const domains = whois.domains ? whois.domains : {};
  return (
    <div>
      <h3>Whois</h3>
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

function DnsFierceSegment(props){
  const temp = props.fierce ? props.fierce : {}
  let fierce = temp.dns ? temp.dns : ""
  let output = fierce.replaceAll('"', "").replace(/\\n|\\t/g, "|");
  output = output.split("|");
  output = output.filter((element) => element.length);

  return(<div>
    <h3 style={{fontSize: "1.28571429rem"}}>Fierce</h3>
    {output.map((element, index) => (
      <code key={index}>
        {element === "\n" || !element ? null : element}
        <br />
      </code>
    ))}
  </div>)
}

function DetectWafSegment(props) {
  const wafw00f = props.wafs ? props.wafs : {};
  const wafs = wafw00f.waf ? wafw00f.waf : [];

  return (
    <div>
      <h3>Wafw00f</h3>
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
  );
}

function ServerInformationSegment(props) {
  const temp1 = props.nmap ? props.nmap : {};
  const nmap = temp1.nmap ? temp1.nmap : "";
  const temp2 = props.nikto ? props.nikto : {};
  const nikto = temp2.nikto ? JSON.parse(temp2.nikto) : {};

  return (
    <>
      <div>
        <h3 style={{fontSize: "1.28571429rem"}}>Nmap</h3>
        {nmap.split("\n").map((element, index) => (
          <code key={index}>
            {element === "\n" || !element ? null : element}
            <br />
          </code>
        ))}
      </div>
      <hr />
      <div>
        <h3 style={{fontSize: "1.28571429rem"}}>Nikto</h3>
        {json2htmlver2(nikto)}
      </div>
    </>
  );
}

function CMSScanSegment(props){
  const result = {
    wpscan:props.wpscan ? props.wpscan : {},
    droopescan:props.droopescan ? props.droopescan : {},
    joomscan:props.joomscan ? props.joomscan : {},
  }
  

  const wpscan = result.wpscan.wp ? result.wpscan.wp : {}
  const droopescan = result.droopescan.droope ? result.droopescan.droope : {}
  const joomscan = result.joomscan.joomscan ? result.joomscan.joomscan : {}

  return (<>
    <div>
      <h3>Wpscan</h3>
      {
        json2htmlver2(wpscan)
      }
    </div>
    <hr /> 
    <div>
      <h3>Droopescan</h3>
      {
        json2htmlver2(droopescan)
      }
    </div>
    <hr /> 
    <div>
      <h3>Joomscan</h3>
      {
        joomscan.joomscan ? joomscan.joomscan.split('\n').map((element,index)=>{
          return (<>
          <code key={index}>
            {element}
          </code><br />
          </>)
        }) : "" 
      }
    </div>
  </>)
}