export class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        };
    }
    componentWillReceiveProps(newProps) {
        if(newProps.show != this.state.show) {
            this.setState({show: newProps.show});
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(!prevState.show && this.state.show) {
            $(this.refs.modal).modal('show');
            $(this.refs.modal).on('hidden.bs.modal', this.onClose);
        }
    }
    componentDidMount() {
        $(this.refs.modal).modal('show');
        $(this.refs.modal).on('hidden.bs.modal', this.onClose);
    }
    onClose() {
        if(this.props.onClose) {
            this.props.onClose(this);
        }
    }
    show() {
        this.setState({show: true});
    }
    hide() {
        this.setState({show: false});
    }
    render() {
        if(!this.state.show) {
            return null;
        }
        return (
          <div className="modal fade" ref="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">{this.props.title}</h4>
                </div>
                <div className="modal-body">
                    {this.props.children}
                </div>
                <div className="modal-footer">
                  <exports.Button type="default" onClick={this.hide}>Close</exports.Button>
                  <exports.Button type="primary">Save changes</exports.Button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
Modal.defaultProps = {
    show: false
};
Modal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired
};
