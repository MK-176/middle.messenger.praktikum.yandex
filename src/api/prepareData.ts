import type {TData} from "../Types/TData";

const prepareData = (data: TData): string => {
  let strData: string = '';

  Object.keys(data).forEach((prop: string) => {
    if (strData.length > 0) {
      strData += '&';
    }
    strData += `${prop}=${data[prop]}`;
  });

  return strData;
};

export default prepareData;
