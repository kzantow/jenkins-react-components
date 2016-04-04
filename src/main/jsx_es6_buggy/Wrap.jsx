/**
 * Used to wrap elements in an inline-block with position: relative
 */
export class Wrap extends React.Component {
    render() {
        return <span className="j-ui-wrap">{this.props.children}</span>;
    }
}
