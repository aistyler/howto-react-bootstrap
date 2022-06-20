import React, { useCallback, ComponentProps, ForwardRefRenderFunction } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

interface ScrollbarProps extends ComponentProps<typeof Scrollbars> {
  forwardedRef: any;
}

const CustomScrollbars: React.FC<ScrollbarProps> = ({ onScroll, forwardedRef, style, children }) => {
  const refSetter = useCallback((scrollbarsRef: any) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, []);

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: "hidden" }}
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  );
};

export const Scrollbar = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

/*
type ScrollbarProps = ComponentProps<typeof Scrollbars>;

const _Scrollbar: ForwardRefRenderFunction<any, ScrollbarProps> = ({
  children,
  style,
  ...rest
}, ref) => {

  return (
    <Scrollbars
      ref={ref}
      style={{ ...style, overflow: "hidden" }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

export const Scrollbar = React.forwardRef(_Scrollbar);

export default Scrollbar;
*/

/*

    <Scrollbars
      ref={ref}
      style={{ ...style, overflow: "hidden" }}
      renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
      renderTrackVertical={props => <div {...props} className="track-vertical"/>}
      renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
      renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
      renderView={props => <div {...props} className="view"/>}
      {...rest}
    >
      {children}
    </Scrollbars>

*/
