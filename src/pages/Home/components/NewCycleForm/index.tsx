import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";

/*interface NewCycleFormData {
  task: string,
  minutesAmount: number
}*/

export function NewCycleForm () {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return(
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
  )
}