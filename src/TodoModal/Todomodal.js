import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Todomodal() {


    const [addItemsModal, setItemsModal] = React.useState(false);
    const [items, setState] = React.useState({ Name: "", Description: "", Created: "", CreationDate: "", UpdatedDate: "" });
    const [displaychecklist, setDisplaychecklist] = React.useState([]);

    const listitemsModalShow = () => {
        setItemsModal(true);
    }
    const listitemsModalHide = () => {
        setItemsModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisplaychecklist(prevState => ({
            displaychecklist: [...prevState.displaychecklist, items.items]
            // items: { Name: "", Description: "", Created: "", CreationDate: "", UpdatedDate: "" }
        }));

        alert(JSON.stringify(displaychecklist) + " " + items.items.Name);
        setState(prevState => ({
            items: { Name: "", Description: "", Created: "", CreationDate: "", UpdatedDate: "" }
        }));
    };

    const handleInput = e => {
        const { name, value } = e.target;

        setState(prevState => ({
            items: { ...prevState.items, [name]: value }
        }));
        console.log(items);
    };

    const formStyle = {

        marginLeft: "auto",
        marginRight: "auto"
    }

    return (
        <div className="Todomodal">
            <Button onClick={listitemsModalShow}
                style={{
                    marginTop: "15px",
                    marginBottom: "15px"
                }}>Create new item</Button>
            <div

            >
                <Modal
                    show={addItemsModal}
                    onHide={listitemsModalHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter"  >
                            <span style={
                                {
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: 'center'
                                }
                            }>Create a new checklist!</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={formStyle}>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control type="text" placeholder="Task name"
                                    name="Name" value={items.Name}
                                    onChange={handleInput} />

                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control type="text" placeholder="Task description"
                                    name="Description" value={items.Description}
                                    onChange={handleInput} />

                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Createdby</Form.Label>
                                <Form.Control type="text" placeholder="Created by"
                                    name="Created" value={items.Created}
                                    onChange={handleInput} />

                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Creation date</Form.Label>
                                <Form.Control type="datetime-local" placeholder="Creation date"
                                    name="CreationDate" value={items.CreationDate}
                                    onChange={handleInput} />

                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Updation date</Form.Label>
                                <Form.Control type="datetime-local" placeholder="Updation date"
                                    name="UpdatedDate" value={items.UpdatedDate}
                                    onChange={handleInput} />

                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Create
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <h3>{JSON.stringify(items)}</h3> */}
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}

export default Todomodal;

