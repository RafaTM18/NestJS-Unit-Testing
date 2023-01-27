import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetsService {
    tweets: string[] = [];
    
    getTweet(id: number) {
        return this.tweets[id];
    }

    getTweets() {
        return this.tweets;
    }

    createTweet(tweet: string) {
        if (tweet.length > 280) {
            throw new Error('Muito grande para tweetar, tá escrevendo um livro??');
        }
        this.tweets.push(tweet);

        return tweet;
    }

    updateTweet(tweet: string, id: number) {
        const tweetToUpdate = this.tweets[id];
        if (!tweetToUpdate) {
            throw new Error("Esse tweet não existe");
        }
        if (tweet.length > 280) {
            throw new Error('Muito grande para tweetar, tá escrevendo um livro??');
        }
        this.tweets[id] = tweet;

        return tweet;
    }

    deleteTweet(id: number) {
        const tweetToDelete = this.tweets[id];
        if (!tweetToDelete) {
            throw new Error("Esse tweet não existe");
        }
        const deletedTweet = this.tweets.splice(id, 1);
        return deletedTweet;
    }
}
