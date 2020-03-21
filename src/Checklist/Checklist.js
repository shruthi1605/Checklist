import React, { Component } from 'react';
import Todomodal from '../TodoModal/Todomodal';
import Checklistitems from '../ChecklistItems/Checklistitems';
import { Container, Row, Col } from 'react-bootstrap';
import './Checklist.css';

import '../Fonts/Fonts.css';

// const $ = window.$;

class Checklist extends Component {

    constructor() {
        super();

    this.state = {
        query: '',
        listItems: {
            Name: "",
            Description: "",
            Created: "",
            CreationDate: "",
            UpdatedDate: ""
        },
        displaychecklist: [],
        currentPage: 1,
          todosPerPage: 5,
          upperPageBound: 1,
          lowerPageBound: 0,
          isPrevBtnActive: 'disabled',
          isNextBtnActive: '',
          pageBound: 1

    };

    this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);

}

    componentDidMount() {

        const myurl = "http://localhost:4000/items";
        fetch(myurl)
            .then(res => res.json())
            .then((data) => {
                this.filteredlists = data;
                this.setState({
                    displaychecklist: data,

                })
            })
            .catch(console.log)
    }
    filteredlists = [];
    handleInputChange = (event) => {

        const query = event.target.value;
        console.log(query);
        console.log(this.state.displaychecklist);

        const filterlists = this.filteredlists.filter((item) => {
            console.log(item);

            return item.Name.toLowerCase().indexOf(
                query.toLowerCase()) !== -1 || item.Description.toLowerCase().indexOf(
                    query.toLowerCase()) !== -1;


        });

        console.log(filterlists);
        this.setState({ displaychecklist: filterlists });

    };

   
    // handleInput = e => {
    //     const { name, value } = e.target;

    //     this.setState(prevState => ({
    //         listItems: { ...prevState.listItems, [name]: value }
    //     }));
    // };

    // handleSubmit = (e) => {
    //     e.preventDefault();

    //     this.setState(prevState => ({
    //         displaychecklist: [...prevState.displaychecklist, prevState.listItems],
    //         listItems: { Name: "", Description: "", Created: "", CreationDate: "", UpdatedDate: "" }
    //     }));
    // };

    handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
          currentPage: listid
        });
        
        this.setPrevAndNextBtnClass(listid);
      }
      setPrevAndNextBtnClass(listid) {
        let totalPage = Math.ceil(this.state.displaychecklist.length / this.state.todosPerPage);
        this.setState({isNextBtnActive: 'disabled'});
        this.setState({isPrevBtnActive: 'disabled'});
        if(totalPage === listid && totalPage > 1){
            this.setState({isPrevBtnActive: ''});
        }
        else if(listid === 1 && totalPage > 1){
            this.setState({isNextBtnActive: ''});
        }
        else if(totalPage > 1){
            this.setState({isNextBtnActive: ''});
            this.setState({isPrevBtnActive: ''});
        }
    }
      btnIncrementClick() {
          this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
          let listid = this.state.upperPageBound + 1;
          this.setState({ currentPage: listid});
          this.setPrevAndNextBtnClass(listid);
    }
      btnDecrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
    }
    btnPrevClick() {
        if((this.state.currentPage -1)%this.state.pageBound === 0 ){
            this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
        }
        let listid = this.state.currentPage - 1;
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }
    btnNextClick() {
        console.log(this.state);
        if((this.state.currentPage +1) > this.state.upperPageBound ){
            this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        }
        let listid = this.state.currentPage + 1;
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }
    firstPage(){
        if((this.state.currentPage -1)%this.state.pageBound === 0 ){
            this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
        }
        let listid = 1;
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }
    lastPage(){
        if((this.state.currentPage +1) > this.state.upperPageBound ){
            this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        }
        let listid = Math.ceil(this.state.displaychecklist.length / this.state.todosPerPage);
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }

    render() {

        const { displaychecklist, currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentChecklist = displaychecklist.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(displaychecklist.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if(number === 1 && currentPage === 1){
                return(
                    <li key={number}  id={number} className="btns"><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
            else if((number < upperPageBound + 1) && number > lowerPageBound){
                return(
                    <li key={number} id={number} className="btns"><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
        });
        let pageIncrementBtn = null;
        
        let pageDecrementBtn = null;
        
        let renderPrevBtn = null;
        if(isPrevBtnActive === 'disabled') {
            renderPrevBtn = <li className={isPrevBtnActive} className="btns"><span id="btnPrev"> &lsaquo; Prev </span></li>
        }
        else{
            renderPrevBtn = <li className={isPrevBtnActive} className="btns"><a href='#' id="btnPrev" onClick={this.btnPrevClick}> &lsaquo; Prev </a></li>
        }
        let renderNextBtn = null;
        if(isNextBtnActive === 'disabled') {
            renderNextBtn = <li className={isNextBtnActive} className="btns"><span id="btnNext"> Next &rsaquo; </span></li>
        }
        else{
            renderNextBtn = <li className={isNextBtnActive} className="btns"><a href='#' id="btnNext" onClick={this.btnNextClick}> Next &rsaquo; </a></li>
        }

        let renderFirstPage = null;
        
            renderFirstPage = <li className={isPrevBtnActive} className="btns"><a href='#' id="btnPrev" onClick={this.firstPage}> &lsaquo;&lsaquo; Prev </a></li>
            //renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
        
        let renderLastPage = null;
        
            renderLastPage = <li className={isNextBtnActive} className="btns"><a href='#' id="btnPrev" onClick={this.lastPage}> Next &rsaquo;&rsaquo; </a></li>
        

        return (
            
            <div className="checkList">
                <Container fluid="lg">
                    <Row>

                        <Col>
                            <h2 style={

                                {
                                    fontFamily: 'Roboto Slab',
                                    marginTop: "2%",
                                    textAlign: "left"
                                }
                            }>Check Lists</h2>
                        </Col>

                    </Row>
                    <Row>
                        <Col lg={6}></Col>
                        <Col lg={3}>
                            <form style={
                                {
                                    marginTop: "15px",
                                    marginBottom: "15px"
                                }
                            }>
                                <fieldset className="form-group inner-addon left-addon">
                                <i className='inn fa fa-search'></i>
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Search here..."
                                        onChange={this.handleInputChange}
                                    />
                                </fieldset>
                            </form></Col>
                        <Col lg={3}>
                            <Todomodal items={this.state.listItems} ></Todomodal>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Checklistitems items={currentChecklist}></Checklistitems>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <ul className="pagination">
                            {renderFirstPage}
              {renderPrevBtn}
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}
              {renderNextBtn}
              {renderLastPage}
            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default Checklist;