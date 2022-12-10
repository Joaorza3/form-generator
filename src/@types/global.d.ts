export {};

declare global {
  type FormItem = {
    text: string;
    answerType: string;
    options?: string[];
  };
}
