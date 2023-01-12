import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import api from 'service/api'
import { useChallenge, useToast } from 'hooks'
import { DEFAULT_SOLUTION, LEVELS_OPTIONS } from 'utils/constants'
import { zodSolutionSchema, SolutionForm } from 'utils/zod'

import { Input, RadioGroup } from 'components/Form'
import { IconClose, IconPlus, IconPencil } from 'components/SVG'

import styles from './styles.module.scss'

type SolutionProps = keyof typeof DEFAULT_SOLUTION

export const ModalSolutionForm = () => {
  const toast = useToast()
  const router = useRouter()
  const challenge = useChallenge()
  const [hasSubmittedSolution, setHasSubmittedSolution] = useState(false)

  const useFormMethods = useForm<SolutionForm>({
    mode: 'all',
    resolver: zodResolver(zodSolutionSchema),
    defaultValues: {
      repository_url: '',
      url: '',
      linkedin_url: ''
    }
  })

  const [loading, setLoading] = useState<boolean>(false)
  const disabledInputs = ['closed', 'voting'].includes('status.type')

  const onSubmit = async (data: SolutionForm): Promise<void> => {
    setLoading(true)

    try {
      const endpoint = `challenge/${challenge.id}/solution`
      const response = await api.post(endpoint, data)

      const descriptionType =
        response.data.type === 'create' ? 'salva' : 'atualizada'

      toast.success('Sucesso', {
        description: `Solução ${descriptionType} com sucesso`
      })

      router.push('/')
    } catch (err) {
      console.log(err)

      toast.error('Ops! Tivemos um problema', {
        description: 'Falha ao salvar o sua solução'
      })
    } finally {
      setLoading(false)
    }
  }
  const loadSolution = async () => {
    const response = await api.get(`challenge/${challenge.id}/solution`)

    const fields = ['repository_url', 'url', 'level', 'linkedin_url']

    if (response.data) {
      setHasSubmittedSolution(true)
      fields.map(field =>
        useFormMethods.setValue(field as SolutionProps, response.data[field])
      )
    }
  }

  useEffect(() => {
    loadSolution()
  }, [])

  return (
    <Dialog.Root>
      <Dialog.Trigger className={'button '.concat(styles.button__trigger)}>
        {hasSubmittedSolution ? (
          <>
            <IconPencil />
            <span className={styles.button__text}>Editar solução</span>
          </>
        ) : (
          <>
            <IconPlus />
            <span className={styles.button__text}>Enviar solução</span>
          </>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.container}>
          <header className={styles.header}>
            <div>
              <Dialog.Title>Formulário de solução</Dialog.Title>
              <Dialog.Description>
                Preencha os campos para enviar sua solução
              </Dialog.Description>
            </div>
            <Dialog.DialogClose>
              <IconClose />
            </Dialog.DialogClose>
          </header>

          <FormProvider {...useFormMethods}>
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
              <main className={styles.main}>
                <Input
                  type="url"
                  label="Repositório"
                  name="repository_url"
                  placeholder="Link do repositório (ex: github, gitlab, bitbucket, etc...)"
                  disabled={disabledInputs}
                />

                <Input
                  name="url"
                  type="url"
                  label="Visualização"
                  placeholder="Link para visualizar o projeto"
                  disabled={disabledInputs}
                />

                <Input
                  label="Post do linkedin (opcional)"
                  name="linkedin_url"
                  placeholder="Link do post sobre a solução do desafio"
                />

                <RadioGroup
                  name="level"
                  label="Selecione a dificuldade"
                  options={LEVELS_OPTIONS}
                />
              </main>

              <footer className={styles.footer}>
                <Dialog.DialogClose className="button secondary">
                  Cancelar
                </Dialog.DialogClose>
                <button
                  type="submit"
                  disabled={loading}
                  className={`button ${loading ? 'loading' : ''}`}
                >
                  Enviar solução
                </button>
              </footer>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
