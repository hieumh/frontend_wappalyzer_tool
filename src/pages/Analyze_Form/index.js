import React, { useState, useRef, useEffect } from "react";
import { host } from "../../config/config"
import { Redirect } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { Input } from "semantic-ui-react";
import "../../css/Search.css";
const io = require('socket.io-client');

function FrameUrl() {
  const [location, setLocation] = useState({});
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);
  const linkRef = useRef(null);

  useEffect(() => {
    linkRef.current.focus();
  }, []);

  function handleChange(e) {
    const { value } = e.target;
    setLink(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let check = checkValidUrl(link)
    if (!check) {
      setError(true);
      return;
    }
    setLink(check.href)
    setError(false);
    e.preventDefault();

    // Get token
    let response = await fetch(`${host}/initialize?url=${link}`);
    let token = await response.text();

    const socket = io(host);

    socket.on('connect', () => {
      socket.emit('token', token)

      setLocation({
        pathname: "/analyze_result",
        state: {
          url: check.href,
          token: token,
          isAnalyze: true,
        },
      });
    })
  }

  function checkValidUrl(url) {
    try {
      const check = new URL(url);
      return check;
    } catch (e) {
      console.error(e);
      toast.error("Invalid Url");
      return false;
    }
  }

  if (JSON.stringify(location) !== JSON.stringify({})) {
    return <Redirect to={location} />;
  } else {
    return (
      <div id="content">
        <ToastContainer />
        <form method="post" action="">
          <div className="page">
            <h4>Enter Url</h4>
            {error ? (
              <>
                <Input
                  label={{ icon: "asterisk" }}
                  error
                  ref={linkRef}
                  labelPosition="left corner"
                  placeholder="http://example.com"
                  onChange={handleChange}
                  className="i"
                  value={link}
                />
              </>
            ) : (
              <Input
                label={{ icon: "asterisk" }}
                ref={linkRef}
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

export default FrameUrl;
