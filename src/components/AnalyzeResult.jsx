import React, { useState, useEffect} from "react";
import {
  TabDic,
  TabServer,
  TabDNS,
  TabDomain,
  TabTech,
  TabDetectWaf,
  TabScan,
  TabVuln,
} from "./Tabs";
import { ToastContainer } from "react-toastify";
import { Image } from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";
import "../css/Report.css";
import "../css/Card.css";

function AnalyzeResult(props) {
  // this variable use for logic of directory of wapp
  const [vulns, setVulns] = useState({
    wapp: false,
    netcraft: false,
    whatweb: false,
    largeio: false,
    webtech: false,
    wpscan: false,
    droopescan: false,
    joomscan: false,
    nmap: false,
  });

  return (
    <div id="report">
      <ToastContainer />
      <TableTab>
        <ChildrenTab
          id="tab_1"
          title="Technologies"
          handleData={setVulns}
          defaultChecked="true"
          description="Information about the platform of target website"
          locations={props.location.state}
        >
          <TabTech />
        </ChildrenTab>

        <ChildrenTab
          id="tab_2"
          title="Domain"
          description="Information about the domain of target website"
          locations={props.location.state}
        >
          <TabDomain />
        </ChildrenTab>

        <ChildrenTab
          id="tab_3"
          title="Directory tree"
          data={vulns.wapp}
          description="Information about the dictionary of target website"
          locations={props.location.state}
        >
          <TabDic />
        </ChildrenTab>

        <ChildrenTab
          id="tab_4"
          title="DNS"
          description="Information about the dns of target website"
          locations={props.location.state}
        >
          <TabDNS />
        </ChildrenTab>

        <ChildrenTab
          id="tab_5"
          title="Server Information"
          handleData={setVulns}
          description="Information about the server of target website"
          locations={props.location.state}
        >
          <TabServer />
        </ChildrenTab>

        <ChildrenTab
          id="tab_6"
          title="Detect web firewall"
          description="Information about the web application firewall of target website"
          locations={props.location.state}
        >
          <TabDetectWaf />
        </ChildrenTab>

        <ChildrenTab
          id="tab_7"
          title="Scan CMS"
          handleData={setVulns}
          description="Information about the server of target website"
          locations={props.location.state}
        >
          <TabScan />
        </ChildrenTab>

        <ChildrenTab
          id="tab_8"
          title="Vulnerability"
          data={vulns}
          description="Information about the vulnerability of the target website"
          locations={props.location.state}
        >
          <TabVuln />
        </ChildrenTab>

        <ChildrenTab
          id="tab_9"
          title="Screenshot"
          description="Screenshot of target website"
          locations={props.location.state}
        >
          <ScreenShot />
        </ChildrenTab>
      </TableTab>
    </div>
  );
}

export default AnalyzeResult;

function ScreenShot(props) {
  const [option, setOption] = useState("");
  const feature = {
    url: props.options.url,
    pic: props.options.token + ".png",
  };

  function handleOnLoad() {
    props.Count("img");
  }

  useEffect(() => {
    if (props.options.isAnalyze) {
      setOption("url");
      return;
    }
    setOption("pic");
  }, []);

  return (
    <div id="screenshot">
        {option ? <Image
          src={`http://localhost:3000/analyze_result/screenshot?token=${props.options.token}&${option}=${feature[option]}`}
          as="a"
          fluid
          onLoad={handleOnLoad}
          bordered
        /> : null}
    </div>
  );
}

function TableTab(props) {
  return <div className="tabs__">{props.children}</div>;
}

function ChildrenTab(props) {
  const [count, setCount] = useState({});
  const locations = {
    ...props.locations,
    url: encodeURIComponent(props.locations["url"]),
  };
  function Count(key, action) {
    if (!action) {
      setCount((prev) => {
        return {
          ...prev,
          [key]: true,
        };
      });
      return;
    }
    let temp = { ...count };
    delete temp[key];
    setCount(temp);

  }

  function handleNotify() {
    setCount({});
  }
  return (
    <div className="tab__">
      <input
        type="radio"
        name="css-tabs"
        id={props.id}
        defaultChecked={props.defaultChecked}
        className="tab-switch__"
      />
      <label
        htmlFor={props.id}
        className="tab-label__"
        onClick={handleNotify}
        id="countTech"
      >
        {props.title}
        {Object.keys(count).filter((key) => count[key]).length === 0 ? null : (
          <span className="notification-tab">!</span>
        )}
      </label>

      <div className="tab-content__">
        <div className="card-header__">
          <h3 className="card-title__">{props.title}</h3>
          <p className="card-category__">{props.description}</p>
        </div>
        {React.cloneElement(props.children, {
          options: locations,
          Count: Count,
          handleData: props.handleData,
          data: props.data,
        })}
      </div>
    </div>
  );
}
