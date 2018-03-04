import React from 'react';
import ReactStars from '../ReactStar'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Rating extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ratings : {} };
        this.ratingChanged = this.ratingChanged.bind(this);
    }

    componentDidMount() {
        // var items = [];
        // this.props.tags.forEach(tag => {
        //     items.push(<div>
        //         <span>Tag</span>
        //         <ReactStars count={5} onChange={this.ratingChanged} size={32} color2={'#ffd700'} />
        //     </div>);
        // });

        

        

        // this.setState({
        //     items: items
        // })
    }

    ratingChanged(rating, tagName) {
        //debugger;

        this.state.ratings[tagName] = rating;

        

        // this.props.rated(rating);
        // this.setState({
        //     openModal: false
        // });
    }

    handleClose = () => {
        this.props.closeRating();
    }

    handleSubmit = () => {
        debugger;
        console.log(this.state.ratings);
        this.props.rated(this.state.ratings);
    }

    render = () => {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.handleSubmit}
            />,
        ];

        const items = this.props.tags.map(tag => (
        <div className="row">
            <div className="col-md-6" style={{textAlign: 'right'}}>{tag.name}</div>
            <div style={{marginTop: '-12px'}} className="col-md-6">
                <ReactStars count={5} tag={tag.name} onChange={this.ratingChanged} size={32} color2={'#ffd700'} />
            </div>
        </div>));

        return <Dialog
        title={"Rate your companion"}
        modal={true}
        open={this.props.show}
        actions={actions}
      >
      <div className="row">
        <div className="centered-rating">
            {items}
        </div>
      </div>
        
      </Dialog>
      ;
    }
    
}

export default Rating;