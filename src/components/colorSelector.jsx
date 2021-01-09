import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

const NowColor = styled.div`
    padding: 11px 11px;
    margin: 0 ${(props) => props.margin}px;
    background-color: ${(props) => props.now_color};
    cursor: pointer;
`;

const ColorPalatte = styled.div`
    padding: 3px;
`;

const ColorSelector = ({ penInfo, setPenInfo }) => {
  const [palatteExpanded, setValue] = useState(0);


  function handleChange(color) {
    console.log(color.rgb);
    setPenInfo({
      ...penInfo,
      stroke: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
    });
  }

  return (
    <div>
      <NowColor
        onClick={() => setValue(!palatteExpanded)}
        now_color={penInfo.stroke}
        margin={palatteExpanded ? 3 : 0}
      />
      { palatteExpanded ? (
        <ColorPalatte>
          <ChromePicker
            color={penInfo.stroke}
            onChange={handleChange}
          />
        </ColorPalatte>
      ) : null}
    </div>
  );
};

export default ColorSelector;
