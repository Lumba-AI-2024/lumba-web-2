import useFetch from "./useFetch";
import axios from "axios";
import { getCookie } from "../helper/cookies";
import toast from "react-hot-toast";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

// export const MODELS = API_ROUTE + "/modeling/listmodel/";

export const getAllModels = async ({ token, username, workspace, type }) => {
  let { data: models } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API_ROUTE + `/modeling/listmodel/`
    }?username=${username}&workspace=${workspace}&type=${type}`,
    {
      headers: {
        Authorization: `Token ${token || getCookie("token")}`,
      },
    }
  );

  models = models.map((model) => {
    const isDuplicate = models.some((m, i) => m.name === model.name && i !== model.id);
    return {
      id: model.id,
      modelName: model.name,
      file: model.file_name,
      // metrics: model.metrics,
      // score: model.score,
      metrics_scores: model.metrics_scores,
      method: model.method,
      algorithm: model.algorithm,
      trainDate: model.updated_time,
      features: model.feature.split(",").map((f) => ({ label: f, isNumeric: true })),
      predict: model.target,
      isDuplicate,
    };
  });

  return models.reverse();
};

export const addModel = async (model) => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/modeling/initiate/`, model, {
    headers: {
      Authorization: `Token ${getCookie("token")}`,
    },
  });

  setTimeout(async () => {
    const { data: modelStatus } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/modeling/getrecord/?id=${data.id}`,
      {
        headers: {
          Authorization: `Token ${getCookie("token")}`,
        },
      }
    );

    if (modelStatus.status === "in progress") {
      toast.error("Failed to create model.");
    }
  }, 2000);

  return data;
};

const useModels = ({ username, workspace, type }) => {
  const MODELS =
    process.env.NEXT_PUBLIC_API_ROUTE + `/modeling/listmodel/?username=${username}&workspace=${workspace}&type=${type}`;
  const { data: models, mutate } = useFetch(MODELS, () => getAllModels({ url: MODELS, username, workspace, type }), {
    fallbackData: [],
  });

  const deleteModel = async (model) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ROUTE}/modeling/deletemodel/`, model, {
        headers: {
          Authorization: `Token ${getCookie("token")}`,
        },
      })
      .then(() => mutate(() => models.filter((model) => model.modelName !== modelName)))
      .catch(() => toast.error("Failed to delete model."));
  };

  return { models, deleteModel, mutate };
};

export default useModels;
