import React, { useState } from "react";
import { host } from "../lib_front";
import {Card} from 'semantic-ui-react'
import "../css/Report.css";
import "../css/Search.css";
import "../css/Animation.css";
import "../css/Card.css";

function Search() {
  const [search, setSearch] = useState("");
  const [result,setResult] = useState([])
  const [hidden, setHidden] = useState({ visibility: "hidden" });

  function handleChange(e) {
    if (e.keyCode === 13) {
      document.getElementById("submit-button").click();
      return;
    }

    const { value } = e.target;
    setSearch(value);
    // setSearch(value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    let link = host + "/search_database?pattern=" + search;
    setHidden({});

    fetch(link, {
      method: "get",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        let result = [];
        for (const index in data) {
          result.push(data[index]);
        }
        console.log(result)
        setResult(result)
      });
  }

  return (
    <div id="search">
      <div id="search-card">
        <div className="card-header__">
          <h3 className="card-title__">Search Database</h3>
          <p className="card-category__">
            Search information about report in database
          </p>
        </div>
        <div id="search-bar" className="card-body__">
          <p>
            All of this information will be taken in database that were
            collected by us
          </p>
          <form method="get" action="" className="analyze">
            <div id="input-box">
              <img src="/icons/website/search-solid_2.svg" alt="" />
              <input
                type="text"
                name="target"
                className="input"
                placeholder="Search..."
                onChange={handleChange}
              />
              <input
                id="submit-button"
                type="submit"
                onClick={handleSubmit}
                hidden
              />
            </div>
          </form>
        </div>

        <div id="search-result" style={hidden}>
          <h4>Search result:</h4>
          {
              result.length ? result.map((element,index)=>{
                  return (<Card fluid key={index}>
                    <Card.Content>
                      <Card.Header>{element.url}</Card.Header>
                      <Card.Meta>{element.time_create}</Card.Meta>
                      <Card.Description>
                          {element._id}
                      </Card.Description>
                    </Card.Content>
                  </Card>)
              }) : null
          }
          
        </div>
      </div>
    </div>
  );
}

export default Search;
