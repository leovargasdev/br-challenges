import { PrismicRichText } from '@prismicio/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'

import { Challenge } from 'types'
import { CACHE_PAGE } from 'utils/constants'
import { formattedChallenge } from 'utils/format'
import { ChallengeProvider } from 'hook/useChallenge'
import { createClientPrismic } from 'service/prismic'

import { ChallengeNavigation, ChallengeHeader } from 'components/Challenge/'

import styles from './styles.module.scss'

const ChallengePage: NextPage<Challenge> = challenge => (
  <ChallengeProvider challenge={challenge}>
    <SEO
      tabName={`Desafio - ${challenge.name}`}
      title={`Desafio ${challenge.name} do brchallenges`}
      description={challenge.description}
      image={challenge.image.url}
    />

    <ChallengeHeader />

    <div className={styles.content}>
      <ChallengeNavigation />

      <div className={styles.challenge} id="challenge-description">
        <h1>{challenge.name}</h1>

        <div className={styles.challenge__content}>
          <PrismicRichText field={challenge.content} />

          <h2 id="challenge-prototype">Protótipo do desafio</h2>

          <iframe
            allowFullScreen
            src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.prototype_url}`}
          />

          <h2 id="how-participation">Como funciona a participação</h2>

          <p>
            A sua participação só será contabilizada após o envio da solução.
            Enquanto o desafio não for encerrado você pode editar os dados do
            seu envio quantas vezes quiser.
          </p>

          <p>
            Após o encerramento do desafio será disponibilizado uma página
            contendo todas as soluções enviadas. As melhores soluções vão estar
            classificadas como solução destaque e os usuários do br challenge
            vão poder votar nelas.
          </p>

          <p>
            As soluções mais votadas de cada dificuldade vão receber os
            seguintes prêmios:
          </p>

          <ul>
            <li>1º lugar: R$ 50,00</li>
            <li>
              2º: Vip no{' '}
              <a
                href="https://www.twitch.tv/leovargasdev"
                target="_blank"
                rel="noreferrer"
              >
                canal da twitch
              </a>
              .
            </li>
          </ul>

          <p>Que os deuses do clean code estejam com você, boa sorte!</p>
        </div>
      </div>
    </div>
  </ChallengeProvider>
)

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = []

  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async props => {
  const { params, previewData } = props

  const challengeSlug = String(params?.slug)

  const prismic = createClientPrismic({ previewData })

  const challenge = await prismic.getByUID<any>('challenges', challengeSlug)

  return {
    props: formattedChallenge(challenge),
    revalidate: CACHE_PAGE
  }
}

export default ChallengePage
