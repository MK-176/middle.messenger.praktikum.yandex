enum METHOD {
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
      {...options, method: METHOD.GET},
      options.timeout,
    )
  );

  post = (url: string, options: TOptions = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      {...options, method: METHOD.POST},
      options.timeout,
    )
  );

  put = (url: string, options: TOptions = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      {...options, method: METHOD.PUT},
      options.timeout,
    )
  );

  delete = (url: string, options: TOptions = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      {...options, method: METHOD.DELETE},
      options.timeout,
    )
  );

  request = (url: string, {
    headers = {} as Record<string, any>,
    method = METHOD.GET,
    data = null as Record<string, any> | {} | null,
    responseType = 'json',
  }, timeout: number = 5000): Promise<XMLHttpRequest> => (
    new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        (isGet && data)
          ? `${url}?${this._queryStringify(data)}`
          : url,
      );
      xhr.responseType = responseType as XMLHttpRequestResponseType;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 && xhr.response) {
            resolve(xhr);
          } else {
            reject('Error');
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

  _queryStringify = (data: any): string => {
    if (typeof data !== 'object') {
      throw new Error('Data must be an object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '');
  };
}
