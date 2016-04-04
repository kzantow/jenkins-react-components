import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import util from './util';

export class Popover extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(props);
    }
    initialState(props) {
        return {
            show: this.props.show,
            position: this.props.position ? this.props.position : 'bottom-right',
            active: false
        };
    }
    componentWillReceiveProps(props) {
        if(props.show != this.state.show) {
            this.setState({show: props.show});
            this.positionHandler();
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if(!this.state.show && nextState.show) { // if the drop-down is shown
            this.positionHandler();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(!prevState.show && this.state.show) { // if the drop-down was shown
            this.positionHandler();
        }
    }
    positionHandler(e) {
        if(!this.state.show || this.props.fixed) {
            if(this.state.show && !this.state.active) {
                this.setState({active: true});
            }
            return;
        }

        var $this = $(ReactDOM.findDOMNode(this));
        $this = $this.find('.j-ui-popover'); // make sure this is right
        var w = $this.width();
        var h = $this.height();
        var l = $this.offset().left;
        var t = $this.offset().top;
        
        var $container = $this.offsetParent();
        var cw = $container.width();
        var ch = $container.height();
        var cl = $container.offset().left;
        var ct = $container.offset().top;
        var cr = cl + cw;
        var cb = ct + ch;
        
        // offsets from container - needs to match the css, maybe calc this?
        var insetT = 4; // inset to the container
        var insetR = 4;
        var insetB = 4;
        var insetL = 4;
        var offsetT = 10; // offset from the container
        var offsetR = 10;
        var offsetB = 10;
        var offsetL = 10;
        
        // Gather all the positions between:
        
        var vl = cr + offsetR - w;
        var vr = cl - offsetL + w;
        var vt = ct + insetT - h;
        var vb = cb - insetB + h;
        
        var hl = cl + insetL - w;
        var hr = cr - insetR + w;
        var ht = cb + offsetB - h;
        var hb = ct - offsetT + h;
        
        var $win = $(window);
        var $doc = $(document);
        var winW = $win.width();
        var winH = $win.height();
        var winL = $doc.scrollLeft();
        var winT = $doc.scrollTop();
        var winR = winL + winW;
        var winB = winT + winH;
        
        var canFit = {
            'bottom-left': vl > winL && vb < winB,
            'bottom-center': 0,
            'bottom-right': vr < winR && vb < winB,
            'top-left': vl > winL && vt > winT,
            'top-center': 0,
            'top-right': vr < winR && vt > winT,
            'right-top': hr < winR && ht > winT,
            'right-middle': 0,
            'right-bottom': hr < winR && hb < winB,
            'left-top': hl > winL && ht > winT,
            'left-middle': 0,
            'left-bottom': hl > winL && hb < winB
        };
        
        var isOver = {
            top: t < winT,
            bottom: t+h > winB,
            left: l < winL,
            right: l+w > winR
        };
        
        // not on screen
        // can fit another position?
        var preferred = this.props.position && canFit[this.props.position] ? this.props.position : this.state.position;
        if(!canFit[preferred]) {
            if(isOver.top) {
                preferred = preferred.replace('top','bottom');
            }
            if(isOver.right) {
                preferred = preferred.replace('right','left');
            }
            if(isOver.bottom) {
                preferred = preferred.replace('bottom','top');
            }
            if(isOver.left) {
                preferred = preferred.replace('left','right');
            }
        }
        
        if(preferred != this.state.position && canFit[preferred]) {
            this.setState({position: preferred});
        }
        
        this.setState({active: true});
    }
    closeHandler(e) {
        if(!this.state.show) {
            return;
        }
        try {
            if(e.keyCode) {
                if(e.keyCode !== 27) {
                    return;
                }
            } else if(util.isDescendant(ReactDOM.findDOMNode(this), e.target)) {
                return; // don't close for events that originated in the popover
            }
        } catch(x) {
            // ignore - e.g. DOM node was removed
        }
        
        this.handleClose();
    }
    componentDidMount() {
        if(debug) console.log('adding handlers for popover...');
        $(document).
            on('click keyup', this.closeHandler).
            on('scroll resize', this.positionHandler);
        
        if(this.state.show) {
            this.positionHandler();
        }
    }
    componentWillUnmount() {
        this.setState({active: false});
        if(debug) console.log('removing handlers for popover...');
        $(document).
            off('click keyup', this.closeHandler).
            off('scroll resize', this.positionHandler);
    }
    show() {
        this.setState({show: true});
    }
    hide() {
        this.setState({show: false});
    }
    handleClose() {
        if(this.isMounted()) {
            this.setState({show: false});
            this.replaceState(this.initialState()); // reset state
        }
        else {
            this.state.show = false; // ick
        }
        if(this.props.onClose) {
            this.props.onClose();
        }
    }
    render() {
        if(!this.state.show) {
            return null;
        }
        return <ReactCSSTransitionGroup transitionName="j-ui-popover" transitionEnterTimeout={0} transitionLeaveTimeout={0} transitionAppear={true} transitionAppearTimeout={500}>
            <div key="pop" className={'j-ui-popover active ' + this.state.position + ' ' + this.props.type}>
               {util.when(this.props.title, function() { return <h3>{this.props.title}</h3>; })}
               {this.props.children}
            </div>
        </ReactCSSTransitionGroup>;    
    }
}
Popover.defaultProps = {
    show: false,
    closeable: true,
    type: ''
};
Popover.propTypes = {
    show: React.PropTypes.bool,
    closeable: React.PropTypes.bool,
    fixed: React.PropTypes.bool,
    type: React.PropTypes.string,
    position: React.PropTypes.oneOf([
        'bottom-left','bottom-center','bottom-right',
        'top-left','top-center','top-right',
        'right-top','right-middle','right-bottom',
        'left-top','left-middle','left-bottom'])
};
