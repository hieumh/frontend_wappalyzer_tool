import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { Card, Grid, Table, Statistic } from "semantic-ui-react";
import { Pie, Bar } from "react-chartjs-2";
import { host } from "../lib_front";

function Dashboard(props) {
  return (
    <div id="home">
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <NumTech />
          </Grid.Column>
          <Grid.Column width={4}>
            <NumFrame />
          </Grid.Column>
          <Grid.Column width={4}>
            <NumVuln />
          </Grid.Column>
          <Grid.Column width={4}>
            <NumReport />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header>Programing language ratio</Card.Header>
                <LanguageChart />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Framework ratio</Card.Header>
                <FameworkChart />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header>URL</Card.Header>
                <ListUrl />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={7}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Top waf detect</Card.Header>
                <ListWaf />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Top Vulnerability</Card.Header>
                <ListVuln />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

function NumFrame(props) {
  const [numFramework, setFramework] = useState("");

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/element?type=framework&option=number", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data )
          setFramework(data);
        })
        .catch((error) => console.error(error));
    }
    getData();
  }, []);

  return (
    <Statistic>
      <Statistic.Label>Number of Framework</Statistic.Label>
      <Statistic.Value>{numFramework}</Statistic.Value>
    </Statistic>
  );
}

function NumTech(props) {
  const [numTech, setTech] = useState("");

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/element?type=language&option=number", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setTech(data)})
        .catch((error) => console.error(error));
    }
    getData();
  }, []);
  return (
    <Statistic>
      <Statistic.Label>Number of tech</Statistic.Label>
      <Statistic.Value>{numTech}</Statistic.Value>
    </Statistic>
  );
}

function NumVuln(props) {
  const [numVuln, setVuln] = useState([]);

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/num_vuln", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setVuln(data))
        .catch((error) => console.error(error));
    }
    getData();
  }, []);

  return (
    <Statistic>
      <Statistic.Label>Number of Vuln</Statistic.Label>
      <Statistic.Value>{numVuln}</Statistic.Value>
    </Statistic>
  );
}

function NumReport(props) {
  const [numReport, setReport] = useState("");

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/num_report", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setReport(data))
        .catch((error) => console.error(error));
    }
    getData();
  }, []);
  return (
    <Statistic>
      <Statistic.Label>Number of report</Statistic.Label>
      <Statistic.Value>{numReport}</Statistic.Value>
    </Statistic>
  );
}

function LanguageChart(props) {
  const [programRatio, setProgramRatio] = useState({
    label: [],
    data: [],
  });
  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/element?type=language&option=ratio", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) =>
          setProgramRatio({
            label: data.map((element) => element["programing_language"]),
            data: data.map((element) => element["count"]),
          })
        )
        .catch((error) => console.error(error));
    }
    getData();
  }, []);
  return (
    <Pie
      data={{
        labels: programRatio.label,
        datasets: [
          {
            label: "Rainfall",
            backgroundColor: [
              "#C9DE00",
              "#2FDE00",
              "#00A6B4",
              "#6800B4",
              "#B21F00",
            ],
            hoverBackgroundColor: [
              "#4B5000",
              "#175000",
              "#003350",
              "#35014F",
              "#501800",
            ],
            data: programRatio.data,
          },
        ],
      }}
      height={100}
      width={200}
      options={{
        title: {
          display: true,
          text: "Average Rainfall per month",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
      }}
    />
  );
}

function FameworkChart(props) {
  const [frameworkRatio, setFrameworkRatio] = useState({
    label: [],
    data: [],
  });
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/element?type=framework&option=ratio", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) =>
          setFrameworkRatio({
            label: data.map((element) => element["framework"]),
            data: data.map((element) => element["count"]),
          })
        )
        .catch((error) => console.error(error));
    }
    getData();
  }, []);

  return (
    <Bar
      data={{
        labels: frameworkRatio.label,
        datasets: [
          {
            backgroundColor: [
              "#C9DE00",
              "#2FDE00",
              "#00A6B4",
              "#6800B4",
              "#B21F00",
            ],
            hoverBackgroundColor: [
              "#4B5000",
              "#175000",
              "#003350",
              "#35014F",
              "#501800",
            ],
            data: frameworkRatio.data,
          },
        ],
      }}
      height={100}
      width={200}
      options={options}
    />
  );
}

function ListWaf(props) {
  const [listTopWaf, setListTopWaf] = useState([]);

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/get_five_most_common?type=waf", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setListTopWaf(data))
        .catch((error) => console.error(error));
    }
    getData();
  }, []);

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Manufacturer</Table.HeaderCell>
          <Table.HeaderCell>Record count</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {listTopWaf
          ? listTopWaf.map((element, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{element.waf.firewall}</Table.Cell>
                  <Table.Cell>{element.waf.manufacturer}</Table.Cell>
                  <Table.Cell>{element.count}</Table.Cell>
                </Table.Row>
              );
            })
          : null}
      </Table.Body>
    </Table>
  );
}

function ListVuln(props) {
  const [listTopVuln, setListTopVuln] = useState([]);

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/get_five_most_common?type=vuln", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setListTopVuln(data))
        .catch((error) => console.error(error));
    }
    getData();
  }, []);

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Platform</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Record count</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {listTopVuln
          ? listTopVuln.map((element, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{element.vuln.Platform}</Table.Cell>
                  <Table.Cell>
                    {element.vuln.Title.length >= 50
                      ? element.vuln.Title.slice(0, 50) + "..."
                      : element.vuln.Title}
                  </Table.Cell>
                  <Table.Cell>{element.count}</Table.Cell>
                </Table.Row>
              );
            })
          : null}
      </Table.Body>
    </Table>
  );
}

function ListUrl(props) {
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    async function getData() {
      fetch(host + "/dashboard/get_five_most_common?type=url", {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setUrlList(data))
        .catch((error) => console.error(error));
    }
    getData();
  }, []);

  return (
    <Table singleLine size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Url</Table.HeaderCell>
          <Table.HeaderCell>Record count</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {urlList
          ? urlList.map((element, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    {element.url.length >= 15
                      ? element.url.slice(0, 15) + "..."
                      : element.url}
                  </Table.Cell>
                  <Table.Cell>{element.count}</Table.Cell>
                </Table.Row>
              );
            })
          : null}
      </Table.Body>
    </Table>
  );
}

export default Dashboard;
