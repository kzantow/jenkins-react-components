/**
 * Helper to conditionally render based on a condition
 */
export class If extends React.Component {
    render() {
        if(this.props.rendered && this.props.children) {
            return <div>{this.props.children}</div>;
        }
        return null;
    }
}
If.propTypes = {
    rendered: React.PropTypes.bool.isRequired
};
If.defaultProps = {
    rendered: false
};
