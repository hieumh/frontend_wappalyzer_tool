import React, { useEffect, useState, useRef } from "react";
import { Card, Icon, Form, Button, Image, Loader } from "semantic-ui-react";
import { host } from "../lib_front";
import { json2htmlver2, createHTTPHeader, handleKey } from "../lib_front";

function TechDetail(props) {
  const data = props.data ? props.data : {};
  return (
    <div id="tech-detail">
      <h3 className="name-tech">{data.name}</h3>
      <div className="body-tech">
        {(() => {
          let keys = Object.keys(data);
          return keys.map((key, index) => {
            return Array.isArray(data[key]) ? null : (
              <div
                key={index}
                style={{
                  padding: "10px 0px",
                  borderBottom: "1px solid #c8c8c8",
                }}
              >
                <b>{handleKey(key)}</b>:
                <p style={{ paddingLeft: "10px" }}>{data[key]}</p>
              </div>
            );
          });
        })()}
        {/* {json2htmlver2(data)} */}
      </div>
    </div>
  );
}

function TabTech(props) {
  const [tech, setTech] = useState({
    wapp: [],
    netcraft: [],
    largeio: [],
    webtech: [],
    whatweb: [],
  });
  const [isDone, setIsDone] = useState({
    wapp: false,
    netcraft: false,
    largeio: false,
    webtech: false,
    whatweb: false,
  });
  const pageEmpty = useRef(null);
  const [type, setType] = useState("wapp");

  useEffect(() => {
    if (isDone[type] && !tech[type].length) {
      pageEmpty.current.style.display = "block";
    }

    if (isDone[type] && tech[type].length) {
      pageEmpty.current.style.display = "none";
    }

    if (!isDone[type]) {
      pageEmpty.current.style.display = "none";
    }
  }, [isDone, type]);

  useEffect(() => {
    async function getData({ header, query }) {
      fetch(host + "/url_analyze/wapp" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setTech((prev) => {
            return {
              ...prev,
              wapp: Array.isArray(data.technologies) ? data.technologies : [],
            };
          });
          props.handleData((prev) => {
            return {
              ...prev,
              wapp: Array.isArray(data.technologies) ? data.technologies : [],
            };
          });
          props.Count("wapp");
          setIsDone((prev) => {
            return {
              ...prev,
              wapp: true,
            };
          });
        })
        .catch((err) => console.error(err));

      // netcrafts
      fetch(host + "/url_analyze/netcraft" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setTech((prev) => {
            return {
              ...prev,
              netcraft: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.handleData((prev) => {
            return {
              ...prev,
              netcraft: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.Count("netcraft");
          setIsDone((prev) => {
            return {
              ...prev,
              netcraft: true,
            };
          });
        })
        .catch((err) => console.error(err));

      // largeio
      fetch(host + "/url_analyze/largeio" + query, header)
        .then((res) => res.json())
        .then((data) => {
          // console.log("this largeio")
          setTech((prev) => {
            return {
              ...prev,
              largeio: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.handleData((prev) => {
            return {
              ...prev,
              largeio: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.Count("largeio");
          setIsDone((prev) => {
            return {
              ...prev,
              largeio: true,
            };
          });
        })
        .catch((err) => console.error(err));

      // Whatwebb
      fetch(host + "/url_analyze/whatweb" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setTech((prev) => {
            return {
              ...prev,
              whatweb: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.handleData((prev) => {
            return {
              ...prev,
              whatweb: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.Count("whatweb");
          setIsDone((prev) => {
            return {
              ...prev,
              whatweb: true,
            };
          });
        })
        .catch((err) => console.error(err));

      // Webtech
      fetch(host + "/url_analyze/webtech" + query, header)
        .then((res) => res.json())
        .then((data) => {
          // console.log("this webtech")
          setTech((prev) => {
            return {
              ...prev,
              webtech: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.handleData((prev) => {
            return {
              ...prev,
              webtech: Array.isArray(data.technologies)
                ? data.technologies
                : [],
            };
          });
          props.Count("webtech");
          setIsDone((prev) => {
            return {
              ...prev,
              webtech: true,
            };
          });
        })
        .catch((err) => console.error(err));
    }

    let options = createHTTPHeader(props.options);

    getData(options);
  }, []);

  function handleTech(e) {
    if(!e.target.id){
      return
    }
    e.preventDefault();
    setType(e.target.id);

    if (e.target.childNodes[1]) {
      props.Count(e.target.id, "del");
      e.target.childNodes[1].remove();
    }
  }

  return (
    <div id="techonologies" className="card-body__">
      <div className="list-tools">
        <div
          className="btn btn-light button-tech"
          onClick={handleTech}
          id="wapp"
        >
          Wappalyzer
          {tech.wapp.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleTech}
          id="netcraft"
        >
          Netcraft
          {tech.netcraft.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleTech}
          id="largeio"
        >
          Largeio
          {tech.largeio.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleTech}
          id="webtech"
        >
          Webtech
          {tech.webtech.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleTech}
          id="whatweb"
        >
          Whatweb
          {tech.whatweb.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
      </div>
      <ul id="tab-detail">
        <Loader
          active={!isDone[type]}
          inline="centered"
          style={{ backgroundColor: "white" }}
        />
        {Array.isArray(tech[type]) && tech[type]
          ? tech[type].map((data, index) => {
              return (
                <li key={index}>
                  <TechDetail key={index} data={data} />
                </li>
              );
            })
          : null}
        <img
          className="empty-page"
          ref={pageEmpty}
          src="images/nothing_found.png"
          alt="empty page"
        />
      </ul>
    </div>
  );
}

function TabDomain(props) {
  const [domain, setDomain] = useState({
    whois: { empty: true },
    sublist3r: [],
  });
  const [isDone, setIsDone] = useState({
    whois: false,
    sublist3r: false,
  });
  const pageEmpty = useRef(null);
  const [type, setType] = useState("whois");
  const _Component = {
    whois: (data) => <TabDomainWhois domain={data} />,
    sublist3r: (data) => <TabDomainSublist3r domain={data} />,
  };

  useEffect(() => {
    async function getData({ header, query }) {
      fetch(host + "/url_analyze/whois" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setDomain((prev) => {
            return {
              ...prev,
              whois:
                data.domains && JSON.stringify(data.domains) !== "{}"
                  ? data.domains
                  : { empty: true },
            };
          });
          props.Count("whois");
          setIsDone((prev) => {
            return {
              ...prev,
              whois: true,
            };
          });
        })
        .catch((err) => console.error(err));

      fetch(host + "/url_analyze/sublist3r" + query, header)
        .then((res) => res.json())
        .then((data) => {
          // console.log("this sublist3r")
          setDomain((prev) => {
            return {
              ...prev,
              sublist3r: Array.isArray(data.domains) ? data.domains : [],
            };
          });
          props.Count("sublist3r");
          setIsDone((prev) => {
            return {
              ...prev,
              sublist3r: true,
            };
          });
        })
        .catch((err) => console.error(err));
    }
    let options = createHTTPHeader(props.options);
    getData(options);
  }, []);

  useEffect(() => {
    let checkEmpty = !domain[type][0];
    if (type !== "sublist3r") {
      checkEmpty = domain[type].empty;
    }

    if (isDone[type] && checkEmpty) {
      pageEmpty.current.style.display = "block";
    }

    if (isDone[type] && !checkEmpty) {
      pageEmpty.current.style.display = "none";
    }

    if (!isDone[type]) {
      pageEmpty.current.style.display = "none";
    }
  }, [isDone, type]);

  function handleDomain(e) {
    if(!e.target.id){
      return
    }
    setType(e.target.id);
    props.Count(e.target.id, "del");

    if (e.target.childNodes[1]) {
      e.target.childNodes[1].setAttribute("style", "display:none");
    }
  }

  return (
    <div id="domain" className="card-body__">
      <div className="list-tools">
        <div
          className="btn btn-light button-tech"
          onClick={handleDomain}
          id="whois"
        >
          Whois
          {!domain.whois.empty ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleDomain}
          id="sublist3r"
        >
          Sublist3r
          {domain.sublist3r.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
      </div>
      <Loader
        active={!isDone[type]}
        inline="centered"
        style={{ backgroundColor: "white" }}
      />
      <img
        className="empty-page"
        ref={pageEmpty}
        src="images/nothing_found.png"
        alt="empty page"
      />
      {(() => {
        return _Component[type] && {}.toString.call(_Component[type])
          ? _Component[type](domain[type])
          : null;
      })()}
    </div>
  );
}

function TabDomainWhois(props) {
  const check = props.domain ? props.domain : { empty: true };
  const domain = check.empty ? { empty: true } : check;

  if (domain.empty) {
    return null;
  }
  return (
    <div id="domain-whois">
      {Object.keys(domain).length ? (
        <>
          <b>Domain name</b>:
          {domain.domain_name != null ? (
            domain.domain_name.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Creation date</b>:
          {domain.creation_date != null ? (
            domain.creation_date.map((ele, index) => {
              return <p key={index}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Dnssec</b>:
          {domain.dnssec != null ? (
            domain.dnssec.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Email</b>:{" "}
          {domain.email != null ? (
            domain.email.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Expiration date</b>:
          {domain.expiration_date != null ? (
            domain.expiration_date.map((ele, index) => {
              return <p key={index}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Name server</b>:{" "}
          {domain.name_server != null ? (
            domain.name_server.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Org</b>:
          {domain.org != null ? (
            domain.org.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Referral url</b>:
          {domain.referral_url != null ? (
            domain.referral_url.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Registrar</b>:
          {domain.registrar != null ? (
            domain.registrar.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>State</b>:
          {domain.state != null ? (
            domain.state.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Status</b>:{" "}
          {domain.status != null ? (
            domain.status.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Updated date</b>:{" "}
          {domain.updated_date != null ? (
            domain.updated_date.map((ele, index) => {
              return <p key={index}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Whois server</b>:
          {domain.whois_server != null ? (
            domain.whois_server.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Address</b>:
          {domain.address != null ? (
            domain.address.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>City</b>:
          {domain.city != null ? (
            domain.city.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Country</b>:
          {domain.country != null ? (
            domain.country.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}
          <br />
          <b>Zipcode</b>:
          {domain.zipcode != null ? (
            domain.zipcode.map((ele) => {
              return <p key={ele}>{ele}</p>;
            })
          ) : (
            <p>unknown</p>
          )}{" "}
        </>
      ) : null}
    </div>
  );
}

function TabDomainSublist3r(props) {
  const domain = Array.isArray(props.domain) ? props.domain : [];
  return (
    <div id="domain-sublist3r">
      {!domain
        ? null
        : domain.map((ele, index) => {
            return <p key={index}>{ele}</p>;
          })}
    </div>
  );
}

function TabDic(props) {
  const [dic, setDic] = useState({
    wapp: {},
    gobuster: {},
  });
  const [isDone, setIsDone] = useState({
    wapp: false,
    gobuster: false,
  });
  const pageWappEmpty = useRef(null);
  const pageGoEmpty = useRef(null);

  useEffect(() => {
    function setStyle(type, typeRef) {
      if (isDone[type] && !Object.keys(dic[type])) {
        typeRef.current.style.display = "block";
      }

      if (isDone[type] && Object.keys(dic[type])) {
        typeRef.current.style.display = "none";
      }

      if (!isDone[type]) {
        typeRef.current.style.display = "none";
      }
    }

    setStyle("wapp", pageWappEmpty);
    setStyle("gobuster", pageGoEmpty);
  }, [isDone]);

  useEffect(() => {
    async function getData({ header, query }) {
      fetch(host + "/url_analyze/dic" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setDic((prev) => {
            return {
              ...prev,
              wapp: JSON.parse(data.trees),
            };
          });
          setIsDone((prev) => {
            return {
              ...prev,
              wapp: true,
            };
          });
        })
        .catch((err) => console.error(err));

      fetch(host + "/url_analyze/gobuster" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setDic((prev) => {
            return {
              ...prev,
              gobuster: data ? data.gobuster : {},
            };
          });
          setIsDone((prev) => {
            return {
              ...prev,
              gobuster: true,
            };
          });
        })
        .catch((err) => console.error(err));
    }
    if (!props.data.length) {
      return;
    }
    let options = createHTTPHeader(props.options);
    getData(options);
  }, [props.data]);
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
    <div id="dic" className="card-body__">
      <div id="wappalyzer-link">
        <h3>Wappalyzer</h3>
        <Loader
          active={!isDone["wapp"]}
          inline="centered"
          style={{ backgroundColor: "white" }}
        />
        <ul>{dic.wapp ? createTree(dic.wapp) : null}</ul>
        <img
          className="empty-page"
          ref={pageWappEmpty}
          src="images/nothing_found.png"
          alt="empty page"
        />
      </div>
      <hr />
      <div id="gobuster">
        <h3>Gobuster</h3>
        <Loader
          active={!isDone["gobuster"]}
          inline="centered"
          style={{ backgroundColor: "white" }}
        />
        <img
          className="empty-page"
          ref={pageGoEmpty}
          src="images/nothing_found.png"
          alt="empty page"
        />
        <ul>
          {!Array.isArray(dic.gobuster.directories) ? (
            <p></p>
          ) : (
            dic.gobuster.directories.map((ele, index) => {
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
          {!Array.isArray(dic.gobuster.files) ? (
            <p></p>
          ) : (
            dic.gobuster.files.map((ele, index) => {
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
    </div>
  );
}

function TabDNS(props) {
  const [type, setType] = useState("dig");
  const [dns, setDns] = useState({
    dig: { empty: true },
    fierce: "",
  });
  const [isDone, setIsDone] = useState({
    dig: false,
    fierce: false,
  });
  const pageEmpty = useRef(null);
  const _Component = {
    dig: (data) => <TabDNSDig dns={data} />,
    fierce: (data) => <TabDNSFierce dns={data} />,
  };

  useEffect(() => {
    async function getData({ header, query }) {
      fetch(host + "/url_analyze/dig" + query, header)
        .then((res) => res.json())
        .then((data) => {
          // console.log("this dns")
          setDns((prev) => {
            return {
              ...prev,
              dig: data.dns ? JSON.parse(data.dns) : { empty: true },
            };
          });
          props.Count("dig");
          setIsDone((prev) => {
            return {
              ...prev,
              dig: true,
            };
          });
        })
        .catch((err) => console.error(err));

      fetch(host + "/url_analyze/fierce" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setDns((prev) => {
            return {
              ...prev,
              fierce: data.dns && data.dns !== '""\n' ? data.dns : "",
            };
          });
          props.Count("fierce");
          setIsDone((prev) => {
            return {
              ...prev,
              fierce: true,
            };
          });
        })
        .catch((err) => console.error(err));
    }

    let options = createHTTPHeader(props.options);
    getData(options);
  }, []);

  useEffect(() => {
    let checkEmpty = !dns[type];
    if (type !== "fierce") {
      checkEmpty = dns[type].empty;
    }

    if (isDone[type] && checkEmpty) {
      pageEmpty.current.style.display = "block";
    }

    if (isDone[type] && !checkEmpty) {
      pageEmpty.current.style.display = "none";
    }

    if (!isDone[type]) {
      pageEmpty.current.style.display = "none";
    }
  }, [isDone, type]);

  function handleTool(e) {
    if(!e.target.id){
      return
    }
    setType(e.target.id);
    props.Count(e.target.id, "del");
    if (e.target.childNodes[1]) {
      e.target.childNodes[1].setAttribute("style", "display:none");
    }
  }

  return (
    <div id="dns" className="card-body__">
      <div className="list-tools">
        <div
          className="btn btn-light button-tech"
          onClick={handleTool}
          id="dig"
        >
          Dig
          {!dns.dig.empty ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleTool}
          id="fierce"
        >
          Fierce
          {dns.fierce.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
      </div>
      <Loader
        active={!isDone[type]}
        inline="centered"
        style={{ backgroundColor: "white" }}
      />
      <img
        className="empty-page"
        ref={pageEmpty}
        src="images/nothing_found.png"
        alt="empty page"
      />
      {_Component[type] && {}.toString.call(_Component[type])
        ? _Component[type](dns[type])
        : null}
    </div>
  );
}

function TabDNSFierce(props) {
  const fierce = props.dns ? props.dns : "";

  function formatFierce() {
    if (!fierce) {
      return null;
    }
    let output = fierce.replaceAll('"', "").replace(/\\n|\\t/g, "|");
    output = output.split("|");
    output = output.filter((element) => element.length);
    return output.map((element, index) => {
      return <p key={index}>{element}</p>;
    });
  }

  return (
    <div id="dns-fierce">
      {fierce ? <div className="code">{formatFierce()}</div> : null}
    </div>
  );
}

function TabDNSDig(props) {
  const [option, setOption] = useState("A");
  const dns = props.dns ? props.dns : {};

  function handleClick(e) {
    setOption(e.target.innerHTML);
  }

  if (props.dns.length === 0) {
    return <div id="dns">Nothing here</div>;
  }
  return (
    <div id="dns-dig">
      <div className="dns-options">
        <button onClick={handleClick}>A</button>
        <button onClick={handleClick}>AAAA</button>
        <button onClick={handleClick}>ANY</button>
        <button onClick={handleClick}>CAA</button>
        <button onClick={handleClick}>CNAME</button>
        <button onClick={handleClick}>MX</button>
        <button onClick={handleClick}>NS</button>
        <button onClick={handleClick}>PTR</button>
        <button onClick={handleClick}>SOA</button>
        <button onClick={handleClick}>SRV</button>
        <button onClick={handleClick}>TXT</button>
      </div>
      <div className="code">
        {dns[option] && !Array.isArray(dns[option])
          ? dns[option].split("\n").map((ele, index) => {
              return <p key={index}>{ele === "" ? "\t" : ele}</p>;
            })
          : null}
      </div>
    </div>
  );
}

function TabServer(props) {
  const [server, setServer] = useState({
    nmap: "",
    nikto: { empty: true },
  });
  const [isDone, setIsDone] = useState({
    nmap: false,
    nikto: false,
  });
  const pageEmpty = useRef(null);
  const [type, setType] = useState("nikto");
  const _Component = {
    nikto: (data) => <TabServerNikto nikto={data} />,
    nmap: (data) => <TabServerNmap nmap={data} />,
  };

  function handleServer(e) {
    if(!e.target.id){
      return
    }
    setType(e.target.id);
    props.Count(e.target.id, "del");

    if (e.target.childNodes[1]) {
      e.target.childNodes[1].setAttribute("style", "display:none");
    }
  }

  useEffect(() => {
    let checkEmpty = server[type];
    if (type !== "nmap"){
      checkEmpty = !server[type].empty
    }
    if (isDone[type] && !checkEmpty) {
      pageEmpty.current.style.display = "block";
    }

    if (isDone[type] && checkEmpty) {
      pageEmpty.current.style.display = "none";
    }

    if (!isDone[type]) {
      pageEmpty.current.style.display = "none";
    }
  }, [isDone,type]);

  useEffect(() => {
    async function getData({ header, query }) {
      fetch(host + "/url_analyze/nikto" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setServer((prev) => {
            return {
              ...prev,
              nikto:
                data.nikto && data.nikto.slice(0, 2) !== "{}"
                  ? JSON.parse(data.nikto)
                  : { empty: true },
            };
          });
          props.handleData((prev) => {
            return {
              ...prev,
              nikto: data,
            };
          });
          props.Count("nikto");
          setIsDone((prev) => {
            return {
              ...prev,
              nikto: true,
            };
          });
        })
        .catch((err) => console.error(err));

      fetch(host + "/url_analyze/nmap" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setServer((prev) => {
            return {
              ...prev,
              nmap: data.nmap ? data.nmap : "",
            };
          });
          props.handleData((prev) => {
            return {
              ...prev,
              nmap: data.nmap ? data.nmap : "",
            };
          });
          props.Count("nmap");
          setIsDone((prev) => {
            return {
              ...prev,
              nmap: true,
            };
          });
        })
        .catch((err) => console.error(err));
    }
    let options = createHTTPHeader(props.options);
    getData(options);
  }, []);

  return (
    <div id="server-network" className="card-body__">
      <div className="list-tools">
        <div
          className="btn btn-light button-tech"
          onClick={handleServer}
          id="nikto"
        >
          Nikto
          {!server.nikto.empty ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleServer}
          id="nmap"
        >
          Nmap
          {server.nmap ? <span className="notification-button">!</span> : null}
        </div>
      </div>

      <div id='server-network-content'>
        <Loader
          active={!isDone[type]}
          inline="centered"
          style={{ backgroundColor: "white" }}
        />
        <img
          className="empty-page"
          ref={pageEmpty}
          src="images/nothing_found.png"
          alt="empty page"
        />
        {_Component[type] && {}.toString.call(_Component[type])
          ? _Component[type](server[type])
          : null}
      </div>
    </div>
  );
}

function TabServerNmap(props) {
  const nmap = props.nmap ? props.nmap : "";
  if (!nmap) {
    return null;
  }
  return (
    <div className="code">
      {nmap.split("\n").map((ele, index) => {
        return <p key={index}>{ele}</p>;
      })}
    </div>
  );
}

function TabServerNikto(props) {
  const nikto = props.nikto ? props.nikto : { empty: true };
  return (
    <div>
      <div>{!nikto.empty ? json2htmlver2(nikto) : null}</div>
    </div>
  );
}

function TabDetectWaf(props) {
  const [wafs, setWaf] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const pageEmpty = useRef(null);

  useEffect(() => {
    if (isDone && !wafs.length) {
      pageEmpty.current.style.display = "block";
    }

    if (isDone && wafs.length) {
      pageEmpty.current.style.display = "none";
    }

    if (!isDone) {
      pageEmpty.current.style.display = "none";
    }
  }, [isDone]);

  useEffect(() => {
    async function getData({ header, query }) {
      fetch(host + "/url_analyze/wafw00f" + query, header)
        .then((res) => res.json())
        .then((data) => {
          setWaf(Array.isArray(data.waf) ? data.waf : []);
          props.Count("wafw00f");
          setIsDone(true);
        })
        .catch((err) => console.error(err));
    }
    let options = createHTTPHeader(props.options);
    getData(options);
  }, []);
  return (
    <div id="detect-firewall" className="card-body__">
      <Loader
        active={!isDone}
        inline="centered"
        style={{ backgroundColor: "white" }}
      />
      {wafs
        ? wafs.map((ele, index) => {
            return (
              <div key={index}>
                <b>Firewall:</b>
                <p>{ele.firewall}</p>
                <b>Manufacturer:</b>
                <p>{ele.manufacturer}</p>
                <hr />
              </div>
            );
          })
        : null}
      <img
        className="empty-page"
        ref={pageEmpty}
        src="images/nothing_found.png"
        alt="empty page"
      />
    </div>
  );
}

function TabScan(props) {
  const [scan, setScan] = useState({
    wpscan: { empty: true },
    droopescan: { empty: true },
    joomscan: { empty: true },
    nikto: { empty: true },
  });
  const [isDone, setIsDone] = useState({
    wpscan: false,
    droopescan: false,
    joomscan: false,
    nikto: false,
  });
  const pageEmpty = useRef(null);
  const [type, setType] = useState("wpscan");

  useEffect(() => {
    // set type scan-content when loading
    async function getData({ header, query }) {
      let checkCms = await fetch(host + "/url_analyze/cmseek", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          url: props.options.url,
          token: props.options.token,
        }),
      });

      checkCms = await checkCms.json();
      if (checkCms.cms_name) {
        // fetch for scanning website
        console.log("have cms");
        fetch(host + "/url_analyze/wpscan" + query, header)
          .then((res) => res.json())
          .then((data) => {
            setScan((prev) => {
              return {
                ...prev,
                wpscan: data ? JSON.parse(data.wp) : { empty: true },
              };
            });
            props.handleData((prev) => {
              return {
                ...prev,
                wpscan: data ? JSON.parse(data.wp) : { empty: true },
              };
            });
            props.Count("wpscan");
            setIsDone((prev) => {
              return {
                ...prev,
                wpscan: true,
              };
            });
          })
          .catch((err) => console.error(err));
        fetch(host + "/url_analyze/droopescan" + query, header)
          .then((res) => res.json())
          .then((data) => {
            // console.log("this droope")
            setScan((prev) => {
              return {
                ...prev,
                droopescan: data ? JSON.parse(data.droope) : { empty: true },
              };
            });
            props.handleData((prev) => {
              return {
                ...prev,
                droopescan: data ? JSON.parse(data.droope) : { empty: true },
              };
            });
            props.Count("droope");
            setIsDone((prev) => {
              return {
                ...prev,
                droopescan: true,
              };
            });
          })
          .catch((err) => console.error(err));
        fetch(host + "/url_analyze/joomscan" + query, header)
          .then((res) => res.json())
          .then((data) => {
            // console.log("this joomscan")
            setScan((prev) => {
              return {
                ...prev,
                joomscan: data ? JSON.parse(data.joomscan) : { empty: true },
              };
            });

            props.handleData((prev) => {
              return {
                ...prev,
                joomscan: data ? JSON.parse(data.joomscan) : { empty: true },
              };
            });
            props.Count("joomscan");

            setIsDone((prev) => {
              return {
                ...prev,
                joomscan: true,
              };
            });
          })
          .catch((err) => console.error(err));

        return;
      }
      setIsDone((prev) => {
        return {
          ...prev,
          droopescan: true,
          joomscan: true,
          wpscan: true,
        };
      });
      console.log("no cms");
    }
    let options = createHTTPHeader(props.options);
    getData(options);
  }, []);

  useEffect(() => {
    let checkEmpty = scan[type].empty;

    if (isDone[type] && checkEmpty) {
      pageEmpty.current.style.display = "block";
    }

    if (isDone[type] && !checkEmpty) {
      pageEmpty.current.style.display = "none";
    }

    if (!isDone[type]) {
      pageEmpty.current.style.display = "none";
    }
  }, [isDone, type]);

  function handleScan(e) {
    if(!e.target.id){
      return
    }
    setType(e.target.id);
    props.Count(e.target.id, "del");

    if (e.target.childNodes[1]) {
      e.target.childNodes[1].setAttribute("style", "display:none");
    }
  }

  return (
    <div id="scans" className="card-body__">
      <div className="list-tools">
        <div
          className="btn btn-light button-tech"
          onClick={handleScan}
          id="wpscan"
        >
          Wpscan
          {!scan.wpscan.empty ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleScan}
          id="droopescan"
        >
          Droopescan
          {!scan.droopescan.empty ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleScan}
          id="joomscan"
        >
          Joomscan
          {scan.joomscan.length ? (
            <span className="notification-button">!</span>
          ) : null}
        </div>
      </div>
      <div className="scan-content">
        <Loader
          active={!isDone[type]}
          inline="centered"
          style={{ backgroundColor: "white" }}
        />
        <div>{!scan[type].empty ? json2htmlver2(scan[type]) : null}</div>
        <img
          className="empty-page"
          ref={pageEmpty}
          src="images/nothing_found.png"
          alt="empty page"
        />
      </div>
    </div>
  );
}

// function TabVuln(props){
//     return <div>Hello world</div>
// }

function TabVuln(props) {
  const [feature, setFeature] = useState("list");
  const [vulns, setVuln] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const _Component = {
    list: (handleData, options, data) => (
      <TopVulnList
        vulns={data}
        setVuln={handleData}
        options={options}
        isDone={isDone}
      />
    ),
    add: (handleData, options) => (
      <TopVulnAdd setVuln={handleData} options={options} />
    ),
  };

  function handleVuln(e) {
    setFeature(e.target.id);
  }

  useEffect(() => {
    async function getData() {
      let body = { token: props.options.token, action: "load" };
      fetch(host + "/update_vulns_table", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          setVuln(Array.isArray(data.vulns) ? data.vulns : []);
          props.Count("vuln");
          setIsDone(true);
        })
        .catch((err) => console.error(err));
    }
    getData();
  }, [props.data]);

  return (
    <div id="tab-vuln" className="card-body__">
      <div className="list-tools">
        <div
          className="btn btn-light button-tech"
          onClick={handleVuln}
          id="list"
        >
          List Vuln
        </div>
        <div
          className="btn btn-light button-tech"
          onClick={handleVuln}
          id="add"
        >
          Add vuln
        </div>
      </div>
      <div id="vulns-list">
        {_Component[feature] && {}.toString.call(_Component[feature])
          ? _Component[feature](setVuln, props.options, vulns)
          : null}
      </div>
    </div>
  );
}

function TopVulnList(props) {
  const vulns = Array.isArray(props.vulns) ? props.vulns : [];
  const options = props.options ? props.options : {};
  const pageEmpty = useRef(null);

  useEffect(() => {
    if (props.isDone && !vulns.length) {
      pageEmpty.current.style.display = "block";
    }

    if (props.isDone && vulns.length) {
      pageEmpty.current.style.display = "none";
    }

    if (!props.isDone) {
      pageEmpty.current.style.display = "none";
    }
  }, [props.isDone, vulns]);

  async function handleDeleteVuln(e) {
    let body = JSON.stringify({
      token: options.token,
      action: "delete",
      vulns: vulns[e.target.id],
    });
    let dataRecv = await fetch(host + "/update_vulns_table", {
      method: "post",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    }).catch((err) => console.error(err));
    try {
      dataRecv = await dataRecv.json();
      props.setVuln(dataRecv.vulns);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Card.Group>
      <Loader
        active={!props.isDone}
        inline="centered"
        style={{ backgroundColor: "white" }}
      />
      {Array.isArray(vulns)
        ? vulns.map((element, index) => {
            return (
              <Card key={index} fluid>
                <Card.Content>
                  <Icon
                    id={index}
                    className="close"
                    onClick={handleDeleteVuln}
                    size="big"
                    style={{ float: "right" }}
                  />

                  <Card.Header>
                    {element.Platform}
                    <Icon className={element.Platform} size="big" />
                  </Card.Header>
                  <Card.Meta>{element.Author}</Card.Meta>
                  <Card.Description>
                    <p>Type: {element.Type}</p>
                    <p>Description: {element.Title}</p>
                    <p>
                      Link report:{" "}
                      <a target="_blank" href={element.Path}>
                        {element.Path}
                      </a>
                    </p>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>{element.Date}</Card.Content>
              </Card>
            );
          })
        : null}
      <img
        className="empty-page"
        ref={pageEmpty}
        src="images/nothing_found.png"
        alt="empty page"
      />
    </Card.Group>
  );
}

function TopVulnAdd(props) {
  const [addVulnData, setAddVulnData] = useState({
    Author: "",
    Date: "",
    Platform: "",
    Title: "",
    Type: "",
    URL: "",
  });
  const options = props.options ? props.options : {};

  function handleChangeVuln(e) {
    const { name, value } = e.target;
    let time = new Date();
    setAddVulnData((prevState) => {
      return {
        ...prevState,
        [name]: value,
        Date: time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate(),
      };
    });
  }

  async function handleAddVuln(e) {
    e.preventDefault();
    let body = JSON.stringify({
      token: options.token,
      action: "add",
      vulns: addVulnData,
    });
    // console.log({token:props.token,action:'add',vulns:addVulnData})
    try {
      let dataRecv = await fetch(host + "/update_vulns_table", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: body,
      });
      dataRecv = await dataRecv.json();
      props.setVuln(dataRecv.vulns);
      setAddVulnData({
        Author: "",
        Date: "",
        Platform: "",
        Title: "",
        Type: "",
        URL: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form>
      <Form.Input
        fluid
        placeholder="Platform here"
        name="Platform"
        onChange={handleChangeVuln}
        value={addVulnData.Platform}
      />
      <Form.Input
        fluid
        placeholder="Author here"
        name="Author"
        onChange={handleChangeVuln}
        value={addVulnData.Author}
      />
      <Form.Input
        fluid
        placeholder="Type vuln here"
        name="Type"
        onChange={handleChangeVuln}
        value={addVulnData.Type}
      />
      <Form.Input
        fluid
        placeholder="Description"
        name="Title"
        onChange={handleChangeVuln}
        value={addVulnData.Title}
      />
      <Form.Input
        fluid
        placeholder="Link to your report"
        name="URL"
        onChange={handleChangeVuln}
        value={addVulnData.URL}
      />
      <Button type="submit" onClick={handleAddVuln}>
        Add
      </Button>
    </Form>
  );
}

export {
  TabTech,
  TabDomain,
  TabDic,
  TabDNS,
  TabServer,
  TabDetectWaf,
  TabScan,
  TabVuln,
};
