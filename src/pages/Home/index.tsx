import { Play } from 'phosphor-react'
import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmountInput, 
  Separator, 
  StartCountDownButton, 
  TaskInput 
} from './styles';

export function Home() {
  return(
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            placeholder="Dê um nome para o seu projeto" 
            id="task" 
          />

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput 
            placeholder="00" 
            type="number" 
            id="minutesAmount" 
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

      <CountDownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountDownContainer>

        <StartCountDownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}