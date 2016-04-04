/**
 * A simple wrapper around another item which provides a drop-down arrow on hover
 */
export class ActionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showActions: false
        };
    }
    onShowActions() {
        this.setState({showActions: true});
    }
    onHideActions() {
        this.setState({showActions: false});
    }
    hide() {
        this.onHideActions();
    }
    render() {
        var actions = null;
        var renderedChildren = [];
        React.Children.forEach(this.props.children, function(child) {
            if(!child) {
                return;
            }
            if(child.type && child.type == Actions) {
                actions = <div className={'drop-down ' + (this.state.showActions ? ' active' : '')}>
                    <div className="toggle" onClick={this.onShowActions}>
                        <i className="fa fa-caret-down"></i>
                    </div>
                    <Popover type="plain" position="bottom-left" fixed={true} show={this.state.showActions} onClose={this.onHideActions}>
                        {child.props.children}
                    </Popover>
                </div>;
                return;
            }
            renderedChildren.push(child);
        }.bind(this));
        return <div className="action-menu">
            {renderedChildren}
            {actions}
        </div>;
    }
}
ActionMenu.defaultProps = {
    width: null
};
