import "react-dom";

declare module "react-dom" {
  export function useFormState<S, P = any>(
    action: (state: Awaited<S>, payload: P) => S | Promise<S>,
    initialState: Awaited<S>,
    permalink?: string
  ): [Awaited<S>, (payload: P) => void, boolean];
}
