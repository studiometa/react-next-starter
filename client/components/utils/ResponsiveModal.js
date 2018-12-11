import Dialog           from '@material-ui/core/Dialog';
import DialogActions    from '@material-ui/core/DialogActions';
import DialogContent    from '@material-ui/core/DialogContent';
import DialogTitle      from '@material-ui/core/DialogTitle';
import IconButton       from '@material-ui/core/IconButton';
import Slide            from '@material-ui/core/Slide';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CloseIcon        from '@material-ui/icons/Close';
import PropTypes        from 'prop-types';
import React            from 'react';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}



/**
 * This is a modal component that works very well on desktop and on mobile
 * It it fully customizable to meet all your needs
 * Enjoy <3
 * @see https://material-ui.com/api/modal/#modal
 */
class ResponsiveModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,      // Define if the modal is open
    closeModal: PropTypes.func.isRequired,  // Function to close the modal
    modalProps: PropTypes.object,           // Props that are passed to the Modal component
    contentProps: PropTypes.object,         // Props that are passed to the ModalContent component
    maxWidth: PropTypes.any,                // Max width of the modal
    paperProps: PropTypes.object,           // Custom props for the Paper component
    noCloseBtn: PropTypes.bool,             // Allow to hide the close btn
    title: PropTypes.any,                   // Optional title
    bottomActions: PropTypes.element,       // Custom bottom action components
  };

  static defaultProps = {
    isOpen: false,
    closeModal: () => {},
    modalProps: {},
    contentProps: {},
    maxWidth: 480,
    paperProps: {},
    noCloseBtn: false,
  };


  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState !== this.state
      || nextProps.isOpen !== this.props.isOpen
      || nextProps.modalProps !== this.props.modalProps
      || nextProps.contentProps !== this.props.contentProps
      || nextProps.maxWidth !== this.props.maxWidth
      || nextProps.paperProps !== this.props.paperProps
      || nextProps.noCloseBtn !== this.props.noCloseBtn
      || nextProps.title !== this.props.title
      || nextProps.bottomActions !== this.props.bottomActions
      || nextProps.fullScreen !== this.props.fullScreen
      || nextProps.children !== this.props.children
    );
  }


  render() {
    let {
          isOpen,
          closeModal,
          modalProps,
          children,
          maxWidth,
          noCloseBtn,
          fullScreen,
          title,
          bottomActions,
          paperProps,
          contentProps,
        } = this.props;


    return (
      <Dialog
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        open={isOpen}
        onClose={closeModal}
        {...modalProps}
        PaperProps={{
          ...paperProps,
          style: { maxWidth: fullScreen ? 'initial' : maxWidth, ...(paperProps.style || {}) },
        }}
      >
        {
          ((fullScreen === true && bottomActions === undefined) || noCloseBtn !== true) &&
          <IconButton style={{ position: 'absolute', right: 0, top: 0, zIndex: 2000 }} onClick={closeModal}>
            <CloseIcon style={{ color: '#999EA6' }}/>
          </IconButton>
        }
        {
          title !== undefined && <DialogTitle>{title}</DialogTitle>
        }
        <DialogContent {...contentProps}>
          {children}
        </DialogContent>
        {
          bottomActions !== undefined &&
          <DialogActions>
            {bottomActions}
          </DialogActions>
        }
      </Dialog>
    );
  }
}



export default withMobileDialog()(ResponsiveModal);