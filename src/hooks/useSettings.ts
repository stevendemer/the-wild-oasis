import { getSettings } from "@/services/settings";
import { Tables } from "@/types/database";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

type Setting = Tables<"settings">;

export function useSettings(): UseQueryResult<Setting, Error> {
  const query = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    retry: false,
  });

  return query;
}
