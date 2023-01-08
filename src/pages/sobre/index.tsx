import { Accordion } from 'components/Accordion'
import { NextPage } from 'next'

import styles from './styles.module.scss'

const AboutPage: NextPage = () => (
  <section className={styles.container}>
    <h1>Sobre</h1>
    <div className={styles.description}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quod
        nobis totam animi quis impedit, similique, rem eius ex blanditiis vero
        maxime necessitatibus aspernatur dolore reiciendis assumenda odit
        repudiandae minima.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quod
        nobis totam animi quis impedit, similique, rem eius ex blanditiis vero
        maxime necessitatibus aspernatur dolore reiciendis assumenda odit
        repudiandae minima.
      </p>
    </div>

    <h1>Perguntas frequentes</h1>

    <Accordion />
  </section>
)

export default AboutPage
