import React from 'react';

export const PhotoSlider = ({ photos, width, height }) => {
  const [image, setImage] = React.useState(photos[0]);
  //loading state
  const [loading, setLoading] = React.useState(true);
  //when image loaded set loading to false
  const onImageLoad = React.useCallback((e) => {
    // setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, []);
  const columnTemplates = width + ' 0';
  React.useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
  const photoList = photos.map((photo) => {
    return (
      <div
        key={photo.id.toString()}
        className="card"
        style={{
          gridTemplateColumns: `${columnTemplates}`,
          width: `${width}`,
        }}
      >
        {/* <div className="card-cover"></div> */}
        <img
          className="card-image"
          src={photo.url}
          alt={photo.caption}
          style={{ height: `${height}` }}
          onClick={() => {
            change_image(photo);
          }}
        />
      </div>
    );
  });
  const change_image = (e) => {
    if (e !== image) {
      setImage(e);
      // setTimeout(() => {
      //   setImage(e);
      // }, 250);
    }
  };
  return (
    <React.Fragment>
      <div className="photo-slider">
        <div
          className="preview-pic"
          style={{ height: `calc(92% - ${height})` }}
        >
          <img
            className={`${loading ? 'loading' : 'loaded'}`}
            src={image.url}
            alt="..."
            onLoad={onImageLoad}
          />
        </div>
        <div className="thumbnails">
          <section>{photoList}</section>
        </div>
      </div>
    </React.Fragment>
  );
};
