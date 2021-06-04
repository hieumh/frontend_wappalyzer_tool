import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Input } from "semantic-ui-react";
import "../css/Search.css";

function Content() {
  const [location, setLocation] = useState({});
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setLink(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!checkValidUrl(link)) {
      setError(true);
      return;
    }
    setError(false);
    console.log("This is submit");
    e.preventDefault();

    // Get token
    let response = await fetch(`http://localhost:3000/initialize?url=${link}`);
    let token = await response.text();

    setLocation({
      pathname: "/analyze_result",
      state: {
        url: link,
        token: token,
        isAnalyze: true,
      },
    });
  }

  function checkValidUrl(url) {
    const checkProtocol = new RegExp("http(s?)://");
    return checkProtocol.test(url);
  }

  if (JSON.stringify(location) !== JSON.stringify({})) {
    return <Redirect to={location} />;
  } else {
    return (
      <div id="content">
        <form method="post" action="">
          <div className="page">
            <h4>Enter Url</h4>
            {error ? (
              <Input
                label={{ icon: "asterisk" }}
                error
                labelPosition="left corner"
                placeholder="http://example.com"
                onChange={handleChange}
                className="i"
                value={link}
              />
            ) : (
              <Input
                label={{ icon: "asterisk" }}
                labelPosition="left corner"
                placeholder="http://example.com"
                onChange={handleChange}
                className="i"
                value={link}
              />
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-info"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Content;
