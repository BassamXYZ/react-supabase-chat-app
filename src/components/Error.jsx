import styles from './Error.module.css'

function Error() {
  return (
    <div className={styles.container}>
      <h1>Oops</h1>
      <div>Somthing seems wrong</div>
    </div>
  )
}

export default Error