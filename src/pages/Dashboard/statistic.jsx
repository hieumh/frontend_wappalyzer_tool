import { Pie, Bar } from "react-chartjs-2";
import { Table, Statistic } from "semantic-ui-react"


function NumFrame(props) {
    const number_of_frame = props.number_of_frame ? props.number_of_frame : 0
    return (
        <Statistic>
            <Statistic.Label>Number of frameworks</Statistic.Label>
            <Statistic.Value>{number_of_frame}</Statistic.Value>
        </Statistic>
    );
}

function NumTech(props) {
    const number_of_lang = props.number_of_lang ? props.number_of_lang : 0

    return (
        <Statistic>
            <Statistic.Label>Number of languages</Statistic.Label>
            <Statistic.Value>{number_of_lang}</Statistic.Value>
        </Statistic>
    );
}

function NumVuln(props) {
    const number_of_vuln = props.number_of_vuln ? props.number_of_vuln : 0
    return (
        <Statistic>
            <Statistic.Label>Number of Vulnerabilities</Statistic.Label>
            <Statistic.Value>{number_of_vuln}</Statistic.Value>
        </Statistic>
    );
}

function NumReport(props) {
    const number_of_report = props.number_of_report ? props.number_of_report : 0
    return (
        <Statistic>
            <Statistic.Label>Number of reports</Statistic.Label>
            <Statistic.Value>{number_of_report}</Statistic.Value>
        </Statistic>
    );
}

function LanguageChart(props) {
    const lang_ratio = {
        label: Array.isArray(props.lang_ratio) ? props.lang_ratio.map((element) => element["programing_language"]) : [],
        data: Array.isArray(props.lang_ratio) ? props.lang_ratio.map((element) => element["count"]) : [],
    };
    return (
        <Pie
            data={{
                labels: lang_ratio.label,
                datasets: [
                    {
                        label: "Rainfall",
                        backgroundColor: [
                            "#C9DE00",
                            "#2FDE00",
                            "#00A6B4",
                            "#6800B4",
                            "#B21F00",
                            "#DDDDDD",
                        ],
                        hoverBackgroundColor: [
                            "#4B5000",
                            "#175000",
                            "#003350",
                            "#35014F",
                            "#501800",

                        ],
                        data: lang_ratio.data,
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

function FrameworkChart(props) {
    const frame_ratio = {
        label: Array.isArray(props.frame_ratio) ? props.frame_ratio.map((element) => element["framework"]) : [],
        data: Array.isArray(props.frame_ratio) ? props.frame_ratio.map((element) => element["count"]) : []
    };
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <Bar
            data={{
                labels: frame_ratio.label,
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
                        data: frame_ratio.data,
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
    const top_waf = Array.isArray(props.top_waf) ? props.top_waf : []

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
                {top_waf.length
                    ? top_waf.map((element, index) => {
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
    const top_vuln = Array.isArray(props.top_vuln) ? props.top_vuln : [];

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
                {top_vuln.length
                    ? top_vuln.map((element, index) => {
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
    const top_url = Array.isArray(props.top_url) ? props.top_url : [];

    return (
        <Table singleLine size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Url</Table.HeaderCell>
                    <Table.HeaderCell>Record count</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {top_url.length
                    ? top_url.map((element, index) => {
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


export {
    NumFrame,
    NumTech,
    NumVuln,
    NumReport,
    LanguageChart,
    FrameworkChart,
    ListWaf,
    ListVuln,
    ListUrl
}
