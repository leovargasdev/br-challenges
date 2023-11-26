import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const ChallengePage: NextPage = challenge => <h1>olar mundo</h1>

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
