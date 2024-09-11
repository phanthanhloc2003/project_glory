import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogoutService {
  private readonly filePath = path.join(__dirname, './', 'invalid-tokens.txt');

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '', 'utf-8');
    }
  }

  async addToken(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.appendFile(this.filePath, token + '\n', (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async isTokenInvalid(token: string): Promise<boolean> {
    const tokens = await this.readTokens();
    return tokens.includes(token);
  }

  private readTokens(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf-8', (err, data) => {
        if (err) reject(err);
        resolve(data.split('\n').filter(Boolean));
      });
    });
  }
}
