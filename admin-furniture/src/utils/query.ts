export type ParamValue = string | number;
export type ParamValueList = string[] | number[];
export type ParamObject = Record<string, ParamValue | ParamValueList>;

export function buildQueryString(options?: ParamObject) {
  if (!options) {
    return "";
  }

  const searchParams = new URLSearchParams();

  for (const key in options) {
    if (options[key] != undefined) {
      if (Array.isArray(options[key])) {
        (options[key] as ParamValueList).forEach((value) =>
          searchParams.append(key, `${value}`),
        );
      } else {
        searchParams.append(key, `${options[key]}`);
      }
    }
  }

  return `?${searchParams}`;
}

export function extractQueryParams(
  pathOrParamString: string,
  defaultValue?: Partial<ParamObject>,
) {
  if (!pathOrParamString || !pathOrParamString.includes("=")) {
    return {};
  }

  let paramString;

  const splitIndex = pathOrParamString.indexOf("?");

  if (splitIndex < 0) {
    paramString = pathOrParamString;
  } else {
    paramString = pathOrParamString.substring(splitIndex + 1);
  }

  const searchParams = new URLSearchParams(paramString);

  const params = {} as ParamObject;

  searchParams.forEach((value, key) => {
    const newValue = isNaN(Number(value)) || value === "" ? value : Number(value);
    if (!params[key] && !Array.isArray(defaultValue?.[key])) {
      params[key] = newValue;
    } else {
      if (Array.isArray(params[key])) {
        (params[key] as ParamValueList).push(newValue as never);
      } else {
        params[key] = [newValue as ParamValue] as ParamValueList;
      }
    }
  });

  return params;
}

export function combineQueryParams(paramString: string, replacement: ParamObject) {
  console.log({ paramString, replacement });
  const searchParams = new URLSearchParams(paramString);
  for (const key in replacement) {
    const value = replacement[key];
    if (value == undefined) {
      searchParams.delete(key);
    } else {
      if (Array.isArray(value)) {
        searchParams.delete(key);
        value.forEach((item) => searchParams.append(key, `${item}`));
      } else {
        searchParams.set(key, `${value}`);
      }
    }
  }
  return searchParams;
}
