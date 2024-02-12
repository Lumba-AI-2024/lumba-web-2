import Question from "../Icon/Question";
import Select from "../Select/Select";

export default function TargetForecast({ username, workspace }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">Target Forecast</span>{" "}
        <Question label="This method only uses numerical column as the outcome variable" />
      </div>
      <Select
        placeholder="Select column"
        name="target"
        onChange={(formData, setOptions, setFormData) => {
          const { dataset, method } = formData;

          if (!dataset || !method) return null;
          setFormData((previous) => ({
            ...previous,
            target: null,
          }));

          const fetchDataset = async () => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_ROUTE}/modeling/columns/?filename=${dataset}&username=${username}&workspace=${workspace}&method=REGRESSION`
            );
            const { columns } = await res.json();
            const keys = columns;
            if (keys[0] === "Unnamed: 0") {
              keys.shift();
            }
            const options = keys.map((key) => ({
              value: key,
              label: key,
            }));
            setOptions(options);
          };
          fetchDataset();
        }}
      />
    </>
  );
}
