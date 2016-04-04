/**
 * 
 */
export class PopoverButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show ? true : false
        };
    }
    componentWillReceiveProps(props) {
        if('show' in props && !exports.isArray(props.show) && props.show !== this.state.show) {
            this.setState({show: props.show});
        }
    }
    preShow(e) {
        if(this.isShown()) {
            this.state.isHiding = true;
        }
    }
    show(e) {
        if(e) {
            e.preventDefault();
            if(this.state.isHiding) { // ick this is for handling clicking the button to close the popover
                this.state.isHiding = false;
                return;
            }
        }
        
        if(exports.isArray(this.props.show)) {
            this.props.show[0][this.props.show[1]] = true;
            this.forceUpdate();
        }
        else {
            this.setState({show: true});
        }
        if(this.props.onShow) {
            this.props.onShow();
        }
    }
    hide(e) {
        if(e) {
            e.preventDefault();
        }
        
        if(exports.isArray(this.props.show)) {
            this.props.show[0][this.props.show[1]] = false;
            if(this.isMounted()) {
                this.forceUpdate();
            }
        }
        else {
            if(this.isMounted()) {
                this.setState({show: false});
            }
        }
        
        if(this.props.onHide) {
            this.props.onHide();
        }
    }
    isShown() {
        if(exports.isArray(this.props.show)) {
            return true === this.props.show[0][this.props.show[1]];
        }
        return this.state.show;
    }
    render() { return (
        <span className="j-ui-wrap">
            <button className={'btn btn-' + this.props.type + (this.isShown() ? ' active' : '')} onMouseDown={this.preShow} onClick={this.show}>
                {this.props.label}
            </button>
            <exports.Popover position={this.props.position} show={this.isShown()} onClose={this.hide}>
                <exports.Panel>
                    {exports.getChildrenExclduingType(this.props.children, exports.Actions)}
                    <exports.Actions>
                        <exports.Button type="link" onClick={this.hide}>Close</exports.Button>
                        {exports.eachChildOfType(this.props.children, exports.Actions, function(child) { return child.props.children; }.bind(this))}
                    </exports.Actions>
                </exports.Panel>
            </exports.Popover>
        </span>
    );}
}
PopoverButton.propTyes = {
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func
};
PopoverButton.defaultProps = {
    position: 'bottom-right',
    type: 'default'
};
