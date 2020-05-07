import * as Apollo from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
export * from "@apollo/react-hooks";

export const useQuery = <TData, TVariables>(
  query: DocumentNode,
  options?: Apollo.QueryHookOptions<TData, TVariables>
) => {
  const result = Apollo.useQuery<TData, TVariables>(query, options);
  console.log(result);
  
  if(result.error){
    throw result.error;
  }
  return result;
}