// TODO: Create an interface for the Candidate objects returned by the API
export type Candidate = {
    id: number;
    html_url: string | undefined;
    login: string;
    avatar_url: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string;
  };