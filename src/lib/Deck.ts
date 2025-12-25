type Suit = 'Spades' | 'Diamonds' | 'Clubs' | 'Hearts';
type Rank = 'Ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King';

interface Card {
  readonly suit: Suit;
  readonly rank: Rank;
  readonly mark: string;
  readonly display: string;
}

type DeckOptions = {
  shuffle?: boolean;
};
export default class Deck {
  static readonly SUITS  =Object.freeze( ['Spades', 'Diamonds', 'Clubs', 'Hearts'] as const);
  static readonly RANKS  = Object.freeze(['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'] as const);
  
  static readonly MARKS: Record<string, string> = { 
    Ace: 'A', Jack: 'J', Queen: 'Q', King: 'K' 
  };
  
  static readonly SYMBOLS: Record<Suit, string> = { 
    Spades: '♠', Diamonds: '♦', Clubs: '♣', Hearts: '♥' 
  };

  #cards: Card[] = [];

  constructor(options: DeckOptions = {}) {
    this.#init();
    if (options.shuffle) {
      this.shuffle();
    }
  }

  #init(): void {
    // Generate deck using flatMap to eliminate nested push logic
    this.#cards = Deck.SUITS.flatMap(suit => {
      // Logic for New Deck Order: Reverse only if suit is Clubs or Hearts
      const currentRanks = ['Clubs', 'Hearts'].includes(suit) 
        ? [...Deck.RANKS].reverse() 
        : Deck.RANKS;

      return currentRanks.map(rank => {
        const mark = Deck.MARKS[rank] ?? rank; // Use rank as mark if not in lookup (e.g., "2")
        return {
          suit,
          rank,
          mark,
          display: `${mark}${Deck.SYMBOLS[suit]}`
        };
      });
    });
  }

  public reset(): void {
    this.#init();
  }

  public shuffle(): void {
    for (let i = this.#cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
    }
  }

  public draw(): Card | undefined {
    return this.#cards.shift();
  }

  get count(): number {
    return this.#cards.length;
  }
}