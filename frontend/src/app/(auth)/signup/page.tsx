"use client";

import { FirstStep } from "@/app/_components/signupsteps/firststep";
import { SecondStep } from "@/app/_components/signupsteps/secondstep";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function Signup() {
  const [step, setStep] = useState<number>(1);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const { register } = useAuth();

  const handleNextStep = () => {
    setStep(2);
  };
  const handlePrevStep = () => {
    setStep(1);
  };

  return step === 1 ? (
    <FirstStep
      step={step}
      onNextStep={handleNextStep}
      setEmail={setEmail}
      setUsername={setUsername}
    />
  ) : (
    <SecondStep
      step={step}
      onPrevStep={handlePrevStep}
      register={register}
      email={email}
      username={username}
    />
  );
}
