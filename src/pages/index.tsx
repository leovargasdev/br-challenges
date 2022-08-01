import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'

import styles from 'styles/home.module.scss'

interface PageProps {
  title: string
}

const HomePage: NextPage<PageProps> = ({ title }) => (
  <div className={styles.container}>
    <Head>
      <title>NextJS Boilerplate</title>
    </Head>
    <h1>{title}</h1>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const title = 'NextJS Boilerplate'
  return { props: { title } }
}

export default HomePage
