export type BaseColorsSearchParams = {
  primary?: string;
  neutral?: string;
  danger?: string;
  extra?: string | string[];
};

export type PropsWithSearchParams = {
  searchParams: BaseColorsSearchParams;
};
