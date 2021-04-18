import axios from 'axios';
import { useState } from 'react';

const api = axios.create({
  baseURL: 'https://wastes-management.herokuapp.com/api',
  headers: { 'content-type': 'application/json' },
  responseType: 'json',
});
export const useGet = (resources) => {
  const [payload, setPayload] = useState(null);
  const [error, onError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const get = (primaryKey = null) => {
    setIsPending(true);
    api
      .get(primaryKey ? `${resources}/${primaryKey}` : resources)
      .then(({ data }) => {
        setPayload(data);
        setIsPending(false);
      })
      .catch((err) => {
        onError(err);
        setIsPending(false);
      });
  };
  const getAll = () => get();
  const getByPK = (primaryKey) => get(primaryKey);
  return { isPending, error, payload, getAll, getByPK };
};

export const useCreate = (resources, onCreated) => {
  const [payload, setPayload] = useState(null);
  const [error, onError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const create = (formData) => {
    setIsPending(true);
    api
      .post(resources, formData)
      .then(({ data }) => {
        setPayload(data);
        setIsPending(false);
        onCreated();
      })
      .catch((err) => {
        onError(err);
        setIsPending(false);
      });
  };
  return { isPending, error, payload, create };
};

export const useUpdate = (resources) => {
  const [payload, setPayload] = useState(null);
  const [error, onError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const update = (formData, primaryKey = null) => {
    setIsPending(true);
    api
      .update(primaryKey ? `${resources}/${primaryKey}` : resources, formData)
      .then(({ data }) => {
        setPayload(data);
        setIsPending(false);
      })
      .catch((err) => {
        onError(err);
        setIsPending(false);
      });
  };
  return { isPending, error, payload, update };
};

export const useDelete = (resources, onDeleted) => {
  const [payload, setPayload] = useState(null);
  const [error, onError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const deleteItem = (primaryKey) => {
    setIsPending(true);
    api
      .delete(`${resources}/${primaryKey}`)
      .then(({ data }) => {
        setPayload(data);
        setIsPending(false);
        onDeleted();
      })
      .catch((err) => {
        onError(err);
        setIsPending(false);
      });
  };
  return { isPending, error, payload, deleteItem };
};

export const useSend = (resources) => {
  const [payload, setPayload] = useState(null);
  const [error, onError] = useState(null);
  const [progress, setProgress] = useState(0);
  const onUploadProgress = (event) => {
    setProgress(Math.floor((event.loaded / event.total) * 100));
  };
  const send = (formData) => {
    api
      .post(resources, formData, {
        onUploadProgress,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => setPayload(data))
      .catch((err) => onError(err));
  };
  return { progress, error, payload, send };
};

export const usePublish = (topic) => {
  const [payload, setPayload] = useState(null);
  const [error, onError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const publish = (message) => {
    setIsPending(true);
    api
      .post(topic, {
        msg: message,
        baseURL: 'waste-management-red-node.herokuapp.com',
      })
      .then(({ data }) => {
        setPayload(data);
        setIsPending(false);
      })
      .catch((err) => {
        onError(err);
        setIsPending(false);
      });
  };
  return { isPending, error, payload, publish };
};

export const useUpdateDevice = () => {
  const [payload, setPayload] = useState(null);
  const [error, onError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const update = (deviceId, version) => {
    setIsPending(true);
    api
      .post(`baskets/${deviceId}/update`, {
        version,
        baseURL: process.env.API_URL,
      })
      .then(({ data }) => {
        setPayload(data);
        setIsPending(false);
      })
      .catch((err) => {
        onError(err);
        setIsPending(false);
      });
  };
  return { isPending, error, payload, update };
};
export default api;
