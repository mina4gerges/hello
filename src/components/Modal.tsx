/** @jsx jsx */
import { css, jsx, SerializedStyles } from "@emotion/core";
import {
  useState,
  useEffect,
  ReactChild,
  useRef,
  forwardRef,
  FC,
  MutableRefObject
} from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "./Portal";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  preventCloseOnOutsideClick?: boolean;
  classNames?: string;
  transitionStyles?: SerializedStyles;
  children: ReactChild;
}

enum Display {
  hide = "none",
  show = "flex"
}

const Modal: FC<Props> = ({
  children,
  handleClose,
  isOpen,
  transitionStyles,
  preventCloseOnOutsideClick = false,
  classNames = "modal-transition"
}) => {
  const [display, setDisplay] = useState<Display>(Display.hide);
  const nodeRef = useRef<HTMLDivElement>(null);
  const onOutsideClick = preventCloseOnOutsideClick
    ? () => void 0
    : handleClose;

  const show = () => setDisplay(Display.show);
  const hide = () => setDisplay(Display.hide);

  return (
    <Portal>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={onOutsideClick}
        css={[containerStyles(display), transitionStyles]}
      >
        <CSSTransition
          nodeRef={nodeRef}
          in={isOpen}
          timeout={200}
          classNames={classNames}
          unmountOnExit
          onEnter={show}
          onExited={hide}
        >
          <InnerModal
            ref={nodeRef}
            children={children}
            handleClose={handleClose}
          />
        </CSSTransition>
      </div>
    </Portal>
  );
};

const containerStyles = (display: Display) => css`
  display: ${display};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
`;

// Separated out into it's own component because refs was
// acting funny to child elements of the CSSTransition component
interface InnerModalProps {
  children: ReactChild;
  handleClose: () => void;
}

type Ref = HTMLDivElement | null;

const InnerModal = forwardRef<Ref, InnerModalProps>(
  ({ children, handleClose }, modalRef) => {
    // To make the modal nice and accessible, we want to trap the
    // focusable elements to only elements from inside the modal

    const ref = modalRef as MutableRefObject<HTMLDivElement>;

    const handleTabKey = (e: KeyboardEvent) => {
      if (ref && ref.current) {
        const inputModalElements: NodeListOf<
          HTMLInputElement
        > = ref.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const primaryMenuButton = document.getElementById(
          "primary-menu-button"
        ) as HTMLButtonElement;
        const firstElement = inputModalElements[0];
        const lastElement = inputModalElements[inputModalElements.length - 1];

        switch (document.activeElement) {
          case lastElement: {
            if (!e.shiftKey) {
              primaryMenuButton.focus();
              return e.preventDefault();
            }
            break;
          }
          case firstElement: {
            if (e.shiftKey) {
              primaryMenuButton.focus();
              return e.preventDefault();
            }
            break;
          }
          case primaryMenuButton: {
            if (e.shiftKey) {
              lastElement.focus();
            } else {
              firstElement.focus();
            }
            return e.preventDefault();
          }
          default:
            break;
        }
      }
    };

    const keyListenersMap = new Map([[27, handleClose], [9, handleTabKey]]);

    /* Add an event listener so when we tab through focusable elements, we only
    focus on the elements inside the modal */
    useEffect(() => {
      function keyListener(e: KeyboardEvent) {
        const listener = keyListenersMap.get(e.keyCode);
        return listener && listener(e);
      }

      document.addEventListener("keydown", keyListener);

      return () => document.removeEventListener("keydown", keyListener);
    }, [keyListenersMap]);

    /* There is an issue with modals where when you close the modal, the window 
    scrolls back to the top of the page, this makes the window honour the users last scroll
    position */
    useEffect(() => {
      // When the modal is shown, we want a fixed body to prevent scrolling
      const onMountScrollY = window.scrollY;
      document.body.classList.add("modal-open");
      document.body.style.top = `-${onMountScrollY}px`;

      return () => {
        // When the modal is hidden...
        const onUnmountScrollY = document.body.style.top;
        document.body.classList.remove("modal-open");
        document.body.style.top = "";
        window.scrollTo(0, parseInt(onUnmountScrollY || "0", 10) * -1);
      };
    }, []);

    return (
      <div
        css={innerModalStyles}
        ref={modalRef}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    );
  }
);

const innerModalStyles = css`
  width: 100%;
`;

export default Modal;
