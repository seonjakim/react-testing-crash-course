import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("on initial render, the pay button is disabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "5" }} />);
  // 원래 테스트해야하는 상황과 반대 상황을 먼저 테스트해보기 만약에 통과하지 않아야 하는 상황이 통과한다면 (toBeEnabled가 통과되는 상황처럼)
  // 해당 상황에 맞는 버그를 없애거나, 지금 async await를 사용한 것 처럼 피할 수 있는 방법을 고안해서 테스트해야 함
  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});

test("if an amount and note is entered, the pay button becomes enabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "5" }} />);

  userEvent.type(screen.getByPlaceholderText(/Amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/Add a note/i), "dinner");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
