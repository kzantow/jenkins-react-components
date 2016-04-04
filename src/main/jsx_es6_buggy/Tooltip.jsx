/**
 * Implements a bootstrap-esque tooltip container
 */
export class Tooltip extends React.Component {
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).tooltip();
    }
    render() { return (
        <span className='tooltip' title={this.props.text}></span>
    );}
}
