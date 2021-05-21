import React from 'react'
import {json2htmlver2} from '../lib_front'

function Report(props){


    return <div>{json2htmlver2(JSON.parse(localStorage.report))}</div>
}

export default Report