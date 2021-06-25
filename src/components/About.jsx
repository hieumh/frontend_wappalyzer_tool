import React from 'react'
import { Segment, Header, List } from "semantic-ui-react";



function About() {
    return (
        <div style={{ padding: "15px 15%" }}>
            <Segment size="big">
                <Header as="h1">About us</Header>
                <p><b>Enumtool</b> is a tool that will automate enumeration and export HTML report. This tool saves time analyzing and finding information in enumeration process.</p>
                <p>Information that tool cover:</p>
                <List bulleted>
                    <List.Item>Collect all technologies information of website</List.Item>
                    <List.Item>Collect all domains, subdomains information</List.Item>
                    <List.Item>Collect route of website including hidden route</List.Item>
                    <List.Item>Collection information about DNS</List.Item>
                    <List.Item>Detect type of web application firewall</List.Item>
                    <List.Item>Scan information about CMS</List.Item>
                    <List.Item>Collect information about server that host website</List.Item>
                    <List.Item>Take screenshot</List.Item>
                    <List.Item>Collect, analyze and return the result vulnerabilites base on above information</List.Item>
                </List>
            </Segment>
        </div>
    )
}

export default About