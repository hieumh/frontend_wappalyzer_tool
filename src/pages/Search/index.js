import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { host } from "../../config/config";
import { Card, Input, Checkbox, Form } from "semantic-ui-react";
import "../../css/Report.css";
import "../../css/Search.css";
import "../../css/Animation.css";
import "../../css/Card.css";

function SearchDatabase() {
  const [pageControl, dispatch] = useReducer(reducer, {
    search: "",
    option: "search",
    result: [],
    display: { visibility: "hidden" },
    location: {},
  });
  const searchRef = useRef(null);

  function reducer(state, action) {
    switch (action.type) {
      case "SEARCH":
        return { ...state, search: action.value };
      case "OPTION":
        return { ...state, option: action.value };
      case "RESULT":
        return { ...state, result: action.value };
      case "DISPLAY":
        return { ...state, display: action.value };
      case "LOCATION":
        return { ...state, display: action.value };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  function handleChangeSearch(e) {
    const { value } = e.target;
    dispatch({ type: "SEARCH", value: value });
  }

  function handleChangeOption(e, { value }) {
    dispatch({ type: "OPTION", value: value });
  }

  function handleSubmit(e) {
    if (e.keyCode !== 13) {
      return;
    }

    let link =
      host + "/search_database?pattern=" + search + "&option=" + option;
    dispatch({ type: "DISPLAY", value: {} });
    dispatch({ type: "SEARCH", value: "" });

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
        dispatch({ type: "RESULT", result: result });
      });
  }

  function handleAnalyze(e) {
    let target = e.target.parentNode;
    if (target.nodeName === "DIV") {
      target = target.parentNode;
    }
    if (target.id) {
      dispatch({
        type: "LOCATION",
        location: {
          pathname: "/analyze_result",
          state: {
            token: result[target.id].token,
            url: result[target.id].url,
            isAnalyze: false,
          },
        },
      });
    }
  }

  if (JSON.stringify(pageControl.location) !== JSON.stringify({})) {
    return <Redirect to={pageControl.location} />;
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
                value={pageControl.search}
              />
            </Form.Field>
            <p>Choose where to search:</p>
            <Form.Field>
              <Checkbox
                radio
                float="left"
                label="Search table"
                name="checkboxRadioGroup"
                value="search"
                checked={pageControl.option === "search"}
                onChange={handleChangeOption}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label="Report table"
                name="checkboxRadioGroup"
                value="report"
                checked={pageControl.option === "report"}
                onChange={handleChangeOption}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label="All table"
                name="checkboxRadioGroup"
                value="all"
                checked={pageControl.option === "all"}
                onChange={handleChangeOption}
              />
            </Form.Field>
          </Form>
        </div>

        <div id="search-result" style={hidden}>
          <h4>Search result:</h4>
          {pageControl.result.length
            ? pageControl.result.map((element, index) => {
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
