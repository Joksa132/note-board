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

export type Note = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  folder_id: string | null;
  color: string;
  width: number;
  height: number;
  pos_x: number;
  pos_y: number;
  content: string | null;
};
