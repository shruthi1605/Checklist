import React from 'react';
import { Table } from 'react-bootstrap';

const Checklistitems = ({ items }) => {

    return (
        <div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Creation Date</th>
                        <th>Updated Date</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Apparel</td>
                        <td>Checklist for shopping</td>
                        <td>Peter</td>
                        <td>22-07-2019 09:24 IST</td>
                        <td>23-07-2019 17:42 IST</td>
                    </tr>
                    {items.map((item,index) => (

                        <tr key={index}>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Created}</td>
                            <td>{item.CreationDate} IST</td>
                            <td>{item.UpdatedDate} IST</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
};

export default Checklistitems;

