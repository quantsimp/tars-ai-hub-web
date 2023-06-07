import { FixedNumber } from 'ethers';

export function maskAddress(address: string, place = '...', start = 6, end = 4) {
  if (!address || address.length < start + end) return address;
  return address.substring(0, start) + place + address.substring(address.length - end);
}

export function fixedNumberFormat(number: any, maxDecimalDigits: number) {
  return FixedNumber.from(number).round(maxDecimalDigits).toString();
}

export function chainLogoByChainId(chainId: number) {
  switch (chainId) {
    case 1:
      return 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png';
    case 56:
      return 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png';
    case 137:
      return 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png';
    case 42161:
      return 'https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png';
    case 10:
      return 'https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png';
    default:
      return;
  }
}
