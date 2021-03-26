import React from 'react'
import {Tab,Tabs,TabList,TabPanel} from 'react-tabs'
import {host} from '../lib_front'


function About(){
    let route = '/urls_tree?url=docs.mongodb.com/manual/reference/log-messages/'
    fetch(host+route,{
        method:'GET',
        mode: 'cors',
        headers:{
            'content-type': 'application/json',
        }
    }).then(res => res.json()).then(data => {
        console.log("this is data:" , data)
    })

    return(
        <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
    )
}

export default About