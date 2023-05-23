export default function formatMoney(amount = 0) {
    const options = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    };
  

    const formatter = Intl.NumberFormat('en-US', options);
  
    return formatter.format(amount / 100);
  }
