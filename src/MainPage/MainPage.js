import React from 'react';
import Tags from '../Tags/tags';

class MainPage extends React.Component {

    constructor() {
        super();
    }

    handleTagsChange = (tags) => {
        console.log(tags);
    }

    render = () => {
        return <div>
            Hi
            <Tags updateTags={this.handleTagsChange}/>
        </div>
    }
}

export default MainPage;