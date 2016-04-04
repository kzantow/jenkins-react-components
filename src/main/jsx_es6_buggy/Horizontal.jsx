export class Horizontal extends React.Component {
    render() {
        return <div className="horizontal" style={this.props.width ? this.props.width : ''}>{this.props.children}</div>;
    }
}
Horizontal.defaultProps = {
    width: null
};
