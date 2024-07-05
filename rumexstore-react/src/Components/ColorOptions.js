import React from 'react';
export const ColorOptions = (props) => {
  const { onChange, colorOptions } = props;
  const colorOptionsList = colorOptions.map((colorOption) => {
    function SetStyle(colorOption) {
      if (colorOption) {
        if (colorOption.url)
          return {
            backgroundImage: `url(${colorOption.url})`,
          };
        else if (colorOption.color)
          return {
            backgroundColor: colorOption.color,
          };
      }
    }
    return (
      <React.Fragment key={colorOption.id.toString()}>
        <input
          //   key={colorOption.id.toString()}
          className="color-btn"
          type="radio"
          id={colorOption.name}
          name="color-btn"
          value={colorOption.name}
          onChange={onChange}
        />
        <label
          className="first-color"
          htmlFor={colorOption.name}
          style={SetStyle(colorOption)}
        ></label>
      </React.Fragment>
    );
  });
  return (
    <div className="color-options">
      <div className="clearfix"></div>
      {colorOptionsList}
    </div>
  );
};
