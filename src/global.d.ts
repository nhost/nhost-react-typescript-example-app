type gql_uuid = string;
type gql_timestamptz = string;
type gql_jsonb = any;
type gql_citext = string;

interface useAuthProps {
  signedIn: boolean | null;
}

declare module "react-nhost" {
  export function NhostAuthProvider(auth: any): JSX.Element;
  export function NhostApolloProvider(
    auth: any,
    gql_endpoint: string
  ): JSX.Element;
  export function useAuth(): useAuthProps;
}
