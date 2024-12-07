export type TUser = {
  id: string
  name: string
  avatar: string
}

export type TTask = {
  id: string
  userId: string
  title: string
  summary: string
  dueDate: string
}
