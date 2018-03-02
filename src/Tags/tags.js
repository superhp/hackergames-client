import React from 'react';
import { suggestions } from '../data/data';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from './tags.css';

//info to change stuff: https://www.npmjs.com/package/react-tag-input
class Tags extends React.Component {

    constructor(props) {
        super(props);

        this.state = {tags: [{ id: 1, text: "Great stuff" }],
            suggestions: suggestions
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});

        let tagNames = this.state.tags.map(x => x.text);
        this.props.updateTags(tagNames);
    }

    handleAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
        
        let tagNames = this.state.tags.map(x => x.text);
        this.props.updateTags(tagNames);
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;
 
        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: tags });
    }

    render = () => {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} />
            </div>
        )
    }
}

export default Tags;