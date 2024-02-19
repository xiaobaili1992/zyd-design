import React from 'react';
import { Tooltip } from 'antd'

const MyTooltip = () => {
  console.log('MyTooltip');
  return (
      <Tooltip title="Hello World!">
        <div>Hello World!</div>
      </Tooltip>
  )
}

export default MyTooltip;