import React from 'react';
import { suggestions } from '../data/data';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from './tags.css';

//info to change stuff: https://www.npmjs.com/package/react-tag-input
class Tags extends React.Component {

    constructor(props) {
        super(props);

        var suggestions = this.getSuggestions(this.props.users);
        console.log("suggestions");
        console.log(suggestions);

        this.state = {tags: [{ id: 1, text: "Great stuff" }],
            suggestions: suggestions
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    getSuggestions(users) {
        console.log(users);
        var suggestions = users.map(u => u.tags);
        return [].concat.apply([], suggestions).filter(this.onlyUnique);
    }

    componentWillReceiveProps(nextProps) {
        var suggestions = this.getSuggestions(nextProps.users);

        this.setState({
            suggestions: suggestions
        })
    }

    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
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
            <div class="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <ReactTags tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag} />
                </div>
                <div className="col-sm-12"></div>
            </div>
            
        )
    }
}

export default Tags;