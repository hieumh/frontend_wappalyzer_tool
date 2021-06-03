import React, { useState, useEffect, Children } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { Image} from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";
import "../css/Report.css";
import "../css/Card.css";

function AnalyzeResult(props) {
  // this variable use for logic of directory of wapp
  const [vulns, setVulns] = useState({
    wapp: [],
    netcraft: [],
    whatweb: [],
    largeio: [],
    webtech: [],
    wpscan: [],
    droopescan: [],
    joomscan: [],
    nikto: [],
    nmap: [],
  });

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   let { url, token } = props.location.state;

  //   let body = JSON.stringify({ url: url, token: token });
  //   let result = await fetch(host + "/create_report", {
  //     method: "post",
  //     mode: "cors",

  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: body,
  //   });
  //   toast.success("Create report success");
  // }

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
          title="Server scanning"
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
          data={vulns.wapp}
          description="Screenshot of target website"
          locations={props.location.state}
        >
          <ScreenShot url={props.location.state.url}/>
        </ChildrenTab>
      </TableTab>
    </div>
  );
}

export default AnalyzeResult;

{
  /* <div className="lds-roller" style={hidden}><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */
}

function ScreenShot(props) {
  const [isRun,setRun] = useState(false)
  function handleOnLoad(){
    props.Count("img")
  }

  useEffect(()=>{
    console.log("run screenshot")
    if(props.data.length){
      setRun(true)
    }
  },[props.data])
  return <div id="screenshot">
    {
      isRun ? <Image
      src={`http://localhost:3000/analyze_result/screenshot?url=${props.url}`}
      as='a'
      fluid
      onLoad={handleOnLoad}
      bordered 
    /> : null
    }
    
  </div>;
}

function TableTab(props) {
  return <div className="tabs__">{props.children}</div>;
}

function ChildrenTab(props) {
  const [count, setCount] = useState({});

  function Count(data) {
    setCount((prev) => {
      return {
        ...prev,
        [data]: "",
      };
    });
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
        {Object.keys(count).length === 0 ? null : (
          <span className="notification-tab">{Object.keys(count).length}</span>
        )}
      </label>

      <div className="tab-content__">
        <div className="card-header__">
          <h3 className="card-title__">{props.title}</h3>
          <p className="card-category__">{props.description}</p>
        </div>
        {React.cloneElement(props.children, {
          options: props.locations,
          Count: Count,
          handleData: props.handleData,
          data: props.data,
        })}
      </div>
    </div>
  );
}
