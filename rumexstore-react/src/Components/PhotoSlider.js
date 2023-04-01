import React from 'react';

export const PhotoSlider = ({ photos, width, height }) => {
  const [image, setImage] = React.useState(photos[0]);
  //loading state
  const [loading, setLoading] = React.useState(true);
  //when image loaded set loading to false
  const onImageLoad = React.useCallback((e) => {
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
        <img
          className="card-image"
          src={
            photo.url.startsWith('https')
              ? photo.url
              : `../images/product${photo.url}`
          }
          alt={photo.caption}
          style={{ height: `${height}` }}
          onClick={() => {
            change_image(photo);
          }}
          onError={(event) => {
            event.target.src = '../images/product-image.png';
            event.onerror = null;
          }}
        />
      </div>
    );
  });
  const change_image = (e) => {
    if (e !== image) {
      setImage(e);
    }
  };
  return (
    <React.Fragment>
      <div className="photo-slider">
        <div className="preview-pic">
          <img
            className={`${loading ? 'loading' : 'loaded'}`}
            src={
              image.url.startsWith('https')
                ? image.url
                : `../images/product${image.url}`
            }
            alt="..."
            style={{ maxHeight: `calc(100vh - ${height}*1.6)` }}
            onLoad={onImageLoad}
            onError={(event) => {
              event.target.src = '../images/product-image.png';
              event.onerror = null;
            }}
          />
        </div>
        <div className="thumbnails">
          <section
            style={{ width: `calc(${photos?.length || 1}*${width}*1.005)` }}
          >
            {photoList}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};
