import React, { useState, useRef, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import { host } from "../lib_front";
import { Card, Input, Checkbox, Form } from "semantic-ui-react";
import "../../css/Report.css";
import "../../css/Search.css";
import "../../css/Animation.css";
import "../../css/Card.css";

function SearchDatabase() {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("search");
  const [result, setResult] = useState([]);
  const [hidden, setHidden] = useState({ visibility: "hidden" });
  const [location, setLocation] = useState({});
  const searchRef = useRef(null)


  useEffect(() => {
    searchRef.current.focus()
  }, [])

  function handleChangeSearch(e) {
    const { value } = e.target;
    setSearch(value);
  }

  function handleChangeOption(e, { value }) {
    setOption(value);
  }

  function handleSubmit(e) {
    if (e.keyCode !== 13) {
      return;
    }

    let link =
      host + "/search_database?pattern=" + search + "&option=" + option;
    setHidden({});
    setSearch("");

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
        setResult(result);
      });
  }

  function handleAnalyze(e) {
    let target = e.target.parentNode;
    if (target.nodeName === "DIV") {
      target = target.parentNode;
    }
    if (target.id) {
      setLocation({
        pathname: "/analyze_result",
        state: {
          token: result[target.id].token,
          url: result[target.id].url,
          isAnalyze: false,
        },
      });
    }
  }

  if (JSON.stringify(location) !== JSON.stringify({})) {
    return <Redirect to={location} />;
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
          <Form>
            <Form.Field>
              <Input
                fluid
                ref={searchRef}
                size="large"
                icon="search"
                placeholder="Search..."
                onChange={handleChangeSearch}
                onKeyDown={handleSubmit}
                value={search}
              />
            </Form.Field>
            <p>Choose where to search:</p>
            <Form.Field>
              <Checkbox
                radio
                float='left'
                label="Search table"
                name="checkboxRadioGroup"
                value="search"
                checked={option === "search"}
                onChange={handleChangeOption}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label="Report table"
                name="checkboxRadioGroup"
                value="report"
                checked={option === "report"}
                onChange={handleChangeOption}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label="All table"
                name="checkboxRadioGroup"
                value="all"
                checked={option === "all"}
                onChange={handleChangeOption}
              />
            </Form.Field>
          </Form>
        </div>

        <div id="search-result" style={hidden}>
          <h4>Search result:</h4>
          {result.length
            ? result.map((element, index) => {
              return (
                <Card fluid key={index} id={index} onClick={handleAnalyze}>
                  <Card.Content>
                    <Card.Header>{element.url}</Card.Header>
                    <Card.Meta>{element.time_create}</Card.Meta>
                  </Card.Content>
                </Card>
              );
            })
            : null}
        </div>
      </div>
    </div>
  );
}

export default SearchDatabase;
