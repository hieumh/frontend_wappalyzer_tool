import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { host, pageHistorySize } from '../lib_front'
import { Button, Table, Pagination } from 'semantic-ui-react'
import '../css/History.css'
import '../css/Card.css'


function HistoryReport() {
    const [history, setHistory] = useState([])
    const [location, setLocation] = useState({})
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        fetch(host + '/history', {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        }).then(data => data.json()).then(data => {
            setHistory(data)
        })
    }, [])

    // get back to analyze result
    function handleClick(e) {
        if (e.target.parentNode.id) {
            setLocation({
                pathname: '/analyze_result',
                state: {
                    token: e.target.parentNode.id,
                    url: e.target.parentNode.childNodes[1].innerHTML,
                    isAnalyze: false
                }
            })
        }

    }

    // create html file
    function handleSubmit(e) {
        localStorage.setItem("report", JSON.stringify(history[e.target.id]))
        window.open("http://localhost:3001/report", "_blank") //to open new page
    }

    function handlePaginationChange(e, { activePage }) {
        setActivePage(activePage)
    }

    if (JSON.stringify(location) !== JSON.stringify({})) {
        return (<Redirect to={location} />)
    }
    return (
        <div id='history'>
            <div className='history-card'>
                <div className='card-header__'>
                    <h3 className='card-title__'>History</h3>
                    <p className='card-category__'>All reports in database</p>
                </div>
                <div className='card-body__'>
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Url</Table.HeaderCell>
                                <Table.HeaderCell>Created time</Table.HeaderCell>
                                <Table.HeaderCell>Create HTML file</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                history.slice(activePage * pageHistorySize - pageHistorySize < 0 ? 0 : activePage * pageHistorySize - pageHistorySize, activePage * pageHistorySize).length !== 0 ? history.slice(activePage * pageHistorySize - pageHistorySize < 0 ? 0 : activePage * pageHistorySize - pageHistorySize, activePage * pageHistorySize).map((element, index) => {
                                    return (<Table.Row id={element.token} key={index} onClick={handleClick}>
                                        <Table.Cell>{index+activePage*pageHistorySize-pageHistorySize+1}</Table.Cell>
                                        <Table.Cell>{element.url.length > 35 ? element.url.slice(0, 35) + "..." : element.url}</Table.Cell>
                                        <Table.Cell>{element.time_create.slice(0, 25)}</Table.Cell>
                                        <Table.Cell><Button id={index+activePage*pageHistorySize-pageHistorySize} onClick={handleSubmit}>Create HTML file</Button></Table.Cell>
                                    </Table.Row>)
                                }) : null
                            }
                        </Table.Body>
                    </Table>
                    <Pagination
                        defaultActivePage={1}
                        firstItem={null}
                        lastItem={null}
                        pointing
                        secondary
                        totalPages={Math.ceil(history.length/pageHistorySize)}
                        activePage={activePage}
                        onPageChange={handlePaginationChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default HistoryReport