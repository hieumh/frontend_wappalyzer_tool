import React, { useEffect, useState } from "react";
import "../css/Home.css";
import {
  Card,
  Grid,
  Table,
  Label,
  Menu,
  Icon,
  Item,
  Statistic,
} from "semantic-ui-react";
import { Pie, Bar } from "react-chartjs-2";
import { host } from "../lib_front";

function Dashboard(props) {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [12, 59, 80, 81, 56],
      },
    ],
  };
  const [ numReport, setReport ] = useState("")
  const [ numTech, setTech ] = useState("")
  const [ numFramework, setFramework] = useState("")
  const [ programRatio, setProgramRatio ] = useState([])
  const [ frameworkRatio, setFrameworkRatio ] = useState([])

  useEffect(async ()=>{
    async function getData(){
      let numReport = await fetch(host+"/dashboard/num_report",{
        method:"get",
        mode:'cors',
        headers:{
          'content-type':'application/json',
        }
      })
      numReport = await numReport.json()
      setReport(numReport)

      let numTech = await fetch(host+"/dashboard/num_tech",{
        method:"get",
        mode:'cors',
        headers:{
          'content-type':'application/json',
        }
      })
      numTech = await numTech.json()
      console.log(numTech)

      setTech(numTech)

    let numFramework = await fetch(host+"/dashboard/num_framework",{
      method:"get",
      mode:'cors',
      headers:{
        'content-type':'application/json',
      }
    })
    numFramework = await numFramework.json()
    setFramework(numFramework)

    let programRatio = await fetch(host+"/dashboard/language_ratio",{
      method:"get",
      mode:'cors',
      headers:{
        'content-type':'application/json',
      }
    })
    programRatio = await programRatio.json()
    setProgramRatio(programRatio)

    let frameworkRatio = await fetch(host+"/dashboard/framework_ratio",{
      method:"get",
      mode:'cors',
      headers:{
        'content-type':'application/json',
      }
    })
    frameworkRatio = await frameworkRatio.json()
    setFrameworkRatio(frameworkRatio)
  }


    getData()
  },[])

  return (
    <div id="home">
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Statistic>
              <Statistic.Label>Number of tech</Statistic.Label>
              <Statistic.Value>{numTech}</Statistic.Value>
            </Statistic>
          </Grid.Column>
          <Grid.Column width={4}>
            <Statistic>
              <Statistic.Label>Number of Framework</Statistic.Label>
              <Statistic.Value>{numFramework}</Statistic.Value>
            </Statistic>
          </Grid.Column>
          <Grid.Column width={4}>
            <Statistic>
              <Statistic.Label>Number of Vuln</Statistic.Label>
              <Statistic.Value>5,550</Statistic.Value>
            </Statistic>
          </Grid.Column>
          <Grid.Column width={4}>
            <Statistic>
              <Statistic.Label>Number of report</Statistic.Label>
              <Statistic.Value>{numReport}</Statistic.Value>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header>Programing language ratio</Card.Header>
                <Pie
                  data={state}
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
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Framework ratio</Card.Header>
                <Bar
                  data={state}
                  height={133}
                  width={300}
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
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header>URL</Card.Header>
                <Pie
                  data={state}
                  height={114}
                  width={300}
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
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={7}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Top waf detect</Card.Header>
                <ContentWaf />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Top Vulnerability</Card.Header>
                <ContentVuln />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Dashboard;

function ContentWaf(props) {
  return (
    <Table singleLine>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>First</Label>
          </Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

function ContentVuln(props) {
    return (
      <Table singleLine>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>First</Label>
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
