import React from 'react';
import ReactStars from 'react-stars'
import Dialog from 'material-ui/Dialog';

class Rating extends React.Component {
    constructor(props) {
        super(props);

        this.ratingChanged = this.ratingChanged.bind(this);
    }

    ratingChanged(rating) {
        console.log(rating);
        this.props.rated(rating);
        this.setState({
            openModal: false
        });
    }

    render = () => {
        return <Dialog
        title={"Rate your companion"}
        modal={true}
        open={this.props.show}
      >
      <div className="row">
        <div className="centered-rating">
            <ReactStars count={5} onChange={this.ratingChanged} size={32} color2={'#ffd700'} />
        </div>
      </div>
        
      </Dialog>
      ;
    }
}

export default Rating;