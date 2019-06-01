import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal-v2';
import Details from './Details';

class DetailsModal extends Component {
  modalStyle = {
    content: {
      margin: '0 auto',
      width: '100%'
    }
  };
  render() {
    const { coinName, onRequestClose } = this.props;
    return (
      <div className="modal">
        <Modal
          onRequestClose={onRequestClose}
          effect={Effect.SideFall}
          style={{
            content: {
              margin: '0 auto',
              width: '100%'
            }
          }}
        >
          <div className="alignToRight">
            <button onClick={ModalManager.close}>X</button></div>
          <Details coin={coinName} />
        </Modal>
      </div>
    );
  }
}

export default DetailsModal;
