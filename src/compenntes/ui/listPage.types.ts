export type StatusConfig = {
  bg: string;
  text: string;
  dot: string;
};

export type ListItem = {
  id: string;
  date: string;
  status: string;
  subtitle: string;
  meta?: React.ReactNode;
};
