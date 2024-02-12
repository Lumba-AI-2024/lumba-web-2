import React from "react";
import { useSearchParams } from "next/navigation";

import Input from "../../../../src/components/Form/Input";
import SelectFeature from "../../../../src/components/Modeling/SelectFeature";

import { useRouter } from "next/router";
import Seo from "../../../../src/components/Seo";
import Breadcrumb from "../../../../src/components/Breadcrumb";
import FormModalContextProvider from "../../../../src/context/FormModalContext";
import Plus from "../../../../src/components/Icon/Plus";
import Select from "../../../../src/components/Select/Select";
import useCookie from "../../../../src/hooks/useCookie";
import ModelingModalTutorial from "./ModelingModalTutorial";
import { Step, StepContent, StepTitle, StepDescription, useStep } from "../Steps";
import SelectTargetTutorial from "./SelectTargetTutorial";

const algorithms = {
  REGRESSION: [
    { value: "LINEAR", label: "Linear Regression" },
    { value: "RANDOM_FOREST", label: "Random Forest" },
    // { value: "LOGISTIC", label: "Logistic Regression" },
    // { value: "POLYNOMIAL", label: "Polynomial Regression" },
  ],
  CLASSIFICATION: [{ value: "DECISION_TREE", label: "Decision Tree" }],
  CLUSTERING: [{ value: "KMEANS", label: "K-Means" }],
  FORECASTING: [
    {
      value: "ARIMA",
      label: "ARIMA",
    },
    {
      value: "LSTM",
      label: "LSTM",
    },
    {
      value: "XGBOOST",
      label: "XGBoost",
    },
  ],
};

export default function PredictingTutorial4({ datasets }) {
  const router = useRouter();
  const { workspaceName } = router.query;

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const username = useCookie("username");

  const step = 2;

  const [method, setMethod] = React.useState("");
  const [algorithmSelected, setAlgorithmSelected] = React.useState("");

  const algorithm = algorithms[method] || [];
  const algorithmValue = algorithm[0] && algorithm[0]["value"];

  const step2RequiredFields = ["REGRESSION", "CLASSIFICATION"].includes(method)
    ? ["feature", "target"]
    : ["feature", "kValue"];

  const { step: currentStep } = useStep();

  if (currentStep !== 4) {
    return null;
  }

  return (
    <>
      <Seo title={`${workspaceName} - Modeling`} />

      <div className="h-full flex flex-col">
        <div className="flex items-center">
          <div className="flex-1">
            <Breadcrumb
              links={[{ label: workspaceName }, { label: "Modeling", href: router.asPath }]}
              active={"Modeling"}
            />
          </div>
          <FormModalContextProvider>
            <ModelingModalTutorial
              step={2}
              setStep={() => {}}
              formLabel="Create Model"
              step2RequiredFields={step2RequiredFields}
              buttonLabel={
                <div className="flex font-semibold items-center gap-1">
                  <Plus />
                  Create
                </div>
              }
              submitLabel="Create"
              handleSubmit={(formData, setFormData) => {}}
              open={true}
              setOpen={() => {}}
            >
              <div className={`${step === 1 ? "flex flex-col gap-2" : "hidden"}`}>
                <Input label="Model Name" placeholder="Model name" name="modelName" required />

                <p>Dataset</p>
                <Select
                  placeholder="Select dataset"
                  name="dataset"
                  items={datasets?.map((dataset) => ({ value: dataset.file, label: dataset.file })) || []}
                />

                <p>Method</p>
                <Select
                  placeholder="Select method"
                  name="method"
                  items={[
                    { value: "REGRESSION", label: "Regression" },
                    { value: "CLASSIFICATION", label: "Classification" },
                    { value: "CLUSTERING", label: "Clustering" },
                  ]}
                  onChange={(formData, setFormData) => {
                    setMethod(formData.method);
                    setFormData((previous) => ({
                      ...previous,
                      algorithm: null,
                    }));
                  }}
                />

                <p>Algorithm</p>
                <Select
                  placeholder="Select algorithm"
                  name="algorithm"
                  items={algorithm}
                  onChange={(formData, setFormData) => {
                    setAlgorithmSelected(formData.algorithm);
                  }}
                />
              </div>

              <div className={`${step === 2 ? "flex flex-col gap-2" : "hidden"}`}>
                <SelectFeature username={username} workspace={workspaceName} algorithmSelected={algorithmSelected} />
                {algorithmValue === "KMEANS" ? (
                  <Input
                    type="number"
                    label="K Value"
                    max={50}
                    placeholder="Enter value of k (max. 50)"
                    name="kValue"
                    required
                  />
                ) : (
                  <Step step={4}>
                    <div className="relative">
                      <SelectTargetTutorial username={username} workspace={workspaceName} />

                      <StepContent position="center">
                        <StepTitle>Create Predicting Model</StepTitle>
                        <StepDescription>Select appropriate column(s) for the feature and the target.</StepDescription>
                      </StepContent>
                    </div>
                  </Step>
                )}
              </div>
            </ModelingModalTutorial>
          </FormModalContextProvider>
        </div>

        <div className="flex-1 grid place-items-center">
          <div className="flex flex-col items-center justify-center">
            <img src="/assets/LumbaEmpty.svg" alt="No Datasets Found" className="w-[280px]" />
            <div className="flex flex-col gap-4 mt-8 items-center">
              <h1 className="font-medium">No Models Found</h1>
              <span>Create your model to train and test it here</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
