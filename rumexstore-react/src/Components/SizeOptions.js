import React from 'react';
export const SizeOptions = (props) => {
  const { onChange, sizeOptions } = props;
  const sizeOptionsList = sizeOptions.map((sizeOption) => {
    return (
      <label className="radio" key={sizeOption.id.toString()}>
        <input
          type="radio"
          name="size"
          value={sizeOption.name}
          onChange={onChange}
          // defaultChecked
        ></input>
        <span>{sizeOption.name}</span>
      </label>
    );
  });
  return (
    <div className="size-options">
      <div className="clearfix"></div>
      {sizeOptionsList}
    </div>
  );
};
