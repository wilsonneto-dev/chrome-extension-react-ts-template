import {PropsWithChildren} from "react"

import styles from "./styles.module.scss"

interface TextFiledProps {
  placeholder: string,
  value: string,
  onChange: (value: string) => void,
}

export function Form({ children }: PropsWithChildren) {
  return (<form className={styles.form}>{children}</form>)
}

export function Label({ children }: PropsWithChildren) {
  return <label className={styles.label}>{ children }</label>
}

export function Input({ placeholder, onChange, value }: TextFiledProps) {
  return <input value={value} placeholder={placeholder ?? ""} className={styles.input}
    onChange={e => { e.preventDefault(); onChange && onChange(e.currentTarget.value) }} />
}

export function TextArea({ placeholder, onChange, value }: TextFiledProps) {
  return <textarea value={value} placeholder={placeholder ?? ""} className={styles.textarea}
    onChange={e => { e.preventDefault(); onChange && onChange(e.currentTarget.value) }}
  ></textarea>
}
