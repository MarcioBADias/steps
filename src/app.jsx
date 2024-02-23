import { useEffect, useReducer, useState } from 'react'

const reduce = (state, action) =>
  ({
    set_steps: {
      ...state,
      steps: action.payload?.length > 0 ? action.payload : [],
    },
    increment_step: {
      ...state,
      step:
        state.step === state.steps?.length - 1 ? state.step : state.step + 1,
    },
    decrement_step: {
      ...state,
      step: state.step < 1 ? state.step : state.step - 1,
    },
  })[action.type] || state

const Steps = () => {
  const [state, dispatch] = useReducer(reduce, { step: 0, steps: [] })

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/MarcioBADias/data-fake/main/steps.json',
    )
      .then((r) => r.json())
      .then((data) => dispatch({ type: 'set_steps', payload: data }))
      .catch(console.log)
  }, [])

  const handleNextStep = () => dispatch({ type: 'increment_step' })
  const handlePreviusStep = () => dispatch({ type: 'decrement_step' })

  return (
    <div className="steps">
      <div className="numbers">
        {state.steps.map((s, i) => (
          <div key={s.id} className={i === state.step ? 'active' : ''}>
            {i + 1}
          </div>
        ))}
      </div>
      <h2 className="message">
        Passo 1: {state.steps[state.step]?.description}
      </h2>
      <div className="buttons">
        <button onClick={handlePreviusStep}>Anterior</button>
        <button onClick={handleNextStep}>Próximo</button>
      </div>
    </div>
  )
}

const App = () => {
  const [showContainer, setShowContainer] = useState(true)
  const handleShowContent = () => setShowContainer((s) => !s)
  return (
    <>
      <div className="container-close">
        <button className="close" onClick={handleShowContent}>
          {showContainer ? 'Fechar' : 'Abrir'}
        </button>
      </div>
      {showContainer && <Steps />}
    </>
  )
}

export { App }
