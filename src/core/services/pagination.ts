export interface PaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = { page?: number | string; limit?: number | string; searchTerm?: string; datePeriod?: string };
export type PaginateFunction<M, U, K> = (model: any, args?: K, options?: PaginateOptions) => Promise<PaginatedResult<U>>;

export const paginator = <M, U, K>(defaultOptions: PaginateOptions, transformer: (item: M) => U | Promise<U>): PaginateFunction<M, U, K> => {
  return async (model, args: any = { where: undefined, include: undefined }, options) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const perPage = Number(options?.limit || defaultOptions?.limit) || 10;

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);

    const transformedData = data.map(transformer);

    return {
      items: transformedData,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};
