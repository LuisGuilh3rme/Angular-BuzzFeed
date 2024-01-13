export type QuestionType = {
  id: number,
  question: string,
  options: QuestionOptionType[]
}

export type QuestionOptionType = {
  id: number,
  name: string,
  alias: string
}
