/**
 * Used for a horizontal 'row' wrapper to apply consistent padding
 */
export class Row extends React.Component {
    render() {
        return <div className="j-ui-row">{this.props.children}</div>;
    }
}
