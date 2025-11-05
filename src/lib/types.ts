export type User = {
  id: string;
  email: string;
  name?: string;
  created_at: string;
};

export type Folder = {
  id: string;
  created_at: string;
  name: string;
  user_id: string;
};
