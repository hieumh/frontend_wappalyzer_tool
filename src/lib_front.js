const host = "http://localhost:3000";

function getHostFromUrl(url){
  if(url.split('//').length == 2){
      return url.split('//')[1].split('.')[0]
  }
  return url.split('.')[0]
}

function isArrayObject(input) {
  if (!Array.isArray(input)) {
    return false;
  }
  return input.every((ele) => {
    return typeof ele === "object" && ele !== null;
  });
}

function isObject(input) {
  return typeof input === "object" && !Array.isArray(input) && input !== null;
}

function json2html(input, level) {
  let keys = Object.keys(input);

  return keys.map((key) => {
    if (isObject(input[key])) {
      switch (level) {
        case 1:
          return (
            <div key={key}>
              <h3>{handleKey(key)}</h3>
              {json2html(input[key], level + 1)}
              <hr />
            </div>
          );
        case 2:
          return (
            <div key={key}>
              <p>
                <b>{handleKey(key)}</b>:
              </p>
              {json2html(input[key], level + 1)}
            </div>
          );
      }
    } else if (isArrayObject(input[key])) {
      switch (level) {
        case 1:
          return (
            <div key={key}>
              <h3>{handleKey(key)}</h3>
              {input[key].map((ele) => {
                return json2html(ele, level + 1);
              })}
              <hr />
            </div>
          );
        case 2:
          return (
            <div key={key}>
              <p>
                <b>{handleKey(key)}</b>:
              </p>
              {input[key].map((ele) => {
                return json2html(ele, level + 1);
              })}
            </div>
          );
      }
    } else if (Array.isArray(input[key])) {
      switch (level) {
        case 1:
          return (
            <div key={key}>
              <h3>{handleKey(key)}</h3>
              {input[key].map((ele, index) => {
                return (
                  <div key={index}>
                    <i>{ele}</i>
                  </div>
                );
              })}
              <hr />
            </div>
          );
        case 2:
          return (
            <div key={key}>
              <b>{handleKey(key)}</b>:
              {input[key].map((ele, index) => {
                return (
                  <div key={index}>
                    <i>{ele}</i>
                  </div>
                );
              })}
            </div>
          );
        case 3:
          return (
            <div key={key}>
              <p>{handleKey(key)}</p>
              {input[key].map((ele, index) => {
                return (
                  <div key={index}>
                    <i>{ele}</i>
                  </div>
                );
              })}
            </div>
          );
      }
    } else if (typeof input[key] === "string") {
      switch (level) {
        case 1:
          return (
            <div key={key}>
              <h3>{handleKey(key)}</h3>
              <i>{input[key]}</i>
              <hr />
            </div>
          );
        case 2:
          return (
            <div key={key}>
              <p>
                <b>{handleKey(key)}</b>:
              </p>
              <i>{input[key]}</i>
            </div>
          );
        case 3:
          return (
            <div key={key}>
              <p>{handleKey(key)}</p>
              <i>{input[key]}</i>
            </div>
          );
      }
    }
  });
}

function json2htmlver2(input) {
  function js2HtmlCore(input, level) {
    let keys;
    try {
      keys = Object.keys(input);
      if (!keys) {
        throw "Error keys";
      }
    } catch (err) {
      // key rỗng
      return <></>;
    } finally {
      return keys.map((key) => {
        // if value of that key is object (not null)
        if (isObject(input[key])) {
          return (
            <div key={key} className={"block-level-" + level}>
              <p className={"level-" + level}>{handleKey(key)}</p>
              {js2HtmlCore(input[key], level + 1)}
            </div>
          );
        } else if (isArrayObject(input[key])) {
          return (
            <div key={key} className={"block-level-" + level}>
              <p className={"level-" + level}>{handleKey(key)}</p>
              {input[key].map((ele) => {
                return js2HtmlCore(ele, level + 1);
              })}
            </div>
          );
        } else if (Array.isArray(input[key])) {
          return (
            <div key={key} className={"block-level-" + level}>
              <p className={"level-" + level}>{handleKey(key)}</p>
              {input[key].map((ele, index) => {
                return (
                  <p key={index} className={"level-" + (level + 1)}>
                    {ele}
                  </p>
                );
              })}
            </div>
          );
        } else if (
          typeof input[key] === "string" ||
          typeof input[key] == "number" ||
          typeof input[key] === "boolean"
        ) {
          return (
            <div key={key} className={"block-level-" + level}>
              <p className={"level-" + level}>{handleKey(key)}</p>
              <p className={"level-" + (level + 1)}>
                {typeof input[key] === "boolean"
                  ? input[key].toString()
                  : input[key]}
              </p>
            </div>
          );
        }
      });
    }
  }
  return js2HtmlCore(input, 1);
}

// vd: scan_aborted, version, ...
function handleKey(keyStr) {
  keyStr = keyStr.split("_").join(" ").split("");
  keyStr[0] = keyStr[0].toUpperCase();
  return keyStr.join("");
}

function createHTTPHeader({ url, token, isAnalyze }) {
  let options = {
    method: "post",
    query: "",
    body: JSON.stringify({ url: url, token: token }),
  };
  if (!isAnalyze) {
    options = {
      method: "get",
      query: `?token=${token}&url=${url}`,
    };
  }

  let header = {
    method: options.method,
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: options.body,
  };

  return {header:header, query:options.query}
}

export { host, json2html, json2htmlver2, createHTTPHeader,getHostFromUrl, handleKey };
