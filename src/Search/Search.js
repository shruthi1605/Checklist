import React from 'react';

class Checklist extends Component {
    render() {
        return (
            <div>
                <form style={
                    {
                        margin: "15px 20px"
                    }
                }>
                    <fieldset className="form-group">
                        <input type="text"
                            className="form-control form-control-lg"
                            placeholder="Search here..."
                            ref={input => this.search = input}
                            onChange={this.handleInputChange}
                        />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Search;

