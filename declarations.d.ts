declare module 'react-outside-click-handler' {
  import * as React from 'react';
  interface OutsideClickHandlerProps {
    onOutsideClick: (event: MouseEvent | TouchEvent) => void;
    disabled?: boolean;
    children: React.ReactNode;
  }
  export default class OutsideClickHandler extends React.Component<OutsideClickHandlerProps> {}
}
declare module 'react-modal-video' {
  import * as React from 'react';
  interface ReactModalVideoProps {
    channel?: 'youtube' | 'vimeo' | 'custom';
    isOpen: boolean;
    videoId: string;
    autoplay?: boolean;
    onClose: () => void;
  }
  export default class ModalVideo extends React.Component<ReactModalVideoProps> {}
}
declare module "shuffle-letters";
