import React, { useEffect, useState } from "react";
import "../../css/Home.css";
import { Card, Grid } from "semantic-ui-react";
import { host } from "../../config/config";
import {
  NumFrame,
  NumTech,
  NumVuln,
  NumReport,
  LanguageChart,
  FrameworkChart,
  ListWaf,
  ListVuln,
  ListUrl
} from './statistic'

function Dashboard(props) {
  const [dashboard, setDashboard] = useState({})
  console.log('dashboard is call')

  useEffect(() => {
    fetch(host + "/dashboard", {
      method: "get",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
      })
      .catch((error) => console.error(error));
  }, [])

  return (
    <div id="home">
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <NumTech number_of_lang={dashboard.number_of_lang} />
          </Grid.Column>
          <Grid.Column width={4}>
            <NumFrame number_of_frame={dashboard.number_of_frame} />
          </Grid.Column>
          <Grid.Column width={4}>
            <NumVuln number_of_vuln={dashboard.number_of_vuln} />
          </Grid.Column>
          <Grid.Column width={4}>
            <NumReport number_of_report={dashboard.number_of_report} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header>Programming language ratio</Card.Header>
                <LanguageChart lang_ratio={dashboard.lang_ratio} />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Framework ratio</Card.Header>
                <FrameworkChart frame_ratio={dashboard.frame_ratio} />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header>URL</Card.Header>
                <ListUrl top_url={dashboard.top_url} />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={7}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Top web application firewall detect</Card.Header>
                <ListWaf top_waf={dashboard.top_waf} />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Top vulnerabilities</Card.Header>
                <ListVuln top_vuln={dashboard.top_vuln} />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}


export default Dashboard;
