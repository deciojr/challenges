export interface Routes {
  prefix: string;
  swaggerTag: string;
  paths: {
    [key: string]: string | (() => string);
  };
}
