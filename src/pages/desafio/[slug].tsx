import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'
import { HiOutlineClock, HiPencilAlt } from 'react-icons/hi'

import { AuthorCard } from 'components/AuthorCard'

import { prismic } from 'service/prismic'
import { Challenge } from 'types/challenge'
import { formattedChallange } from 'utils/format'

import styles from './styles.module.scss'

const ChallengePage: NextPage<Challenge> = challenge => (
  <div className={styles.challenge}>
    <div className={styles.challenge__image}>
      <Image
        src={challenge.image.url}
        alt={challenge.image.alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <h1>{challenge.title}</h1>

    <time>
      <HiOutlineClock />
      {format(new Date(challenge.deadline), "dd' de 'MMMM' de 'yyyy", {
        locale: ptBR
      })}
    </time>

    <div className={styles.challenge__content}>
      <span dangerouslySetInnerHTML={{ __html: challenge.content || '' }} />

      <h2>Protótipo do desafio</h2>

      <iframe
        allowFullScreen
        src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.prototype_url}`}
      />
    </div>

    <Link href="">
      <a className={styles.challenge__solution}>
        <HiPencilAlt />
        Participar
      </a>
    </Link>

    <AuthorCard />
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const session = await getSession({ req })

  if (session === null) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    }
  }

  const challengeUID = String(query.slug)

  const client = prismic({ req })

  const challenge = await client.getByUID('challenges', challengeUID)

  return { props: formattedChallange(challenge) }
}

export default ChallengePage
