enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TOptions = {
  method: METHOD;
  data?: any;
}

const request = <TResponse>(url: string, options: TOptions = {method: METHOD.GET}): Promise<TResponse> => {
  const {method, data} = options;

  return new Promise((resolve, reject) => {
    const error = (err: string) => {
      reject(err);
    }
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = () => {
      resolve(xhr as any);
    };
    (xhr.onabort as Function) = error;
    (xhr.onerror as Function) = error;
    (xhr.ontimeout as Function) = error;

    if (method === METHOD.GET || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
}

export default request;
