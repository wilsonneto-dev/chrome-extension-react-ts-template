import clsx from "clsx";

import styles from './styles.module.scss';
import Message, {MessageType} from "../../models/message.ts";
import IconOk from "../../icons/icon-ok.tsx";
import IconError from "../../icons/icon-error.tsx";

export function Toast({message, type}: { message: string, type?: MessageType }) {
  return (
    <div className={clsx([styles.toast, type == MessageType.Error && styles.error])} role="alert">
      { type == MessageType.Error ? <IconError /> : <IconOk /> }
      <div className={styles.message}>{message}</div>
    </div>
  )
}

export function ToastsWrapper({toasts}: { toasts: Message[] }) {
  return (
    <div className={styles.wrapper}>
      {toasts.map((toast) =>
        <Toast key={toast.id} message={toast.message} />)}
    </div>
  )
}

