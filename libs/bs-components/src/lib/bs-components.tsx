import styles from './bs-components.module.css';

/* eslint-disable-next-line */
export interface BsComponentsProps {}

export function BsComponents(props: BsComponentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BsComponents!</h1>
    </div>
  );
}

export default BsComponents;
