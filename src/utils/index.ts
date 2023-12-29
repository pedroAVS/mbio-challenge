import 'dotenv/config';
import * as updateDotenv from 'update-dotenv';
import * as readline from 'readline-sync';

export async function getSauceCredentials(): Promise<{
    sauceUsername: string;
    sauceAccessKey: string;
  }> {
    let sauceUsername = process.env.SAUCE_USERNAME;
    let sauceAccessKey = process.env.SAUCE_ACCESS_KEY;
  
    if (!sauceUsername) {
      sauceUsername = await readline.question(
        'What is your Sauce Labs username? '
      );
      await updateDotenv({
        SAUCE_USERNAME: sauceUsername,
      });
      console.log('Sauce Labs username is saved in the .env file.');
    }
  
    if (!sauceAccessKey) {
      sauceAccessKey = await readline.question(
        'What is your Sauce Labs API key? ',
        {
          hideEchoBack: true,
        }
      );
      await updateDotenv({
        SAUCE_ACCESS_KEY: sauceAccessKey,
      });
      console.log('Sauce Labs API key is saved in the .env file.');
    }
  
    return { sauceUsername, sauceAccessKey };
  }