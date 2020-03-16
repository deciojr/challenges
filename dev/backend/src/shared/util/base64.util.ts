import { Buffer } from 'buffer';

export const base64ToString = (string: string) =>
  Buffer.from(string, 'base64').toString('utf-8');
