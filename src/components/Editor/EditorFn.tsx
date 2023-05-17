export Interface EditorFnStates {
    
}

export const EditorFn = (states: ) => {
    const addStep = (step: RunningStepType) => {
        setState((s) => {
          s?.seq.steps.push(step)
          return s;
        })
      }
    
      const insertStep = (at: number) => (step: RunningStepType) => {
        setState((st) => {
          if (!st) {
            return st
          }
          let s: RunningStepType[] = [...st.seq.steps]
          console.log(s)
          s.splice(at,0,step);
          const newSt: EditorState = {...st,seq : { 
            ...st.seq,
            steps: s
          }}
          return newSt
        })
      }
    
      const deleteStep = (at: number) => {
        setState((s) => {
          if(!s) {
            return
          }
          const newSteps= s.seq.steps.filter((v,i) => i != at);
          if (newSteps) {
            s.seq.steps = newSteps
          }
          return s 
        })
      }
    
      const toggleReordering = () => {
        setIsReordering((v) => !v);
      }