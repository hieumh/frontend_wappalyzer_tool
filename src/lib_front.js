const host = 'http://localhost:3000'

function isArrayObject(input){
    if (!Array.isArray(input)){
        return false
    }
    return input.every((ele)=>{
        return typeof ele === "object"
    })
}

function isObject(input){
    return typeof input === "object"  && !Array.isArray(input)
}

function json2html(input, level){
    let keys = Object.keys(input)


    return keys.map(key=>{
        if (isObject(input[key])){
            switch(level){
                case 1:
                    return <div key={key}><h3>{handleKey(key)}</h3>{json2html(input[key], level+1)}<hr/></div>
                case 2:
                    return <div key={key}><p><b>{handleKey(key)}</b>:</p>{json2html(input[key], level+1)}</div>
            }
        } else if (isArrayObject(input[key])){
                switch(level){
                    case 1:
                        return <div key={key}><h3>{handleKey(key)}</h3>
                        {input[key].map(ele=>{
                            return json2html(ele, level+1)
                        })}<hr/>
                        </div> 
                    case 2:
                        return <div key={key}><p><b>{handleKey(key)}</b>:</p>
                        {input[key].map(ele=>{
                            return json2html(ele, level+1)
                        })}</div>
                    }
        } else if(Array.isArray(input[key])) {
            switch(level){
                case 1:
                    return <div key={key}>
                            <h3>{handleKey(key)}</h3>{input[key].map((ele,index)=>{
                                return <div key={index}><i>{ele}</i></div>
                            })}<hr/>
                        </div>
                case 2:
                    return <div key={key}><b>{handleKey(key)}</b>:
                        {input[key].map((ele,index)=>{
                        return <div key={index}><i>{ele}</i></div>
                    })}
                        </div>
                case 3:
                    return <div key={key}>
                        <p>{handleKey(key)}</p>
                        {input[key].map((ele,index)=>{
                        return <div key={index}><i>{ele}</i></div>
                    })}
                        </div>
            }
        } else if(typeof input[key] === "string"){
            switch(level){
                case 1:
                    return <div key={key}><h3>{handleKey(key)}</h3><i>{input[key]}</i><hr/></div>
                case 2:
                    return <div key={key}><p><b>{handleKey(key)}</b>:</p><i>{input[key]}</i></div>
                case 3:
                    return <div key={key}><p>{handleKey(key)}</p><i>{input[key]}</i></div>
            }
        }
    })
}


// vd: scan_aborted, version, ... 
function handleKey(keyStr){
    keyStr = keyStr.split("_").join(" ").split("")
    keyStr[0] = keyStr[0].toUpperCase()
    return keyStr.join("")
}   


export {host,json2html}