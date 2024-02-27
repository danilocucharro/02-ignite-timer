import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmountInput, 
  Separator, 
  StartCountdownButton,
  StopCountdownButton,  
  TaskInput 
} from './styles';

const newCycleFormValidationSchema = zod.object({//um Schema de validação para que o zod aplique-o no formulario da aplicação
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

/*interface NewCycleFormData {
  task: string,
  minutesAmount: number
}*/

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date; 
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPast, setAmountSecondsPast] = useState(0)

  const { register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number;

    if(activeCycle){
      interval = setInterval(() => {
        setAmountSecondsPast(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPast(0)
    
    reset()
  }

  function handleInterruptCycle(){
    setCycles(
      cycles.map(cycle => {
        if (cycle.id === activeCycleId){
          return {...cycle, interruptedDate: new Date()}
        } else{
          return cycle
        }
      })
    )

    setActiveCycleId(null);
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  console.log(cycles)

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            placeholder="Dê um nome para o seu projeto" 
            id="task" 
            {...register('task')}
            disabled={!!activeCycle}
          />

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput 
            placeholder="00" 
            type="number" 
            id="minutesAmount" 
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

      <CountDownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountDownContainer>

      {activeCycle ? (
      <StopCountdownButton onClick={handleInterruptCycle} type="button">
        <HandPalm size={24} />
          Interromper
      </StopCountdownButton>
      ): (
      <StartCountdownButton disabled={isSubmitDisabled} type="submit">
        <Play size={24} />
          Começar
      </StartCountdownButton>
      )}
      </form>
    </HomeContainer>
  )
}