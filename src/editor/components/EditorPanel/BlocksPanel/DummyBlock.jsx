import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { translate } from 'react-i18next';

import * as ItemTypes from 'editor/constants/itemType';
import classNames from 'classnames';

const blockTarget = {
  drop(props, monitor, component) {
    const hoverIndex = props.index;
    const dragItem = monitor.getItem();
    const { macroId } = dragItem;

    if (props.onDropMacro) props.onDropMacro(hoverIndex, macroId);

    return {
      moving: true,
    };
  },

  hover(props, monitor, component) {
    const { macroId } = monitor.getItem();
  },
};

export const DummyBlock = translate(['editor'])((props) => {
  const {
    t,
    connectDropTarget,
    hover,
    disabled,
    style,
  } = props;

  const className = classNames('block', 'dummy', {
    hover,
    disabled,
  });

  const component = (
    <div {...{ className, style }}>
      {t(`blocksList.dummyBlock.${hover ? 'hover' : 'normal'}`)}
    </div>
  );

  if (connectDropTarget && !disabled) {
    return connectDropTarget(component);
  }
  return component;
});

DummyBlock.propTypes = {
  connectDropTarget: PropTypes.func,
  hover: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

DummyBlock.defaultProps = {
  hover: false,
  disabled: false,
};

export default
DropTarget(ItemTypes.MACRO, blockTarget, (connectDnD, monitor) => ({
  connectDropTarget: connectDnD.dropTarget(),
  hover: monitor.isOver(),
}))(DummyBlock);
