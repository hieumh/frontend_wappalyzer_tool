const host = process.env.REACT_APP_HOST;
const local = process.env.REACT_APP_LOCAL;
const pageHistorySize = 10

function getHostFromUrl(url){
  if(url.split('//').length === 2){
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

function json2htmlver2(input) {
  function js2HtmlCore(input, level) {
    let keys;
    try {
      keys = Object.keys(input);
      if (!keys) {
        throw {name:"Error keys"};
      }
    } catch (err) {
      // key rỗng
      console.error(err)
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
            <div key={key} className={`block-level-${level}`}>
              <p className={"level-" + level}>{handleKey(key)}</p>
              {input[key].map((ele) => {
                return <div className="__group">{js2HtmlCore(ele, level + 1)}</div>;
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
                  ? input[key].toString() : string2Html(input[key].toString())}
              </p>
            </div>
          );
        }
      });
    }
  }

  function string2Html(input){
    return input.split("\n").map((ele,index) => {
      return <p key={index}>{ele}</p>;
    })
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

export { host, json2htmlver2, createHTTPHeader,getHostFromUrl, handleKey, pageHistorySize, local };
