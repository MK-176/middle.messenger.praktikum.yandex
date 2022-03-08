import { queryStringify } from '../utils';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type TOptions = {
  headers?: Record<string, string>,
  responseType?: 'json' | 'text' | 'blob' | 'document' | 'arraybuffer' | '',
  timeout?: number,
  data?: Record<string, any> | {} | null;
};

export class Http {
  get = (url: string, options: TOptions = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.GET },
      options.timeout,
    )
  );

  post = (url: string, options: TOptions = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.POST },
      options.timeout,
    )
  );

  put = (url: string, options: TOptions = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.PUT },
      options.timeout,
    )
  );

  delete = (url: string, options: TOptions = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.DELETE },
      options.timeout,
    )
  );

  request = (url: string, {
    headers = {} as Record<string, any>,
    method = Method.GET,
    data = null as Record<string, any> | {} | null,
    responseType = 'json',
  }: Record<string, any>, timeout: number = 5000): Promise<XMLHttpRequest> => (
    new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Method.GET;

      xhr.open(
        method,
        (isGet && data)
          ? `${url}?${queryStringify(data)}`
          : url,
      );
      xhr.responseType = responseType as XMLHttpRequestResponseType;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, (value as string));
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 && xhr.response) {
            resolve(xhr);
          } else {
            reject(new Error('Error'));
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || data === null) {
        xhr.send();
      } else {
        const formData = new FormData();
        const dataArr = Object.entries(data as Record<string, any>);

        dataArr.forEach(([key, value]): void => {
          formData.append(key, value);
        });

        xhr.send(formData);
      }
    })
  );
}
