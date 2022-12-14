import styles from './styles.module.scss'

export const DescriptionNavigation = () => (
  <aside className={styles.container}>
    <ul className={styles.content}>
      <li>
        <a href="#challenge-description">Descrição</a>
      </li>
      <li>
        <a href="#">Nível fácil</a>
      </li>
      <li>
        <a href="#">Nível médio</a>
      </li>
      <li>
        <a href="#">Nível dificil</a>
      </li>
      <li>
        <a href="#challenge-prototype" className={styles.active}>
          Protótipo do desafio
        </a>
      </li>
      <li>
        <a href="#how-participation">Como participar</a>
      </li>
    </ul>
  </aside>
)
