export class Mortgage {
  P: number; // principal loan amount
  r: number; // annual interest rate
  n: number; // number of payments

  constructor(P: number, r: number, n: number) {
    this.P = P;
    this.r = r / 12; // convert annual interest rate to monthly
    this.n = n;
  }

  calculateMonthlyPayment(): number {
    const numerator = this.P * this.r * (1 + this.r) ** this.n;
    const denominator = (1 + this.r) ** this.n - 1;
    return Math.round(numerator / denominator);
  }

  calculateDownPayment(totalPrice: number, downPaymentPercentage: number): number {
    return totalPrice * downPaymentPercentage / 100;
  }

  calculateMortgageAmount(totalPrice: number, downPayment: number): number {
    return totalPrice - downPayment;
  }

  calculateCostOfPoints(points: number): number {
    return this.P * points / 100;
  }

  calculateTotalInterest(monthlyPayment: number): number {
    const totalPaid = monthlyPayment * this.n;
    return totalPaid - this.P;
  }
}
