export default function getPayment(number: string):
  | {
      paymentMethod: string;
      cardName?: string;
    }
  | undefined {
  if (number === "4000000000000002") {
    return {
      paymentMethod: "pm_card_visa_chargeDeclined",
    };
  } else if (number === "4000000000009995") {
    return {
      paymentMethod: "pm_card_visa_chargeDeclinedInsufficientFunds",
    };
  } else if (number === "4000000000009987") {
    return {
      paymentMethod: "pm_card_visa_chargeDeclinedLostCard",
    };
  } else if (number === "4242424242424242") {
    return {
      paymentMethod: "pm_card_visa",
      cardName: "Visa card",
    };
  } else if (number === "5555555555554444") {
    return {
      paymentMethod: "pm_card_mastercard",
      cardName: "Master card",
    };
  } else {
    return undefined;
  }
}
