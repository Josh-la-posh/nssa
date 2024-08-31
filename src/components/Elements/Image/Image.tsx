import clsx from 'clsx';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
// CSS
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

export const Image = (props: LazyLoadImageProps) => {
  return (
    <LazyLoadImage
      effect="opacity"
      {...props}
      wrapperClassName={clsx('!ease-out', props.wrapperClassName)}
    />
  );
};
