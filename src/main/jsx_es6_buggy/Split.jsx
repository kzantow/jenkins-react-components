/**
 * Give the container a recommended width
 */
export class Split extends React.Component {
    collectChildren(children, key) {
        var out = [];
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if(exports.isArray(child)) {
                var grandChildren = this.collectChildren(child, key + i + '_');
                for(var j = 0; j < grandChildren.length; j++) {
                    out.push(grandChildren[j]); // already wrapped in spans
                }
            }
            else {
                out.push(<span key={key + i}>{child}</span>);
            }
        }
        return out;
    }
    render() {
        return <div className={'j-ui-split' + (this.props.align ? (' align-' + this.props.align) : '')} style={this.props.style}>
        {this.collectChildren(this.props.children, '')}
        </div>;
    }
}
