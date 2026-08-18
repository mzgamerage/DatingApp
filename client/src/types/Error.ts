export type ApiError = {
  message: string;
  code: number;
  details?: string[];
};

export type ApiError2 ={
  message: string;
  code: string;
  status: number;
  validationErrors?: Record<string, string[]>;
};