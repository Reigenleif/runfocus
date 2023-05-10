import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Pops = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div
      animate={{ opacity: [0, 0.9, 1], scale: [0.3, 1.05, 1] }}
      transition={{ duration: 0.3, times: [0, 0.8, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const StepPops = ({ children }: { children: JSX.Element[] }) => {
  const [step, setStep] = useState(0);

  const totalSteps = children.length;
  useEffect(() => {
    if (step < totalSteps) {
      setTimeout(() => {
        setStep((s) => s + 1);
      }, 100);
    }
  }, [step]);
  return (
    <>
      {children.map((e, i) =>
        i <= step ? <Pops key={i}>{e}</Pops> : <div key={i} />
      )}
    </>
  );
};

export const OpacityAnim = ({ children,time }: { children: JSX.Element,time?:number }) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: time || 0.3, times: [0, 1] }}
    >
      {children}
    </motion.div>
  );
};

interface slideProps {
  children: JSX.Element
  from: "right" | "left" | "top" | "bottom"
}

export const Slide = ({ children, from}: slideProps) => {
  const initX = from == "right" ? "100vw" : from == "left" ? "-100vw" : "0vw"  
  const initY = from == "top" ? "100vh" : from == "bottom" ? "-100vh" : "0vw"

  return <motion.div 
    animate={{ top: [initY,"0vh"], left: [initX,"0vw"]}}
    transition={{duration: 0.2, times: [0,1]}}
    >{children}</motion.div>
}