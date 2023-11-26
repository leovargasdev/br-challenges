import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Component } from './_components'

const ChallengePage: NextPage = challenge => (
  <section>
    <h1>aaaaaa</h1>
    <Component />
  </section>
)

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async props => {
  return {
    props: { aaa: 'teste' },
    revalidate: 69
  }
}

export default ChallengePage
