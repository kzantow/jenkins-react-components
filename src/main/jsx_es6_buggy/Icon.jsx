export class Icon extends React.Component {
    render() {
        return <span className={'glyphicon glyphicon-' + this.props.type} aria-hidden="true" style={this.props.style}></span>;
    }
}
