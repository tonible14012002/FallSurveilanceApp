import {BareFetcher} from 'swr';
import useSWRInfinite, {
  SWRInfiniteResponse,
  SWRInfiniteKeyLoader,
  SWRInfiniteConfiguration,
} from 'swr/infinite';

export const useFetchInfinite = <
  Data = any,
  Error = any,
  KeyLoader extends SWRInfiniteKeyLoader = (
    index: number,
    previousPageData: Data | null,
  ) => null,
>(
  getKey: KeyLoader,
  fetcher: BareFetcher<Data> | null,
  config?: SWRInfiniteConfiguration<Data, Error, BareFetcher<Data>>,
): SWRInfiniteResponse<Data, Error> => {
  return useSWRInfinite(getKey, fetcher, {
    shouldRetryOnError: false,
    revalidateFirstPage: false,
    ...config,
  });
};
