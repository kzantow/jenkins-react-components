/**
 * UI container, holds a spot for actions defined with <exports.Action> ...
 */
export class Panel extends React.Component {
    
    render() {
        var actions = null;
        var children = [];
        React.Children.forEach(this.props.children, function(child,i) {
            if(!child) {
                return;
            }
            if(child.type && child.type == exports.Actions) {
                actions = child;
                return;
            }
            children.push(child);
        });
        return <div className="j-ui-panel" style={{width: this.props.width ? this.props.width : ''}}>
            {children}
            {actions}
        </div>;
    }
}
Panel.defaultProps = {
    width: null
};
