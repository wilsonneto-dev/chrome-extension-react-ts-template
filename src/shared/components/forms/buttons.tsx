import styles from "./styles.module.scss";
import {PropsWithChildren} from "react";
import clsx from "clsx";
import IconOk from "../../icons/icon-ok.tsx";
import IconCancel from "../../icons/icon-cancel.tsx";

interface ButtonProps {
  onClick: () => void
}

export function ButtonsWrapper({children}: PropsWithChildren) {
  return <div className={styles.buttons}>{ children }</div>
}

export function OkButton({ onClick }: ButtonProps) {
  return (
    <button onClick={e => { e.preventDefault(); onClick && onClick() }} className={clsx([styles.button, styles.ok])}>
      <IconOk />
    </button>
  )
}


export function CancelButton({ onClick }: ButtonProps) {
  return (
    <button onClick={e => { e.preventDefault(); onClick && onClick() }} className={clsx([styles.button, styles.cancel])}>
      <IconCancel />
    </button>
  )
}