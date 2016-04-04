export class Button extends React.Component {
    handleClick(event) {
        event.preventDefault();
        if(this.props.onClick) {
            this.props.onClick();
        }
    }
    getContent() {
        if(React.Children.count(this.props.children) > 0) {
            return this.props.children;
        }
        return this.props.label;
    }
    render() {
        return <button className={'btn btn-' + this.props.type} disabled={this.props.disabled} onClick={this.handleClick}>{this.getContent()}</button>;
    }
}
Button.defaultProps = {
    type: 'default',
    disabled: false
};
