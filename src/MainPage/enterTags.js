import React from 'react';
import { suggestions } from '../data/data';

class EnterTags extends React.Component {

    constructor(props) {
        super(props);

        this.state = {tags: [{ id: 1, text: "Stuff" }, { id: 2, text: "Some more stuff" }],
            suggestions: suggestions
        }
    }

    render = () => {
        return <div>
            Hi
            {suggestions}
        </div>
    }
}

export default MainPage;